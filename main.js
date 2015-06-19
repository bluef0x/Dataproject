"use strict";

// // var Twitterdata = "null";

// set timeformat
var parseDate = d3.time.format("%a %b %d %H:%M:%S %Z %Y").parse;
// // Set the dimensions of the canvas / graph
// var	margin = {top: 30, right: 20, bottom: 30, left: 50},
// width = 450 - margin.left - margin.right,
// height = 300 - margin.top - margin.bottom;

// // Set the dimensions of the canvas / graph
// 	var element = document.getElementById("mainChart");
// 	var	margin = {top: 30, right: 20, bottom: 30, left: 50},
// 	width = element.offsetWidth - margin.left - margin.right,
// 	height = element.offsetHeight - margin.top - margin.bottom;



// Can can also search the DOM using ClassName. For example: document.getElementsByClassName("myDiv")

// This will return an array. If there is one in particular you are interested in. For example: var divWidth = document.getElementsByClassName("myDiv")[0].clientWidth;

// divWidth will now be equal to the the width of the first element in your div array.


function main(){

    d3.csv("output_sentiment.csv",function(error, rows) { 
    	d3.csv("output_AAPL.csv", function(error, data) {
    		rows.forEach(function(d) {
		    d.end_time = parseDate(d.end_time);
		    d.sentiment = parseFloat(+d.sentiment);
		    d.close_time = parseDate(d.close_time);
		    //console.log(d.end_time, d.sentiment) 
		  	});
    		data.forEach(function(d) {
		    d.end_time = parseDate(d.end_time);
		    d.sentiment = parseFloat(+d.sentiment);
		    d.close_time = parseDate(d.close_time);
		    d.close = parseFloat(+d.CLOSE)
		   	
		    //console.log(d.close, d.sentiment) 
		  	});

    	// make timeseries
    	var last_date = data[0].close_time.getDate();
    	var day_number = 1;
    	var tuesday = [];
    	var wednesday = [];
    	var thursday = [];
    	var friday = [];
    	var i = 0;

    	data.forEach(function(d){
    		if (d.close_time.getDate() == last_date){
    			i += 1;
    			//console.log("day: ", day_number)

    			if(day_number == 1){
    				tuesday.push(d)
    			}
    			else if(day_number == 2){
    				wednesday.push(d)
    			}
    			else if(day_number == 3){
    				thursday.push(d)
    			}
    			else if(day_number == 4){
    				friday.push(d)
    			}
    			else{
    				console.log("Timeseries per day is not correct")
    			}
    		}
    		else {
    			i +=1;
    			day_number += 1
    			last_date += 1
    			//console.log(last_date)

    			if(day_number == 2){
    				wednesday.push(d)
    			}
    			else if(day_number == 3){
    				thursday.push(d)
    			}
    			else if(day_number == 4){
    				friday.push(d)
    			}
    			else{
    				console.log("Timeseries per day is not correct")
    			}
    		}
    	});
    	var dayArray = [tuesday, wednesday,thursday,friday];

	  	// Set the dimensions of the canvas / graph
		var element = document.getElementById("mainChart");
		var	margin = {top: 50, right: 10, bottom: 50, left: 45},
		width = (element.offsetWidth * 1) + margin.left + margin.right,
		height = (element.offsetHeight * 1) + margin.top + margin.bottom;

		//console.log(width,height)

		graph(dayArray,width,height,margin);



	
		pieChart(tuesday,width,height,margin);

		scatter(data,width,height,margin);
		drawHistogram(data,width,height,margin);

  
		});
    });
}

function scatter(data,width,height,margin){
	 // var margin = {top: 20, right: 15, bottom: 60, left: 60}
  //     , width = 960 - margin.left - margin.right
  //     , height = 500 - margin.top - margin.bottom;
    
    var x = d3.scale.linear()
              .domain([ -1, 1])
              .range([ 0, width ]);
    
    var y = d3.scale.linear()
    	      .domain([400, 450])
    	      .range([ height, 0 ]);
 
    var chart = d3.select('#scatter')
	.append('svg:svg')
	.attr('width', width + margin.right + margin.left)
	.attr('height', height + margin.top + margin.bottom)
	.attr('class', 'chart')

    var main = chart.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
	.attr('width', width)
	.attr('height', height)
	.attr('class', 'main')   
        
    // draw the x axis
    var xAxis = d3.svg.axis()
	.scale(x)
	.orient('bottom');

    main.append('g')
	.attr('transform', 'translate(0,' + height + ')')
	.attr('class', 'main axis date')
	.call(xAxis);

    // draw the y axis
    var yAxis = d3.svg.axis()
	.scale(y)
	.orient('left');

    main.append('g')
	.attr('transform', 'translate(0,0)')
	.attr('class', 'main axis date')
	.call(yAxis);

    var g = main.append("svg:g"); 
    
    g.selectAll("scatter-dots")
      .data(data)
      .enter().append("svg:circle")
          .attr("cx", function (d,i) { return x(d.sentiment); } )
          .attr("cy", function (d) { return y(d.close); } )
          .attr("r", 2);
}
function pieChart(dayArray,width,height,margin){

	var data = dayArray

	// var width = 960,
	// height = 500,
	var radius = Math.min(width, height) / 2;

	// remove old graph
	d3.select("#pieChart").selectAll("svg").remove();

	// Get score for pie chart
    var pos_count = 0;
	var neg_count = 0;

	data.forEach(function(d) {
	if (d.sentiment >= 0){
		pos_count += 1
	}
	else {
		neg_count += 1
	}
	});


	// make array of objects with postive and negative populations
	var pieData = [{"type": "positive", "population": pos_count},{"type": "negative" ,"population": neg_count}];
	// var pieDataNew = JSON.parse(pieData)
	// var pieData = [["positive", pos_count]["negative", neg_count]]
	//console.log(pieDataNew);
	//console.log(pieData[1].population);
	// console.log(pieData[0].type);
	// console.log(pieData.length);

	// pieData.forEach(function(d){
	// 	d.population = +d.population;
	// 	d.type = d.type
	// 	console.log(d.population);
	// })

	var color = d3.scale.ordinal()
	    .range(["#05a508", "#cc071b"]);

	var arc = d3.svg.arc()
	    .outerRadius(radius - 10)
	    .innerRadius(0);

	var enterAntiClockwise = {
	  startAngle: Math.PI * 2,
	  endAngle: Math.PI * 2
	};

	var pie = d3.layout.pie()
	    .sort(null)
	    .value(function(d) { return d.population; });

	var svg = d3.select("#pieChart").append("svg")

	    .attr("width", width)
	    .attr("height", height)
	  .append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var g = svg.selectAll(".arc")
	  .data(pie(pieData))
	.enter().append("g")
	  .attr("class", "arc");

	g.append("path")
	  .attr("d", arc)
	  .style("fill", function(d,i) { return color(i);})
	  .each(function(d) { this._current = d; }); // store the initial angles

	g.append("text")
	  .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
	  .attr("dy", ".35em")
	  .style("text-anchor", "middle")
	  .text(function(d,i) { return pieData[i].type; });

}
function updatePieChart(dayArray, cur_position,width,height,margin){

	var data = dayArray[cur_position];

	pieChart(data,width,height,margin);

}