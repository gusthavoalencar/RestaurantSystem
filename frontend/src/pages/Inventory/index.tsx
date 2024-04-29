import PageTitle from "../../components/PageTitle";
import ItemsTable from "../../components/ItemsTable";
import CreateOrderBtn from "../../components/CreateOrderBtn";
import { useEffect, useState } from "react";

interface IItem {
    _id: string;
    name: string;
    amount?: number;
    isMenuItem: boolean;
    itemCategories: string[];
    price?: number;
    active: boolean;
}

const Inventory = () => {
    const headers = ['ID No.', 'Name', 'Type', 'Stock Amount'];

    const fetchData = async (url: string) => {
        const response = await fetch(url);
        const json = await response.json();

        return json;
    };

    const [items, setItems] = useState<IItem[]>([]);

    const getItems = async (): Promise<IItem[]> => {
        try {
            const items = await fetchData('http://localhost:4000/api/item/getitems');

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
            console.log(items);
        };

        fetchItems();
    }, []);

    return (
        <>
            <div className="header row p-0 m-0 pt-5">
                <div className="col-6 p-0 m-0 mb-5">
                    <PageTitle text="Inventory" />
                </div>
                <div className="col-6 p-0 m-0">
                    <CreateOrderBtn text="Create Buy Order" />
                </div>
            </div>
            <ItemsTable headers={headers} items={items} />
        </>
    );
};

export default Inventory;
