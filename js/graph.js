// https://covidtracking.com/api/states/daily.csv
// Washington State capita: 7614893
// New York State capita: 19453561
//
// javascript development is a joke

Plotly.d3.csv('https://covidtracking.com/api/states/daily.csv', function(data) { // (data) => plotState(data));
    wa = state(data, 'WA');
    ny = state(data, 'NY');

    Plotly.newPlot(
        'wa',
        [
            {name:'Positive Cases', x:wa[0], y:wa[1]},
            {name:'Total Deaths', x:wa[0], y:wa[3], line:{color: 'red'}}
        ],
        {
            title:'Washington State and COVID-19',
            legend:{x:0.02,y:1.05},
            xaxis:{title:'Date (month-day)'},
            yaxis:{title:'Positive Cases'}
        },
        {displayModeBar: false}
    );

    for (i = 0; i < wa[1].length; i++) wa[1][i] /= 76148.93;
    for (i = 0; i < ny[1].length; i++) ny[1][i] /= 194535.61;

    Plotly.newPlot(
        'wany',
        [
            {name:'WA', x: wa[0], y: wa[1], line: {color: 'green'}},
            {name:'NY', x: wa[0], y: ny[1], line: {color: 'blue'}}
        ],
        {
            title:'WA vs NY (vs CA): Positive Cases per Capita',
            legend:{x:0.02,y:1.00},
            xaxis:{title:'Date (month-day)'},
            yaxis:{title:'Positive Cases as a % of Population'}
        },
        {displayModeBar: false}
    );
});

function state(data, state) {
    var date = [];
    var pos = [], neg = [], dead = [];
    var hos = [], icu = [], rec = [];

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
    total = [date, pos, neg, dead, hos, icu, rec];
    return total;
}
