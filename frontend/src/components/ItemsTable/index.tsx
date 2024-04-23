import ItemsTableHeaders from "../ItemsTableHeaders";
import "./index.css";

const ItemsTable = () => {
    const headers = ['ID No.', 'Name', 'Type', 'Stock Amount'];

    return (
        <>
            <ItemsTableHeaders tableHeaders={headers} />
        </>
    );
};

export default ItemsTable;