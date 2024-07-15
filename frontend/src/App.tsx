import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SideNav from "./components/SideNav";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./context/AuthProvider";
import Login from "./pages/Login/Login";
import Forgotpassword from "./pages/Forgotpassword/Forgotpassword";
import Resetpassword from "./pages/Resetpassword/Resetpassword";
import Analytics from "./pages/Analytics";
import Inventory from "./pages/Inventory";
import Management from "./pages/Management";
import Orders from "./pages/Orders";
import CreateOrder from "./pages/Orders/CreateOrder/CreateOrder";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<AuthenticatedApp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<Forgotpassword />} />
            <Route path="/resetpassword" element={<Resetpassword />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

function AuthenticatedApp() {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="App font">
      <div className="row sideMenu p-0 m-0">
        <div className="col-2 p-0 m-0">
          <SideNav />
        </div>
        <div className="col-10 p-0 m-0">
          <div className="vh-100 m-0 p-0">
            <Routes>
              <Route path="/" element={<Navigate to="/orders" replace />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/management" element={<Management />} />
              <Route path="/orders/createorder" element={<CreateOrder />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
