import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatContainer from "../containers/ChatContainer";
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
      element: <ChatContainer />
    }
  ]);

  return (
    <RouterProvider router={routes}>
      <App {...props} />
    </RouterProvider>
  );
};

export default withRoutes;
