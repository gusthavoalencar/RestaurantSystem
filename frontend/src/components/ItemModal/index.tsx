import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "./index.css";
import { ChangeEvent, useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { API_BASE_URL } from '../../config/config';

interface CreateItemModalProps {
    show: boolean;
    onHide: () => void;
}

interface IItemCategories {
    name: string;
    active: boolean;
}

interface IItem {
    name: string;
    amount: number;
    isMenuItem: boolean;
    itemCategories: string[];
    price: number;
    active: boolean;
}

const ItemModal = ({ show, onHide }: CreateItemModalProps) => {

    const [categories, setCategories] = useState<IItemCategories[]>([]);
    const [item, setItem] = useState<IItem>({
        name: '',
        amount: 0,
        isMenuItem: false,
        itemCategories: [],
        price: 0,
        active: true,
    });

    const getCategories = async (): Promise<IItemCategories[]> => {
        try {
            const categories = await fetchData(API_BASE_URL + 'itemCategory/getItemCategories');
            return categories;
        } catch (error) {
            console.error("Error fetching categories:", error);
            return [];
        }
    };

    const fetchData = async (url: string) => {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    };

    const createItem = async (): Promise<IItem> => {
        try {
            const createdItem = await postData(API_BASE_URL + 'item/createItem', item);
            return createdItem;
        } catch (error) {
            console.error("Error creating item:", error);
            return {
                name: '',
                amount: 0,
                isMenuItem: false,
                itemCategories: [],
                price: 0,
                active: false,
            };
        }
    };

    const postData = async (url: string, data: IItem) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const json = await response.json();
        return json;
    };

    useEffect(() => {
        const fetchItems = async () => {
            const categories = await getCategories();
            setCategories(categories);
        };

        fetchItems();
    }, []);

    function handleSelectChange(newValue: MultiValue<{ value: string; label: string; }>): void {
        setItem(prevItem => ({
            ...prevItem,
            itemCategories: newValue.map(option => option.value),
        }));
    }

    const updateItemField = (field: keyof IItem, value: any) => {
        setItem((prevItem) => ({
            ...prevItem,
            [field]: value,
        }));
    };

    function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
        const { id, value, type, checked } = event.target;

        switch (type) {
            case 'checkbox':
                updateItemField(id as keyof IItem, checked);
                break;
            case 'number':
                updateItemField(id as keyof IItem, parseFloat(value));
                break;
            default:
                updateItemField(id as keyof IItem, value);
                break;
        }
    }

    return (
        <>
            <Modal show={show} onHide={onHide} dialogClassName="custom-modal-dialog" contentClassName="custom-modal-content">
                <Modal.Header className="border-0 d-flex justify-content-center align-items-center">
                    <Modal.Title className='m-0'>Create Item</Modal.Title>
                    <Button variant="button" onClick={onHide} className="position-absolute end-0 fs-2 text-secondary">
                        <span aria-hidden="true">&times;</span>
                    </Button>
                </Modal.Header>
                <Modal.Body className='pb-3'>
                    <div className="row ms-2">
                        <div className="col-7">
                            <label className="mb-1" htmlFor="name">Item Name:</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Item Name" aria-label="name" id="name" value={item.name} onChange={handleInputChange}></input>
                            </div>

                            <label className="mb-1" htmlFor="amount">Amount:</label>
                            <div className="input-group mb-3">
                                <input type="number" className="form-control" placeholder="Amount" aria-label="amount" id="amount" value={item.amount} onChange={handleInputChange}></input>
                            </div>

                            <label className="mb-1" htmlFor="Categories:">Categories:</label>
                            <Select
                                isMulti
                                name="colors"
                                options={categories.map(category => ({ value: category.name, label: category.name }))}
                                className="basic-multi-select mb-3"
                                classNamePrefix="select"
                                onChange={handleSelectChange}
                            />

                            <label className="mb-1" htmlFor="price">Price:</label>
                            <div className="input-group mb-3">
                                <input type="number" className="form-control" placeholder="Price" aria-label="price" id="price" value={item.price} onChange={handleInputChange}></input>
                            </div>

                            <div className="form-check mb-3">
                                <input className="form-check-input" type="checkbox" checked={item.isMenuItem} id="isMenuItem" onChange={handleInputChange}></input>
                                <label className="form-check-label" htmlFor="isMenuItem">
                                    Menu Item
                                </label>
                            </div>

                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="active" onChange={handleInputChange} checked={item.active}></input>
                                <label className="form-check-label" htmlFor="active">Active</label>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-5'>
                        <Button className='col-5 mx-auto mainGreenBgColor border-0' onClick={createItem}>Create</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ItemModal;