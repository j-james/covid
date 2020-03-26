// Washington State capita: 7614893
// New York: 19453561

function plotStates(data) {
    var date = [], positive = [], death = [];

    for (var i = 0; i < data.length; i++) {
        row = data[i];
        if (row['state'] == 'WA') {
            date.push(row['date']);
            positive.push(row['positive']);
            death.push(row['death']);
        }
    }

    var data = [
        {name: 'Positive Cases', x:date, y:positive}, 
        {name: 'Total Deaths', x:date, y:death}
    ];
    var layout = {
        title: 'COVID is bad',
        xaxis: {
            title: 'Date'
        }
    };

    Plotly.newPlot('map', data, layout, {displaylogo: false}); 
}

Plotly.d3.csv('https://covidtracking.com/api/states/daily.csv', (data) => plotStates(data));
