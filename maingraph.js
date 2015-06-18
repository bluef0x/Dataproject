"use strict";

function graph(data,width,height,margin){
	 
	// Set the ranges
	var	x = d3.time.scale().range([0, width]);
	var	y0 = d3.scale.linear().range([height, -0,5]);
	var	y1 = d3.scale.linear().range([height, -0,5]);

	// Define the axes
	var	xAxis = d3.svg.axis().scale(x)
		.orient("bottom").ticks(5);
	 
	var	yAxisLeft = d3.svg.axis().scale(y0)
		.orient("left");

	var	yAxisRight = d3.svg.axis().scale(y1)
		.orient("right");

	// Define the line
	var	stockline = d3.svg.line()
		.x(function(d) { return x(d.close_time); })
		.y(function(d) { return y0(d.close); });
	var	twitterline = d3.svg.line()
		.x(function(d) { return x(d.close_time); })
		.y(function(d) { return y1(d.sentiment); });

	
	
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
	y0.domain([d3.min(data, function(d) { return Math.max(d.close); }), d3.max(data, function(d) { return Math.max(d.close); })]);
	y1.domain([d3.min(data, function(d) { return Math.max(d.sentiment); }), d3.max(data, function(d) { return Math.max(d.sentiment); })]);
 
	// Add the valueline path.
	svg.append("path")	
		.attr("class", "line")
		.style("stroke","red")
		.attr("d", twitterline(data));
	// Add the valueline path.
	svg.append("path")	
		.attr("class", "line")
		.attr("d", stockline(data));
 
	// Add the X Axis
	svg.append("g")		
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);
 
	// Add the left Y Axis
	svg.append("g")		
		.attr("class", "y axis")
		.call(yAxisLeft);

	// Add the right Y Axis
	svg.append("g")		
		.attr("class", "y axis")
		.attr("transform", "translate(" + width + " ,0)")
		.style("fill", "red")
		.call(yAxisRight);

	// // ** Update data section (Called from the onclick)
	// function updateData() {

	// // Scale the range of the data again 
	// x.domain(d3.extent(data, function(d) { return d.close_time; }));
	// y0.domain([d3.min(data, function(d) { return Math.max(d.close); }), d3.max(data, function(d) { return Math.max(d.close); })]);
	// y1.domain([d3.min(data, function(d) { return Math.max(d.sentiment); }), d3.max(data, function(d) { return Math.max(d.sentiment); })]);

 //    // Select the section we want to apply our changes to
 //    var svg = d3.select("#mainChart").transition();

 //    // Make the changes
 //        svg.select(".line")   // change the line
 //            .duration(750)
 //            .attr("d", twitterline(data))
	// 		.attr("d", stockline(data));
 //        svg.select(".x.axis") // change the x axis
 //            .duration(750)
 //            .call(xAxis);
 //        svg.select(".y.axis") // change the y axis
 //            .duration(750)
	// 		.call(yAxisLeft)
 //            .call(yAxisRight);

 //    });
	
}