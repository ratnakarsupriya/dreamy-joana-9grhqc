import React, { useState } from "react";
import BarChart from "./BarChart";
import WordCloud from "./WordCloud";

const DriversChart = () => {
  const [hoveredDriver, setHoveredDriver] = useState(null);

  const barData = [
    { name: "Acerola", value: 20 },
    { name: "Storage Coldbox", value: -15 },
    { name: "Flavour Type_Apple", value: 12 },
    { name: "VegaBrite Black Carrot", value: 18 },
    { name: "Green Coffee Bean", value: -8 },
    { name: "Rosemary", value: -22 }
  ];

  const wordData = [
    { text: "Acerola", size: 30, value: 20 },
    { text: "Storage Coldbox", size: 25, value: -15 },
    { text: "Flavour Type_Apple", size: 20, value: 12 },
    { text: "VegaBrite Black Carrot", size: 35, value: 18 },
    { text: "Green Coffee Bean", size: 18, value: -8 },
    { text: "Rosemary", size: 15, value: -22 }
  ];

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <BarChart data={barData} hoveredDriver={hoveredDriver} setHoveredDriver={setHoveredDriver} />
      <WordCloud words={wordData} hoveredDriver={hoveredDriver} setHoveredDriver={setHoveredDriver} />
    </div>
  );
};

export default DriversChart;
