"use strict";

// set timeformat
var parseDate = d3.time.format("%a %b %d %H:%M:%S %Z %Y").parse;

function main(){
// load data
	d3.csv("output_GOOG_5min.csv", function(error, data) {

		data.forEach(function(d) {
	    d.end_time = parseDate(d.end_time);
	    d.sentiment = parseFloat(+d.sentiment);
	    d.close_time = parseDate(d.close_time);
	    d.close = parseFloat(+d.CLOSE);
        d.open = parseFloat(+d.OPEN);
        d.vol = parseFloat(+d.VOL);
        d.high = parseFloat(+d.HIGH);
        d.low = parseFloat(+d.LOW);
	  	});


	// make timeseries
	var last_date = null;

    // make timeserie object for selecting each day
    var timeseriesData = {};
    data.forEach(function(d){
        if (moment(d.close_time).format("DD-MM-YYYY") != last_date){
            
            last_date = moment(d.close_time).format("DD-MM-YYYY");
            // make array in object timerseries for each day
            timeseriesData[String(last_date)] = [];
        }
        timeseriesData[String(last_date)].push(d);
    });

    // function for spliting days into timeseries, returns next day and object 
    timeseriesData.nextday = function(current_datum) {
        var i = 0;
        var current_datum = moment(current_datum, "DD-MM-YYYY");
        while (i < 10) {
            current_datum = current_datum.add(1, "days");
            var current_datum_str = current_datum.format("DD-MM-YYYY");
            console.log(current_datum_str);
            if (timeseriesData[current_datum_str]){
                return [current_datum_str,timeseriesData[current_datum_str]]
            }
            i++;
        }
    };
    // function for spliting days into timeseries, returns next day and object 
    timeseriesData.backday = function(current_datum) {
        var i = 0;
        var current_datum = moment(current_datum, "DD-MM-YYYY");
        while (i < 10) {
            current_datum = current_datum.subtract(1, "days");
            var current_datum_str = current_datum.format("DD-MM-YYYY");
            console.log(current_datum_str);
            if (timeseriesData[current_datum_str]){
                return [current_datum_str,timeseriesData[current_datum_str]]
            }
            i++;
        }
    };

    // get keys for getting first element
    var keys = Object.keys(timeseriesData);

  	// Set the dimensions of the canvas / graph
	var	margin = {top: 10, right: 50, bottom: 40, left: 50},
	width = 440 - margin.left - margin.right,
	height = 250 - margin.top - margin.bottom;

    // draw dashboard
	graph(timeseriesData,width,height,margin);
	pieChart(timeseriesData[keys[0]],width,height,margin);
	scatter(timeseriesData[keys[0]],width,height,margin);
	drawHistogram(timeseriesData[keys[0]],width,height,margin);

	});
}
// draw scatterplot
function scatter(data,width,height,margin){
	 var margin = {top: 20, right: 15, bottom: 60, left: 60},
         width = 500 - margin.left - margin.right,
         height = 250 - margin.top - margin.bottom;

    // remove old scatterplot
    d3.select("#scatter").selectAll("svg").remove();
    
    var x = d3.scale.linear()
              .domain([ -1, 1])
              .range([ 0, width ]);
    
    var y = d3.scale.linear()
    	      .domain([-0.02, 0.02])
    	      .range([ height, 0 ]);
    
    // select div
    var chart = d3.select('#scatter')
	.append('svg:svg')
	.attr('width', width + margin.right + margin.left)
	.attr('height', height + margin.top + margin.bottom)
	.attr('class', 'chart')

    // select element for drawing
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

    main.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom - 20) + ")")
        .style("text-anchor", "middle")
        .text("Sentiment per 5 minutes");

    // draw the y axis
    var yAxis = d3.svg.axis()
	.scale(y)
	.orient('left')
    .ticks(5)
    .tickFormat(d3.format('%'));

    main.append('g')
	.attr('transform', 'translate(0,0)')
	.attr('class', 'main axis date')
	.call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .style("text-anchor", "end")
    .text("Price change in %");

    var g = main.append("svg:g"); 
    
    // draw dots
    g.selectAll("scatter-dots")
      .data(data)
      .enter().append("svg:circle")
          .attr("cx", function (d) { return x(d.sentiment); } )
          .attr("cy", function (d) { return y(((d.close - d.open)/d.open)) ; } )
          .attr("r", 2)
          .style("fill", "blue");
}
function updateScatter(dayData,width,height,margin){

    scatter(dayData,width,height,margin);

}
    
