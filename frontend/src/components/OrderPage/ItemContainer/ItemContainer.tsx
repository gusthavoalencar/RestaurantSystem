interface ItemContainerProps {
    item: IItem;
}

interface IItem {
    _id: string;
    name: string;
    amount?: number;
    isMenuItem: boolean;
    menuCategory: string;
    menuSections: string[];
    price?: number;
    active: boolean;
}

const ItemContainer = ({ item }: ItemContainerProps) => {

    return (
        <div className="mx-auto border rounded shadow pointer py-4 text-center">
            <div><strong>Name:</strong> {item.name}</div>
            {item.price !== undefined && <div><strong>Price:</strong> ${item.price.toFixed(2)}</div>}
        </div>
    );
};

export default ItemContainer;