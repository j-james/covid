// This file contains functions set up for covidtracking.com
// https://covidtracking.com/api/v1/states/daily.csv
//
// wow i really do not like javascript

Plotly.d3.csv('https://covidtracking.com/api/v1/states/daily.csv', function(data) { // (data) => plotState(data));
	wa = state(data, 'WA');
	or = state(data, 'OR');
	id = state(data, 'ID');
	ak = state(data, 'AK');
	ca = state(data, 'CA');
	ny = state(data, 'NY');

	Plotly.newPlot(
		'wa',
		[
			{name:'Positive Cases', x:wa[0], y:wa[1]},
			{name:'Total Deaths', x:wa[0], y:wa[3], line:{color: 'red'}}
		],
		{
			title:'Washington State and COVID-19',
			legend:{x:0.02, y:1.05},
			xaxis:{title:'Date (month-day)'},
			yaxis:{title:'Positive Cases'}
		},
		{displayModeBar:false}
	);

	Plotly.newPlot(
		'wany',
		[
			{name:'WA', x:wa[0], y:wa[1], line:{color: 'green'}},
			{name:'NY', x:wa[0], y:ny[1], line:{color: 'blue'}}
		],
		{
			title:'WA vs NY: Positive Cases',
			legend:{x:0.02,y:1.00},
			xaxis:{title:'Date (month-day)'},
			yaxis:{title:'Positive Cases'}
		},
		{displayModeBar: false}
	);

	Plotly.newPlot(
		'pnw',
		[
			{name:'WA', x:wa[0], y:wa[1], line:{color: 'green'}},
			{name:'OR', x:or[0], y:or[1], line:{color: 'yellow'}},
			{name:'ID', x:id[0], y:id[1], line:{color: 'orange'}},
			{name:'AK', x:ak[0], y:ak[1], line:{color: 'blue'}}
		],
		{
			title:'The Pacific Northwest and COVID-19',
			legend:{x:0.02,y:1.00},
			xaxis:{title:'Date (month-day)'},
			yaxis:{title:'Positive Cases'}
		},
		{displayModeBar:false}
	);

	Plotly.newPlot(
		'waddx',
		[
			{name:'WA', x:wa[0], y:wa[7]}
		],
		{
			title:'Rate of Change in Washington State',
			legend:{x:0.02,y:1.05},
			xaxis:{title:'Date (month-day)'},
			yaxis:{title:'Rate of Change of Positive Cases'}
		},
		{displayModeBar:false}
	);

	Plotly.newPlot(
		'wad2dx2',
		[
			{name:'WA', x:wa[0], y:wa[8]}
		],
		{
			title:'Rate of Change of Rate of Change in Washington State',
			legend:{x:0.02, y:1.05},
			xaxis:{title:'Date (month-day)'},
			yaxis:{title:'Rate of Change of Rate of Change of Positive Cases'}
		},
		{displayModeBar:false}
	);

	// var frames = [], steps = [];
/*
frames data set looks like:

frames[0-#ofdates]
 - contains two objects
	name: 1952
	data[0] (yes, really)
		locations[0-142]
		text[0-142]
		z[0-142]

clearly can be greatly simplified
standard right now:
	usa[0-???]
		date
		state
		positive
		negative
		pending
		recovered
		death
		hospitalized
		total

goal:
	usa[date]
*/
	// Plotly.newPlot(
	// 	'usa',
	// 	[{
	// 		type:'chloropleth',
	// 		locationmode:'USA-states',
	// 		locations:,
	// 		z:,
	// 		text:,
	// 		zmin: 0,
	// 		zmax: 125000
	// 	}],
	// 	{
	// 		title:'COVID-19 Cases / State (not density)',
	// 		geo: {
	// 			scope:'usa',
	// 			showlakes: true,
	// 			lakecolor:'white'
	// 		},
	// 		sliders: [{
	// 			steps: steps, // var
	// 			currentvalue: {
	// 				visible:true,
	// 				prefix: 'Date: ',
	// 				xanchor: 'right',
	// 				font: {size:20,color:'#666'}
	// 			},
	// 			transition: {duration:300, easing:'cubic-in-out'}
	// 		}]
	// 	}
	// ).then(function() {Plotly.addFrames('usa', frames);});

	for (i = 0; i < wa[1].length; i++) wa[1][i] /= 76148.93; // appropriate capita values
	for (i = 0; i < or[1].length; i++) or[1][i] /= 42177.37;
	for (i = 0; i < id[1].length; i++) id[1][i] /= 17870.65;
	for (i = 0; i < ak[1].length; i++) ak[1][i] /= 7102.49;
	for (i = 0; i < ca[1].length; i++) ca[1][i] /= 395122.23;
	for (i = 0; i < ny[1].length; i++) ny[1][i] /= 194535.61;
	Plotly.newPlot(
		'wanycapita',
		[
			{name:'WA', x: wa[0], y: wa[1], line: {color: 'green'}},
			{name:'NY', x: wa[0], y: ny[1], line: {color: 'blue'}}
		],
		{
			title:'WA vs NY: Positive Cases per Capita',
			legend:{x:0.02,y:1.00},
			xaxis:{title:'Date (month-day)'},
			yaxis:{title:'Positive Cases as a % of Population'}
		},
		{displayModeBar: false}
	);

	Plotly.newPlot(
		'pnwcapita',
		[
			{name:'WA', x:wa[0], y:wa[1], line:{color: 'green'}},
			{name:'OR', x:or[0], y:or[1], line:{color: 'yellow'}},
			{name:'ID', x:id[0], y:id[1], line:{color: 'orange'}},
			{name:'AK', x:ak[0], y:ak[1], line:{color: 'blue'}},
			{name:'CA', x:ca[0], y:ca[1], line:{color: 'red'}}
		],
		{
			title:'The Pacific Northwest and COVID-19: Per Capita',
			legend:{x:0.02,y:1.00},
			xaxis:{title:'Date (month-day)'},
			yaxis:{title:'Positive Cases as a % of Population'}
		},
		{displayModeBar:false}
	);
});

