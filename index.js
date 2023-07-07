/* global d3*/

//create svg
const width = 800;
const height = 500;
const padding = 30;

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
  const yScale = d3
    .scaleUtc([minTime, maxTime], [height - padding, padding])
    .nice();
  //y-axis with id=y-axis

  //TODO: get y-ax showing accurate time & format
  const yAx = svg
    .append("g")
    .attr("transform", `translate(${padding},0)`)
    .attr("id", "y-axis")
    .call(d3.axisLeft(yScale));

  //cx, cy set coordinates, r attr is circle radius
  //dots each with class=dot representing data
  //each dot has data-xvalue and data-yvalue matching the x and y values
  //data-xval & yval within range of data, in correct format
  //data-xval integer full year or Date, data-yval minutes in Date

  //TODO: line up dots with axes (padding)
  //TODO: make dots visible
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
    .attr("data-yvalue", (d) => new Date(0, 0, 0, 0, 0, d.Seconds));

  console.log(minTime);
  return data;
};

//data-xval and dot align with point on x-ax
//data-yval & dot align with point on y-ax
//tick labels on y-ax wit %M:%S time format does % here mean modulo?
//range of y-ax labels with range of y-ax data
//legend with id=legend & descriptive text
//can mouseover area and see tooltip with id=tooltip with more into
//tooltip should have data-year that corresponds to data-xval of active

//append svg to container
getData();
