import "./index.css";
import { RiDeleteBin5Line } from "react-icons/ri";

interface ISellOrderItem {
    id: string;
    name: string;
    menuCategory: string;
    quantity: number;
    isMultiOptions: boolean;
    selectedOption?: string;
    price: number;
}

interface OrderItemListProps {
    title: string;
    sellOrder: ISellOrder;
    removeItemFromOrder: (item: ISellOrderItem) => void;
}

interface ISellOrder {
    items: ISellOrderItem[];
    comment?: string;
    status: string;
    type: "delivery" | "dine-in";
    tableNumber?: number;
    address?: string;
    city?: string;
    region?: string;
    country?: string;
}

const OrderItemList = ({ title, sellOrder, removeItemFromOrder }: OrderItemListProps) => {

    let items: ISellOrderItem[] = [];

    switch (title) {
        case 'Starters':
            items = sellOrder.items.filter(item => item.menuCategory === 'Starters');
            break;
        case 'Mains':
            items = sellOrder.items.filter(item => item.menuCategory === 'Mains');
            break;
        case 'Desserts':
            items = sellOrder.items.filter(item => item.menuCategory === 'Desserts');
            break;
        case 'Drinks':
            items = sellOrder.items.filter(item => item.menuCategory === 'Drinks');
            break;
        default:
            items = sellOrder.items;
            break;
    }

    return (
        <>
            <div className="grayBackground grayText rounded-top">
                <p className="m-0 text-center py-2">{title}</p>
            </div>
            <div className="shadow rounded-bottom orderItemListBody">
                {items.map(item => (
                    <div className="ps-3 py-2 border-bottom" key={item.id}>
                        <span>{item.name}</span>
                        <span className="quantityValue text-secondary">{`${item.quantity > 1 ? '   x' + item.quantity : ''}`}</span>
                        <span className="float-end pe-2 pointer text-danger"><RiDeleteBin5Line onClick={() => removeItemFromOrder(item)} /></span>
                    </div>
                ))}
            </div>
        </>
    );
};

export default OrderItemList;