function state(data, state) {
	var date = [];
	var pos = [], neg = [], dead = [];
	var hos = [], icu = [], rec = [];
	var ddx = [], d2dx2 = []; // haha

	for (i = 0; i < data.length; i++) {
		row = data[i];
		day = (row['date'] % 100);
		month = ((row['date'] - day) / 100) % 100;
		year = (((row['date'] - day) / 100) - month) / 100;
		if (row['state'] == state) {
			date.push(year + '-' + month + '-' + day);
			pos.push(row['positive']);
			neg.push(row['negative']);
			dead.push(row['death']);
			hos.push(row['hospitalized']);
			icu.push(row['inIcuCumulative']);
			rec.push(row['recovered']);
		}
	}
	for (i = 0; i < pos.length-1; i++) {
		if (pos[i] - pos[i+1]) > 0
			ddx.push(pos[i] - pos[i+1]); // This dataset starts with the most recent values
		else
			ddx.push(ddx[ddx.length - 1]);
	}
	ddx.push(0);
	for (i = 0; i < ddx.length-1; i++) {
		d2dx2.push(ddx[i] - ddx[i+1]);
	}
	d2dx2.push(0);
	total = [date, pos, neg, dead, hos, icu, rec, ddx, d2dx2];
	return total;
}

/*
Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/2011_us_ag_exports.csv', function(rows) {
	function unpack(rows, key) {
		return rows.map(function(row) { return row[key]; });
	}

	Plotly.newPlot(
		'exampleOne',
		[{
			type: 'choropleth',
			locationmode: 'USA-states',
			locations: unpack(rows, 'code'),
			z: unpack(rows, 'total exports'),
			text: unpack(rows, 'state'),
			zmin: 0,
			zmax: 17000
		}],
		{
			title: '2011 US Agriculture Exports by State',
			geo: {
				scope: 'usa',
				showlakes: true,
				lakecolor: 'rgb(255,255,255)'
			}
		},
		{showLink: false}
	);
});


Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/gapminder_with_codes.csv', function(err, rows){
	function filter_and_unpack(rows, key, year) {
		return rows.filter(row => row['year'] == year).map(row => row[key])
	}

	var frames = [], steps = [];
	var num = 1952;
	for (i = 0; i <= 11; i++) {
		var z = filter_and_unpack(rows, 'lifeExp', num);
		var locations = filter_and_unpack(rows, 'iso_alpha', num);
		frames[i] = {data: [{z: z, locations: locations, text: locations}], name: num};
		steps.push ({
			label: num.toString(),
			method: 'animate',
			args: [
				[num], {
					mode: 'immediate',
					transition: {duration: 300},
					frame: {duration: 300}
				}
			]
		});
		num += 5;
	}

	console.log(frames);
	Plotly.newPlot(
		'exampleTwo',
		[{
			type: 'choropleth',
			locationmode: 'world',
			locations: frames[0].data[0].locations, // state names
			z: frames[0].data[0].z,
			text: frames[0].data[0].locations, // state names
			zauto: false,
			zmin: 30,
			zmax: 90
		}],
		{
			title: 'World Life Expectency<br>1952 - 2007',
			geo:{
				scope: 'world',
				countrycolor: 'white',
				showland: true,
				landcolor: 'rgb(217, 217, 217)',
				showlakes: true,
				lakecolor: 'white',
				subunitcolor: 'white'
			},
			sliders: [{
				steps: steps,
				currentvalue: {
					visible: true,
					prefix: 'Year: ',
					xanchor: 'right',
					font: {size: 20, color: '#666'}
				},
				transition: {duration: 300, easing: 'cubic-in-out'}
			}]
		}
	).then(function() {Plotly.addFrames('exampleTwo', frames);});
});
*/
