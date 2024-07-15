import { useState, useEffect } from "react";
import "./index.css";
import NavButton from "./NavButton";
import CompanyLogo from "./CompanyLogo";
import { Link, useLocation } from "react-router-dom";

const SideNav = () => {
    const [selectedNavButton, setSelectedNavButton] = useState("");
    const location = useLocation();

    useEffect(() => {
        setSelectedNavButton(getSelectedNavButtonFromPath(location.pathname));
    }, [location.pathname]);

    const handleNavButtonClick = (text: string) => {
        setSelectedNavButton(text);
    };

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
                    <div className="mb-5 mt-4">
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