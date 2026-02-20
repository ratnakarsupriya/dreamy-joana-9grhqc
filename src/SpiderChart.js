import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const SpiderChart = ({ data, labels }) => {
  const ref = useRef();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2 - 50;
    const angleSlice = (2 * Math.PI) / labels.length;

    const maxValue = d3.max(data.flatMap((d) => d.values));
    const rScale = d3.scaleLinear().range([0, radius]).domain([0, maxValue]);

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    // Container group
    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Draw grid circles
    const levels = 3;
    for (let i = 1; i <= levels; i++) {
      g.append("circle")
        .attr("r", (radius / levels) * i)
        .style("fill", "none")
        .style("stroke", "#ccc");
    }

    // Draw axis lines and labels
    labels.forEach((label, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const lineCoord = [Math.cos(angle) * radius, Math.sin(angle) * radius];

      g.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", lineCoord[0])
        .attr("y2", lineCoord[1])
        .style("stroke", "#999");

      g.append("text")
        .attr("x", lineCoord[0] * 1.1)
        .attr("y", lineCoord[1] * 1.1)
        .text(label)
        .style("font-size", "10px")
        .style("text-anchor", "middle");
    });

    // Colors for polygons
    const colors = ["orange", "blue", "green"];

    // Tooltip div
    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "white")
      .style("border", "1px solid #ccc")
      .style("padding", "5px 8px")
      .style("border-radius", "4px")
      .style("pointer-events", "none")
      .style("font-size", "12px")
      .style("opacity", 0);

    // Draw radar areas (polygons)
    data.forEach((dataset, idx) => {
      const line = d3
        .lineRadial()
        .radius((d, i) => rScale(dataset.values[i]))
        .angle((d, i) => i * angleSlice)
        .curve(d3.curveLinearClosed);

      g.append("path")
        .datum(dataset.values)
        .attr("d", line)
        .style("fill", colors[idx % colors.length])
        .style(
          "fill-opacity",
          hoveredIndex === null || hoveredIndex === idx ? 0.3 : 0.1
        )
        .style("stroke", colors[idx % colors.length])
        .style("stroke-width", hoveredIndex === idx ? 3 : 2)
        .on("mouseover", function () {
          setHoveredIndex(idx);

          // Build tooltip content
          const content =
            `<b>${dataset.name}</b><br/>` +
            labels
              .map((label, i) => `${label}: ${dataset.values[i]}`)
              .join("<br/>");

          tooltip.html(content).style("opacity", 1);
        })
        .on("mousemove", function (event) {
          tooltip
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - 20 + "px");
        })
        .on("mouseout", function () {
          setHoveredIndex(null);
          tooltip.style("opacity", 0);
        });
    });

    // Cleanup tooltip on unmount
    return () => tooltip.remove();
  }, [data, labels, hoveredIndex]);

  return <svg ref={ref}></svg>;
};

export default SpiderChart;
