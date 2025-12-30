let q = 0;
let time = 10800; // 3 hours
let answers = [];
let marked = [];
let visited = [];

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
  visited[q] = true;

  document.getElementById("questionBox").innerHTML =
    `Q${q+1}. ${questions[q].q}`;

  let html = "";
  questions[q].o.forEach((op,i)=>{
    let bg = "";
    if(answers[q] === i) bg = "#c8e6c9";       // answered
    if(marked[q]) bg = "#e1bee7";              // marked
    html += `<button style="background:${bg}" onclick="selectAns(${i})">${op}</button>`;
  });
  document.getElementById("options").innerHTML = html;
}

function selectAns(i){
  answers[q] = i;
  loadQ();
}

function nextQ(){ if(q < questions.length-1){ q++; loadQ(); } }
function prevQ(){ if(q > 0){ q--; loadQ(); } }

function mark(){
  marked[q] = !marked[q];
  loadQ();
}

function openSummary(){
  let answered = 0, m = 0, notAns = 0;

  for(let i=0;i<questions.length;i++){
    if(marked[i]) m++;
    else if(answers[i] !== undefined) answered++;
    else notAns++;
  }

  document.body.innerHTML = `
    <div style="padding:20px;font-family:Arial">
      <h2>Test Summary</h2>
      <p>Answered: ${answered}</p>
      <p>Marked for Review: ${m}</p>
      <p>Not Answered: ${notAns}</p>
      <button onclick="submitTest()" style="padding:10px;width:100%;font-size:16px;background:#1e88e5;color:white">
        Confirm Submit
      </button>
    </div>
  `;
}

function submitTest(){
  let score = 0;
  questions.forEach((x,i)=>{
    if(answers[i] === x.a) score += 4;
    else if(answers[i] !== undefined) score -= 1;
  });

  document.body.innerHTML = `
    <div style="padding:20px;text-align:center;font-family:Arial">
      <h2>Test Submitted</h2>
      <p>Your Score</p>
      <h1>${score}</h1>
    </div>
  `;
}

// TIMER
setInterval(()=>{
  time--;
  let h = String(Math.floor(time/3600)).padStart(2,'0');
  let m = String(Math.floor(time%3600/60)).padStart(2,'0');
  let s = String(time%60).padStart(2,'0');
  document.getElementById("timer").innerText = `${h}:${m}:${s}`;
  if(time <= 0) submitTest();
},1000);

loadQ();
