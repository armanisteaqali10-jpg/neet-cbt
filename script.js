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
    let color = answers[q] === i ? "#a5d6a7" : "";
    html += `<button style="background:${color}" onclick="answers[${q}]=${i}; loadQ();">${op}</button>`;
  });
  document.getElementById("options").innerHTML = html;
}

function nextQ(){ if(q<questions.length-1){ q++; loadQ();}}
function prevQ(){ if(q>0){ q--; loadQ(); }}

function submitTest(){
  let score = 0;
  questions.forEach((x,i)=>{
    if(answers[i]==x.a) score+=4;
  });

  let name = prompt("Enter your name for the leaderboard:");
  if(!name) name = "Anonymous";

  let timeLeft = document.getElementById("timer").innerText;

  let formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdt4QbbCFHnlz9duQ9LT2rj_arrnjUzhf4VjHWbTctxbDv_Tg/formResponse";

  let submitUrl = `${formUrl}?entry.1017886912=${encodeURIComponent(name)}&entry.86745479=${encodeURIComponent(score)}&entry.624537347=${encodeURIComponent(timeLeft)}`;

  fetch(submitUrl, { method: "POST", mode: "no-cors" });

  alert("Submitted!\nName: " + name + "\nScore: " + score);
}

// Timer code
setInterval(()=>{
  time--;
  let h = String(Math.floor(time/3600)).padStart(2,'0');
  let m = String(Math.floor(time % 3600 / 60)).padStart(2,'0');
  let s = String(time % 60).padStart(2,'0');
  document.getElementById("timer").innerHTML = h+":"+m+":"+s;

  if(time <= 0){
    submitTest();
  }
},1000);

loadQ();
