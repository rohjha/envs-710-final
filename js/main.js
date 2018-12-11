// http://bl.ocks.org/michellechandra/0b2ce4923dc9b5809922
// https://stackoverflow.com/questions/7542683/placing-footer-at-bottom-of-screen
// https://html5boilerplate.com/
// https://stackoverflow.com/questions/14492284/center-a-map-in-d3-given-a-geojson-object 
// https://stackoverflow.com/questions/59075/save-each-sheet-in-a-workbook-to-separate-csv-files

//Width and height of map
var width = 700;
var height = 500;
    
selected = null

images = d3.select(".images")
data = d3.select(".data")

show_data = true
d3.select(".image-link").on("click", function(d) {
    console.log("yo")
    if (show_data) {
        show_data = false;
        data.attr("hidden", "true")
        images.attr("hidden", null)
    }
});

d3.select(".data-link").on("click", function(d) {
    if (!show_data) {
        show_data = true;
        images.attr("hidden", "true")
        data.attr("hidden", null)
    }
});

// Define linear scale for output
var color = d3.scale.linear()
			  .range(["rgb(213,222,217)","rgb(69,173,168)","rgb(84,36,55)","rgb(217,91,67)"]);

//Create SVG element and append map to the SVG
var svg = d3.select(".svg-container")
			.append("svg")
			.attr("width", width)
            .attr("height", height)
            .style("display", "block")
            .style("margin", "auto")
        
// Load in my states data!
d3.csv("stateslived.csv", function(data) {
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
path = path.projection(projection); 
	
// Bind the data to the SVG and create one path per GeoJSON feature
svg.selectAll("path")
	.data(json.features)
	.enter()
    .append("path")
    .attr("class", function(d) {
        return convertName(d.properties.NAME)
    })
    .attr("d", path)
    .attr("width", "50%")
    .style("stroke", "#fff")
    .style("fill-opacity", function(d) {
        if (name == "Grant" || name == "Franklin" || name == "Adams") {
            return 1;
        }
    })
    .style("stroke-width", "1")
	.style("fill", function(d) {
        if (d.properties.NAME == "Grant" || d.properties.NAME == "Franklin" || d.properties.NAME == "Adams") {
            return "gray"
        } else if (d.properties.NAME == selected) {
            return "#4D003300"
        } else {
            return "#003300"    
        }
    })
    .on("click", handleClick);
        
	});

});

function handleClick(input)
{
    name = input.properties.NAME;
    if (name == "Grant" || name == "Franklin" || name == "Adams")
    {
        return;
    }

    if (selected != null)
    {
        d3.select("." + convertName(selected)).style("fill-opacity", "1");
    }

    chartName = "";
    if (name == selected) {
        selected = null;
        chartName = "statewide_totals";
    } else {
        selected = name;
        chartName = convertName(name);

        d3.select("." + convertName(selected)).style("fill-opacity", "0.7");
    }
    
    fileName = "data/" + chartName + ".png"

    d3.select(".chart").attr("src", fileName);
}

function convertName(name)
{
    return name.toLowerCase().replace(' ', '_');
}