/* global d3*/

const width = 800;
const height = 500;
const padding = 30;

//create svg
const svg = d3
  .select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Title element with id=title
svg
  .append("title")
  .attr("id", "title")
  .text("Cyclist Times & Doping Allegations");

// fetch and process data
const getData = async () => {
  const data = await d3.json(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
  );
  // .sort((a, b) => {
  //   return a.Year - b.Year;
  // });
  const datasetByYear = data.sort((a, b) => {
    return a.Year - b.Year;
  });

  //multiple tick labels on x-ax that show year
  //range of x-ax labels within range of x-ax data
  const minYear = d3.min(datasetByYear, (d) => d.Year);
  const maxYear = d3.max(datasetByYear, (d) => d.Year);

  //legend with id=legend & descriptive text
  d3.select("#details")
    .append("div")
    .attr("id", "legend")
    .text(
      `Legend:\nCyclist times & doping allegations\n${minYear} to ${maxYear}, red points indicate doping allegations`
    )
    .attr("x", padding)
    .attr("y", padding);

  //create tooltip
  const tooltip = d3.select("#details").append("div").attr("id", "tooltip");

  const xScale = d3
    .scaleLinear([minYear, maxYear], [padding, width - padding])
    .nice();
  //x-axis with id=x-axis
  const xAx = svg
    .append("g")
    .attr("transform", `translate(0, ${height - padding})`)
    .attr("id", "x-axis")
    .call(d3.axisBottom(xScale).tickFormat(d3.format("d"))); //removes comma sep & dec precision

  const minTime = new Date(
    0,
    0,
    0,
    0,
    0,
    d3.min(datasetByYear, (d) => d.Seconds)
  );
  const maxTime = new Date(
    0,
    0,
    0,
    0,
    0,
    d3.max(datasetByYear, (d) => d.Seconds)
  );
  const timeFormat = d3.timeFormat("%M:%S");
  const yScale = d3
    .scaleUtc([minTime, maxTime], [height - padding, padding])
    .nice();
  //y-axis with id=y-axis

  const yAx = svg
    .append("g")
    .attr("transform", `translate(${padding},0)`)
    .attr("id", "y-axis")
    //data-yval & dot align with point on y-ax (adding tickformat lines things up)
    //tick labels on y-ax wit %M:%S time format does % here mean modulo?
    //range of y-ax labels with range of y-ax data
    .call(d3.axisLeft(yScale).tickFormat(timeFormat)); //set tickformat on axis

  //cx, cy set coordinates, r attr is circle radius
  //dots each with class=dot representing data
  //each dot has data-xvalue and data-yvalue matching the x and y values
  //data-xval & yval within range of data, in correct format
  //data-xval integer full year or Date, data-yval minutes in Date
  //data-xval and dot align with point on x-ax

  svg
    .selectAll("circle")
    .data(datasetByYear)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.Year))
    .attr("cy", (d) => yScale(new Date(0, 0, 0, 0, 0, d.Seconds)))
    .attr("r", 3)
    .attr("class", "dot")
    .attr("data-xvalue", (d) => d.Year)
    .attr("data-yvalue", (d) => new Date(0, 0, 0, 0, 0, d.Seconds))
    .attr("style", (d) => {
      return d.Doping ? "fill: red" : "fill: blue";
    })
    //can mouseover area and see tooltip with id=tooltip with more into
    .on("mouseover", (e, d) => {
      console.log(e.currentTarget.__data__);
      const entry = e.currentTarget.__data__;
      tooltip
        .html(
          `Cyclist: ${entry.Name}\nYear: ${entry.Year}\n Time: ${entry.Time}\n Place: ${entry.Place}`
        )
        //tooltip should have data-year that corresponds to data-xval of active
        .attr("data-year", entry.Year)
        .style("display", "block");
      // const year=e.currentTarget.__data__
    })
    .on("mouseout", () => {
      tooltip.style("display", "none");
    });
};

getData();
