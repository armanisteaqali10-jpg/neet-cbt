let q = 0;
let time = 10800;
let answers = [];
let marked = [];

let mockPath = "mocks/mock1/";
let totalQuestions = 0;

function loadAnswers() {
  let s = document.createElement("script");
  s.src = mockPath + "answers.js";
  s.onload = () => {
    totalQuestions = window.mockAnswers.length;
    loadQ();
  };
  document.body.appendChild(s);
}

function loadQ() {
  document.getElementById("questionBox").innerHTML = `
    <h3>Question ${q + 1}</h3>
    <img src="${mockPath}q${q + 1}.png" style="max-width:100%;margin-top:10px;">
  `;

  let html = "";
  ["A","B","C","D"].forEach(opt => {
    let bg = "";
    if (answers[q] === opt) bg = "#c8e6c9";
    if (marked[q]) bg = "#e1bee7";

    html += `<button style="background:${bg}" onclick="selectAns('${opt}')">${opt}</button>`;
  });

  document.getElementById("options").innerHTML = html;
}

function selectAns(opt) {
  answers[q] = opt;
  loadQ();
}

function nextQ() {
  if (q < totalQuestions - 1) { q++; loadQ(); }
}

function prevQ() {
  if (q > 0) { q--; loadQ(); }
}

function mark() {
  marked[q] = !marked[q];
  loadQ();
}

function openSummary() {
  let a=0,m=0,na=0;
  for (let i=0;i<totalQuestions;i++){
    if(marked[i]) m++;
    else if(answers[i]) a++;
    else na++;
  }

  document.body.innerHTML = `
    <div style="padding:20px;font-family:Arial">
      <h2>Test Summary</h2>
      <p>Answered: ${a}</p>
      <p>Marked: ${m}</p>
      <p>Not Answered: ${na}</p>
      <button onclick="submitTest()" style="width:100%;padding:12px;font-size:16px;background:#1e88e5;color:white">
        Confirm Submit
      </button>
    </div>
  `;
}

function submitTest() {
  let score = 0;
  window.mockAnswers.forEach((c,i)=>{
    if (answers[i] === c) score += 4;
    else if (answers[i]) score -= 1;
  });

  document.body.innerHTML = `
    <div style="text-align:center;padding:20px;font-family:Arial">
      <h2>Test Submitted</h2>
      <h1>${score}</h1>
    </div>
  `;
}

setInterval(()=>{
  time--;
  let h = String(Math.floor(time/3600)).padStart(2,'0');
  let m = String(Math.floor(time%3600/60)).padStart(2,'0');
  let s = String(time%60).padStart(2,'0');
  document.getElementById("timer").innerText = `${h}:${m}:${s}`;
  if(time<=0) submitTest();
},1000);

window.onload = loadAnswers;
