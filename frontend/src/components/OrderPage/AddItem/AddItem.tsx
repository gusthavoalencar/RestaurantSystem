import { Button } from "react-bootstrap";
import PageTitle from "../../PageTitle";
import "./AddItem.css";
import { API_BASE_URL } from "../../../config/config";
import { useState, useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import ItemContainer from "../ItemContainer/ItemContainer";

interface AddItemProps {
    onBackButtonClick: React.MouseEventHandler<HTMLButtonElement>;
    addItemToOrder: (item: IItem) => void;
    orderItems: IItem[];
}

interface IItem {
    _id: string;
    name: string;
    amount?: number;
    menuCategory: string;
    isMenuItem: boolean;
    menuSections: string[];
    price?: number;
    active: boolean;
}

const AddItem = ({ onBackButtonClick, addItemToOrder, orderItems }: AddItemProps) => {
    const [items, setItems] = useState<IItem[]>([]);

    const fetchData = async (url: string) => {
        const response = await fetch(url);
        const json = await response.json();

        return json;
    };


    const getItems = async (): Promise<IItem[]> => {
        try {
            const items = await fetchData(API_BASE_URL + 'item/getitems');

            return items;
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
                        <p className="m-0 text-center py-2">Order Items</p>
                    </div>
                    <div className="shadow rounded-bottom addItemItemListBody">
                        {orderItems.map((orderItem) => (
                            <div className="row m-0" key={orderItem._id}>
                                {orderItem.name}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-10">
                    <div className="row m-0">
                        {items.map(dbItem => (
                            <div className="col-3 my-3" key={dbItem._id} onClick={() => addItemToOrder(dbItem)}>
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