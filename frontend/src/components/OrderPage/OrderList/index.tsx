// OrderList.js
import { Button } from "react-bootstrap";
import { TfiPlus } from "react-icons/tfi";
import PageTitle from "../../PageTitle";
import OrderItemList from "./OrderItemList";
import { MdDelete, MdFormatListBulletedAdd } from "react-icons/md";
import { Dispatch, SetStateAction, useEffect } from "react";
import { API_BASE_URL } from "../../../global/config";
import { ISellOrder, ISellOrderItem } from "../../../global/types";
import { useAuth } from "../../../context/AuthProvider";
import { postData } from "../../../global/functions";
import { useModal } from '../../../context/PopupModal';
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

interface OrderListProps {
    children?: React.ReactNode;
    onAddItemClick: React.MouseEventHandler<HTMLButtonElement>;
    sellOrder: ISellOrder;
    removeItemFromOrder: (item: ISellOrderItem) => void;
    setSellOrder: Dispatch<SetStateAction<ISellOrder>>;
    setComment: Dispatch<SetStateAction<string>>;
    comment: string;
    editId?: string;
}

const OrderList = ({ onAddItemClick, sellOrder, removeItemFromOrder, comment, setComment, setSellOrder, editId }: OrderListProps) => {
    const { token, logout } = useAuth();
    const { showModal } = useModal();
    const navigate = useNavigate();

    // Calculate total
    const total = sellOrder.items.reduce((acc, item) => {
        if (item.price !== undefined) {
            return acc + (item.price * item.quantity);
        }
        return acc;
    }, 0);

    useEffect(() => {
        setTotal();
    }, [sellOrder.items]);

    const setTotal = () => {
        setSellOrder({
            ...sellOrder,
            total: total
        });
    }

    // Create sell order
    const createSellOrder = async () => {
        if (sellOrder.items.length === 0) {
            showModal("Please add items to create order", "error");
        }

        if (sellOrder.type === "dine-in" && sellOrder.tableNumber === 0) {
            showModal("Please enter table number", "error");
        }

        try {
            // API call to create sell order
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
        }
    };

    // Edit sell order
    const editSellOrder = async () => {
        if (sellOrder.items.length === 0) {
            showModal("Please add items to edit order", "error");
        }

        if (sellOrder.type === "dine-in" && sellOrder.tableNumber === 0) {
            showModal("Please enter table number", "error");
        }

        try {
            // API call to edit sell order
            const result = await postData(API_BASE_URL + 'sellorder/editsellorder', sellOrder, token, () => logout('error'));
            if (result.error) {
                showModal(result.error, "error");
            }
            else {
                showModal("Order edited successfully", "success");
                navigate("/orders");
            }

            return result;
        } catch (error) {
            console.error("Error editing sellOrder:", error);
            showModal("Error editing order", "error");
        }
    };

    // Delete sell order
    const deleteSellOrder = async () => {
        try {

            // API call to delete sell order
            const result = await postData(API_BASE_URL + 'sellorder/deletesellorder', sellOrder, token, () => logout('error'));
            if (result.error) {
                showModal(result.error, "error");
            }
            else {
                showModal("Order deleted successfully", "success");
                navigate("/orders");
            }

            return result;
        } catch (error) {
            console.error("Error deleting sellOrder:", error);
            showModal("Error deleting order", "error");
        }
    };

    useEffect(() => {
        if (sellOrder.status === "complete") {
            editSellOrder();
        }
    }, [sellOrder.status]);

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
                <div className="col-2 mt-4">
                    <div className="form-group">
                        <textarea
                            className="form-control shadow"
                            id="comment"
                            placeholder="Comment"
                            rows={2}
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
                {sellOrder.type === "delivery" && (
                    <>
                        <div className="col-1 d-flex align-items-center text-center">
                            <div className="form-group mb-2">
                                <label htmlFor="address1" className="mb-0 float-start">
                                    Address *:
                                </label>
                                <input
                                    type="text"
                                    className="form-control shadow"
                                    id="address"
                                    placeholder="Address"
                                    value={sellOrder.address}
                                    onChange={(e) =>
                                        setSellOrder({
                                            ...sellOrder,
                                            address: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-1 d-flex align-items-center text-center">
                            <div className="form-group mb-2">
                                <label htmlFor="city" className="mb-0 float-start">
                                    City *:
                                </label>
                                <input
                                    type="text"
                                    className="form-control shadow"
                                    id="city"
                                    placeholder="City"
                                    value={sellOrder.city}
                                    onChange={(e) =>
                                        setSellOrder({
                                            ...sellOrder,
                                            city: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-1 d-flex align-items-center text-center">
                            <div className="form-group mb-2">
                                <label htmlFor="region" className="mb-0 float-start">
                                    County *:
                                </label>
                                <input
                                    type="text"
                                    className="form-control shadow"
                                    id="region"
                                    placeholder="County"
                                    value={sellOrder.region}
                                    onChange={(e) =>
                                        setSellOrder({
                                            ...sellOrder,
                                            region: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-1 d-flex align-items-center text-center">
                            <div className="form-group mb-0">
                                <label htmlFor="country" className="mb-0 float-start">
                                    Country *:
                                </label>
                                <input
                                    type="text"
                                    className="form-control shadow"
                                    id="country"
                                    placeholder="Country"
                                    value={sellOrder.country || "ireland"}
                                    disabled
                                    onChange={(e) =>
                                        setSellOrder({
                                            ...sellOrder,
                                            country: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </>

                )}
                <div className="col float-end mt-5 p-0">
                    {editId !== '' && editId !== undefined ? (
                        <>
                            <Button className="mainGreenBgColor float-end py-2 pe-3 text-white rounded-4 fw-light text-center pointer text-decoration-none border-0 me-5">
                                <p className="fs-5 m-0"
                                    onClick={() => {
                                        setSellOrder({
                                            ...sellOrder,
                                            status: "complete",
                                            comment: comment
                                        });
                                        editSellOrder();
                                    }}>
                                    <TfiPlus className="fs-4 me-2" />
                                    Complete
                                </p>
                            </Button>
                            <Button className="bg-warning float-end py-2 pe-3 text-white rounded-4 fw-light text-center pointer text-decoration-none border-0 me-3">
                                <p className="fs-5 m-0"
                                    onClick={() => {
                                        setSellOrder({
                                            ...sellOrder,
                                            comment: comment
                                        });
                                    }}>
                                    <FaEdit className="fs-4 me-2" />
                                    Edit
                                </p>
                            </Button>
                            <Button className="bg-danger float-end py-2 pe-3 text-white rounded-4 fw-light text-center pointer text-decoration-none border-0 me-3">
                                <p className="fs-5 m-0"
                                    onClick={() => {
                                        setSellOrder({
                                            ...sellOrder,
                                            status: "cancelled",
                                            comment: comment
                                        });
                                        deleteSellOrder();
                                    }}>
                                    <MdDelete className="fs-4 me-2" />
                                    Delete
                                </p>
                            </Button>
                        </>

                    ) : (
                        <Button className="mainGreenBgColor float-end py-2 pe-3 text-white rounded-4 fw-light text-center pointer text-decoration-none border-0 me-5">
                            <p className="fs-5 m-0"
                                onClick={() => {
                                    setSellOrder({
                                        ...sellOrder,
                                        comment: comment
                                    });
                                    createSellOrder();
                                }}>
                                <TfiPlus className="fs-4 me-2" />
                                Create Order
                            </p>
                        </Button>
                    )}
                    <span className="float-end me-3 fs-4">Total:  ${total > 0 ? total.toFixed(2) : 0}</span>
                </div>
            </div>
        </>
    );
};

export default OrderList;