import { useEffect, useState } from "react";
import OrderList from "../../../components/OrderPage/OrderList";
import AddItem from "../../../components/OrderPage/AddItem/AddItem";
import { Button } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import { API_BASE_URL } from "../../../config/config";

interface IItem {
    _id: string;
    name: string;
    amount?: number;
    isMenuItem: boolean;
    isMultiOptions: boolean;
    options: string[];
    menuCategory: string;
    menuSections: string[];
    price?: number;
    active: boolean;
}

const CreateOrder = () => {
    const [createOrderStep, setcreateOrderStep] = useState("orderList");
    const [orderItems, setOrderItems] = useState<IItem[]>([]);
    const [items, setItems] = useState<IItem[]>([]);

    const handleAddItemButtonClick = () => {
        setcreateOrderStep("addItem");
    };
    const handleBackButtonClick = () => {
        setcreateOrderStep("orderList");
    };

    const addItemToOrder = (item: IItem) => {
        setOrderItems([...orderItems, item]);
    };

    const removeItemFromOrder = (item: IItem) => {
        const index = orderItems.findIndex(orderItem => orderItem._id == item._id);
        if (index !== -1) {
            const newOrderItems = [...orderItems];
            newOrderItems.splice(index, 1);
            setOrderItems(newOrderItems);
        }
    };


    const fetchData = async (url: string) => {
        const response = await fetch(url);
        const json = await response.json();

        return json;
    };


    const getItems = async (): Promise<IItem[]> => {
        try {
            const result = await fetchData(API_BASE_URL + 'item/getitems?isMenuItem=true');

            return result.map((item: IItem) => ({
                ...item,
                _id: `${item._id}_${uuidv4()}`
            }));

        } catch (error) {
            console.error("Error fetching items:", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchItems = async () => {
            const items = await getItems();
            setItems(items);
        };

        fetchItems();
    }, []);

    let createOrderContent;
    switch (createOrderStep) {
        case 'orderList':
            createOrderContent = <OrderList onAddItemClick={handleAddItemButtonClick} orderItems={orderItems} removeItemFromOrder={removeItemFromOrder}></OrderList>
            break;
        case 'addItem':
            createOrderContent = <AddItem onBackButtonClick={handleBackButtonClick} addItemToOrder={addItemToOrder} orderItems={orderItems} removeItemFromOrder={removeItemFromOrder} items={items}></AddItem>
            break;
        default:
            createOrderContent = <OrderList onAddItemClick={handleAddItemButtonClick} orderItems={orderItems} removeItemFromOrder={removeItemFromOrder}></OrderList>
            break;
    }

    return (
        <>
            {createOrderContent}
            {/* <div className="row m-0 p-0">
                <div className="col-6">
                    <Button className="float-end">Create Order</Button>
                </div>
                <div className="col-6">
                    <Button className="float-end">Create Order</Button>
                </div>
            </div> */}
        </>
    );
};

export default CreateOrder;
