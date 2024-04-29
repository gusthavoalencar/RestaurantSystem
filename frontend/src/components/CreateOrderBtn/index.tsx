import { TfiPlus } from "react-icons/tfi";

interface PageTitleProps {
    text: string;
}

const CreateOrderBtn = ({ text }: PageTitleProps) => {
    return (
        <>
            <div className="mainGreenBgColor float-end pt-2 pb-2 ps-3 pe-3 text-white rounded-4 me-5 fw-light text-center pointer">
                <p className="fs-5 m-0">
                    <TfiPlus className="fs-4 me-2" />
                    {text}
                </p>
            </div>
        </>
    );
};

export default CreateOrderBtn;