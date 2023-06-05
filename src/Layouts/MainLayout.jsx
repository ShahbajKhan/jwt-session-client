import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";

const MainLayout = () => {
  return (
    <div className="max-w-7xl mx-auto ">
      <Navbar></Navbar>
      <div className="my-10">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default MainLayout;
