import React from "react";

interface IItem {
    _id: string;
    name: string;
    amount?: number;
    isMenuItem: boolean;
    menuSections: string[];
    price?: number;
    active: boolean;
}

interface ItemsRowsProps {
    items: IItem[];
}

const ItemsRows = ({ items }: ItemsRowsProps) => {

    return (
        <div className="ms-2 me-2">
            <div className="tableScrollbar overflow-auto">
                {items.map((item, itemIndex) => (
                    <div key={itemIndex} className="row rounded p-0 m-0 me-5 ms-2 mt-1 pt-1 pb-1 align-items-center tableRow align-middle">
                        <div className="col-7">
                            <div className="row">
                                <div className="col text-center">
                                    {item._id}
                                </div>
                                <div className="col text-center">
                                    {item.name}
                                </div>
                                <div className="col text-center">
                                    <span>
                                        {item.menuSections && item.menuSections.length > 0
                                            ? item.menuSections.join(', ')
                                            : null}
                                    </span>
                                </div>
                                <div className="col text-center">
                                    {item.amount}
                                </div>
                            </div>
                        </div>
                        <div className="col d-flex justify-content-end">
                            <div className="pe-2">
                                <div className="border border-1 rounded border-dark p-1 shadow pointer">Manage</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemsRows;