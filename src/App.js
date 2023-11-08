import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientLayout from "./layouts/ClientLayout/ClientLayout";
import Home from "./module/home/Home";
import RoomList from "./module/roomlist/RoomList";
import RoomDetails from "./module/roomdetails/RoomDetails";
import SignIn from "./module/Auth/SignIn";
import UserProvider from "./context/UserContext";
import UserInfo from "./module/userinfo/UserInfo";
import ProtectedRoute from "./router/ProtectedRoute/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClientLayout />}>
            <Route index element={<Home />} />
            <Route path="roomlist/:locationId" element={<RoomList />} />
            <Route path="roomdetails/:roomId" element={<RoomDetails />} />
            <Route element={<ProtectedRoute />}>
              <Route path="profile/:userId" element={<UserInfo />} />
            </Route>

            <Route path="sign-in" element={<SignIn />} />
          </Route>

          <Route path="*" element={<div>NOT FOUND</div>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </UserProvider>
  );
}

export default App;
