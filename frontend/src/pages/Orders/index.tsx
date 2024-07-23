import { Button } from "react-bootstrap";
import { TfiPlus } from "react-icons/tfi";
import PageTitle from "../../components/PageTitle";
import CreateOrderModal from "../../components/CreateOrderModal";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../global/config";
import ItemsTable from "../../components/ItemsTable";
import { ISellOrder } from "../../global/types";
import { fetchData } from "../../global/functions";
import { useAuth } from "../../context/AuthProvider";

const Orders = () => {
    const { token, logout } = useAuth();
    const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);
    const handleCreateOrderModalClose = () => setShowCreateOrderModal(false);
    const handleCreateOrderModalShow = () => setShowCreateOrderModal(true);
    const headers = ['ID No.', 'Type', 'Table No.', 'Created At', 'Total'];
    const [selectedItem, setSelectedOrder] = useState<ISellOrder | null>(null);

    const [orders, setOrders] = useState<ISellOrder[]>([]);

    const getOrders = async (): Promise<ISellOrder[]> => {
        try {
            const items = await fetchData(API_BASE_URL + 'sellorder/getsellorders', token, () => logout('error'));

            return items;
        } catch (error) {
            console.error("Error fetching items:", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchOrders = async () => {
            const orders = await getOrders();
            setOrders(orders);
        };

        fetchOrders();
    }, []);


    const handleManageOrderClick = (order: ISellOrder) => {
        setSelectedOrder(order);
    };

    return (
        <>
            <div className="header row p-0 m-0 pt-5">
                <div className="col-6 p-0 m-0 mb-5">
                    <PageTitle text="Orders" />
                </div>
                <div className="col-6 p-0 m-0">
                    <Button variant="link" className="mainGreenBgColor float-end pt-2 pb-2 ps-3 pe-3 text-white rounded-4 me-5 fw-light text-center pointer text-decoration-none" onClick={handleCreateOrderModalShow}>
                        <p className="fs-5 m-0">
                            <TfiPlus className="fs-4 me-2" />
                            Create Order
                        </p>
                    </Button>
                </div>
            </div>
            <ItemsTable
                headers={headers}
                orders={orders}
                handleManageOrderClick={handleManageOrderClick}
                type="order" />
            <CreateOrderModal
                show={showCreateOrderModal}
                onHide={handleCreateOrderModalClose}
            />
        </>
    );
};

export default Orders;