import { Button } from "react-bootstrap";
import { TfiPlus } from "react-icons/tfi";
import PageTitle from "../../PageTitle";
import OrderItemList from "./OrderItemList";

interface IItem {
    _id: string;
    name: string;
    amount?: number;
    isMenuItem: boolean;
    isMultiOptions: boolean;
    options: string[];
    menuSections: string[];
    menuCategory: string;
    price?: number;
    active: boolean;
}

interface OrderListProps {
    onAddItemClick: React.MouseEventHandler<HTMLButtonElement>;
    orderItems: IItem[];
}

const OrderList = ({ onAddItemClick, orderItems }: OrderListProps) => {

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
                        onClick={onAddItemClick}
                    >
                        <p className="fs-5 m-0">
                            <TfiPlus className="fs-4 me-2" />
                            Add
                        </p>
                    </Button>
                </div>
            </div>

            <div className="row p-0 m-0 me-4">
                <div className="col-3 p-0 m-0 px-3">
                    <OrderItemList title="Starters" orderItems={orderItems} />
                </div>
                <div className="col-3 p-0 m-0 px-3">
                    <OrderItemList title="Mains" orderItems={orderItems} />
                </div>
                <div className="col-3 p-0 m-0 px-3">
                    <OrderItemList title="Desserts" orderItems={orderItems} />
                </div>
                <div className="col-3 p-0 m-0 px-3">
                    <OrderItemList title="Drinks" orderItems={orderItems} />
                </div>

            </div>
        </>
    );
};

export default OrderList;