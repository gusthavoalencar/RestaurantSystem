import { useState } from "react";
import OrderList from "../../../components/OrderPage/OrderList";
import AddItem from "../../../components/OrderPage/AddItem/AddItem";

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

    const handleAddItemButtonClick = () => {
        setcreateOrderStep("addItem");
    };
    const handleBackButtonClick = () => {
        setcreateOrderStep("orderList");
    };

    const addItemToOrder = (item: IItem) => {
        setOrderItems([...orderItems, item]);
    };

    let createOrderContent;
    switch (createOrderStep) {
        case 'orderList':
            createOrderContent = <OrderList onAddItemClick={handleAddItemButtonClick} orderItems={orderItems}></OrderList>
            break;
        case 'addItem':
            createOrderContent = <AddItem onBackButtonClick={handleBackButtonClick} addItemToOrder={addItemToOrder} orderItems={orderItems}></AddItem>
            break;
        default:
            createOrderContent = <OrderList onAddItemClick={handleAddItemButtonClick} orderItems={orderItems}></OrderList>
            break;
    }

    return (
        <>
            {createOrderContent}
        </>
    );
};

export default CreateOrder;
