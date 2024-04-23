import PageTitle from "../../components/PageTitle";
import ItemsTable from "../../components/ItemsTable";
import CreateOrderBtn from "../../components/CreateOrderBtn";

const Inventory = () => {
    return (
        <>
            <div className="header row p-0 m-0 pt-5">
                <div className="col-6 p-0 m-0 mb-5">
                    <PageTitle text="Inventory" />
                </div>
                <div className="col-6 p-0 m-0">
                    <CreateOrderBtn text="Create Buy Order" />
                </div>
            </div>

            <ItemsTable />
        </>
    );
};

export default Inventory;