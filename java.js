// 1er graphique 
var margin = {
    top: (parseInt(d3.select('.covidstudent').style('width'), 10) / 10),
    right: (parseInt(d3.select('.covidstudent').style('width'), 10) / 20),
    bottom: (parseInt(d3.select('.covidstudent').style('width'), 10) / 5),
    left: (parseInt(d3.select('.covidstudent').style('width'), 10) / 20)
  },
  width = parseInt(d3.select('.covidstudent').style('width'), 10) - margin.left - margin.right,
  height = parseInt(d3.select('.covidstudent').style('height'), 10) - margin.top - margin.bottom;

var x0 = d3.scale.ordinal()
  .rangeRoundBands([0, width], 0.1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
  .range([height, 0]);

var colorRange = d3.scale.category20c();
var color = d3.scale.ordinal()
  .range(colorRange.range());

var xAxis = d3.svg.axis()
  .scale(x0)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .tickFormat(d3.format(".2s"));

var divTooltip = d3.select(".covidstudent").append("div").attr("class", "toolTip");


var svg = d3.select(".covidstudent").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


dataset = [{
  rate: "1er confinement",
    "Symptômes dépressifs": 36,
    "Anxiété": 26,
    "Pensées suicidaires":12,
}, {
    rate: "2e confinement",
    "Symptômes dépressifs": 54,
    "Anxiété": 43,
    "Pensées suicidaires":18,
  },{
  rate: "Pas de confinement",
  "Symptômes dépressifs": 27,
  "Anxiété": 20,
  "Pensées suicidaires":12,
}];


var options = d3.keys(dataset[0]).filter(function(key) {
  return key !== "rate";
});

dataset.forEach(function(d) {
  d.valores = options.map(function(name) {
    return {
      name: name,
      value: +d[name]
    };
  });
});

x0.domain(dataset.map(function(d) {
  return d.rate;
}));
x1.domain(options).rangeRoundBands([0, x0.rangeBand()]);
y.domain([0, d3.max(dataset, function(d) {
  return d3.max(d.valores, function(d) {
    return d.value;
  });
})]);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", "0.71em")
  .style("text-anchor", "end")

var bar = svg.selectAll(".bar")
  .data(dataset)
  .enter().append("g")
  .attr("class", "rect")
  .attr("transform", function(d) {
    return "translate(" + x0(d.rate) + ",0)";
  });

bar.selectAll("rect")
  .data(function(d) {
    return d.valores;
  })
  .enter().append("rect")
  .attr("width", x1.rangeBand())
  .attr("x", function(d) {
    return x1(d.name);
  })
  .attr("y", function(d) {
    return y(d.value);
  })
  .attr("value", function(d) {
    return d.name;
  })
  .attr("height", function(d) {
    return height - y(d.value);
  })
  .style("fill", function(d) {
    return color(d.name);
  });

bar
  .on("mousemove", function(d) {
    divTooltip.style("left", d3.event.pageX + 10 + "px");
    divTooltip.style("top", d3.event.pageY - 350 + "px");
    divTooltip.style("display", "inline-block");
    var x = d3.event.pageX,
      y = d3.event.pageY
    var elements = document.querySelectorAll(':hover');
    l = elements.length
    l = l - 1
    elementData = elements[l].__data__
    divTooltip.html((d.rate) + "<br>" + elementData.name + "<br>" + elementData.value + "%");
  });
bar
  .on("mouseout", function(d) {
    divTooltip.style("display", "none");
  });


var legend = svg.selectAll(".legend")
  .data(options.slice())
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) {
    return "translate(0," + i * 20 + ")";
  });

legend.append("rect")
  .attr("x", width - 18)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", color)
  .on("click", function(d) {
    console.log("d", d);
  });

legend.append("text")
  .attr("x", width - 24)
  .attr("y", 9)
  .attr("dy", "0.35em")
  .style("text-anchor", "end")
  .text(function(d) {
    return d;
  });

// 2eme graphique

