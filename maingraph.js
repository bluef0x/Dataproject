"use strict";

function graph(dayArray,width,height,margin){

	 // shows the day in array selected
	var cur_position = "03-01-2012";

	// get data for first day
	var data = dayArray[cur_position];

	// update information
	updateInfo(cur_position, data);

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

	// Define the stock and twitterline
	var	stockline = d3.svg.line()
		.x(function(d) { return x(d.close_time); })
		.y(function(d) { return y0(d.close); });
	var	twitterline = d3.svg.line()
		.x(function(d) { return x(d.close_time); })
		.y(function(d) { return y1(d.sentiment); });
	
	// Adds the svg canvas
	var	svg = d3.select("#mainChart")
		.append("svg")
        	.attr("width", width + margin.left + margin.right)
        	.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var stockSpace = 1;
	var sentimentSpace = [1,0.8]
	// Scale the range of the data
	x.domain(d3.extent(data, function(d) { return d.close_time; }));
	y0.domain([d3.min(data, function(d) { return Math.min(d.close - stockSpace); }), d3.max(data, function(d) { return Math.max(d.close + stockSpace); })]);
	y1.domain([d3.min(data, function(d) { return Math.min(d.sentiment - sentimentSpace[0]); }), d3.max(data, function(d) { return Math.max(d.sentiment + sentimentSpace[1]); })]);
 
	// Add the twitterline path.
	svg.append("path")	
		.attr("class", "twitterline")
		.style("stroke","blue")
		.attr("d", twitterline(data));
	// Add the stockline path.
	svg.append("path")	
		.attr("class", "stockline")
		.style("stroke","red")
		.attr("d", stockline(data));
 
	// Add the X Axis
	svg.append("g")		
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)

	// Add label
    svg.append("text")
    	.attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom - 10) + ")")
        .style("text-anchor", "middle")
        .text("Time per 5 minutes");
 
	// Add the left Y Axis and Label
	svg.append("g")		
			.attr("class", "y axis left")
			.style("stroke", "red")
			.style("stroke-width","0.5")
			.call(yAxisLeft)
		.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", "0.71em")
			.style("text-anchor", "end")
			.text("Price ($)");

	// Add the right Y Axis and Label
	svg.append("g")		
			.attr("class", "y axis right")
			.attr("transform", "translate(" + width + " ,0)")
			.style("stroke", "blue")
			.style("stroke-width","0.5")
		.call(yAxisRight)
		.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", "2.91em")
			.style("text-anchor", "end")
			.text("Sentiment per 5 minutes");

		// Select navagation buttons
		var backbutton = d3.select('#back');
		var nextbutton = d3.select('#next');

		// Update chart and informationtab
		backbutton.append("button")
			.text("<")
			.on("click", function(){ 
				var newData = dayArray.backday(cur_position);
				cur_position = newData[0];
				updateMainChart(cur_position,newData[1],width,height,margin,xAxis,yAxisLeft,yAxisRight);
				updatePieChart(newData[1], cur_position,width,height,margin);
				drawHistogram(newData[1],width,height,margin);
				updateScatter(newData[1],width,height,margin);
				// update information
				updateInfo(cur_position, newData[1]);
			});

		// Update chart and informationtab
		nextbutton.append("button")
			.text(">")
			.on("click", function(){				
				var newData = dayArray.nextday(cur_position)
				cur_position = newData[0]
				updateMainChart(cur_position,newData[1],width,height,margin,xAxis,yAxisLeft,yAxisRight);
				updatePieChart(newData[1], cur_position,width,height,margin);
				drawHistogram(newData[1],width,height,margin);
				updateScatter(newData[1],width,height,margin);
				// update information
				updateInfo(cur_position, newData[1]);
			});
}

	//  Update data section (Called from the onclick)
	function updateMainChart(cur_position, newData,width,height,margin,xAxis,yAxisLeft,yAxisRight) {
		//cur_position +=  1
		console.log(cur_position);
		console.log(newData);
			
		// Set the ranges again
		var	x = d3.time.scale().range([0, width]);
		var	y0 = d3.scale.linear().range([height, -0,5]);
		var	y1 = d3.scale.linear().range([height, -0,5]);

		var stockSpace = 1;
		var sentimentSpace = [1,0.8]
    	// Scale the range of the data again 
		x.domain(d3.extent(newData, function(d) { return d.close_time; }));
		y0.domain([d3.min(newData, function(d) { return Math.max(d.close - stockSpace); }), d3.max(newData, function(d) { return Math.max(d.close + stockSpace); })]);
		y1.domain([d3.min(newData, function(d) { return Math.max(d.sentiment - sentimentSpace[0]); }), d3.max(newData, function(d) { return Math.max(d.sentiment + sentimentSpace[1]); })]);

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
    }
    // update information tab
    function updateInfo(cur_position, dayData){
    	var parseDate = d3.time.format("%a %d/%b/%Y").parse;

		var result = "<b>" + cur_position + "</b>";
		document.getElementById("cur_date").innerHTML = result;

		var totalDayVolume = 0;

		for (var i = 0; i < dayData.length; i++){
			totalDayVolume += dayData[i].vol
		}
		var text = "<b>" + "Daily information" + "</b>" + "<br>" + "Volume:  " + totalDayVolume + "<br>";
		document.getElementById("volume").innerHTML = text;

    }

