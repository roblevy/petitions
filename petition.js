var counts = d3.select(".counts");
counts.append("div")
    .classed("count", true)
    .style("color", "lightpink")
    .attr("id", "pro_count").text("LOADING");
counts.append("div")
    .classed("count", true)
    .style("color", "lightblue")
    .attr("id", "anti_count").text("LOADING");

var pro_url = "https://petition.parliament.uk/petitions/178844.json",
anti_url = "https://petition.parliament.uk/petitions/171928.json";

var svg = d3.select("#svg").append("svg");
svg.append("path").attr("id", "pro").datum([]);
svg.append("path").attr("id", "anti").datum([]);

var w, h, xScale, yScale;

var pathMaker = d3.line()
    .x(function(d) { return xScale(d.updated_at); })
    .y(function(d) { return yScale(d.change); });

var currentTime = new Date();
var plusOneHour = new Date(currentTime)
    .setHours(currentTime.getHours() + 1);
var most_recent_update = {pro: new Date(0), anti: new Date(0)};

function resize() {
    var svgStyle = window.getComputedStyle(document.getElementById("svg"), null);
    w = svgStyle.width;
    h = svgStyle.height;
    xScale = d3.scaleLinear()
        .domain([currentTime, plusOneHour])
        .range([20, parseInt(w) - 20]);
    yScale = d3.scaleLinear()
        .domain([-10, +500])
        .range([parseInt(h), 0]);
    svg.attr("height", h).attr("width", w);
}

window.onload = function() {
    resize();
    getData(pro_url, "pro", "pro_count");
    getData(anti_url, "anti", "anti_count");
}


function getData(url, line_id, result_div) {
    d3.json(url, function(error, response) {
        var data = response.data.attributes;
        data.updated_at = new Date(data.updated_at);
        if (data.updated_at > most_recent_update[line_id]) {
            process(line_id, data);
            d3.select("#" + result_div).text(data.signature_count);
        };
        setTimeout(getData(url, line_id, result_div),
            2000 + Math.random() * 500);
    });
}

function process(line_id, datum) {
    var path = d3.select("#" + line_id);
    path.datum().push(datum);
    path.datum().forEach(function(d, i, array) {
        d.change = d.signature_count - array[0].signature_count;
    })
    path.attr("d", pathMaker);
    most_recent_update[line_id] = datum.updated_at;
}
