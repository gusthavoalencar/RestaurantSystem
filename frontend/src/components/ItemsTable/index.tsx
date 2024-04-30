import { useEffect, useState } from "react";
import ItemsRows from "./ItemsRows";
import ItemsTableHeaders from "./ItemsTableHeaders";
import TableTabs from "./TableTabs";
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

interface ItemsTableProps {
    headers: string[];
    items: IItem[];
}

const ItemsTable = ({ headers, items }: ItemsTableProps) => {

    const [menuTitems, setMenuItems] = useState<IItem[]>([]);
    const [stockTitems, setStockItems] = useState<IItem[]>([]);
    const [tabSelected, setTabSelected] = useState("Menu");

    const handleTableTypeSelected = (type: string) => {
        setTabSelected(type);
    };


    const filterItems = () => {
        const tempMenuItems = items.filter((item) => {
            item.isMenuItem == true
        });
        console.log("tempMenuItems: " + tempMenuItems)
        setMenuItems(tempMenuItems);

        const tempStockItems = items.filter((item) => {
            item.isMenuItem == false
        });
        console.log("tempStockItems: " + tempMenuItems)

        setStockItems(tempStockItems);
    };

    useEffect(() => {
        filterItems();
    }, []);

    return (
        <>
            <div className="row p-0 m-0">
                <div className="col-1 d-flex ps-2" onClick={() => handleTableTypeSelected("Menu")}>
                    <div className="pointer me-2">
                        <TableTabs title="Menu" />
                    </div>
                </div>
                <div className="col-1 d-flex ps-2" onClick={() => handleTableTypeSelected("Stock")}>
                    <div className="pointer me-2">
                        <TableTabs title="Stock" />
                    </div>
                </div>
            </div>
            <ItemsTableHeaders tableHeaders={headers} />
            {tabSelected == "Menu" ? (<ItemsRows items={menuTitems} />) : tabSelected == "Stock" ? (<ItemsRows items={stockTitems} />) : null}
        </>
    );
};

export default ItemsTable;