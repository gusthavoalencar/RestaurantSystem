import "./index.css";

interface TableHeadersProps {
    tableHeaders: string[];
    tabSelected: string;
}

const ItemsTableHeaders = ({ tableHeaders, tabSelected }: TableHeadersProps) => {
    return (
        <div className="row tableHeader rounded p-0 m-0 me-5 ms-2 mt-2 pt-2 pb-2">
            {tabSelected === "Menu" && (
                <div className="col-9">
                    <div className="row">
                        {tableHeaders.map((header, index) => (
                            <div key={index} className="col text-center">
                                {header}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {tabSelected === "Stock" && (
                <div className="col-6">
                    <div className="row">
                        {tableHeaders.map((header, index) => (
                            <div key={index} className="col text-center">
                                {header}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {tabSelected === "Users" && (
                <div className="col-9">
                    <div className="row">
                        {tableHeaders.map((header, index) => (
                            <div key={index} className="col text-center">
                                {header}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {tabSelected !== "Stock" && tabSelected !== "Menu" && tabSelected !== "Users" && (
                <div className="col-7">
                    <div className="row">
                        {tableHeaders.map((header, index) => (
                            <div key={index} className="col text-center">
                                {header}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="col">
                <div className="float-end pe-4">Action</div>
            </div>
        </div>
    );
};

export default ItemsTableHeaders;