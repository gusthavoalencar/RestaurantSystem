import ItemsRows from "../ItemsRows";
import ItemsTableHeaders from "../ItemsTableHeaders";
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

    return (
        <>
            <ItemsTableHeaders tableHeaders={headers} />
            <ItemsRows items={items} />
        </>
    );
};

export default ItemsTable;