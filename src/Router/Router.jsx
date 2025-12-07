
import { createBrowserRouter } from "react-router";
import HomeLayout from "../LayOut/HomeLayout";
import Home from "../Component/Home/Home";
import Authlayout from "../LayOut/Authlayout";
import Login from "../Component/Auth/Login";
import Register from "../Component/Auth/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
        {
            index: true,
            path: '/',
            element:<Home></Home>
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
        }
    ]
  }
]);


export default router;