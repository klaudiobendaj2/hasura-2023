import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatLayout from "../layouts/ChatLayout";
import SignInContainer from "../containers/SignInContainer";
import HomeContainer from "../containers/HomeContainer";

const withRoutes = (App) => (props) => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <SignInContainer />
    },
    {
      path: "/messages",
      element: <HomeContainer />
    },
    {
      path: "chat/:id",
      element: <ChatLayout />
    }
  ]);

  return (
    <RouterProvider router={routes}>
      <App {...props} />
    </RouterProvider>
  );
};

export default withRoutes;
