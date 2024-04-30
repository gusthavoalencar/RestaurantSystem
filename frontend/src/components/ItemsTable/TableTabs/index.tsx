import "./index.css";

interface TableTabsProps {
    title: string;
}

const TableTabs = ({ title }: TableTabsProps) => {
    return (
        <div>
            <div className="d-flex pointer">
                <div className="d-inline-flex fs-5 me-2">{title}</div>
            </div>
        </div>
    );
};

export default TableTabs;