import "./index.css";

const CompanyLogo = () => {
    return (
        <>
            <div className="CompanyInfo w-100 text-center user-select-none">
                <img src={process.env.PUBLIC_URL + '/leafLogo.svg'} alt="Company Logo" className="CompanyLogo rounded-circle mx-auto" />
                <p className="text-center fs-2 lh-1 text-white fw-bold pt-2">
                    Leafy.
                </p>
            </div>
        </>
    );
};

export default CompanyLogo;