// draw piechart 
function pieChart(dayData,width,height,margin){

	var data = dayData;

    // make radius
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

    // select color
	var color = d3.scale.ordinal()
	    .range(["#05a508", "#B22222"]);

    // create arc
	var arc = d3.svg.arc()
	    .outerRadius(radius - 10)
	    .innerRadius(0);

    // set values for piechart
	var pie = d3.layout.pie()
	    .value(function(d) { return d.population; });

    // select div and apend svg
	var svg = d3.select("#pieChart").append("svg")
	    .attr("width", width)
	    .attr("height", height)
	  .append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var g = svg.selectAll(".arc")
	  .data(pie(pieData))
	.enter().append("g")
	  .attr("class", "arc");

    // get totalpopulation for determine percentage
    var totalPopulation = pieData[0].population + pieData[1].population 

    // apend arc
	g.append("path")
	  .attr("d", arc)
	  .attr("data-legend",function(d,i) { 
        var percentage = parseFloat((pieData[i].population * 100)/ totalPopulation).toFixed(1);
        return pieData[i].type + " " + percentage + "%"})
	  .style("fill", function(d,i) { return color(i);})

    // make legend
	var legend = svg.append("g")
	  .attr("class","legend")
	  .attr("transform","translate(35,20)")
	  .style("font-size","15px")
	  .call(d3.legend)
}
// update piechart
function updatePieChart(dayData, cur_position,width,height,margin){

    pieChart(dayData,width,height,margin);

}

// draw histogram
function drawHistogram(data,setwidth,height,margin){
var margin = {top: 30, right: 15, bottom: 30, left: 30}, 
    width = 350,
    height = 225;

// determine unique count
var uniqueCount = [];
var datatemp = {};

// get all values
data.forEach(function(d){
    var key = (parseFloat(d.sentiment)).toFixed(1);
    if (key == -0.0){
        uniqueCount.push("0.0");
    }
    else{
        uniqueCount.push(key);
    }
});
uniqueCount.forEach(function(e,i){ datatemp[e] = (datatemp[e]||0)+1; });

// get keys and values
var keys = Object.keys(datatemp);
var values = Object.keys(datatemp).map(function (key) {return datatemp[key]});

// make array with objects in it
var dataset = []
for (var i = 0; i < keys.length; i++){
    var temp = {"key": keys[i], "value": values[i]};
    dataset.push(temp);
}

// remove old histogram
d3.select("#histogram").selectAll("svg").remove();

var xScale = d3.scale.ordinal()
                .domain(d3.range(dataset.length))
                .rangeRoundBands([0, width], 0.5); 

var yScale = d3.scale.linear()
                .domain([0, d3.max(dataset, function(d) {return d.value;})])
                .range([0, height]);

var key = function(d) {
    return d.key;
};

// create SVG
var svg = d3.select("#histogram")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

// create bars
svg.selectAll("rect")
   .data(dataset, key)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
        return xScale(i);
   })
   .attr("y", function(d) {
        return height - (yScale(d.value) );
   })
   .attr("width", xScale.rangeBand())
   .attr("height", function(d) {
        return yScale(d.value);
   })
   .style("fill", "gray")


// create labels
svg.selectAll("text")
   .data(dataset, key)
   .enter()
   .append("text")
   .text(function(d) {
        return d.value;
   })
   .attr("text-anchor", "middle")
   .attr("x", function(d, i) {
        return xScale(i) + xScale.rangeBand() / 2;
   })
   .attr("y", function(d) {
            if (height - yScale(d.value) < 20){
                return height - yScale(d.value) + 15
            }
            else{
                return height - yScale(d.value) - 5
            }
        
   })
   .attr("font-family", "sans-serif") 
   .attr("font-size", "11px")
   .attr("fill", "black");

// get rects sorted   
svg.selectAll("rect")
        .sort(function(a, b){
            return a.key - b.key;
        })
        .transition()
        .delay(function (d, i) {
        return i * 50;
        })
        .duration(1000)
        .attr("x", function (d, i) {
        return xScale(i);
        });
        
    svg.selectAll('text')
        .sort(function(a, b){
            return a.key - b.key;
        })
        .transition()
        .delay(function (d, i) {
        return i * 50;
    })
        .duration(1000)
        .text(function (d) {
        return d.key;
    })
        .attr("text-anchor", "middle")
        .attr("x", function (d, i) {
        return xScale(i) + xScale.rangeBand() / 2;
    })
        .attr("y", function (d) {
            if (height - yScale(d.value) < 20){
                return height - yScale(d.value) + 15
            }
            else{
                return height - yScale(d.value) - 5
            }
        
    });
    
}
function updateHistogram(dayData,width,height,margin){

    drawHistogram(dayData,width,height,margin);

}

// libary for legend of piechart
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
        .style("fill",function(d) {return d.value.color})  
    
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
