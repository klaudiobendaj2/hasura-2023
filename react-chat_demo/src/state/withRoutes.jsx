import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatLayout from "../layouts/ChatLayout";
import SignInLayout from "../layouts/SignInLayout";
import HomeLayout from "../layouts/HomeLayout";

const withRoutes = (App) => (props) => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <SignInLayout />
    },
    {
      path: "/messages",
      element: <HomeLayout />
    },
    {
      path: "chat/:id",
      element: <ChatLayout />
    }
  ]);

  return (
    <RouterProvider router={routes}>
      <App {...props}/>
    </RouterProvider>
  );
};

export default withRoutes;
