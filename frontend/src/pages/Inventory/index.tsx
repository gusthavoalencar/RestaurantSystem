import PageTitle from "../../components/PageTitle";
import ItemsTable from "../../components/ItemsTable";
import { useEffect, useState } from "react";
import CreateModal from "../../components/CreateModal";
import { Button } from "react-bootstrap";
import CreateItemModal from "../../components/CreateItemModal";
import { TfiPlus } from "react-icons/tfi";

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

    const [showCreateModal, setShowCreateModal] = useState(false);
    const handleCreateModalClose = () => setShowCreateModal(false);
    const handleCreateModalShow = () => setShowCreateModal(true);

    const [showCreateItemModal, setShowCreateItemModal] = useState(false);
    const handleCreateItemModalClose = () => setShowCreateItemModal(false);
    const handleCreateItemModalShow = () => setShowCreateItemModal(true);

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
                    <Button variant="link" className="mainGreenBgColor float-end pt-2 pb-2 ps-3 pe-3 text-white rounded-4 me-5 fw-light text-center pointer text-decoration-none" onClick={handleCreateModalShow}>
                        <p className="fs-5 m-0">
                            <TfiPlus className="fs-4 me-2" />
                            Create
                        </p>
                    </Button>
                </div>
            </div>
            <ItemsTable
                headers={headers}
                items={items} />
            <CreateModal
                show={showCreateModal}
                onHide={handleCreateModalClose}
                onOpenItemModal={handleCreateItemModalShow}
            />
            <CreateItemModal
                show={showCreateItemModal}
                onHide={handleCreateItemModalClose}
            />
        </>
    );
};

export default Inventory;
