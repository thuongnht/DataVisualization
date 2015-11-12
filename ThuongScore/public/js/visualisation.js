/**
 * Created by scott on 11/4/2015.
 */
var x, y, radius, colorHue;

var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

var height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

var times = [
    "2015-16 Winter semester",
    "2015 Summer semester",
    "2014-15 Winter semester",
    "2014 Summer semester",
    "2009 Summer semester",
    "2008-09 Winter semester",
    "2008 Summer semester",
    "2007-08 Winter semester",
    "2007 Summer semester",
    "2006-07 Winter semester",
    "2005-06 Winter semester",
    "2005 Summer semester",
    "2004-05 Winter semester",
    "2004 Summer semester",
    "2003-04 Winter semester",
    "2003 Summer semester",
    "2002-03 Winter semester"
];

var country = [
    "vn",
    "ge"
];

var degree = [
    "BSc",
    "MSc"
];

var groups = [
    "Statistic",
    "Politic",
    "Physic",
    "Optimization",
    "Operation Research",
    "Mathematics",
    "English",
    "Economy",
    "Computer Science",
    "Chemistry"
];


//call data
d3.json("../data/data.json", function(json) {
    //visualization data
    drawData(json);
});

var drawData = function (data) {
    //alert(data.length);
    var subs = [],
        scores = [],
        projects = [];
    $.each(data, function(){
        subs.push(this.px);
        scores.push(this.s);
        projects.push(this.star);
    });

    //init svg
    var h = height*2/3;
    var w = width;
    var barsWidthTotal = w * 6 / 10;
    var barWidth = barsWidthTotal / data.length;
    var legendOffset = 30;
    var legendBulletOffset = 30;
    var legendTextOffset = 20;
    var padding = 100;
    var outerRadius = 6;
    var innerRadius = 3;

    var svg = d3.select("#visualArea").append("svg")
        .attr("width", "100%" )
        .attr("height", height*2/3)
        .attr("class", "graph-svg-component");
    //align svg center
    d3.select("#visualArea").attr("align","center");

    x = d3.scale.ordinal()
        .domain(subs)
        .rangePoints([padding,barsWidthTotal-padding]);
    y = d3.scale.ordinal()
        .domain(times)
        .rangePoints([padding,h-padding]);
    radius = d3.scale.linear()
        .domain([1, d3.max(scores, function(d) { return d; })])
        .range([8, 3]);
    colorHue = d3.scale.ordinal()
        .domain(groups)
        .range(d3.scale.category10().range());

    //title diagram
    svg.append("g")
        .append("text")
        .attr("class", "title")
        .attr("x", w / 2 )
        .attr("y", 35)
        .style("text-anchor", "middle")
        .text("Visualization of Scores");
    svg.append("g")
        .append("text") //Create X axis label
        .attr("class", "xLabel")
        .attr("x", barsWidthTotal / 2 )
        .attr("y",  h-10)
        .style("text-anchor", "middle")
        .text("Subjects");
    svg.append("g")
        .append("text")     //Create Y axis label
        .attr("class", "yLabel")
        .attr("transform", "rotate(-90)")
        .attr("y", 10)
        .attr("x", 0-(h / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Times");
    //x axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(d3.svg.axis()
            .scale(x)
            .tickFormat(function(d,i) {
                var arr = d.split(" ");
                var s = "";
                for(var j=0; j<arr.length; j++){
                    s += arr[j].slice(0,1);
                }
                return s;
            })
            .orient("bottom"))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", function(d) {
            return "rotate(-65)"
        });
    //y axis
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(d3.svg.axis()
            .scale(y)
            .tickFormat(function(d,i) {
                var arr = d.split(" ");
                var s = "" + arr[0] + " \n";
                for(var j=1; j<arr.length; j++){
                    s += arr[j].slice(0,1);
                }
                return s;
            })
            .orient("left"))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", function(d) {
            return "rotate(-55)"
        });

    //drawing
    var shapes = svg.selectAll(".shapes")
        .data(data)
        .enter();
    //draw circles and rectangles
    shapes.append(function(d){
            if (d.shape == "vn") {
                return createSvgEl("circle");
            } else if (d.shape == "ge") {
                return createSvgEl("rect");
            }
        });
    //draw circles
    svg.selectAll("circle")
        .filter(function(d){
           return d.shape == "vn";
        })
        .attr("cx", function(d){ return x(d.px); })
        .attr("cy", function(d){
            var i;
            for(i=0; i<times.length; i++){
                if (d.py.trim() == times[i]) break;
            }
            return y(times[i]); })
        .attr("r", function(d){ return radius(d.s); })
        .style("fill", function(d){
            var i;
            for(i=0; i<groups.length; i++){
                if (d.hue == groups[i]) break;
            }
            var c = colorHue(groups[i]);
            if (d.saturation == "MSc") c = d3.lab(c).darker();
            else if (d.saturation == "BSc") c= d3.lab(c).brighter();
            return c;
        })
        .style("opacity", 0.8);
    //transition
    d3.selectAll("circle")
        .transition()
        .delay(function(d, i) {
            return i * 50;
        })
        .duration(3000)
        .attr("cy", function(d){
            var i;
            for(i=0; i<times.length; i++){
                if (d.py.trim() == times[i]) break;
            }
            return y(times[i-1]); })
        .each("end", wave1);
    //draw rectangles
    svg.selectAll("rect")
        .filter(function(d){
            return d.shape == "ge";
        })
        .attr("x", function(d){
            var r = radius(d.s);
            return x(d.px) - r; })
        .attr("y", function(d){
            var i;
            for(i=0; i<times.length; i++){
                if (d.py.trim() == times[i]) break;
            }
            var r = radius(d.s);
            return y(times[i]) - r; })
        .attr("width", function(d){ return 2*radius(d.s); })
        .attr("height", function(d){ return 2*radius(d.s); })
        .style("fill", function(d){
            var i;
            for(i=0; i<groups.length; i++){
                if (d.hue == groups[i]) break;
            }
            var c = colorHue(groups[i]);
            if (d.saturation == "MSc") c = d3.lab(c).darker();
            else if (d.saturation == "BSc") c= d3.lab(c).brighter();
            return c;
        })
        .style("opacity", 0.8);
    //transition
    svg.selectAll("rect")
        .transition()
        .delay(function(d, i) {
            return i * 50;
        })
        .duration(3000)
        .attr("y", function(d){
            var i;
            for(i=0; i<times.length; i++){
                if (d.py.trim() == times[i]) break;
            }
            var r = radius(d.s);
            if (i > 0) return y(times[i-1]) - r;
            else return 70 - r; })
        .each("end", wave2);
    //draw stars
    shapes.append("svg:polygon")
        .filter(function(d){
            return (d.star != "");
        })
        .attr("visibility", "visible")
        .attr("points", function(d) {
            return starPoints(x(d.px), h-30, 5, outerRadius, innerRadius);
        })
        .style("fill", "black")
        .style("opacity", 0.5);
    //transition
    svg.selectAll("polygon")
        .transition()
        .delay(function(d, i) {
            return i /2 * 50;
        })
        .duration(3000)
        .style("opacity", 0.2)
        .each("end", wave3);
};

