import { useState, useEffect } from "react";
import "./index.css";
import NavButton from "./NavButton";
import CompanyLogo from "./CompanyLogo";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const SideNav = () => {
    const [selectedNavButton, setSelectedNavButton] = useState("");
    const { logout } = useAuth();


    useEffect(() => {
        setSelectedNavButton(getSelectedNavButtonFromPath(location.pathname));
    }, [location.pathname]);

    // Handle nav button click
    const handleNavButtonClick = (text: string) => {
        if (text === "Logout") {
            logout('success');
            return;
        }
        else {
            setSelectedNavButton(text);
        }
    };

    // Get selected nav button from path
    const getSelectedNavButtonFromPath = (pathname: string) => {
        switch (true) {
            case pathname.startsWith("/orders"):
                return "Orders";
            case pathname.startsWith("/inventory"):
                return "Inventory";
            case pathname.startsWith("/analytics"):
                return "Analytics";
            case pathname.startsWith("/management"):
                return "Management";
            case pathname.startsWith("/logout"):
                return "Logout";
            default:
                return "Orders";
        }
    };

    const navButtons = [
        { path: "/orders", text: "Orders" },
        { path: "/inventory", text: "Inventory" },
        { path: "/analytics", text: "Analytics" },
        { path: "/management", text: "Management" },
        { path: "/logout", text: "Logout" }
    ];

    // Render nav buttons
    const renderedNavButtons = navButtons.map((button) => (
        <Link to={button.path} key={button.text}>
            <NavButton
                text={button.text}
                selected={selectedNavButton === button.text}
                onClick={() => handleNavButtonClick(button.text)}
            />
        </Link>
    ));

    return (
        <>
            <div className="row m-0 p-0 col-10 container vh-100">
                <div className="m-0 p-0 vh-100">
                    <div className="mb-5 mt-5">
                        <CompanyLogo />
                    </div>

                    <div className="NavContainer mx-auto">
                        {renderedNavButtons}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideNav;