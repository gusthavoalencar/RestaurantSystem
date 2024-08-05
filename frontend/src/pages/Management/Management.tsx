import { Button } from "react-bootstrap";
import { TfiPlus } from "react-icons/tfi";
import PageTitle from "../../components/PageTitle";
import UserModal from "../../components/UserModal/UserModal";
import { useEffect, useState } from "react";
import { IUser } from "../../global/types";
import { fetchData } from "../../global/functions";
import ItemsTable from "../../components/ItemsTable/ItemsTable";
import { API_BASE_URL } from "../../global/config";
import { useAuth } from "../../context/AuthProvider";

const Management = () => {
    const { token, logout } = useAuth();
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const handleCreateUserModalClose = () => {
        setShowCreateUserModal(false);
        setSelectedUser(null);
    };
    const handleCreateUserModalShow = () => setShowCreateUserModal(true);
    const headers = ['ID No.', 'Name', 'Email', 'Role', 'Status'];


    const [users, setUsers] = useState<IUser[]>([]);

    // Get users
    const getUsers = async (): Promise<IUser[]> => {
        try {
            // API request to get users
            const users = await fetchData(API_BASE_URL + 'user/getUsers', token, () => logout('error'));
            setUsers(users);
            return users;
        } catch (error) {
            console.error("Error fetching users:", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            await getUsers();
        };

        fetchUsers();
    }, []);

    const handleManageUserClick = (user: IUser) => {
        setSelectedUser(user);
        handleCreateUserModalShow();
    };

    return (
        <>
            <div className="header row p-0 m-0 pt-5">
                <div className="col-6 p-0 m-0 mb-5">
                    <PageTitle text="Management" />
                </div>
                <div className="col-6 p-0 m-0">
                    <Button variant="link" className="mainGreenBgColor float-end pt-2 pb-2 ps-3 pe-3 text-white rounded-4 me-5 fw-light text-center pointer text-decoration-none" onClick={handleCreateUserModalShow}>
                        <p className="fs-5 m-0">
                            <TfiPlus className="fs-4 me-2" />
                            Create
                        </p>
                    </Button>
                </div>
            </div>

            <ItemsTable
                headers={headers}
                users={users}
                handleManageUserClick={handleManageUserClick}
                type="users" />
            <UserModal
                show={showCreateUserModal}
                onHide={handleCreateUserModalClose}
                selectedUser={selectedUser}
                getUsers={getUsers}
            />
        </>
    );
};

export default Management;