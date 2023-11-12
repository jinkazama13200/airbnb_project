import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientLayout from "./layouts/ClientLayout/ClientLayout";
import Home from "./module/home/Home";
import RoomList from "./module/roomlist/RoomList";
import RoomDetails from "./module/roomdetails/RoomDetails";
import SignIn from "./module/Auth/SignIn";
import UserProvider from "./context/UserContext";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import UserManager from "./module/AdminManager/UserManager";
import RoomManager from "./module/AdminManager/RoomManager";
import AdminProtectedRouter from "./routers/AdminProtectedRouter/AdminProtectedRouter";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClientLayout />}>
            <Route index element={<Home />} />
            <Route path="roomlist/:locationId" element={<RoomList />} />
            <Route path="roomdetails/:roomId" element={<RoomDetails />} />

            <Route path="sign-in" element={<SignIn />} />
          </Route>

          <Route element={<AdminProtectedRouter/>}>
          <Route path="/manager" element={<AdminLayout />}>
            <Route path="user-manager" element={<UserManager />} />
            <Route path="room-manager" element={<RoomManager />} />
          </Route>

          </Route>
          <Route path="*" element={<div>NOT FOUND</div>} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
