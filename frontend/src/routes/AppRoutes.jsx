import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login"; 
import Home from "../pages/Home";
import Map from "../pages/Map";
import Challange from "../pages/Challange";
import Leaderboard from "../pages/Leaderboard";
import ReportPage from "../pages/Report";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/challenge" element={<Challange />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/report" element={<ReportPage />} />

        </Routes>
    )
}

export default AppRoutes;