var json = {
    'id': 1,
    'data': [{
        'visit': 'day1',
        'vaule': [0.1, 10, 100],
        'diag': ['disease1', 'd1sease2', 'desease3']
    },{
        'visit': 'day2',
        'vaule': [0.5, 20, 70],
        'diag':  ['disease4', 'd1sease5', 'desease6']
    },{
        'visit': 'day3',
        'vaule': [0.01, 60, 356],
        'diag': ['disease1', 'd1sease4', 'desease7']
    }]
};


function barChart(){
    var width = 500, height = 500, margins = { top: 40, bottom: 40, left:40, right:40 };
    var xScale, yScale, xAxis, yAxis;
    var data, fillColor;


}

function drawBars(data){
    console.log(data);
}

d3.csv('./data/data1.csv', drawBars);
// drawBars(json);