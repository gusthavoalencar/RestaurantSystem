import { useCallback, useEffect, useState } from "react";
import ItemsRows from "./ItemsRows";
import ItemsTableHeaders from "./ItemsTableHeaders";
import TableTabs from "./TableTabs";
import "./index.css";
import { IItem, ISellOrder } from "../../global/types";

interface ItemsTableProps {
    headers: string[];
    items?: IItem[];
    orders?: ISellOrder[];
    handleManageItemClick?: (item: IItem) => void;
    handleManageOrderClick?: (item: ISellOrder) => void;
    type: string;
}

const ItemsTable = ({ headers, items = [], handleManageOrderClick, handleManageItemClick, orders = [], type }: ItemsTableProps) => {
    const menuHeaders = ['ID No.', 'Name', 'Category', 'Types', 'Price', 'Stock Amount'];
    const stockHeaders = ['ID No.', 'Name', 'Stock Amount'];
    const [menuItems, setMenuItems] = useState<IItem[]>([]);
    const [stockItems, setStockItems] = useState<IItem[]>([]);
    const [activeOrders, setActiveOrders] = useState<ISellOrder[]>([]);
    const [completeOrders, setCompleteOrders] = useState<ISellOrder[]>([]);
    const [tabSelected, setTabSelected] = useState(type == "item" ? "Menu" : "Active");

    const handleTableTypeSelected = (type: string) => {
        setTabSelected(type);
    };


    const filterItems = useCallback(() => {
        const tempMenuItems = items.filter(item => item.isMenuItem);
        setMenuItems(tempMenuItems);

        const tempStockItems = items.filter(item => !item.isMenuItem);
        setStockItems(tempStockItems);

        const tempActiveOrders = orders.filter(order => order.status === "pending");
        setActiveOrders(tempActiveOrders);

        const tempCompleteOrders = orders.filter(order => order.status === "complete");
        setCompleteOrders(tempCompleteOrders);
    }, [items, orders]);

    useEffect(() => {
        filterItems();
    }, [items, orders]);

    const renderItemsRows = () => {
        switch (tabSelected) {
            case "Menu":
                return <ItemsRows items={menuItems} handleManageItemClick={handleManageItemClick} type="item" tabSelected={tabSelected} />;
            case "Stock":
                return <ItemsRows items={stockItems} handleManageItemClick={handleManageItemClick} type="item" tabSelected={tabSelected} />;
            case "Active":
                return <ItemsRows orders={activeOrders} handleManageOrderClick={handleManageOrderClick} type="order" tabSelected={tabSelected} />;
            case "Completed":
                return <ItemsRows orders={completeOrders} handleManageOrderClick={handleManageOrderClick} type="order" tabSelected={tabSelected} />;
            default:
                return null;
        }
    };

    let tableHeaders;

    if (tabSelected === "Menu") {
        tableHeaders = menuHeaders;
    } else if (tabSelected === "Stock") {
        tableHeaders = stockHeaders;
    } else {
        tableHeaders = headers;
    }

    return (
        <>
            <div className="row p-0 m-0">
                {type == "item" && (
                    <>
                        <div onClick={() => handleTableTypeSelected("Menu")} className="col-1 d-flex ps-2">
                            <div className={tabSelected === "Menu" ? "pointer greenTableTabBorder border-2 me-2" : "pointer me-2"}>
                                <TableTabs title="Menu" />
                            </div>
                        </div>
                        <div className="col-1 d-flex ps-2" onClick={() => handleTableTypeSelected("Stock")}>
                            <div className={tabSelected === "Stock" ? "pointer greenTableTabBorder border-2 me-2" : "pointer me-2"}>
                                <TableTabs title="Stock" />
                            </div>
                        </div>
                    </>
                )}

                {type == "order" && (
                    <>
                        <div onClick={() => handleTableTypeSelected("Active")} className="col-1 d-flex ps-2">
                            <div className={tabSelected === "Active" ? "pointer greenTableTabBorder border-2 me-2" : "pointer me-2"}>
                                <TableTabs title="Active" />
                            </div>
                        </div>
                        <div className="col-1 d-flex ps-2" onClick={() => handleTableTypeSelected("Completed")}>
                            <div className={tabSelected === "Completed" ? "pointer greenTableTabBorder border-2 me-2" : "pointer me-2"}>
                                <TableTabs title="Completed" />
                            </div>
                        </div>
                    </>
                )}
            </div>
            <ItemsTableHeaders tableHeaders={tableHeaders} tabSelected={tabSelected} />
            {renderItemsRows()}
        </>
    );
};

export default ItemsTable;