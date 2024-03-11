import { useAuthContext } from "@/context/AuthContext"
import { HomePage, LoginPage } from "@/pages"
import { RouterProvider, createBrowserRouter } from "react-router-dom"



const RouteNavigate = () => {
  const { authUser } = useAuthContext();
  const router = createBrowserRouter([
    {
      path: "/",
      element: authUser ? <HomePage /> : <LoginPage />,
    },
    {
      path: "/login",
      element: authUser ? <HomePage /> : <LoginPage />, //sẽ hiển thị HomePage nếu authUser tồn tại (tức là người dùng đã đăng nhập) và LoginPage nếu authUser không tồn tại (tức là người dùng chưa đăng nhập)
    },
  ]);
  return <RouterProvider router={router} />;
};

export default RouteNavigate
