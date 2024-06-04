import "./index.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';

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

interface OrderItemListProps {
    title: string;
    orderItems: IItem[];
    removeItemFromOrder: (item: IItem) => void;
}

const OrderItemList = ({ title, orderItems, removeItemFromOrder }: OrderItemListProps) => {

    let items: IItem[] = [];

    switch (title) {
        case 'Starters':
            items = orderItems.filter(item => item.menuCategory === 'Starters');
            break;
        case 'Mains':
            items = orderItems.filter(item => item.menuCategory === 'Mains');
            break;
        case 'Desserts':
            items = orderItems.filter(item => item.menuCategory === 'Desserts');
            break;
        case 'Drinks':
            items = orderItems.filter(item => item.menuCategory === 'Drinks');
            break;
        default:
            items = orderItems;
            break;
    }

    return (
        <>
            <div className="grayBackground grayText rounded-top">
                <p className="m-0 text-center py-2">{title}</p>
            </div>
            <div className="shadow rounded-bottom orderItemListBody">
                {items.map(item => (
                    <div className="ps-3 py-2 border-bottom" key={`${item._id}_${uuidv4()}`}>
                        <span>{item.name}</span>
                        <span className="float-end pe-2 pointer text-danger"><RiDeleteBin5Line onClick={() => removeItemFromOrder(item)} /></span>
                    </div>
                ))}
            </div>
        </>
    );
};

export default OrderItemList;