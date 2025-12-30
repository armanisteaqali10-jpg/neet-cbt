let q = 0;
let time = 10800;
let answers = [];

let questions = [
  {
    q: "Which hormone regulates metabolism?",
    o: ["Insulin", "Thyroxine", "Adrenaline", "Glucagon"],
    a: 1
  },
  {
    q: "Unit of heredity is?",
    o: ["Cell", "Gene", "Chromosome", "DNA"],
    a: 1
  }
];

function loadQ() {
  document.getElementById("questionBox").innerHTML =
    (q+1)+". "+questions[q].q;

  let html = "";
  questions[q].o.forEach((op,i)=>{
    html += `<button onclick="answers[${q}]=${i}">${op}</button>`;
  });
  document.getElementById("options").innerHTML = html;
}

function nextQ(){ if(q<questions.length-1){ q++; loadQ();}}
function prevQ(){ if(q>0){ q--; loadQ();}}
function mark(){ alert("Marked for review"); }

function submitTest(){
  let score = 0;
  questions.forEach((x,i)=>{
    if(answers[i]==x.a) score+=4;
  });
  alert("Test submitted! Score: "+score);
}

setInterval(()=>{
  time--;
  let h = String(Math.floor(time/3600)).padStart(2,'0');
  let m = String(Math.floor(time%3600/60)).padStart(2,'0');
  let s = String(time%60).padStart(2,'0');
  document.getElementById("timer").innerHTML = h+":"+m+":"+s;
},1000);

loadQ();
