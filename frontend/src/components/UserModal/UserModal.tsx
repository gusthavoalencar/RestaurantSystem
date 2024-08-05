import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "./index.css";
import { ChangeEvent, useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { API_BASE_URL } from '../../global/config';
import { postData } from '../../global/functions';
import { useModal } from '../../context/PopupModal';
import { useAuth } from '../../context/AuthProvider';
import { IUser } from '../../global/types';

interface UserModalProps {
    show: boolean;
    onHide: () => void;
    selectedUser?: IUser | null;
    getUsers: () => Promise<IUser[]>;

}

const UserModal = ({ show, onHide, selectedUser, getUsers }: UserModalProps) => {
    const defaultUser = {
        _id: '',
        name: '',
        surname: '',
        email: '',
        status: 'pending',
        role: 'Waiter'
    };

    const [user, setUser] = useState<IUser>(selectedUser || defaultUser);

    useEffect(() => {
        if (selectedUser != null) {
            setUser(selectedUser);
        }
    }, [selectedUser]);

    useEffect(() => {
        if (!show) {
            setUser(defaultUser);
        }
    }, [show]);

    const { token, logout } = useAuth();
    const { showModal } = useModal();

    const statusOptions = [{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }, { value: 'pending', label: 'Pending' }];
    const roleOptions = [{ value: 'waiter', label: 'Waiter' }, { value: 'manager', label: 'Manager' }, { value: 'administrator', label: 'Administrator' }];

    // Handle input change
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [id]: value
        }));
    };

    // Handle status change
    const handleStatusChange = (selectedOption: SingleValue<{ value: string; label: string }>): void => {
        setUser((prevUser) => ({
            ...prevUser,
            status: selectedOption ? selectedOption.value : '',
        }));
    };

    // Handle role change
    const handleRoleChange = (selectedOption: SingleValue<{ value: string; label: string }>): void => {
        setUser((prevUser) => ({
            ...prevUser,
            role: selectedOption ? selectedOption.value : '',
        }));
    };

    // Create user through API request
    const createUser = async () => {
        try {
            const result = await postData(API_BASE_URL + 'user/register', user, token, () => logout('error'));
            if (result.error) {
                showModal(result.error, "error");
            }
            else {
                showModal("User created successfully", "success");
                onHide();
                setUser(defaultUser);
                getUsers();
            }

            return result;
        } catch (error) {
            console.error("Error creating user:", error);
            showModal("Error creating user", "error");
        }
    };

    // Edit user through API request
    const editUser = async () => {
        try {
            const result = await postData(API_BASE_URL + 'user/edituser', user, token, () => logout('error'));
            if (result.error) {
                showModal(result.error, "error");
            }
            else {
                showModal("User edited successfully", "success");
                onHide();
                setUser(defaultUser);
                getUsers();
            }

            return result;
        } catch (error) {
            console.error("Error editing user:", error);
            showModal("Error editing user", "error");
        }
    };

    // Delete user through API request
    const deleteUser = async () => {
        try {
            const result = await postData(API_BASE_URL + 'user/deleteUser', user, token, () => logout('error'));
            if (result.error) {
                showModal(result.error, "error");
            }
            else {
                showModal("User deleted successfully", "success");
                onHide();
                setUser(defaultUser);
                getUsers();
            }

            return result;
        } catch (error) {
            console.error("Error deleting user:", error);
            showModal("Error deleting user", "error");
        }
    };

    return (
        <>
            <Modal show={show} onHide={onHide} dialogClassName="custom-modal-dialog" contentClassName="custom-modal-content">
                <Modal.Header className="border-0 d-flex justify-content-center align-items-center">
                    <Modal.Title className='m-0'>
                        {selectedUser == null ? 'Create User' : 'Edit User'}
                    </Modal.Title>
                    <Button variant="button" onClick={onHide} className="position-absolute end-0 fs-2 text-secondary">
                        <span aria-hidden="true">&times;</span>
                    </Button>
                </Modal.Header>
                <Modal.Body className='pb-3'>
                    <div className="row ms-2">
                        <div className="col-7">
                            <label className="mb-1" htmlFor="name">Name:</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Name" aria-label="name" id="name" value={user.name} onChange={handleInputChange}></input>
                            </div>

                            <label className="mb-1" htmlFor="surname">Surname:</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Surname" aria-label="surname" id="surname" value={user.surname} onChange={handleInputChange}></input>
                            </div>
                            <label className="mb-1" htmlFor="email">Email:</label>
                            <div className="input-group mb-3">
                                <input type="email" className="form-control" placeholder="Email" aria-label="email" id="email" value={user.email} onChange={handleInputChange}></input>
                            </div>

                            <label className="mb-1" htmlFor="status">Status:</label>
                            <Select
                                options={statusOptions}
                                value={statusOptions.find(option => option.value === user.status)}
                                onChange={handleStatusChange}
                                isSearchable={false}
                                isDisabled={selectedUser == null}
                                className='mb-3'
                            />

                            <label className="mb-1" htmlFor="status">Role:</label>
                            <Select
                                options={roleOptions}
                                value={roleOptions.find(option => option.value === user.role)}
                                onChange={handleRoleChange}
                                className='mb-3'
                                isSearchable={false}
                            />
                        </div>
                    </div>
                    {selectedUser != null && (
                        <div className='row mt-5'>
                            <div className='d-flex justify-content-center gap-3'>
                                <Button className='mainGreenBgColor border-0 w-50' onClick={editUser}>Edit User</Button>
                                <Button className='bg-danger border-0' onClick={deleteUser}>Delete</Button>
                            </div>
                        </div>
                    )}
                    {selectedUser === null && (
                        <div className='row mt-5'>
                            <Button className='col-5 mx-auto mainGreenBgColor border-0' onClick={createUser}>Create</Button>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default UserModal;