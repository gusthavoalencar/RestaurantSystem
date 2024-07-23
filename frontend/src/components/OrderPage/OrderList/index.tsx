// OrderList.js
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
import { useModal } from '../../../context/PopupModal';
import { useNavigate } from "react-router-dom";

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
    const { showModal } = useModal();
    const navigate = useNavigate();

    const total = sellOrder.items.reduce((acc, item) => {
        if (item.price !== undefined) {
            return acc + (item.price * item.quantity);
        }
        return acc;
    }, 0);

    const createSellOrder = async (): Promise<ISellOrder> => {
        if (sellOrder.items.length === 0) {
            showModal("Please add items to create order", "error");
            return {
                _id: "",
                createdAt: "",
                total: 0,
                items: [],
                comment: "",
                status: "pending",
                type: "dine-in",
                tableNumber: 0,
            };
        }

        if (sellOrder.type === "dine-in" && sellOrder.tableNumber === 0) {
            showModal("Please enter table number", "error");
            return {
                _id: "",
                createdAt: "",
                total: 0,
                items: [],
                comment: "",
                status: "pending",
                type: "dine-in",
                tableNumber: 0,
            };
        }


        try {
            const result = await postData(API_BASE_URL + 'sellorder/createsellorder', sellOrder, token, () => logout('error'));
            if (result.error) {
                showModal(result.error, "error");
            }
            else {
                showModal("Order created successfully", "success");
                navigate("/orders");
            }

            return result;
        } catch (error) {
            console.error("Error creating sellOrder:", error);
            showModal("Error creating order", "error");
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
                {sellOrder.type === "dine-in" && (
                    <div className="col-3 d-flex align-items-center text-center">
                        <label htmlFor="tableNumber" className="mb-0">
                            Table Number *:
                        </label>
                        <div className="form-group flex-grow-1 mb-0 ms-2">
                            <input
                                type="number"
                                className="form-control shadow"
                                id="tableNumber"
                                placeholder="Table Number"
                                value={sellOrder.tableNumber}
                                onChange={(e) =>
                                    setSellOrder({
                                        ...sellOrder,
                                        tableNumber: parseInt(e.target.value),
                                    })
                                }
                            />
                        </div>
                    </div>
                )}
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