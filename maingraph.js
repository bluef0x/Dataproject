"use strict";

function graph(data,width,height,margin){
	 
	// Set the ranges
	var	x = d3.time.scale().range([0, width]);
	var	y = d3.scale.linear().range([height, -0,5]);
	 
	// Define the axes
	var	xAxis = d3.svg.axis().scale(x)
		.orient("bottom").ticks(5);
	 
	var	yAxis = d3.svg.axis().scale(y)
		.orient("left").ticks(5);

	// Define the line
	var	valueline = d3.svg.line()
		.x(function(d) { return x(d.close_time); })
		.y(function(d) { return y(d.sentiment); });
	
	// .filter(function(d) { return d.close_time.range([]) })    
	
	// Adds the svg canvas
	var	svg = d3.select("#mainChart")
		.append("div")
			.classed("svg-container", true) //container class to make it responsive
		.append("svg")
			//responsive SVG needs these 2 attributes and no width and height attr
			.attr("preserveAspectRatio", "xMinYMin meet")
			.attr("viewBox", "0 0 600 400")
			//class to make it responsive
			.classed("svg-content-responsive", true)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	// Scale the range of the data
	x.domain(d3.extent(data, function(d) { return d.close_time; }));
	y.domain([d3.min(data, function(d) { return d.sentiment; }), d3.max(data, function(d) { return d.sentiment; })]);
 
	// Add the valueline path.
	svg.append("path")	
		.attr("class", "line")
		.attr("d", valueline(data));
 
	// Add the X Axis
	svg.append("g")		
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);
 
	// Add the Y Axis
	svg.append("g")		
		.attr("class", "y axis")
		.call(yAxis);
	
}