/**
 * Created by Administrator on 2018/5/31.
 */
console.log("word!");
// let arr = ['Malignant neoplasm of other specified sites of female breast', 'Secondary and unspecified malignant neoplasm of lymph nodes of axilla and upper limb', 'Umbilical hernia without mention of obstruction or gangrene', 'Pure hypercholesterolemia', 'Mitral valve disorders', 'Degeneration of intervertebral dis', 'Hypotensio', 'Other unilateral subcutaneous mammectomy', 'Excision of axillary lymph node', 'free', 'Other open umbilical herniorrhaphy', 'Mitral valve disorders', 'Rupture of chordae tendineae', 'Secondary and unspecified malignant neoplasm of intrathoracic lymph nodes', 'Secondary malignant neoplasm of bone and bone marrow', 'Malignant neoplasm of live', 'Cardiac complication'];
// let num = [3.45374063e-09,3.48186546e-09,1.59611613e-08,1.42254194e-07
// ,   3.49928686e-09,3.10864698e-06,3.80724297e-09,2.73283174e-08
// ,   6.26986740e-10,7.02432260e-07,9.04118203e-09,6.39325753e-02
// ,   1.48715824e-01,9.49085411e-03,7.50029385e-02,4.89735790e-03
// ,   6.97956443e-01];
// let visit = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2];

let arr = ['Other complications due to other vascular devic', 'Hematoma complicating a procedure', 'Ulcer of other part of foot', 'Hemorrhage complicating a procedure', 'Iron deficiency anemia secondary to blood loss (chronic)', 'Cardiac complication', 'Atherosclerosis of native arteries of the extremities with ulceration', 'Other specified cardiac dysrhythmias', 'Other iatrogenic hypotension', 'Unspecified essential hypertension', 'Unspecified disorder of kidney and ureter', 'Other (peripheral) vascular shunt or bypass', 'Other incision with drainage of skin and subcutaneous tissue', 'Arteriography of femoral and other lower extremity arteries', 'Transfusion of packed cells', 'Mitral valve insufficiency and aortic valve stenosis', 'Acute kidney failur', 'Iatrogenic cerebrovascular infarction or hemorrhage', 'Cerebral artery occlusio', 'Other respiratory complications', 'organism NOS', 'Cardiac complication', 'Diseases of tricuspid valve', 'Chronic kidney diseas', 'Other convulsions']
let num = [7.93433819e-10,3.23196442e-10,3.13915588e-10,3.23196442e-10
,   1.11844956e-09,1.47438628e-09,1.19812471e-09,9.23382829e-11
,   5.78189052e-10,2.46653542e-08,1.89596183e-09,2.93789149e-09
,   4.36330154e-08,2.77250756e-08,7.64270851e-08,5.24703562e-01
,   1.74071360e-02,1.05995558e-01,6.52995333e-02,1.05995558e-01
,   5.46692759e-02,1.05995558e-01,4.70548589e-03,8.54975544e-03
,   6.67840894e-03];
let visit = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];

let data = [];
let group = [{
    "vindex": visit[0],
    "vwidget": visit[0],
    "vfirst": 1,
    "vlast": 1
}];

let ws = [num[0]];
let max = num[0];
let step = 40;
let v = 1;
for (let i = 0; i < arr.length; i++) {
    data.push({
        "diag": arr[i],
        "value": num[i],
        "visit": visit[i],
        "i": i
    });
    if (i != 0) {
        if (visit[i] != visit[i - 1]) {
            ws.push(num[i]);
            v++;
        } else {
            ws[v-1] += num[i];
        }
    }

}
// console.log(ws);

drawWords(data);
function drawWords(data) {
    // console.log(data);
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
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let rects = group.append("g").attr("class","bgRect");
    rects.selectAll("rect").data(data).enter()
        .append("rect")
        .attr("x",function (d) {
            // console.log(d);
            return d.i * step-8
        })
        .attr("y", function (d) {
            return +d.i*step*0.58+450-14;
        })
        .attr("width",function (d,i) {
            // return d.diag.length*9
            return (func(num[i]*1000)-0.5)*1000
        })
        .attr("height", function (d) {
            return 18;
        })
        .attr("transform", "rotate(-30)")
        .style("fill","red")
        .attr("opacity", function (d,j) {
            // console.log(num[j]);
            return (func(num[j]*1000)-0.5)*2;
        });


    let texts = group.append("g").attr("class", "texts");
    texts.selectAll(".vindex")
        .data(data).enter()
        .append("text")
        .attr("class", "vindex")
        .attr("dx", function (d) {
            return d.i * step;
        })
        .attr("dy", function (d) {
            return d.i*step*0.58+450;
        })
        .text(function (d) {
            return d.diag;
        }).attr("fill", "black")
        .attr("transform", "rotate(-30)");

    let cirs = group.append("g").attr("class", "cirs");
    cirs.selectAll("circle")
        .data(data).enter()
        .append("circle")
        .attr('class', 'cir')
        .attr("cx", function (d) {
            return d.i * step*1.15 + 214
        })
        .attr("cy", 405)
        .attr("r", 14)
        .style("fill", "green")
        .attr("opacity",function (d) {
            // console.log(ws[d.visit-1]);
            return (func(ws[d.visit-1]*1000)-0.5)*2;
        });

    group.append("g").attr("class", "visits")
        .selectAll(".visit")
        .data(data).enter()
        .append("text")
        .attr("class", "visit")
        .attr("dx", function (d) {
            return d.i * step*1.15 + 211;
            // return 20
        })
        .attr("dy", 412)
        .text(function (d) {
            return d.visit;
        }).attr("fill", "black")
}

function func(x) {
        return 1 / (1 + Math.pow(Math.E, -x))
}