
function drawHistogram(data,setwidth,height,margin){
var w = 300;
var h = 180;

// var uniqueCount = [];
// var dataset = {};

// data.forEach(function(d){
//     var key = (parseFloat(d.sentiment)).toFixed(1);
//     if (key == -0.0){
//         uniqueCount.push("0.0");
//     }
//     else{
//         uniqueCount.push(key);
//     }
    

// });
// uniqueCount.forEach(function(i){ "key" = dataset[i], "value" = (dataset[i]||0)+1;  });
// console.log(dataset);

var dataset = [
        {key:0.0, value: 76},
        {key:0.1, value: 139},
        {key:0.2, value: 67},
        {key:0.3, value: 19},
        {key:0.4, value: 1},
        {key:-0.1, value: 9},
        {key:-0.2, value: 1}
];

var xScale = d3.scale.ordinal()
                .domain(d3.range(dataset.length))
                .rangeRoundBands([0, w], 0.5); 

var yScale = d3.scale.linear()
                .domain([0, d3.max(dataset, function(d) {return d.value;})])
                .range([0, h]);

var key = function(d) {
    return d.key;
};

//Create SVG element
var svg = d3.select("#histogram")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

//Create bars
svg.selectAll("rect")
   .data(dataset, key)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
        return xScale(i);
   })
   .attr("y", function(d) {
        return h - (yScale(d.value) );
   })
   .attr("width", xScale.rangeBand())
   .attr("height", function(d) {
        return yScale(d.value);
   })
   .style("fill", "gray")

//Create labels
svg.selectAll("text")
   .data(dataset, key)
   .enter()
   .append("text")
   .text(function(d) {
        return d.value,d.key;
   })
   .attr("text-anchor", "middle")
   .attr("x", function(d, i) {
        return xScale(i) + xScale.rangeBand() / 2;
   })
   .attr("y", function(d) {
        return h - yScale(d.value) + 20;
   })
   .attr("font-family", "sans-serif") 
   .attr("font-size", "11px")
   .attr("fill", "white");
   
var sortOrder = false;
var sortBars = function () {
    sortOrder = !sortOrder;
    
    sortItems = function (a, b) {
        if (sortOrder) {
            return a.value - b.value;
        }
        return b.value - a.value;
    };

    svg.selectAll("rect")
        .sort(sortItems)
        .transition()
        .delay(function (d, i) {
        return i * 50;
    })
        .duration(1000)
        .attr("x", function (d, i) {
        return xScale(i);
    });

    svg.selectAll('text')
        .sort(sortItems)
        .transition()
        .delay(function (d, i) {
        return i * 50;
    })
        .duration(1000)
        .text(function (d) {
        return d.value;
    })
        .attr("text-anchor", "middle")
        .attr("x", function (d, i) {
        return xScale(i) + xScale.rangeBand() / 2;
    })
        .attr("y", function (d) {
        return h - yScale(d.value) + 14;
    });
};
// Add the onclick callback to the button
d3.select("#sort").on("click", sortBars);
d3.select("#reset").on("click", reset);
function randomSort() {

    
    svg.selectAll("rect")
        .sort(sortItems)
        .transition()
        .delay(function (d, i) {
        return i * 50;
    })
        .duration(1000)
        .attr("x", function (d, i) {
        return xScale(i);
    });

    svg.selectAll('text')
        .sort(sortItems)
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
        return h - yScale(d.value) + 14;
    });
}
function reset() {
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
        return h - yScale(d.value) + 14;
    });
};
    
}
