import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Map from "../pages/Map";
import Leaderboard from "../pages/Leaderboard";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
    )
}

export default AppRoutes;