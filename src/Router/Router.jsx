
import { createBrowserRouter } from "react-router";
import HomeLayout from "../LayOut/HomeLayout";
import Home from "../Component/Home/Home";
import Authlayout from "../LayOut/Authlayout";
import Login from "../Component/Auth/Login";
import Register from "../Component/Auth/Register";
import ForgotPass from "../Component/Auth/ForgotPass";
import PageNotFound from "../Component/Auth/PageNotFound/PageNotFound";
import Upgrade from "../Component/Upgrade/Upgrade";
import PrivateRoute from "../Component/PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
        {
            index: true,
            path: '/',
            element:<Home></Home>
        },
        {
          path: '/upgrade',
          element:<PrivateRoute>
            <Upgrade></Upgrade>
          </PrivateRoute>
        }
    ]
  },
  {
    path:'auth',
    element:<Authlayout></Authlayout>,
    children: [
        {
            path:'login',
            element:<Login></Login>
        },
        {
            path:'register',
            element:<Register></Register>
        },
        {
          path:'forgotpassword',
          element: <ForgotPass></ForgotPass>
        }
    ]
  },
  {
    path:'*',
    Component: PageNotFound
  }
]);


export default router;