import "./index.css";

interface IItem {
    _id: string;
    name: string;
    amount?: number;
    isMenuItem: boolean;
    itemCategories: string[];
    price?: number;
    active: boolean;
}

interface OrderItemListProps {
    title: string;
    orderItems: IItem[];
}

const OrderItemList = ({ title, orderItems }: OrderItemListProps) => {

    return (
        <>
            <div className="grayBackground grayText rounded-top">
                <p className="m-0 text-center py-2">{title}</p>
            </div>
            <div className="shadow rounded-bottom orderItemListBody">
                {orderItems.map(items => (
                    <div key={items._id}>
                        {items.name}
                    </div>
                ))}
            </div>
        </>
    );
};

export default OrderItemList;