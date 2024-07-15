import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "./index.css";
import { ChangeEvent, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { API_BASE_URL } from '../../config/config';

interface UserModalProps {
    show: boolean;
    onHide: () => void;
}

interface IUser {
    name: string;
    surname: string;
    email: string;
    status: string;
    role: string;
}

const UserModal = ({ show, onHide }: UserModalProps) => {
    const [user, setUser] = useState<IUser>({
        name: '',
        surname: '',
        email: '',
        status: 'Pending',
        role: 'Waiter'
    });

    const statusOptions = [{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }, { value: 'pending', label: 'Pending' }];
    const roleOptions = [{ value: 'waiter', label: 'Waiter' }, { value: 'manager', label: 'Manager' }, { value: 'admin', label: 'Admin' }];

    const postData = async (url: string, data: IUser) => {
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

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [id]: value
        }));
    };

    const handleStatusChange = (selectedOption: SingleValue<{ value: string; label: string }>): void => {
        setUser((prevUser) => ({
            ...prevUser,
            status: selectedOption ? selectedOption.value : '',
        }));
    };

    const handleRoleChange = (selectedOption: SingleValue<{ value: string; label: string }>): void => {
        setUser((prevUser) => ({
            ...prevUser,
            role: selectedOption ? selectedOption.value : '',
        }));
    };



    const createUser = async () => {
        try {
            const createdUser = await postData(API_BASE_URL + 'user/register', user);
            return createdUser;
        } catch (error) {
            console.error("Error creating user:", error);
            return {
                name: '',
                surname: '',
                email: '',
                status: '',
                role: ''
            };
        }
    };

    return (
        <>
            <Modal show={show} onHide={onHide} dialogClassName="custom-modal-dialog" contentClassName="custom-modal-content">
                <Modal.Header className="border-0 d-flex justify-content-center align-items-center">
                    <Modal.Title className='m-0'>Create User</Modal.Title>
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
                                isDisabled={true}
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
                    <div className='row mt-5'>
                        <Button className='col-5 mx-auto mainGreenBgColor border-0' onClick={createUser}>Create</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default UserModal;