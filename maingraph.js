"use strict";

function graph(dayArray,width,height,margin){

	// // Grab the keys, parse to integers and make sure they are sorted.
	// var keys = Object.keys(dayArray).map(function(day) {
	// 	return ~~day;
	// }).sort(function(a, b) {
	// 	return a < b;
	// });
	// console.log(keys);

	 // shows the day in array selected
	var cur_position = 0;

	// get data for first day
	var data = dayArray.get(0);//[keys[0]];

	console.log(data)

	// update information
	updateInfo(keys,cur_position, dayArray);

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
		.attr("class", "twitterline")
		.style("stroke","blue")
		.attr("d", twitterline(data));
	// Add the valueline path.
	svg.append("path")	
		.attr("class", "stockline")
		.style("stroke","red")
		.attr("d", stockline(data));
 
	// Add the X Axis
	svg.append("g")		
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);
 
	// Add the left Y Axis
	svg.append("g")		
		.attr("class", "y axis left")
		.style("fill", "red")
		.call(yAxisLeft);

	// Add the right Y Axis
	svg.append("g")		
		.attr("class", "y axis right")
		.attr("transform", "translate(" + width + " ,0)")
		.style("fill", "blue")
		.call(yAxisRight);

		var button_holder = d3.select('#buttons')

		var lenDataArray = dayArray.length;
		var cur_position = 0;
		console.log(cur_position);

		button_holder.append("button")
			.text("back")
			.on("click", function(){ 
				if (cur_position < 0){
					console.log("Cant go further backwards")
				}
				else{
					cur_position -= 1
					updateMainChart(keys,cur_position,dayArray,width,height,margin,xAxis,yAxisLeft,yAxisRight);
					updatePieChart(keys,dayArray, cur_position,width,height,margin);
					// update information
					updateInfo(keys,cur_position, dayArray);
				}
			});
		console.log(cur_position);
		
		button_holder.append("button")
			.text("next day")
			.on("click", function(){				
				if (cur_position >= lenDataArray){
					console.log("Cant go further")
				}
				else{
					cur_position += 1
					updateMainChart(keys,cur_position,dayArray,width,height,margin,xAxis,yAxisLeft,yAxisRight);
					updatePieChart(keys,dayArray, cur_position,width,height,margin);
					// update information
					updateInfo(keys,cur_position, dayArray);
				}
			});
		console.log(cur_position);

		
}

	// ** Update data section (Called from the onclick)
	function updateMainChart(keys,cur_position, dayArray,width,height,margin,xAxis,yAxisLeft,yAxisRight) {
		//cur_position +=  1
		console.log(cur_position);

		var newData = dayArray[keys[cur_position]];

		console.log(newData[keys[0]]);
			
		// Set the ranges again
		var	x = d3.time.scale().range([0, width]);
		var	y0 = d3.scale.linear().range([height, -0,5]);
		var	y1 = d3.scale.linear().range([height, -0,5]);

    	// Scale the range of the data again 
		x.domain(d3.extent(newData, function(d) { return d.close_time; }));
		y0.domain([d3.min(newData, function(d) { return Math.max(d.close); }), d3.max(newData, function(d) { return Math.max(d.close); })]);
		y1.domain([d3.min(newData, function(d) { return Math.max(d.sentiment); }), d3.max(newData, function(d) { return Math.max(d.sentiment); })]);

		// Define the line
		var	stockline = d3.svg.line()
			.x(function(d) { return x(d.close_time); })
			.y(function(d) { return y0(d.close); });
		var	twitterline = d3.svg.line()
			.x(function(d) { return x(d.close_time); })
			.y(function(d) { return y1(d.sentiment); });

	    // Select the section we want to apply our changes to
	    var svg = d3.select("#mainChart").transition();

	    // Make the changes
	        svg.select(".twitterline")   // change the twitterline
	            .duration(750)
	            .attr("d", twitterline(newData));
	       	svg.select(".stockline")   // change the twitterline
	            .duration(750)
	            .attr("d", stockline(newData));
	        svg.select(".x.axis") // change the x axis
	            .duration(750)
	            .call(xAxis);
	        svg.select(".y.axis.left") // change the left y axis
	            .duration(750)
	            .call(yAxisLeft);
	        svg.select(".y.axis.right") // change the right y axis
	            .duration(750)
	            .call(yAxisRight);
	    
	    console.log(cur_position);
	    //return cur_position;
    }
    function updateInfo(keys, cur_position, dayArray){
    	var parseDate = d3.time.format("%a %d/%b/%Y").parse;

		var key = "Selected day: "

		console.log(dayArray,keys,cur_position);
		var result = key + dayArray[keys[cur_position]][0].close_time.toDateString();
		console.log(result);
		document.getElementById("cur_date").innerHTML = result;

    }

