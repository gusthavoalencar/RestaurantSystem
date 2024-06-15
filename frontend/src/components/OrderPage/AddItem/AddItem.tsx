import { Button } from "react-bootstrap";
import PageTitle from "../../PageTitle";
import "./AddItem.css";
import { FaChevronLeft } from "react-icons/fa6";
import ItemContainer from "../ItemContainer/ItemContainer";
import { RiDeleteBin5Line } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';


interface AddItemProps {
    children?: React.ReactNode;
    onBackButtonClick: React.MouseEventHandler<HTMLButtonElement>;
    addItemToOrder: (item: IItem) => void;
    sellOrder: ISellOrder;
    removeItemFromOrder: (orderItem: ISellOrderItem) => void;
    items: IItem[];
}

interface ISellOrderItem {
    id: string;
    name: string;
    menuCategory: string;
    quantity: number;
    isMultiOptions: boolean;
    selectedOption?: string;
    price: number;
}

interface IItem {
    _id: string;
    name: string;
    amount?: number;
    menuCategory: string;
    isMultiOptions: boolean;
    options: string[];
    isMenuItem: boolean;
    menuSections: string[];
    price?: number;
    active: boolean;
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

const AddItem = ({ onBackButtonClick, addItemToOrder, removeItemFromOrder, sellOrder, items }: AddItemProps) => {


    return (
        <>
            <div className="row p-0 m-0 pt-5">
                <div className="col-6 p-0 m-0 mb-3">
                    <PageTitle text="Add Items" />
                </div>
                <div className="col-6 p-0 m-0">
                    <Button
                        variant="link"
                        className="mainGreenBgColor float-end pt-2 pb-2 ps-3 pe-3 text-white rounded-4 me-5 fw-light text-center pointer text-decoration-none"
                        onClick={onBackButtonClick}
                    >
                        <p className="fs-5 m-0">
                            <FaChevronLeft className="fs-4 me-2" />
                            Back
                        </p>
                    </Button>
                </div>
            </div>

            <div className="row p-0 m-0">
                <div className="col-2 p-0 m-0">
                    <div className="grayBackground grayText rounded-top">
                        <p className="m-0 text-center py-2">New Items</p>
                    </div>
                    <div className="shadow rounded-bottom addItemItemListBody">
                        {sellOrder.items.map((orderItem) => (
                            <div className="ps-3 py-2 border-bottom" key={orderItem.id}>
                                <span>{orderItem.name}</span>
                                <span className="quantityValue text-secondary">{`${orderItem.quantity > 1 ? '   x' + orderItem.quantity : ''}`}</span>
                                <span className="float-end pe-2 pointer text-danger"><RiDeleteBin5Line onClick={() => removeItemFromOrder(orderItem)} /></span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-10">
                    <div className="row m-0">
                        {items.map(dbItem => (
                            <div className="col-3 my-3" key={`${dbItem._id}_${uuidv4()}`} onClick={() => addItemToOrder(dbItem)}>
                                <ItemContainer item={dbItem} />
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </>
    );
};

export default AddItem;