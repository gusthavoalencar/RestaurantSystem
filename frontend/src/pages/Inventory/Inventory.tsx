import PageTitle from "../../components/PageTitle";
import ItemsTable from "../../components/ItemsTable";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { TfiPlus } from "react-icons/tfi";
import { API_BASE_URL } from "../../global/config";
import CreateItemModal from "../../components/CreateItemModal";
import ItemModal from "../../components/ItemModal";
import { IItem } from "../../global/types";
import { fetchData } from "../../global/functions";
import { useAuth } from "../../context/AuthProvider";

const Inventory = () => {
    const { token, logout } = useAuth();
    const headers = ['ID No.', 'Name', 'Type', 'Stock Amount'];

    const [showCreateModal, setShowCreateModal] = useState(false);
    const handleCreateModalClose = () => {
        setShowCreateModal(false);
        setSelectedItem(null);
    };
    const handleCreateModalShow = () => setShowCreateModal(true);

    const [showCreateItemModal, setShowCreateItemModal] = useState(false);
    const handleCreateItemModalClose = () => {
        setShowCreateItemModal(false);
        setSelectedItem(null);
    };
    const handleCreateItemModalShow = () => setShowCreateItemModal(true);

    const [selectedItem, setSelectedItem] = useState<IItem | null>(null);

    const handleManageItemClick = (item: IItem) => {
        setSelectedItem(item);
        handleCreateItemModalShow();
    };

    const [items, setItems] = useState<IItem[]>([]);

    const getItems = async (): Promise<IItem[]> => {
        try {
            const items = await fetchData(API_BASE_URL + 'item/getitems', token, () => logout('error'));
            setItems(items);
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
                items={items}
                handleManageItemClick={handleManageItemClick}
                type="item" />
            <CreateItemModal
                show={showCreateModal}
                onHide={handleCreateModalClose}
                onOpenItemModal={handleCreateItemModalShow}
            />
            <ItemModal
                show={showCreateItemModal}
                onHide={handleCreateItemModalClose}
                selectedItem={selectedItem}
                getItems={getItems}
            />
        </>
    );
};

export default Inventory;
