import { useState, useEffect } from "react";
import PageTitle from "../../components/PageTitle";
import { API_BASE_URL } from "../../global/config";
import { fetchData } from "../../global/functions";
import { IItem, ISellOrder } from "../../global/types";
import { useAuth } from "../../context/AuthProvider";
import "./index.css";
import CicleImageIcon from "../../components/CircleImageIcon/CircleImageIcon";
import SalesChart from "../../components/SalesChart/SalesChart";
import OrdersChart from "../../components/OrdersChart/OrdersChart";

const Analytics = () => {
    const { token, logout } = useAuth();

    const [orders, setOrders] = useState<ISellOrder[]>([]);
    const [items, setItems] = useState<IItem[]>([]);

    // Calculate total sales
    const ordersTotal = () => {
        let total = 0;
        orders.forEach(order => {
            total += order.total;
        });
        return total;
    }

    // Get all orders
    const getOrders = async (): Promise<ISellOrder[]> => {
        try {
            // API request to get all orders
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

    // Get all items
    const getItems = async (): Promise<IItem[]> => {
        try {
            // API request to get all items
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
                    <div className="col-9 p-0 m-0">
                        <div className="row p-0 m-0 mb-3">
                            <div className="col p-0 m-0 px-3">
                                <div className="row m-0 p-0">
                                    <div className="statistics3Box border-0 rounded-3 ps-2">
                                        <div className="row m-0 p-0">
                                            <div className="ps-2 pt-2">
                                                <CicleImageIcon iconColor={'#59A656'} />
                                            </div>
                                            <p className="m-0 p-0 ps-2 pt-2 fw-bold" style={{ color: '#A7B3AB' }}>Total Orders</p>
                                            <p className="m-0 p-0 ps-2 fw-bolder fs-5">{orders.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col p-0 m-0 px-3">
                                <div className="row m-0 p-0">
                                    <div className="statistics3Box border-0 rounded-3 ps-2">
                                        <div className="row m-0 p-0">
                                            <div className="ps-2 pt-2">
                                                <CicleImageIcon iconColor={'#59A656'} />
                                            </div>
                                            <p className="m-0 p-0 ps-2 pt-2 fw-bold" style={{ color: '#A7B3AB' }}>Total Dine-In Orders</p>
                                            <p className="m-0 p-0 ps-2 fw-bolder fs-5">{orders.filter(order => order.type === 'dine-in').length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col p-0 m-0 px-3">
                                <div className="statistics3Box border-0 rounded-3 ps-2">
                                    <div className="row m-0 p-0">
                                        <div className="ps-2 pt-2">
                                            <CicleImageIcon iconColor={'#59A656'} />
                                        </div>
                                        <p className="m-0 p-0 ps-2 pt-2 fw-bold" style={{ color: '#A7B3AB' }}>Total Delivery Orders</p>
                                        <p className="m-0 p-0 ps-2 fw-bolder fs-5">{orders.filter(order => order.type === 'delivery').length}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col p-0 m-0 px-3">
                                <div className="statistics3Box border-0 rounded-3 ps-2">
                                    <div className="row m-0 p-0">
                                        <div className="ps-2 pt-2">
                                            <CicleImageIcon iconColor={'#59A656'} />
                                        </div>
                                        <p className="m-0 p-0 ps-2 pt-2 fw-bold" style={{ color: '#A7B3AB' }}>Total Menu Items</p>
                                        <p className="m-0 p-0 ps-2 fw-bolder fs-5">{items.filter(item => item.isMenuItem === true).length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row p-0 m-0 mb-3">
                            <div className="col p-0 m-0 px-3">
                                <div className="statistics2Box border-0 rounded-3 totalSalesBgColor">
                                    <p className="m-0 p-0 ps-2 pt-2 fw-bold" style={{ color: '#A7B3AB' }}>Total Sales</p>
                                    <p className="m-0 p-0 ps-2 fw-bolder fs-5">${ordersTotal()}</p>
                                    <SalesChart data={orders} />
                                </div>
                            </div>
                            <div className="col p-0 m-0 px-3">
                                <div className="statistics2Box border-0 rounded-3 salesTypeBgColor">
                                    Sales Type
                                </div>
                            </div>
                        </div>

                        <div className="row p-0 m-0 px-3">
                            <div className="statisticsBox border-0 rounded-3 mainGreenBgColor">
                                <p className="m-0 p-0 ps-2 pt-2 text-white fs-5">Orders Statistics</p>
                                <p className="m-0 p-0 ps-2 fw-bolder fs-5 text-white">{orders.length} orders this month</p>
                                <OrdersChart data={orders} />
                            </div>
                        </div>
                    </div>
                    <div className="col-3 p-0 m-0">
                        <div className="row p-0 m-0 mb-3">
                            <div className="statistics1Box border rounded-3">
                                <div className="row m-0 p-0">
                                    <div className="col-9 p-0">
                                        <p className="m-0 p-0 ps-2 pt-2 fw-bold">#1 food unit sold</p>
                                        <div className="ps-2">
                                            <CicleImageIcon bgColor={'#e9e9e9'} label={'Chicken Burger'} />
                                        </div>
                                    </div>
                                    <div className="col-3">

                                    </div>
                                </div>

                                <span className="m-0 p-0 ps-2 pt-2">Chicken Burger</span>
                            </div>
                        </div>
                        <div className="row p-0 m-0 mb-3">
                            <div className="statistics1Box border rounded-3">
                                #2 food unit sold

                            </div>
                        </div>
                        <div className="row p-0 m-0 mb-3">
                            <div className="statistics1Box border rounded-3">
                                #3 food unit sold

                            </div>
                        </div>
                        <div className="row p-0 m-0 mb-3">
                            <div className="statistics1Box border rounded-3">
                                Top Starter unit sold

                            </div>
                        </div>
                        <div className="row p-0 m-0 mb-3">
                            <div className="statistics1Box border rounded-3">
                                Top Main unit sold

                            </div>
                        </div>
                        <div className="row p-0 m-0 mb-3">
                            <div className="statistics1Box border rounded-3">
                                Top Drink unit sold

                            </div>
                        </div>
                        <div className="row p-0 m-0 mb-3">
                            <div className="statistics1Box border rounded-3">
                                Top Dessert unit sold

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Analytics;