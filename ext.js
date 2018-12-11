/*  This visualization was made possible by modifying code provided by:

Scott Murray, Choropleth example from "Interactive Data Visualization for the Web" 
https://github.com/alignedleft/d3-book/blob/master/chapter_12/05_choropleth.html   
		
Malcolm Maclean, tooltips example tutorial
http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html

Mike Bostock, Pie Chart Legend
http://bl.ocks.org/mbostock/3888852  */

	
/*
//Width and height of map
var width = 960;
var height = 500;
		
// Define linear scale for output
var color = d3.scale.linear()
			  .range(["rgb(213,222,217)","rgb(69,173,168)","rgb(84,36,55)","rgb(217,91,67)"]);

var legendText = ["Cities Lived", "States Lived", "States Visited", "Nada"];

//Create SVG element and append map to the SVG
var svg = d3.select("body")
			.append("svg")
			.attr("width", width)
			.attr("height", height);
        
// Append Div for tooltip to SVG
var div = d3.select("body")
		    .append("div")   
    		.attr("class", "tooltip")               
    		.style("opacity", 0);

// Load in my states data!
d3.csv("stateslived.csv", function(data) {
color.domain([0,1,2,3]); // setting the range of the input data

// Load GeoJSON data and merge with states data
d3.json("wa-counties.json", function(json) {
// create a first guess for the projection
var center = d3.geo.centroid(json)
var scale  = 150;
var offset = [width/2, height/2];
var projection = d3.geo.mercator().scale(scale).center(center)
    .translate(offset);

// create the path
var path = d3.geo.path().projection(projection);

// using the path determine the bounds of the current map and use 
// these to determine better values for the scale and translation
var bounds  = path.bounds(json);
var hscale  = scale*width  / (bounds[1][0] - bounds[0][0]);
var vscale  = scale*height / (bounds[1][1] - bounds[0][1]);
var scale   = (hscale < vscale) ? hscale : vscale;
var offset  = [width - (bounds[0][0] + bounds[1][0])/2,
                  height - (bounds[0][1] + bounds[1][1])/2];

// new projection
projection = d3.geo.mercator().center(center)
  .scale(scale).translate(offset);
path = path.projection(projection); */
    /*
// Loop through each state data value in the .csv file
for (var i = 0; i < data.length; i++) {

	// Grab State Name
    var dataState = data[i].county;

	// Grab data value 
	var dataValue = data[i].visited;

	// Find the corresponding state inside the GeoJSON
	for (var j = 0; j < json.objects.cb_2015_washington_county_20m.geometries.length; j++)  {
		var jsonState = json.objects.cb_2015_washington_county_20m.geometries[j].properties.NAME;
        console.log(jsonState); 

		if (dataState == jsonState) {

		// Copy the data value into the JSON
		console.log(jsonState); 

		// Stop looking through the JSON
		break;
		}
	}
} */
		
// Bind the data to the SVG and create one path per GeoJSON feature
/*
svg.selectAll("path")
	.data(json.features)
	.enter()
	.append("path")
    .attr("d", path)
    .attr("width", "50%")
	.style("stroke", "#fff")
    .style("stroke-width", "1")
	.style("fill", function(d) {
        return "#003300"

}); 
        
	});

}); */

