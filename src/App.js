import React, { useState } from "react";
import DriversChart from "./DriversChart";
import OptimumsTab from "./OptimumsTab";

const App = () => {
  const [activeTab, setActiveTab] = useState("drivers");

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setActiveTab("drivers")}>
          Drivers of Liking
        </button>
        <button onClick={() => setActiveTab("optimums")}>Optimums</button>
      </div>

      {activeTab === "drivers" && <DriversChart />}
      {activeTab === "optimums" && <OptimumsTab />}
    </div>
  );
};

export default App;