var data = {
    rates: [
      '1er confinement', '2e confinement', 'Pas de confinement',
    ],
    series: [
      {
        rate: 'Symptômes dépressifs',
        values: [18.7, 15.9, 7.3]
      },
      {
        rate: 'Anxiété',
        values: [21.4, 21.1, 8.3]
      },
      {
        rate: 'Pensées suicidaires',
        values: [27.1, 18.1, 11.1]
      },]
  };
  
  var covidnotstudentWidth       = 600,
      barHeight        = 40,
      groupHeight      = barHeight * data.series.length,
      gapBetweenGroups = 20,
      spaceForrates   = 300,
      spaceForLegend   = 300;
  
  var zippedData = [];
  for (var i=0; i<data.rates.length; i++) {
    for (var j=0; j<data.series.length; j++) {
      zippedData.push(data.series[j].values[i]);
    }
  }
  
  var color = d3.scale.category20c();
  var covidnotstudentHeight = barHeight * zippedData.length + gapBetweenGroups * data.rates.length;
  
  var x = d3.scale.linear()
      .domain([0, d3.max(zippedData)])
      .range([0, covidnotstudentWidth]);
  
  var y = d3.scale.linear()
      .range([covidnotstudentHeight + gapBetweenGroups, 0]);
  
  var yAxis = d3.svg.axis()
      .scale(y)
      .tickFormat('')
      .tickSize(0)
      .orient("left");
  
  var covidnotstudent = d3.select(".covidnotstudent")
      .attr("width", spaceForrates + covidnotstudentWidth + spaceForLegend)
      .attr("height", covidnotstudentHeight);
  
  var bar = covidnotstudent.selectAll("g")
      .data(zippedData)
      .enter().append("g")
      .attr("transform", function(d, i) {
        return "translate(" + spaceForrates + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length))) + ")";
      });
  
  bar.append("rect")
      .attr("fill", function(d,i) { return color(i % data.series.length); })
      .attr("class", "bar")
      .attr("width", x)
      .attr("height", barHeight - 1);
  
  bar.append("text")
      .attr("x", function(d) { return x(d) - 3; })
      .attr("y", barHeight / 2)
      .attr("fill", "red")
      .attr("dy", ".35em")
      .text(function(d) { return d; });
  
  bar.append("text")
      .attr("class", "rate")
      .attr("x", function(d) { return - 10; })
      .attr("y", groupHeight / 2)
      .attr("dy", ".35em")
      .text(function(d,i) {
        if (i % data.series.length === 0)
          return data.rates[Math.floor(i/data.series.length)];
        else
          return ""});
  
  covidnotstudent.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + spaceForrates + ", " + -gapBetweenGroups/2 + ")")
        .call(yAxis);
  
  var legendRectSize = 18,
      legendSpacing  = 4;
  
  var legend = covidnotstudent.selectAll('.legend')
      .data(data.series)
      .enter()
      .append('g')
      .attr('transform', function (d, i) {
          var height = legendRectSize + legendSpacing;
          var offset = -gapBetweenGroups/2;
          var horz = spaceForrates + covidnotstudentWidth + 40 - legendRectSize;
          var vert = i * height - offset;
          return 'translate(' + horz + ',' + vert + ')';
      });
  
  legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', function (d, i) { return color(i); })
      .style('stroke', function (d, i) { return color(i); });
  
  legend.append('text')
      .attr('class', 'legend')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text(function (d) { return d.rate; });
  
// 3e Graphique

var rate = d3.select(".rate");

var	margin = {top: 30, right: 20, bottom: 30, left: 50},
	width = 600 - margin.left - margin.right,
	height = 270 - margin.top - margin.bottom;


var	parseDate = d3.time.format("%d-%b-%y").parse;


var	x = d3.time.scale().range([0, width]);
var	y = d3.scale.linear().range([height, 0]);


var	xAxis = d3.svg.axis().scale(x)
	.orient("bottom").ticks(5);

var	yAxis = d3.svg.axis().scale(y)
	.orient("left").ticks(5);


var	valueline = d3.svg.line()
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y(d.Female); });
    

var	svg = d3.select("main")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.json("data_JSON/rate.json", function(error, data) {
	data.forEach(function(d) {
		d.date = parseDate(d.date);
		d.Female = +d.Female;
	});

	
	x.domain(d3.extent(data, function(d) { return d.date; }));
	y.domain([0, d3.max(data, function(d) { return d.Female; })]);

	
	svg.append("path")		
		.attr("class", "line")
		.attr("d", valueline(data));
		
		
	svg	
		.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("r", 10)
	  .attr("cx", function(d) {
	    return x(d.date)
	  })
	  .attr("cy", function(d) {
	    return y(d.Female)
	  })
	  .on("mouseover", function(d,i) {
  
   rate.style("transform", "translate("+ x(d.date) +"px," + (y(d.Female)) +"px)")
   rate.text(d.Female)
  
});
		
	svg.append("g")			
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);


	svg.append("g")			
		.attr("class", "y axis")
		.call(yAxis);

});
