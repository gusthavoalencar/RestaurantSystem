import { Button } from "react-bootstrap";
import { TfiPlus } from "react-icons/tfi";
import PageTitle from "../../PageTitle";
import OrderItemList from "./OrderItemList";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { Dispatch, SetStateAction } from "react";
import { API_BASE_URL } from "../../../global/config";
import { ISellOrder, ISellOrderItem } from "../../../global/types";
import { useAuth } from "../../../context/AuthProvider";
import { postData } from "../../../global/functions";

interface OrderListProps {
    children?: React.ReactNode;
    onAddItemClick: React.MouseEventHandler<HTMLButtonElement>;
    sellOrder: ISellOrder;
    removeItemFromOrder: (item: ISellOrderItem) => void;
    setSellOrder: Dispatch<SetStateAction<ISellOrder>>;
    setComment: Dispatch<SetStateAction<string>>;
    comment: string;
}

const OrderList = ({ onAddItemClick, sellOrder, removeItemFromOrder, comment, setComment, setSellOrder }: OrderListProps) => {
    const { token, logout } = useAuth();
    const total = sellOrder.items.reduce((acc, item) => {
        if (item.price !== undefined) {
            return acc + (item.price * item.quantity);
        }
        return acc;
    }, 0);

    const createSellOrder = async (): Promise<ISellOrder> => {
        try {
            const result = await postData(API_BASE_URL + 'sellorder/createsellorder', sellOrder, token, logout);
            return result;
        } catch (error) {
            console.error("Error creating sellOrder:", error);
            return {
                _id: "",
                createdAt: "",
                total: 0,
                items: [],
                comment: "",
                status: "pending",
                type: "dine-in",
                tableNumber: 0,
            }
        }
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
                        className="mainGreenBgColor float-end py-2 px-3 text-white rounded-4 me-5 fw-light text-center pointer text-decoration-none"
                        onClick={onAddItemClick}
                    >
                        <p className="fs-5 m-0">
                            <MdFormatListBulletedAdd className="fs-4 me-2" />
                            Add Item
                        </p>
                    </Button>
                </div>
            </div>

            <div className="row p-0 m-0 me-4">
                <div className="col-3 p-0 m-0 px-3">
                    <OrderItemList title="Starters" sellOrder={sellOrder} removeItemFromOrder={removeItemFromOrder} />
                </div>
                <div className="col-3 p-0 m-0 px-3">
                    <OrderItemList title="Mains" sellOrder={sellOrder} removeItemFromOrder={removeItemFromOrder} />
                </div>
                <div className="col-3 p-0 m-0 px-3">
                    <OrderItemList title="Desserts" sellOrder={sellOrder} removeItemFromOrder={removeItemFromOrder} />
                </div>
                <div className="col-3 p-0 m-0 px-3">
                    <OrderItemList title="Drinks" sellOrder={sellOrder} removeItemFromOrder={removeItemFromOrder} />
                </div>
            </div>

            <div className="row m-0 p-0">
                <div className="col-4 mt-4">
                    <div className="form-group">
                        <textarea
                            className="form-control shadow"
                            id="comment"
                            placeholder="Comment"
                            rows={3}
                            style={{ resize: "none" }}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                    </div>
                </div>
                <div className="col float-end mt-5 p-0">
                    <Button className="mainGreenBgColor float-end py-2 pe-3 text-white rounded-4 fw-light text-center pointer text-decoration-none border-0 me-5"><p className="fs-5 m-0"
                        onClick={() => {
                            setSellOrder({
                                ...sellOrder,
                                comment: comment
                            });

                            createSellOrder();
                        }}>
                        <TfiPlus className="fs-4 me-2" />
                        Create Order
                    </p></Button>
                    <span className="float-end me-3 fs-4">Total:  ${total > 0 ? total.toFixed(2) : 0}</span>
                </div>
            </div>
        </>
    );
};

export default OrderList;