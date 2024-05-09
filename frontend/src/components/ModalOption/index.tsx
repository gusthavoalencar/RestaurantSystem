import "./index.css";
import { FaCartPlus } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";

interface ModalOptionProps {
    text: string;
}

const ModalOption = ({ text }: ModalOptionProps) => {
    let icon = null;

    if (text === "Buy Order") {
        icon = <FaCartPlus className="buttonImage" />;
    } else if (text === "Stock Item") {
        icon = <BiSolidFoodMenu className="buttonImage" />;
    }
    return (
        <>
            <div className='buttonBody pointer'>
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