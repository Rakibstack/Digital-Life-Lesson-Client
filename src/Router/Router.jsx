
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
import DashBoardLayout from "../LayOut/DashBoardLayout";
import AddLesson from "../DashboardRelatedDesign/AddLesson";
import BrowsePublicLessons from "../DashboardRelatedDesign/PublicLesson";
import Loading from "../Component/Loading/Loading";
import PaymentLayout from "../LayOut/PaymentLayout";
import PaymentSuccess from "../Component/Payment/PaymentSuccess";
import PaymentCancel from "../Component/Payment/PaymentCancel";
import LessonDetailsPage from "../Component/Home/LessonDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    hydrateFallbackElement: <Loading></Loading>,
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
        },
        {
          path: '/public',
          element: <BrowsePublicLessons></BrowsePublicLessons>
        },
        {
          path: '/lessons/:id',
          element:<PrivateRoute>
            <LessonDetailsPage></LessonDetailsPage>
          </PrivateRoute>
        }
    ]
  },
  {
    path: 'payment',
    element: <PaymentLayout></PaymentLayout>,
    children: [
      {
        path: 'success',
        element: <PaymentSuccess></PaymentSuccess>
      },
      {
        path: 'cancel',
        element: <PaymentCancel></PaymentCancel>
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
     path: 'dashboard',
     element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
     children: [
      {
        path:'addlesson',
        element: <AddLesson></AddLesson>
      }
     ]
  },
  {
    path:'*',
    Component: PageNotFound
  }
]);


export default router;