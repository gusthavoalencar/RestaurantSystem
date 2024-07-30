import { useState, useEffect } from "react";
import PageTitle from "../../components/PageTitle";
import { API_BASE_URL } from "../../global/config";
import { fetchData } from "../../global/functions";
import { IItem, ISellOrder } from "../../global/types";
import { useAuth } from "../../context/AuthProvider";
import "./index.css";

const Analytics = () => {
    const { token, logout } = useAuth();

    const [orders, setOrders] = useState<ISellOrder[]>([]);
    const [items, setItems] = useState<IItem[]>([]);

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

        const fetchItems = async () => {
            await getItems();
        };

        fetchItems();
    }, []);


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

    return (
        <>
            <div className="header row p-0 m-0 pt-5">
                <div className="col-6 p-0 m-0 mb-5">
                    <PageTitle text="Analytics" />
                </div>
            </div>

            <div style={{ height: '70vh' }}>
                <div className="row m-0 p-0">
                    <div className="col-9">
                        <div className="row">
                            <div className="col statistics3Box">
                                Total Orders {orders.length}
                            </div>
                            <div className="col statistics3Box">
                                Total Dine-In Orders {orders.filter(order => order.type === 'dine-in').length}
                            </div>
                            <div className="col statistics3Box">
                                Total Delivery Orders {orders.filter(order => order.type === 'delivery').length}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col statistics2Box">
                                Total Sales
                            </div>
                            <div className="col statistics2Box">
                                Sales Type
                            </div>
                        </div>

                        <div className="row">
                            Orders this month
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="row statistics1Box">
                            #1 food unit sold
                        </div>
                        <div className="row statistics1Box">
                            #2 food unit sold
                        </div>
                        <div className="row statistics1Box">
                            #3 food unit sold
                        </div>
                        <div className="row statistics1Box">
                            Top Starter unit sold
                        </div>
                        <div className="row statistics1Box">
                            Top Main unit sold
                        </div>
                        <div className="row statistics1Box">
                            Top Drink unit sold
                        </div>
                        <div className="row statistics1Box">
                            Top Dessert unit sold
                        </div>
                        <div className="row statistics1Box">
                            Average order price
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Analytics;