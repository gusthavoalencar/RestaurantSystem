interface PageTitleProps {
    text: string;
}

const PageTitle = ({ text }: PageTitleProps) => {
    return (
        <>
            <h1 className="fw-bold">{text}</h1>
        </>
    );
};

export default PageTitle;