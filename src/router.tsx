//react imports
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import OrgChart from "./pages/OrgChart";

function Router() {
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [navigate]);

    return (
        <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/org" element={<OrgChart />} />
        </Routes>
    );
}

export default Router;
