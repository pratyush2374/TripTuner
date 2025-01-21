import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardNavbar from "./dashboard-components/DashboardNavbar";
import HelmetSection from "./dashboard-components/HelmetSection";

const Dashboard: React.FC = () => {
    
    return (
        <>
            <HelmetSection />
            <DashboardNavbar />
        </>
    );
};

export default Dashboard;
