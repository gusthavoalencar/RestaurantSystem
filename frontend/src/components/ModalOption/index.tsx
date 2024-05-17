import "./index.css";
import { FaCartPlus } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { MdDeliveryDining, MdDinnerDining } from "react-icons/md";

interface ModalOptionProps {
    text: string;
    onClick: () => void;
}

const ModalOption = ({ text, onClick }: ModalOptionProps) => {
    const navigate = useNavigate();
    let icon = null;

    const handleClick = () => {
        switch (text) {
            case "Buy Order":
                navigate("/buy-order");
                break;
            case "Stock Item":
                onClick();
                break;
            default:
                console.error("Error: Routh path not found")
        }
    };

    switch (text) {
        case "Buy Order":
            icon = <FaCartPlus className="buttonImage" />;
            break;
        case "Stock Item":
            icon = <BiSolidFoodMenu className="buttonImage" />;
            break;
        case "Delivery":
            icon = <MdDeliveryDining className="buttonImage" />;
            break;
        case "Dine In":
            icon = <MdDinnerDining className="buttonImage" />;
            break;
        default:
            icon = <div>No icon found</div>;
    }

    return (
        <div className='buttonBody pointer' onClick={handleClick}>
            <div className='pt-4 fs-5 text-center'>
                {text}
            </div>
            <div className='text-center'>
                {icon}
            </div>
        </div>
    );
};

export default ModalOption;