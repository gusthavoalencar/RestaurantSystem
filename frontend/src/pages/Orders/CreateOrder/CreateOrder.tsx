import { useEffect, useState } from "react";
import OrderList from "../../../components/OrderPage/OrderList";
import AddItem from "../../../components/OrderPage/AddItem/AddItem";
import { API_BASE_URL } from "../../../global/config";
import { fetchData } from "../../../global/functions";
import { ISellOrder, IItem, ISellOrderItem } from "../../../global/types";
import { useAuth } from "../../../context/AuthProvider";
import { useSearchParams } from "react-router-dom";


const CreateOrder = () => {
    const { token, logout } = useAuth();
    const [createOrderStep, setcreateOrderStep] = useState("orderList");
    const [sellOrder, setSellOrder] = useState<ISellOrder>({
        _id: "",
        createdAt: "",
        total: 0,
        items: [],
        comment: "",
        status: "pending",
        type: "dine-in",
        tableNumber: 0,
    });
    const [comment, setComment] = useState('');
    const [items, setItems] = useState<IItem[]>([]);

    const [searchParams] = useSearchParams();
    const ordertype = searchParams.get('ordertype');
    const editId = searchParams.get('id') ?? undefined;

    // Set order type
    useEffect(() => {
        if (ordertype === "delivery" || ordertype === "dine-in") {
            if (ordertype === "delivery") {
                setSellOrder(prevOrder => ({
                    ...prevOrder,
                    country: "Ireland",
                    region: "Dublin",
                    type: ordertype
                }));
            }
            setSellOrder(prevOrder => ({
                ...prevOrder,
                type: ordertype
            }));
        }
    }, [ordertype]);

    const handleAddItemButtonClick = () => {
        setcreateOrderStep("addItem");
    };
    const handleBackButtonClick = () => {
        setcreateOrderStep("orderList");
    };

    // Add item to order
    const addItemToOrder = (item: IItem) => {

        // Sets order and check if item already exists in order
        setSellOrder(prevOrder => {
            const existingItemIndex = prevOrder.items.findIndex(orderItem => orderItem._id === item._id);

            if (existingItemIndex > -1) {
                return {
                    ...prevOrder,
                    items: prevOrder.items.map((orderItem, index) =>
                        index === existingItemIndex ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem
                    )
                };
            } else {
                const newOrderItem: ISellOrderItem = {
                    _id: item._id,
                    name: item.name,
                    quantity: 1,
                    menuCategory: item.menuCategory,
                    isMultiOptions: item.isMultiOptions,
                    selectedOption: item.isMultiOptions ? '' : undefined,
                    price: item.price || 0
                };

                return {
                    ...prevOrder,
                    items: [...prevOrder.items, newOrderItem]
                };
            }
        });
    };

    // Remove item from order
    const removeItemFromOrder = (orderItemToRemove: ISellOrderItem) => {
        setSellOrder(prevOrder => {
            const existingItemIndex = prevOrder.items.findIndex(item => item._id === orderItemToRemove._id);

            if (existingItemIndex === -1) {
                return prevOrder;
            }

            const existingItem = prevOrder.items[existingItemIndex];

            if (existingItem.quantity > 1) {
                return {
                    ...prevOrder,
                    items: prevOrder.items.map((item, index) =>
                        index === existingItemIndex ? { ...item, quantity: item.quantity - 1 } : item
                    )
                };
            } else {
                return {
                    ...prevOrder,
                    items: prevOrder.items.filter((_, index) => index !== existingItemIndex)
                };
            }
        });
    };

    // Get Items
    const getItems = async (): Promise<IItem[]> => {
        try {

            // API request to get items
            const result = await fetchData(API_BASE_URL + 'item/getitems?isMenuItem=true', token, () => logout('error'));
            return result;
        } catch (error) {
            console.error("Error fetching items:", error);
            return [];
        }
    };

    // Get order by id
    const getOrderById = async (): Promise<IItem[]> => {
        try {
            // API request to get order by id
            const result = await fetchData(API_BASE_URL + `sellorder/getSellOrderById?id=${editId}`, token, () => logout('error'));

            setSellOrder(result);
            return result;
        } catch (error) {
            console.error("Error fetching order:", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchItems = async () => {
            const items = await getItems();
            setItems(items);
        };

        if (editId) {
            getOrderById();
        }

        fetchItems();
    }, []);

    let createOrderContent;
    // Switch between orderList and addItem
    switch (createOrderStep) {
        case 'orderList':
            createOrderContent =
                <OrderList
                    onAddItemClick={handleAddItemButtonClick}
                    sellOrder={sellOrder}
                    removeItemFromOrder={removeItemFromOrder}
                    setSellOrder={setSellOrder}
                    setComment={setComment}
                    comment={comment}
                    editId={editId}>
                </OrderList>
            break;
        case 'addItem':
            createOrderContent =
                <AddItem
                    onBackButtonClick={handleBackButtonClick}
                    addItemToOrder={addItemToOrder}
                    sellOrder={sellOrder}
                    removeItemFromOrder={removeItemFromOrder}
                    items={items}>
                </AddItem>
            break;
        default:
            createOrderContent =
                <OrderList
                    onAddItemClick={handleAddItemButtonClick}
                    sellOrder={sellOrder}
                    removeItemFromOrder={removeItemFromOrder}
                    setSellOrder={setSellOrder}
                    setComment={setComment}
                    comment={comment}
                    editId={editId}>
                </OrderList>
            break;
    }

    return (
        <>
            {createOrderContent}
        </>
    );
};

export default CreateOrder;
