import "./index.css";
import { RiFileList3Line } from 'react-icons/ri';
import { TfiDropbox } from 'react-icons/tfi';
import { BsGraphUpArrow } from 'react-icons/bs';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { RiLogoutCircleLine } from 'react-icons/ri';

interface NavButtonProps {
    text: string;
    selected: boolean;
    onClick: () => void;
}

const NavButton = ({ text, selected, onClick }: NavButtonProps) => {

    const renderIcon = () => {
        switch (text) {
            case 'Orders':
                return <RiFileList3Line className={`navBtnIcon ${selected ? "greenIcon" : ""}`} />;
            case 'Inventory':
                return <TfiDropbox className={`navBtnIcon ${selected ? "greenIcon" : ""}`} />;
            case 'Analytics':
                return <BsGraphUpArrow className={`navBtnIcon ${selected ? "greenIcon" : ""}`} />;
            case 'Management':
                return <MdOutlineManageAccounts className={`navBtnIcon ${selected ? "greenIcon" : ""}`} />;
            case 'Logout':
                return <RiLogoutCircleLine className={`navBtnIcon ${selected ? "greenIcon" : ""}`} />;

            default:
                return null;
        }
    }

    return (
        <>
            <div
                className={`NavBtn w-100 rounded d-flex align-items-center justify-content-center mb-3 pointer ${selected ? "navBtnSelected" : ""
                    }`}
                onClick={onClick}
            >
                {renderIcon()}
                <p className="NavText fs-5 text-center lh-1 pt-3">{text}</p>
            </div>
        </>
    );
};

export default NavButton;