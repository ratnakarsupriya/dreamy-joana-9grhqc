import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

const WordCloud = ({ words, hoveredDriver, setHoveredDriver }) => {
  const ref = useRef();
  const tooltipRef = useRef(null);

  useEffect(() => {
    // Create tooltip once
    if (!tooltipRef.current) {
      tooltipRef.current = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip-wordcloud")
        .style("position", "absolute")
        .style("background", "white")
        .style("border", "1px solid #ccc")
        .style("padding", "5px 8px")
        .style("border-radius", "4px")
        .style("pointer-events", "none")
        .style("font-size", "12px")
        .style("opacity", 0);
    }

    const tooltip = tooltipRef.current;

    const layout = cloud()
      .size([400, 250])
      .words(words.map((d) => ({ text: d.text, size: d.size, value: d.value })))
      .padding(5)
      .rotate(() => 0)
      .font("sans-serif")
      .fontSize((d) => d.size)
      .on("end", draw);

    layout.start();

    function draw(words) {
      const svg = d3.select(ref.current);
      svg.selectAll("*").remove();

      svg.attr("width", 400).attr("height", 250);

      svg
        .append("g")
        .attr("transform", "translate(200,125)")
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d) => d.size + "px")
        .style("fill", (d) => (d.value >= 0 ? "green" : "red"))
        .style("opacity", (d) =>
          hoveredDriver && d.text !== hoveredDriver ? 0.2 : 1
        )
        .attr("text-anchor", "middle")
        .attr("transform", (d) => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
        .text((d) => d.text)
        .on("mouseover", (event, d) => {
          setHoveredDriver(d.text);
          tooltip
            .html(`<b>${d.text}</b><br/>Value: ${d.value}`)
            .style("opacity", 1);
        })
        .on("mousemove", (event) => {
          tooltip
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - 20 + "px");
        })
        .on("mouseout", () => {
          setHoveredDriver(null);
          tooltip.style("opacity", 0);
        });
    }

    // Cleanup tooltip on unmount
    return () => {
      if (tooltipRef.current) {
        tooltipRef.current.remove();
        tooltipRef.current = null;
      }
    };
  }, [words, hoveredDriver, setHoveredDriver]);

  return <svg ref={ref}></svg>;
};

export default WordCloud;
