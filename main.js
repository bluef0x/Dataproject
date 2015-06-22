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
    	d3.csv("output_aapl.csv", function(error, data) {
    	// 	rows.forEach(function(d) {
		   //  d.end_time = parseDate(d.end_time);
		   //  d.sentiment = parseFloat(+d.sentiment);
		   //  d.close_time = parseDate(d.close_time);
		   //  //console.log(d.end_time, d.sentiment) 
		  	// });
    		data.forEach(function(d) {
		    d.end_time = parseDate(d.end_time);
		    d.sentiment = parseFloat(+d.sentiment);
		    d.close_time = parseDate(d.close_time);
		    d.close = parseFloat(+d.CLOSE)
		   	
		    //console.log(d.close, d.sentiment) 
		  	});


    	// make timeseries
    	var last_date = null;

     //    var timeseriesData = {};
    	// data.forEach(function(d){
    	// 	if (d.close_time.getDate() != last_date){
    	// 		//console.log("day: ", day_number)
     //            console.log(d);
    			
    	// 		last_date = d.close_time.getDate();
     //            // make array in object timerseries for each day
     //            timeseriesData[String(last_date)] = [];
    	// 		//console.log(last_date)
    	// 	}
     //        timeseriesData[String(last_date)].push(d);
    	// });

        var timeseriesData = {};
        data.forEach(function(d){
            if (moment(d.close_time).format("DD-MM-YYYY") != last_date){
                //console.log("day: ", day_number)
                console.log(d);
                
                last_date = moment(d.close_time).format("DD-MM-YYYY");
                console.log(last_date);
                // make array in object timerseries for each day
                timeseriesData[String(last_date)] = [];
                //console.log(last_date)
            }
            timeseriesData[String(last_date)].push(d);
        });


        
        // timeseriesData.keys = Object.keys(timeseriesData).map(function(day) {
        //         return ~~day;
        //     }).sort(function(a, b) {
        //         return a < b;
        //     });

        // functie schrijven die datum bepaalt 1 dag terug en 1 dag vooruit
        timeseriesData.nextday = function(current_datum) {
            var i = 0;
            var current_datum = moment(current_datum, "DD-MM-YYYY");
            while (i < 10) {
                current_datum = current_datum.add(1, "days");
                var current_datum_str = current_datum.format("DD-MM-YYYY");
                console.log(current_datum_str);
                if (timeseriesData[current_datum_str]){
                    return timeseriesData[current_datum_str]
                }
                i++;
            }
        };
        
        timeseriesData.backday = function(current_datum) {
            var i = 0;
            var current_datum = moment(current_datum, "DD-MM-YYYY");
            while (i < 10) {
                current_datum = current_datum.subtract(1, "days");
                var current_datum_str = current_datum.format("DD-MM-YYYY");
                console.log(current_datum_str);
                if (timeseriesData[current_datum_str]){
                    return timeseriesData[current_datum_str]
                }
                i++;
            }
        };


        console.log(timeseriesData.nextday("02-01-2012"));

    	//var dayArray = [tuesday, wednesday,thursday,friday];

	  	// Set the dimensions of the canvas / graph
		var element = document.getElementById("mainChart");
		var	margin = {top: 50, right: 10, bottom: 50, left: 45},
		width = (element.offsetWidth * 1) + margin.left + margin.right,
		height = (element.offsetHeight * 1) + margin.top + margin.bottom;

		//console.log(width,height)

		graph(timeseriesData,width,height,margin);
		pieChart(timeseriesData[0],width,height,margin);

		scatter(data,width,height,margin);
		drawHistogram(data,width,height,margin);
		updateInfoData(timeseriesData);
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
          .attr("r", 2)
          .style("fill", "blue");
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
	    .range(["#05a508", "#B22222"]);

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
	  .attr("data-legend",function(d,i) { return pieData[i].type})
	  .style("fill", function(d,i) { return color(i);})
	  .each(function(d) { this._current = d; }); // store the initial angles NEEDED?????????

	var legend = svg.append("g")
	  .attr("class","legend")
	  .attr("transform","translate(100,30)")
	  .style("font-size","8px")
	  .call(d3.legend)

	setTimeout(function() { 
    legend
      .style("font-size","20px")
      .attr("data-style-padding",10)
      .call(d3.legend)
  	},1000)

}
function updatePieChart(dayArray, cur_position,width,height,margin){

	var data = dayArray[cur_position];

	pieChart(data,width,height,margin);

}

function updateInfoData(data){
    	var parseDate = d3.time.format("%a %d/%b/%Y").parse;

		var start = "start day: ";
		var end = "end day: ";
		var lengthData = data.length - 1;


		var result = start + data[0].close_time.toDateString() + "<br>" +  end + data[lengthData].close_time.toDateString();
		console.log(result);
		document.getElementById("dataInfo").innerHTML = result;

}

(function() {
d3.legend = function(g) {
  g.each(function() {
    var g= d3.select(this),
        items = {},
        svg = d3.select(g.property("nearestViewportElement")),
        legendPadding = g.attr("data-style-padding") || 5,
        lb = g.selectAll(".legend-box").data([true]),
        li = g.selectAll(".legend-items").data([true])

    lb.enter().append("rect").classed("legend-box",true)
    li.enter().append("g").classed("legend-items",true)

    svg.selectAll("[data-legend]").each(function() {
        var self = d3.select(this)
        items[self.attr("data-legend")] = {
          pos : self.attr("data-legend-pos") || this.getBBox().y,
          color : self.attr("data-legend-color") != undefined ? self.attr("data-legend-color") : self.style("fill") != 'none' ? self.style("fill") : self.style("stroke") 
        }
      })

    items = d3.entries(items).sort(function(a,b) { return a.value.pos-b.value.pos})

    
    li.selectAll("text")
        .data(items,function(d) { return d.key})
        .call(function(d) { d.enter().append("text")})
        .call(function(d) { d.exit().remove()})
        .attr("y",function(d,i) { return i+"em"})
        .attr("x","1em")
        .text(function(d) { ;return d.key})
    
    li.selectAll("circle")
        .data(items,function(d) { return d.key})
        .call(function(d) { d.enter().append("circle")})
        .call(function(d) { d.exit().remove()})
        .attr("cy",function(d,i) { return i-0.25+"em"})
        .attr("cx",0)
        .attr("r","0.4em")
        .style("fill",function(d) { console.log(d.value.color);return d.value.color})  
    
    // Reposition and resize the box
    var lbbox = li[0][0].getBBox()  
    lb.attr("x",(lbbox.x-legendPadding))
        .attr("y",(lbbox.y-legendPadding))
        .attr("height",(lbbox.height+2*legendPadding))
        .attr("width",(lbbox.width+2*legendPadding))
  })
  return g
}
})()
