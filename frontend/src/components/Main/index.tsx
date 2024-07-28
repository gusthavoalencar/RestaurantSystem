import { Routes, Route, Navigate } from "react-router-dom";
import Orders from "../../pages/Orders";
import Inventory from "../../pages/Inventory/Inventory";
import Analytics from "../../pages/Analytics";
import Management from "../../pages/Management";
import CreateOrder from "../../pages/Orders/CreateOrder/CreateOrder";

const Main = () => {
    return (
        <>
            <div className="vh-100 m-0 p-0">
                <Routes>
                    <Route path="/" element={<Navigate to="/orders" replace />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/management" element={<Management />} />
                    <Route path="/orders/sellorder" element={<CreateOrder />} />
                </Routes>
            </div>
        </>
    );
};

export default Main;