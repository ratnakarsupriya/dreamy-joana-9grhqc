// OptimumTable.js
import React from "react";

const OptimumTable = ({ data }) => {
  return (
    <table border="1" style={{ borderCollapse: "collapse", minWidth: "400px" }}>
      <thead>
        <tr>
          <th>Sample</th>
          <th>Cooked Butter</th>
          <th>Flavor Type</th>
          <th>Cream</th>
          <th>Cashewnut Flavor</th>
          <th>Predicted Score</th>
          <th>Uniqueness</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            <td>{row.name}</td>
            <td>{row.cookedButter}</td>
            <td>{row.flavorType}</td>
            <td>{row.cream}</td>
            <td>{row.cashewnutFlavor}</td>
            <td>{row.predictedScore}</td>
            <td>{row.uniqueness}</td>
            <td>{row.cost}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OptimumTable;