function createSvgEl(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}

var unique = function(arr) {
    return  arr.map(function(a) { return a.trim(); })
        .sort(function(a,b){
            return a < b;
        })
        .reduce(function(a,b){
            if (a.indexOf(b) == -1) {
                a.push(b);
            }
            return a.sort(function(a,b){
                return a < b;
            });
        },[]);
};

var starPoints = function (centerX, centerY, arms, outerRadius, innerRadius)
{
    var results = "";

    var angle = Math.PI / arms;

    for (var i = 0; i < 2 * arms; i++)
    {
        // Use outer or inner radius depending on what iteration we are in.
        var r = (i & 1) == 0 ? outerRadius : innerRadius;

        var currX = centerX + Math.cos(i * angle) * r;
        var currY = centerY + Math.sin(i * angle) * r;

        // Our first time we simply append the coordinates, subsequet times
        // we append a ", " to distinguish each coordinate pair.
        if (i == 0)
        {
            results = currX + "," + currY;
        }
        else
        {
            results += ", " + currX + "," + currY;
        }
    }

    return results;
}

var wave1 = function() {
    //Move to bottom
    d3.select(this)
        .transition()
        .duration(3000)
        .attr("cy", function(d){
            var i;
            for(i=0; i<times.length; i++){
                if (d.py.trim() == times[i]) break;
            }
            return y(times[i]); })
        .each("end", function() {
            //Move to top
            d3.select(this)
                .transition()
                .delay(function(d, i) {
                    return i * 50;
                })
                .duration(3000)
                .attr("cy", function(d){
                    var i;
                    for(i=0; i<times.length; i++){
                        if (d.py.trim() == times[i]) break;
                    }
                    return y(times[i-1]); })
                .each("end", wave1);
        });
};

var wave2 = function() {
    //Move to bottom
    d3.select(this)
        .transition()
        .duration(3000)
        .attr("y", function(d){
            var i;
            for(i=0; i<times.length; i++){
                if (d.py.trim() == times[i]) break;
            }
            var r = radius(d.s);
            return y(times[i]) - r; })
        .each("end", function() {
            //Move to top
            d3.select(this)
                .transition()
                .delay(function(d, i) {
                    return i * 50;
                })
                .duration(3000)
                .attr("y", function(d){
                    var i;
                    for(i=0; i<times.length; i++){
                        if (d.py.trim() == times[i]) break;
                    }
                    var r = radius(d.s);
                    if (i > 0) return y(times[i-1]) - r;
                    else return 70 - r;
                })
                .each("end", wave2);
        });
};

var wave3 = function() {
    //Move to bottom
    d3.select(this)
        .transition()
        .duration(3000)
        .style("opacity", 0.8)
        .each("end", function() {
            //Move to top
            d3.select(this)
                .transition()
                .delay(function(d, i) {
                    return i / 2 * 50;
                })
                .duration(3000)
                .style("opacity", 0.2)
                .each("end", wave3);
        });
};

