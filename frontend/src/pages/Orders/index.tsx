import { Button } from "react-bootstrap";
import { TfiPlus } from "react-icons/tfi";
import PageTitle from "../../components/PageTitle";
import CreateOrderModal from "../../components/CreateOrderModal";
import { useState } from "react";

const Orders = () => {
    const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);
    const handleCreateOrderModalClose = () => setShowCreateOrderModal(false);
    const handleCreateOrderModalShow = () => setShowCreateOrderModal(true);


    return (
        <>
            <div className="header row p-0 m-0 pt-5">
                <div className="col-6 p-0 m-0 mb-5">
                    <PageTitle text="Orders" />
                </div>
                <div className="col-6 p-0 m-0">
                    <Button variant="link" className="mainGreenBgColor float-end pt-2 pb-2 ps-3 pe-3 text-white rounded-4 me-5 fw-light text-center pointer text-decoration-none" onClick={handleCreateOrderModalShow}>
                        <p className="fs-5 m-0">
                            <TfiPlus className="fs-4 me-2" />
                            Create Order
                        </p>
                    </Button>
                </div>

            </div>
            <CreateOrderModal
                show={showCreateOrderModal}
                onHide={handleCreateOrderModalClose}
            />
        </>
    );
};

export default Orders;