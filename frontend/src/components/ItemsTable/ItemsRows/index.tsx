import React from "react";
import { IItem, ISellOrder, IUser } from "../../../global/types";
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from "react-router-dom";

interface ItemsRowsProps {
    items?: IItem[];
    orders?: ISellOrder[];
    users?: IUser[];
    handleManageItemClick?: ((item: IItem) => void) | undefined;
    handleManageOrderClick?: ((order: ISellOrder) => void) | undefined;
    handleManageUserClick?: ((item: IUser) => void) | undefined;
    type: string;
    tabSelected: string;
}

// Item row
const ItemRow = ({ tabSelected, item, handleManageItemClick }: { item: IItem; handleManageItemClick?: (item: IItem) => void, tabSelected: string }) => (
    <div className="row rounded p-0 m-0 me-5 ms-2 mt-1 pt-1 pb-1 align-items-center tableRow align-middle">
        {tabSelected === "Menu" && (
            <div className="col-9">
                <div className="row">
                    <div className="col text-center">{item._id}</div>
                    <div className="col text-center">{item.name}</div>
                    <div className="col text-center">{item.menuCategory}</div>
                    <div className="col text-center">{item.menuSections.join(', ')}</div>
                    <div className="col text-center">${item.price}</div>
                    <div className="col text-center">{item.amount}</div>
                </div>
            </div>
        )}

        {tabSelected === "Stock" && (
            <div className="col-6">
                <div className="row">
                    <div className="col text-center">{item._id}</div>
                    <div className="col text-center">{item.name}</div>
                    <div className="col text-center">{item.amount}</div>
                </div>
            </div>
        )}
        <div className="col d-flex justify-content-end">
            <div className="pe-2">
                <div className="border border-1 rounded border-dark p-1 shadow pointer" onClick={() => handleManageItemClick?.(item)}>
                    Manage
                </div>
            </div>
        </div>
    </div>
);

// Order row
const OrderRow = ({ order, handleManageOrderClick }: { order: ISellOrder; handleManageOrderClick?: (order: ISellOrder) => void }) => {
    const timeAgo = formatDistanceToNow(new Date(order.createdAt), { addSuffix: true });
    const navigate = useNavigate();

    return (
        <div className="row rounded p-0 m-0 me-5 ms-2 mt-1 pt-1 pb-1 align-items-center tableRow align-middle">
            <div className="col-7">
                <div className="row">
                    <div className="col text-center">{order._id}</div>
                    <div className="col text-center">{order.type}</div>
                    <div className="col text-center">{order.tableNumber}</div>
                    <div className="col text-center">{timeAgo}</div>
                    <div className="col text-center">${order.total}</div>
                </div>
            </div>
            <div className="col d-flex justify-content-end">
                <div className="pe-2">
                    <div
                        className="border border-1 rounded border-dark p-1 shadow pointer"
                        onClick={() => {
                            handleManageOrderClick?.(order);
                            navigate(`/orders/sellorder?ordertype=${order.type}&id=${order._id}`);
                        }}
                    >
                        Manage
                    </div>
                </div>
            </div>
        </div >
    );
};

// User row
const UserRow = ({ user, handleManageUserClick }: { user: IUser; handleManageUserClick?: (user: IUser) => void }) => {

    return (
        <div className="row rounded p-0 m-0 me-5 ms-2 mt-1 pt-1 pb-1 align-items-center tableRow align-middle">
            <div className="col-9">
                <div className="row">
                    <div className="col text-center">{user._id}</div>
                    <div className="col text-center">{user.name} {user.surname}</div>
                    <div className="col text-center">{user.email}</div>
                    <div className="col text-center">{user.role}</div>
                    <div className="col text-center">{user.status}</div>
                </div>
            </div>
            <div className="col d-flex justify-content-end">
                <div className="pe-2">
                    <div
                        className="border border-1 rounded border-dark p-1 shadow pointer"
                        onClick={() => {
                            handleManageUserClick?.(user);
                        }}
                    >
                        Manage
                    </div>
                </div>
            </div>
        </div >
    )
};

const ItemsRows = ({ tabSelected, items = [], orders = [], users = [], handleManageItemClick, handleManageOrderClick, handleManageUserClick, type }: ItemsRowsProps) => {

    return (
        <div className="ms-2 me-2">
            <div className="tableScrollbar overflow-auto">
                <div className="tableScrollbar overflow-auto">
                    {type === "item" && items.map(item => <ItemRow key={item._id} item={item} handleManageItemClick={handleManageItemClick} tabSelected={tabSelected} />)}
                    {type === "order" && orders.map(order => <OrderRow key={order._id} order={order} handleManageOrderClick={handleManageOrderClick} />)}
                    {type === "users" && users.map(user => <UserRow key={user._id} user={user} handleManageUserClick={handleManageUserClick} />)}
                </div>
            </div>
        </div>
    );
};

export default ItemsRows;