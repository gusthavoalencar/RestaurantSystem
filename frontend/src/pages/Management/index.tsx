import { Button } from "react-bootstrap";
import { TfiPlus } from "react-icons/tfi";
import PageTitle from "../../components/PageTitle";
import UserModal from "../../components/UserModal/UserModal";
import { useState } from "react";

const Management = () => {
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    const handleCreateUserModalClose = () => setShowCreateUserModal(false);
    const handleCreateUserModalShow = () => setShowCreateUserModal(true);
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

            <UserModal
                show={showCreateUserModal}
                onHide={handleCreateUserModalClose}
            />
        </>
    );
};

export default Management;