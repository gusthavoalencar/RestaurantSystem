import { Button } from "react-bootstrap";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import OrderItemList from "../../../components/OrderItemList";

const CreateOrder = () => {
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate('/orders');
    };

    return (
        <>
            <div className="header row p-0 m-0 pt-5">
                <div className="col-6 p-0 m-0 mb-5">
                    <PageTitle text="Create Order" />
                </div>
                <div className="col-6 p-0 m-0">
                    <Button
                        variant="link"
                        className="mainGreenBgColor float-end pt-2 pb-2 ps-3 pe-3 text-white rounded-4 me-5 fw-light text-center pointer text-decoration-none"
                        onClick={handleBackButtonClick}
                    >
                        <p className="fs-5 m-0">
                            <IoChevronBack className="fs-4 me-2" />
                            Back
                        </p>
                    </Button>
                </div>
            </div>

            <div className="row p-0 m-0 me-4">
                <div className="col-3 p-0 m-0 px-3">
                    <OrderItemList title="Starters" />
                </div>
                <div className="col-3 p-0 m-0 px-3">
                    <OrderItemList title="Mains" />
                </div>
                <div className="col-3 p-0 m-0 px-3">
                    <OrderItemList title="Desserts" />
                </div>
                <div className="col-3 p-0 m-0 px-3">
                    <OrderItemList title="Drinks" />
                </div>

            </div>
        </>
    );
};

export default CreateOrder;
