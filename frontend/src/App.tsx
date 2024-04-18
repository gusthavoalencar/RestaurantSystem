import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SideNav from "./components/SideNav";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App font">
        <div className="row sideMenu p-0 m-0">
          <div className="col-2 p-0 m-0">
            <SideNav />
          </div>
          <div className="col-10 p-0 m-0">
            <Main />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
