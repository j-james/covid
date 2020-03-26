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
    Plotly.newPlot(
        document.getElementById('map'),
        [{x:date, y:positive}, {x:date, y:death}],
        {title: 'COVID is bad - Washington State'}
    );
}

Plotly.d3.csv('https://covidtracking.com/api/states/daily.csv', (data) => plotStates(data));
