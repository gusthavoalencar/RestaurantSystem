import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "./index.css";
import { useEffect, useState } from 'react';
import Select from 'react-select';

interface CreateItemModalProps {
    show: boolean;
    onHide: () => void;
}

interface IItemCategories {
    name: string;
    active: boolean;
}

const CreateItemModal = ({ show, onHide }: CreateItemModalProps) => {

    const [isItemActive, setIsItemActive] = useState(true);
    const [categories, setcategories] = useState<IItemCategories[]>([]);

    const handleActiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsItemActive(e.target.checked);
    };

    const fetchData = async (url: string) => {
        const response = await fetch(url);
        const json = await response.json();

        return json;
    };

    const getCategories = async (): Promise<IItemCategories[]> => {
        try {
            const categories = await fetchData('http://localhost:4000/api/itemCategory/getItemCategories');

            return categories;
        } catch (error) {
            console.error("Error fetching categories:", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchItems = async () => {
            const categories = await getCategories();
            setcategories(categories);
        };

        fetchItems();
    }, []);

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
                            <label className="mb-1" htmlFor="ItemName">Item Name:</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Item Name" aria-label="ItemName" id="ItemName"></input>
                            </div>

                            <label className="mb-1" htmlFor="ItemAmount">Amount:</label>
                            <div className="input-group mb-3">
                                <input type="number" className="form-control" placeholder="Amount" aria-label="ItemAmount" id="ItemAmount"></input>
                            </div>

                            <label className="mb-1" htmlFor="Categories:">Categories:</label>
                            <Select
                                isMulti
                                name="colors"
                                options={categories.map(category => ({ value: category.name, label: category.name }))}
                                className="basic-multi-select mb-3"
                                classNamePrefix="select"
                            />

                            <label className="mb-1" htmlFor="ItemPrice">Price:</label>
                            <div className="input-group mb-3">
                                <input type="number" className="form-control" placeholder="Price" aria-label="ItemPrice" id="ItemPrice"></input>
                            </div>

                            <div className="form-check mb-3">
                                <input className="form-check-input" type="checkbox" value="" id="isMenuItem"></input>
                                <label className="form-check-label" htmlFor="isMenuItem">
                                    Menu Item
                                </label>
                            </div>

                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="itemActive" onChange={handleActiveChange} checked={isItemActive}></input>
                                <label className="form-check-label" htmlFor="itemActive">Active</label>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-5'>
                        <Button className='col-5 mx-auto mainGreenBgColor border-0'>Create</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CreateItemModal;