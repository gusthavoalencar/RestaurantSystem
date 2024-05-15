import "./index.css";
import { FaCartPlus } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface ModalOptionProps {
    text: string;
    onClick: () => void;
}

const ModalOption = ({ text, onClick }: ModalOptionProps) => {
    const navigate = useNavigate();
    let icon = null;

    const changeRoute = () => {
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
        default:
            icon = <div>No icon found</div>;
    }

    return (
        <>
            <div className='buttonBody pointer' onClick={changeRoute}>
                <div className='pt-4 fs-5 text-center'>
                    {text}
                </div>
                <div className='text-center'>
                    {icon}
                </div>
            </div>
        </>
    );
};

export default ModalOption;