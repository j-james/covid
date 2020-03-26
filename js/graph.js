// Washington State capita: 7614893
// New York: 19453561
//
// front-end web development is a joke

function plotStates(data) {
    var date = [], pos = [], death = [], posWA = [], posNY = [];

    for (var i = 0; i < data.length; i++) {
        row = data[i];
        if (row['state'] == 'WA') {
            date.push(row['date'] % 10000);
            pos.push(row['positive']);
            death.push(row['death']);
            posWA.push(row['positive'] / 7614893);
        } else if (row['state'] == 'NY') {
            posNY.push(row['positive'] / 19453561);
        }
    }

    Plotly.newPlot(
        'wa',
        [
            {name:'Positive Cases', x:date, y:pos},
            {name:'Total Deaths', x:date, y:death}
        ],
        {
            title:'Washington State and COVID-19',
            xaxis:{title: 'Date (month-day)'},
            yaxis:{title: 'Positive Cases'}
        },
        {displaylogo: false}
    );

    Plotly.newPlot(
        'wany',
        [
            {name:'WA', x:date, y:posWA},
            {name:'NY', x:date, y:posNY}
        ],
        {
            title:'WA vs NY: Positive Cases per Capita',
            xaxis:{title:'Date (month-day)'},
            yaxis:{title:'Positive Cases divided by Population'}
        },
        {displaylogo: false}
    );
}

Plotly.d3.csv('https://covidtracking.com/api/states/daily.csv', (data) => plotStates(data));
