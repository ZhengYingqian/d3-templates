/**
 * Created by Administrator on 2018/5/31.
 */
console.log("word!");
let arr = ['Dissection of aort', 'Unspecified essential hypertension', 'Other diseases of lun', 'Other diseases of pharyn', 'Unspecified sleep apnea', 'Diabetes mellitus without mention of complicatio', 'Unspecified disorder of kidney and ureter', 'Dysuria', 'Hyperplasia of prostat', 'Non-invasive mechanical ventilation', 'Dissection of aort', 'Unspecified essential hypertension', 'Diabetes mellitus without mention of complicatio', 'Other diseases of pharyn', 'Unspecified sleep apnea', 'Elevated prostate specific antigen [PSA]', 'Abdominal aneurysm without mention of rupture', 'Dissection of aort', 'Hypertrophy (benign) of prostate with urinary obstruction and other lower urinary tract symptoms (LUTS)', 'Lumbosacral spondylosis without myelopathy', 'Surgical or other procedure not carried out because of contraindication', 'Diabetes mellitus without mention of complicatio', 'Unspecified essential hypertension', 'Obesit', 'Unspecified disorder of kidney and ureter', 'Insertion of indwelling urinary catheter', 'Insertion of endotracheal tube', 'Diagnostic ultrasound of heart', 'Dissection of aort', '###', 'Cardiac arrest', '###', 'Pulmonary collapse', 'Urinary tract infectio', 'Unspecified essential hypertension', 'Diabetes mellitus without mention of complicatio', 'Pure hypercholesterolemia', 'Obesit', 'Unspecified disorder of kidney and ureter', 'Resection of vessel with replacemen', 'Extracorporeal circulation auxiliary to open heart surgery', 'Diagnostic ultrasound of heart', 'Fiber-optic bronchoscopy', 'Cardiopulmonary resuscitatio', 'Other incision of pleura', 'Insertion of endotracheal tube', 'Venous catheterizatio', 'Transfusion of packed cells', 'Other cystoscopy', 'Transfusion of other serum'];
let num = [7.65854827e-12,3.35707764e-12,3.78734723e-13,8.01938078e-16
,4.49205331e-15,9.41731068e-13,2.79812360e-13,1.05329089e-14
,4.90452731e-13,7.35030865e-14,2.46058587e-08,5.02474686e-05,
    5.83005715e-07,3.28830435e-10,4.40334134e-08,8.45955395e-09,
1.34950420e-02,1.73831468e-05,7.89922138e-04,7.12080393e-04, 7.77009409e-03,1.13724418e-04,1.80261005e-02,5.19697089e-03,
    1.17087628e-04,7.88194939e-06,1.73973907e-02,2.93275807e-02,
    1.49004583e-04,6.56453194e-04,5.93308368e-06,9.22005437e-03,
   2.43956209e-04,2.98727071e-03,2.65298504e-02,1.09025068e-03,
    8.05431604e-03,2.27605868e-02,1.28594588e-03,1.21713273e-01,
    1.76064879e-01,9.49546918e-02,4.39244248e-02,1.84794371e-05,
    4.38260920e-02,3.64324823e-02,5.15439138e-02, 1.31093830e-01,
    3.32831172e-03,1.31093830e-01];

let visit = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];

let data = [];
let group = [{
    "vindex": visit[0],
    "vwidget": visit[0],
    "vfirst": 1,
    "vlast": 1
}];
let xAx = [];
let max = num[0];
for(let i = 0;i<arr.length;i++){
    data.push({
        "diag": arr[i],
        "value": sigmod(num[i]),
        "vindex": visit[i],
        "i": i
    });
    if(max<num[i]){
        max = num[i];
    }
    xAx.push(i*30);
    if( i!=0 ) {
        if( visit[i] != visit[i-1]){
            let count = 1;
            let newG = false;
            group.push({
                "vindex": visit[i],
                "vwidget": visit[i],
                "vfirst": 1,
                "vlast": 1
            })
        }else {
            group.push({
                "vindex": visit[i],
                "vwidget": visit[i],
                "vfirst": 1,
                "vlast": 1
            })
        }
    }
}
console.log(max);
console.log(group);

drawWords(data);
function drawWords(data) {
    console.log(data);
    let w = 2000;
    let h = 800;
    let margin = {
        top: 60,
        bottom: 60,
        left: 80,
        right: 20
    };

    let svg = d3.select('.word').append("svg")
        .attr("width", w)
        .attr("height", h);
    let group = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top  + ")");

    console.log(xAx);
    let xScale = d3.scale.ordinal()
        .domain(arr)
        .range(xAx);

    let xAxis = d3.svg.axis()
        .scale(xScale)
        // .tickValues(arr)
        .orient("bottom");
    group.call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-30)")
        .attr("y", 200)
        .attr('fill', "red")
        .attr("opacity", function (d,j) {
            console.log(num[j]);
            // console.log((sigmod(num[j]*10)-0.5)*2);
            return num[j]/max;
            // return (sigmod(num[j]*1000)-0.5)*2;
        });

    let cirs = group.append("g").attr("class","cirs");
    cirs.selectAll("circle")
        .data(data).enter()
        .append("circle")
        .attr('class', 'cir')
        .attr("cx",function (d) {
            return d.i*50+15
        })
        .attr("cy", 200)
        .attr("r",5)
        .style("fill", "green")
        .attr("opacity", 0.5)
        .append("text")
        .attr("class", "vindex")
        .attr("x", function (d) {
            console.log(d);
        })
        .text("2")

}

function sigmod(x) {
    if( x< Math.pow(Math.E, ))
    return 1/(1+Math.pow(Math.E, -x))
}