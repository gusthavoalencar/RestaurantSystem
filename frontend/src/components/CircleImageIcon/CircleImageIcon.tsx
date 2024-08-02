import { MdFactCheck } from "react-icons/md";
import "./index.css";

interface CicleImageIconProps {
    bgColor?: string;
    iconColor?: string;
    label?: string;
}

const CicleImageIcon = ({ bgColor, iconColor, label }: CicleImageIconProps) => {
    return (
        <>
            <div className="user-select-none CicleImageIcon rounded-circle" style={bgColor ? { backgroundColor: bgColor } : {}}>
                <MdFactCheck className="mx-auto my-auto iconSize" style={iconColor ? { color: iconColor } : {}} />
                {label !== '' || label !== undefined && (
                    <span className="m-0 p-0 ps-2 pt-2">{label}</span>
                )}
            </div>
        </>
    );
};

export default CicleImageIcon;