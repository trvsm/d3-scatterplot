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
  console.log(data);
  //TODO: add axes
  return data;
};

//x-axis with id=x-axis
//y-axis with id=y-axis
//dots each with class=dot representing data
//each dot has data-xvalue and data-yvalue matching the x and y values
//data-xval&yval within range of data, in correct format
//data-xval integer full year or Date, data-yval minutes in Date
//data-xval and dot align with point on x-ax
//data-yval & dot align with point on y-ax
//tick labels on y-ax wit %M:%S time format does % here mean modulo?
//multiple tick labels on x-ax that show year
//range of x-ax labels within range of x-ax data
//range of y-ax labels with range of y-ax data
//legend with id=legend & descriptive text
//can mouseover area and see tooltip with id=tooltip with more into
//tooltip should have data-year that corresponds to data-xval of active

//append svg to container
getData();
