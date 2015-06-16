"use strict";

// var Twitterdata = "null";
var parseDate = d3.time.format("%a %b %d %H:%M:%S %Z %Y").parse;


function graph(data){

	// Set the dimensions of the canvas / graph
	var	margin = {top: 30, right: 20, bottom: 30, left: 50},
		width = 450 - margin.left - margin.right,
		height = 300 - margin.top - margin.bottom;
	 
	 
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
		.x(function(d) { return x(d.end_time); })
		.y(function(d) { return y(d.sentiment); });
	    
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
	x.domain(d3.extent(data, function(d) { return d.end_time; }));
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


function main(){

	
    d3.csv("output_sentiment.csv",function(error, rows) { 
    	d3.text("US2.AAPL_120101_120131(1).csv", function(error, data) {
    		rows.forEach(function(d) {
		    d.end_time = parseDate(d.end_time);
		    d.sentiment = parseFloat(+d.sentiment);
		    //console.log(d.end_time, d.sentiment) 
		  });

  //   	var Twitterdata = data;

		// drawGraph(Twitterdata);
  		console.log(rows[0]);
  //   		console.log(data);



		graph(rows);
  
		});
    });
}
