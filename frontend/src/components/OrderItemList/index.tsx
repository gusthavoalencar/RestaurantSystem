import "./index.css";

interface OrderItemListProps {
    title: string;
}

const OrderItemList = ({ title }: OrderItemListProps) => {

    return (
        <>
            <div className="grayBackground grayText rounded-top">
                <p className="m-0 text-center py-2">{title}</p>
            </div>
            <div className="shadow rounded orderItemListBody">
                test
            </div>
        </>
    );
};

export default OrderItemList;