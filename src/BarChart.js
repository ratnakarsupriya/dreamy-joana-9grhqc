import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BarChart = ({ data, hoveredDriver, setHoveredDriver }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = 400;
    const height = 250;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };

    svg.attr("width", width).attr("height", height);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([
        d3.min(data, (d) => d.value) * 1.2,
        d3.max(data, (d) => d.value) * 1.2,
      ])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Create tooltip
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

    // Draw bars with tooltip
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => (d.value >= 0 ? y(d.value) : y(0)))
      .attr("height", (d) => Math.abs(y(d.value) - y(0)))
      .attr("width", x.bandwidth())
      .attr("fill", (d) => (d.value >= 0 ? "green" : "red"))
      .style("opacity", (d) =>
        hoveredDriver && d.name !== hoveredDriver ? 0.2 : 1
      )
      .on("mouseover", function (event, d) {
        setHoveredDriver(d.name);
        tooltip
          .html(`<b>${d.name}</b><br/>Value: ${d.value}`)
          .style("opacity", 1);
      })
      .on("mousemove", function (event) {
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 20 + "px");
      })
      .on("mouseout", function () {
        setHoveredDriver(null);
        tooltip.style("opacity", 0);
      });

    // X axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-30)")
      .style("text-anchor", "end");

    // Y axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    return () => tooltip.remove(); // cleanup
  }, [data, hoveredDriver, setHoveredDriver]);

  return <svg ref={ref}></svg>;
};

export default BarChart;
