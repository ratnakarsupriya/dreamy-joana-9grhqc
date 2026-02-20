import React from "react";
import OptimumTable from "./OptimumTable";
import SpiderChart from "./SpiderChart";

const OptimumsTab = () => {
  const tableData = [
    {
      name: "Best 1",
      cookedButter: 0.1,
      flavorType: "Mango",
      cream: 0.05,
      cashewnutFlavor: 0.075,
      predictedScore: 7.5,
      uniqueness: 7,
      cost: 4.99,
    },
    {
      name: "Worst 1",
      cookedButter: 0.02,
      flavorType: "Pineapple",
      cream: 0.05,
      cashewnutFlavor: 0.03,
      predictedScore: 5.25,
      uniqueness: 7,
      cost: 2.9,
    },
    {
      name: "Custom 1",
      cookedButter: 0.01,
      flavorType: "Apple",
      cream: 0.0,
      cashewnutFlavor: 0,
      predictedScore: 6.5,
      uniqueness: 6,
      cost: 3.5,
    },
  ];

  const radarData = [
    {
      name: "Best 1",
      values: [0.1, 0.05, 0.075, 0.02, 0.2, 0.1],
    },
    {
      name: "Worst 1",
      values: [0.02, 0.09, 0.03, 0.1, 0.05, 0.02],
    },
    {
      name: "Custom 1",
      values: [0.01, 0, 0, 0.05, 0.1, 0.03],
    },
  ];

  const labels = [
    "Cooked Butter",
    "Cream",
    "Cashewnut Flavor",
    "Melted Butter",
    "Cookie Improvement",
    "Mava Cond Milk",
  ];

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <OptimumTable data={tableData} />
      <SpiderChart data={radarData} labels={labels} />
    </div>
  );
};

export default OptimumsTab;
