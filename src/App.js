import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientLayout from "./layouts/ClientLayout/ClientLayout";
import Home from "./module/home/Home";
import RoomList from "./module/roomlist/RoomList";
import RoomDetails from "./module/roomdetails/RoomDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="roomlist/:locationId" element={<RoomList />} />
          <Route path="roomdetails/:roomId" element={<RoomDetails />} />
        </Route>

        <Route path="*" element={<div>NOT FOUND</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
