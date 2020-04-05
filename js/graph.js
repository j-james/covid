// Washington State capita: 7614893
// New York: 19453561
//
// javascript development is a joke

function plotState(data) {
    var date = [], pos = [], death = [], posWA = [], posNY = [];

    for (var i = 0; i < data.length; i++) {
        row = data[i];
        day = (row['date'] % 100);
        month = ((row['date'] - day) / 100) % 100;
        year = (((row['date'] - day) / 100) - month) / 100;
        if (row['state'] == 'WA') {
            date.push(year + '-' + month + '-' + day);
            pos.push(row['positive']);
            death.push(row['death']);
            posWA.push(row['positive']/7614893 * 100);
        } else if (row['state'] == 'NY') {
            posNY.push(row['positive']/19453561 * 100);
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
            yaxis:{title:'Positive Cases as a % of Population'}
        },
        {displaylogo: false}
    );
}

// function plotAll(data) {
//     var date = [], pos = [], neg = [], hos = [], dead = [];
// }

Plotly.d3.csv('https://covidtracking.com/api/states/daily.csv', (data) => plotState(data));
// https://covidtracking.com/api/states/daily.csv
