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
    		data.forEach(function(e) {
		    e.end_time = parseDate(e.end_time);
		    e.sentiment = parseFloat(+e.sentiment);
		    e.close_time = parseDate(e.close_time);
		    //console.log(d.end_time, d.sentiment) 
		  	});
  //   	var Twitterdata = data;

	  	// Set the dimensions of the canvas / graph
		var element = document.getElementById("mainChart");
		var	margin = {top: 50, right: 50, bottom: 50, left: 50},
		width = element.offsetWidth + margin.left + margin.right,
		height = element.offsetHeight + margin.top + margin.bottom;

		console.log(height)

		// drawGraph(Twitterdata);
  		console.log(data[0]);
  //   		console.log(data);

		graph(data,width,height,margin);
		graph(rows,width,height,margin);

		drawHistogram(data);
  
		});
    });
}
