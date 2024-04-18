import "./index.css";

const CompanyLogo = () => {
    return (
        <>
            <div className="CompanyInfo mt-4 w-100 mb-5">
                <div className="CompanyLogo rounded-circle mx-auto"></div>
                <p className="text-center fs-2 lh-1 grayTxt fw-bold">
                    Restaurant
                    <span className="BlueTxt">
                        <br></br>System
                    </span>
                </p>
            </div>
        </>
    );
};

export default CompanyLogo;