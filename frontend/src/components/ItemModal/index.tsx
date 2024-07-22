import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "./index.css";
import { ChangeEvent, useEffect, useState } from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';
import { API_BASE_URL } from '../../global/config';
import { fetchData, postData } from '../../global/functions';
import { IItem, IItemMenuSection } from '../../global/types';
import { useAuth } from '../../context/AuthProvider';

interface CreateItemModalProps {
    show: boolean;
    onHide: () => void;
    selectedItem?: IItem | null;
    getItems: () => Promise<IItem[]>;
}

const ItemModal = ({ show, onHide, selectedItem, getItems }: CreateItemModalProps) => {
    const { token, logout } = useAuth();
    const defaultItemState = {
        _id: '',
        name: '',
        amount: 0,
        isMenuItem: false,
        menuSections: [],
        isMultiOptions: false,
        options: [],
        menuCategory: '',
        price: 0,
        active: true,
    };

    useEffect(() => {
        if (selectedItem != null) {
            setItem(selectedItem);
        }
    }, [selectedItem]);

    const [menuSections, setMenuSections] = useState<IItemMenuSection[]>([]);
    const [item, setItem] = useState<IItem>(selectedItem || defaultItemState);
    const [optionValue, setOptionValue] = useState('');

    const menuCategories = [
        { value: 'Starters', label: 'Starters' },
        { value: 'Mains', label: 'Mains' },
        { value: 'Desserts', label: 'Desserts' },
        { value: 'Drinks', label: 'Drinks' }
    ];

    const getCategories = async (): Promise<IItemMenuSection[]> => {
        try {
            const categories = await fetchData(API_BASE_URL + 'itemMenuSection/getItemMenuSections', token, logout);
            return categories;
        } catch (error) {
            console.error("Error fetching categories:", error);
            return [];
        }
    };

    const createItem = async (): Promise<IItem> => {
        try {
            const createdItem = await postData(API_BASE_URL + 'item/createItem', item, token, logout);
            return createdItem;
        } catch (error) {
            console.error("Error creating item:", error);
            return defaultItemState;
        }
        finally {
            onHide();
            selectedItem = null;
            setItem(defaultItemState);
            getItems();
        }
    };

    const editItem = async (): Promise<IItem> => {
        try {
            const editedItem = await postData(API_BASE_URL + 'item/editItem', item, token, logout);
            return editedItem;

        } catch (error) {
            console.error("Error editing item:", error);
            return defaultItemState;
        }
        finally {
            onHide();
            selectedItem = null;
            setItem(defaultItemState);
            getItems();
        }
    };

    const deleteItem = async (): Promise<IItem> => {
        try {
            const deletedItem = await postData(API_BASE_URL + 'item/deleteItem', item, token, logout);
            return deletedItem;
        } catch (error) {
            console.error("Error editing item:", error);
            return defaultItemState;
        }
        finally {
            onHide();
            selectedItem = null;
            setItem(defaultItemState);
            getItems();
        }
    };

    useEffect(() => {
        const fetchItems = async () => {
            const categories = await getCategories();
            setMenuSections(categories);
            if (selectedItem != null) {
                setItem({
                    ...selectedItem,
                    menuSections: selectedItem.menuSections.map(section => categories.find(c => c.name === section)?.name || section),
                    menuCategory: categories.find(c => c.name === selectedItem?.menuCategory)?.name || selectedItem.menuCategory
                });
            }
        };

        fetchItems();
    }, [selectedItem]);

    function handleMenuSectionSelectChange(newValue: MultiValue<{ value: string; label: string }>): void {
        setItem(prevItem => ({
            ...prevItem,
            menuSections: newValue.map(option => option.value),
        }));
    }

    function handleMenuCategoryChange(newValue: SingleValue<{ value: string; label: string }>): void {
        setItem(prevItem => ({
            ...prevItem,
            menuCategory: newValue ? newValue.value : '',
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

    function handleAddOptionClick() {
        setItem(prevItem => ({
            ...prevItem,
            options: [...prevItem.options, optionValue],
        }));
        setOptionValue('');
    }

    function handleDeleteOptionClick(optionToDelete: string) {
        setItem(prevItem => ({
            ...prevItem,
            options: prevItem.options.filter(option => option !== optionToDelete),
        }));
    }

    return (
        <>
            <Modal show={show} onHide={onHide} dialogClassName="custom-modal-dialog" contentClassName="custom-modal-content">
                <Modal.Header className="border-0 d-flex justify-content-center align-items-center">
                    <Modal.Title className='m-0'>
                        {selectedItem == null ? 'Create Item' : 'Edit Item'}
                    </Modal.Title>
                    <Button variant="button" onClick={() => { onHide(); setItem(defaultItemState); }} className="position-absolute end-0 fs-2 text-secondary">
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

                            {item.isMenuItem && (
                                <>
                                    <label className="mb-1" htmlFor="category">
                                        Menu Category:
                                    </label>
                                    <Select
                                        name="categories"
                                        options={menuCategories}
                                        value={menuCategories.find(category => category.value === item.menuCategory)}
                                        className="basic-select mb-3"
                                        classNamePrefix="select"
                                        onChange={handleMenuCategoryChange}
                                    />
                                    <label className="mb-1" htmlFor="menuSections">
                                        Menu Sections:
                                    </label>
                                    <Select
                                        isMulti
                                        name="menuSections"
                                        value={menuSections.filter(section => item.menuSections.includes(section.name)).map(section => ({ value: section.name, label: section.name }))}
                                        options={menuSections.map(section => ({
                                            value: section.name,
                                            label: section.name
                                        }))}
                                        className="basic-multi-select mb-3"
                                        classNamePrefix="select"
                                        onChange={handleMenuSectionSelectChange}
                                    />

                                    <div className="form-check mb-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={item.isMultiOptions}
                                            id="isMultiOptions"
                                            onChange={handleInputChange}>
                                        </input>
                                        <label className="form-check-label" htmlFor="isMultiOptions">
                                            Multi Options
                                        </label>
                                    </div>

                                    {item.isMultiOptions && (
                                        <>
                                            <div className='row'>
                                                <label className="mb-1" htmlFor="name">Option:</label>
                                                <div className="input-group mb-3">
                                                    <input type="text"
                                                        className="form-control"
                                                        placeholder="Option name"
                                                        aria-label="optionInput"
                                                        id="optionInput"
                                                        value={optionValue}
                                                        onChange={(e) => setOptionValue(e.target.value)}
                                                        aria-describedby="addOption">
                                                    </input>
                                                    <button className="btn mainGreenBgColor text-white" type="button" id="addOption" onClick={handleAddOptionClick}>Add</button>
                                                </div>
                                            </div>

                                            {item.options.map((option, index) => (
                                                <div className='row' key={index}>
                                                    <div className="col-10">
                                                        <p>{option}</p>
                                                    </div>
                                                    <div className="col-2">
                                                        <button className="btn btn-danger" type="button" onClick={() => handleDeleteOptionClick(option)}>X</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </>
                            )}

                            <div className="form-check form-switch mt-2">
                                <input className="form-check-input" type="checkbox" id="active" onChange={handleInputChange} checked={item.active}></input>
                                <label className="form-check-label" htmlFor="active">Active</label>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-5'>
                        {selectedItem == null && (
                            <Button className='col-5 mx-auto mainGreenBgColor border-0' onClick={createItem}>Create Item</Button>
                        )}
                        {selectedItem != null && (
                            <div className='row'>
                                <div className='d-flex justify-content-center gap-3'>
                                    <Button className='mainGreenBgColor border-0 w-50' onClick={editItem}>Edit Item</Button>
                                    <Button className='bg-danger border-0' onClick={deleteItem}>Delete</Button>
                                </div>
                            </div>
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ItemModal;
