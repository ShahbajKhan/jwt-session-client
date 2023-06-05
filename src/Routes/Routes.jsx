import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Authentication from "../pages/Authentication/Authentication";
import Home from "../pages/Home/Home";
import MyCart from "../pages/MyCart/MyCart";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import Orders from "../pages/Dashboard/Orders/Orders";
import Users from "../pages/Dashboard/Orders/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch(`http://localhost:5000/all-technologies`),
      },
      {
        path: "authentication",
        element: <Authentication></Authentication>,
      },
      {
        path: "my-cart",
        element: (
          <PrivateRoute>
            <MyCart />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <h1>This is dashboard</h1>,
      },
      {
        path: "all-orders",
        element: <Orders></Orders>,
      },
      {
        path: "all-users",
        element: <Users></Users>,
      },
    ],
  },
]);
export default router;
