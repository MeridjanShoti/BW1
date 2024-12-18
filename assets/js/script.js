
// Inizio script prima pagina
if (window.location.href.match('index.html') != null) {

let termsConditions = document.querySelector('#terms input')

let proceed = document.querySelector('#proceed')


let checkAndGo = function (){
    if (termsConditions.checked && termsConditions.value === "ok"){

        window.location.href = "./test.html" } else {
            window.alert("Flag Your Promise or Go Home !!!")
        }

}

proceed.addEventListener('click', checkAndGo)
}
// Fine script prima pagina

// Codice aggiunto da Timoteo per la sua pagina 

if (window.location.href.match('test.html') != null) {

    const questions = [
        {
          category: "Science: Computers",
          type: "multiple",
          difficulty: "easy",
          question: "What does CPU stand for?",
          correct_answer: "Central Processing Unit",
          incorrect_answers: [
            "Central Process Unit",
            "Computer Personal Unit",
            "Central Processor Unit",
          ],
        },
        {
          category: "Science: Computers",
          type: "multiple",
          difficulty: "easy",
          question:
            "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
          correct_answer: "Final",
          incorrect_answers: ["Static", "Private", "Public"],
        },
        {
          category: "Science: Computers",
          type: "boolean",
          difficulty: "easy",
          question: "The logo for Snapchat is a Bell.",
          correct_answer: "False",
          incorrect_answers: ["True"],
        },
        {
          category: "Science: Computers",
          type: "boolean",
          difficulty: "easy",
          question:
            "Pointers were not used in the original C programming language; they were added later on in C++.",
          correct_answer: "False",
          incorrect_answers: ["True"],
        },
        {
          category: "Science: Computers",
          type: "multiple",
          difficulty: "easy",
          question:
            "What is the most preferred image format used for logos in the Wikimedia database?",
          correct_answer: ".svg",
          incorrect_answers: [".png", ".jpeg", ".gif"],
        },
        {
          category: "Science: Computers",
          type: "multiple",
          difficulty: "easy",
          question: "In web design, what does CSS stand for?",
          correct_answer: "Cascading Style Sheet",
          incorrect_answers: [
            "Counter Strike: Source",
            "Corrective Style Sheet",
            "Computer Style Sheet",
          ],
        },
        {
          category: "Science: Computers",
          type: "multiple",
          difficulty: "easy",
          question:
            "What is the code name for the mobile operating system Android 7.0?",
          correct_answer: "Nougat",
          incorrect_answers: [
            "Ice Cream Sandwich",
            "Jelly Bean",
            "Marshmallow",
          ],
        },
        {
          category: "Science: Computers",
          type: "multiple",
          difficulty: "easy",
          question: "On Twitter, what is the character limit for a Tweet?",
          correct_answer: "140",
          incorrect_answers: ["120", "160", "100"],
        },
        {
          category: "Science: Computers",
          type: "boolean",
          difficulty: "easy",
          question: "Linux was first created as an alternative to Windows XP.",
          correct_answer: "False",
          incorrect_answers: ["True"],
        },
        {
          category: "Science: Computers",
          type: "multiple",
          difficulty: "easy",
          question:
            "Which programming language shares its name with an island in Indonesia?",
          correct_answer: "Java",
          incorrect_answers: ["Python", "C", "Jakarta"],
        },
      ];

let questionNumber = 0;
let totAnswersCorrects = 0;
let totAnswersWrongs = 0;


const addQuestion = n => {

const myAnswersArr = [];
let question = document.querySelector('div.question')
let h1 = document.createElement('h1')
h1.innerHTML = questions[n].question
question.appendChild(h1)

let footer = document.querySelector('footer p')
footer.innerHTML = `question ${n+1} <span> / ${questions.length}</span>`;

// Aggiungo le risposte in un array 
let form = document.querySelector('form');

myAnswersArr.push(questions[n].correct_answer);
for (let i = 0; i < questions[n].incorrect_answers.length; i++) {
  myAnswersArr.push(questions[n].incorrect_answers[i])
}

// mischio l'array 
const shuffledArray = myAnswersArr.sort((a, b) => 0.5 - Math.random());

// produco i bottoni in base alle risposte
for (let i = 0; i < myAnswersArr.length; i++) {
  let button = document.createElement('button')
  button.innerHTML = myAnswersArr[i]
  button.addEventListener('click', function (ele) {
    ele.preventDefault();
    answer(button.innerHTML);
    
})

  form.appendChild(button)
}

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};


const TIME_LIMIT = 120;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;


document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

startTimer();

function onTimesUp() {
  answer();
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  //const minutes = Math.floor(time / 60);

  if (time > 5 && time < 10) {
    //seconds = `0${seconds}`;
    const label = document.getElementById("base-timer-label").style.color = 'orange';
  } else if (time <= 5) {
    const label = document.getElementById("base-timer-label").style.color = 'red';
  }
  return `${time}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

function answer(a) {
  clearInterval(timerInterval);
  console.log(a);
  if (a === questions[questionNumber].correct_answer ) {
    totAnswersCorrects +=1;
  } else {
    totAnswersWrongs +=1;
  }
questionNumber +=1;
let h1 = document.querySelector('h1');
h1.parentElement.removeChild(h1);
for (let i = 0; i < myAnswersArr.length; i++) {
  const b = document.querySelector("button");
  b.parentElement.removeChild(b);
}
myAnswersArr.length = 0;

if (questionNumber === questions.length) {
  localStorage.setItem("risposteGiuste", totAnswersCorrects);
  localStorage.setItem("risposteSbagliate", totAnswersWrongs);
  console.log(localStorage)
  window.location.href = "./results.html"
} else {
  addQuestion(questionNumber)
}

}

}
addQuestion(questionNumber);

}
// Fine codice Timoteo
if (window.location.href.match('review.html') != null) {
//Inizio Script Juliet
const stars = document.querySelectorAll ('.star')
const starsContainer = document.querySelector ('#star-container')

let selectedValue = 0;
let enable = true
//evidenzio le stelle
function highlightStars (value) {
    stars.forEach (star => {
        if (star.dataset.value <= value) { //dataset è per poter leggerere datavalue (stelle) in html 
            star.classList.add ('selected');

        } else {
            star.classList.remove ('selected');
        }
    });
}
stars.forEach (star => {
  console.log(enable)
  if(enable===true){
    star.addEventListener('mouseover',() => {
        highlightStars (star.dataset.value);
    })
  }
})

stars.addEventListener('click', () => {
  
    /* selectedValue = stars.dataset.value;
    highlightStars(selectedValue); */
    
});

stars.addEventListener('mouseout', () => {
  enable = false
});

}
//Fine Script Juliet

if (window.location.href.match('results.html') != null) {
//giulio js//
// Funzione per calcolare la percentuale e il conteggio
const risposteGiuste = parseInt(localStorage.getItem("risposteGiuste"))
  const risposteSbagliate = parseInt(localStorage.getItem("risposteSbagliate"))
  let somma = risposteGiuste + risposteSbagliate
function generaSummary() {
  // Conta le risposte giuste e sbagliate
  // Calcola le percentuali
  const percentualeGiuste = (risposteGiuste / somma) * 100;
  const percentualeSbagliate = (risposteSbagliate / somma) * 100;
  


  // Genera il summary
  const summary = {
    totaleRisposte: somma,
    corrette: risposteGiuste,
    sbagliate: risposteSbagliate,
    percentualeCorrette: percentualeGiuste.toFixed(1), // 2 decimali
    percentualeSbagliate: percentualeSbagliate.toFixed(1) // 2 decimali
  };

  return summary;
}
/*let box=document.createElement('section');
  let correct =document.querySelector('main div p');
  correct.appendChild(box);
  box.appendChild(percentualeGiuste);
  let box1=document.createElement('section');
  let nocorrect=document.getElementById("sbagliato");
  nocorrect.appendChild(box1);
  box1.appendChild(percentualeSbagliate);*/

// Genera il summary
const summary = generaSummary(somma);

// Mostra il summary in console
console.log("Summary delle risposte:");
console.log(`Totale risposte: ${summary.totaleRisposte}`);
console.log(`Corrette: ${summary.corrette} (${summary.percentualeCorrette}%)`);
console.log(`Sbagliate: ${summary.sbagliate} (${summary.percentualeSbagliate}%)`);

//chart meridjan

        document.getElementById("correctPerc").innerText= summary.percentualeCorrette + "%";
        document.getElementById("wrongPerc").innerText= summary.percentualeSbagliate + "%";
        document.getElementById("correctRate").innerText= `${risposteGiuste}/${risposteGiuste+risposteSbagliate} questions`;
        document.getElementById("wrongRate").innerText=`${risposteSbagliate}/${risposteGiuste+risposteSbagliate} questions`;
        if(summary.percentualeCorrette>=60){
            document.getElementById("p1").innerText="Congratulations!";
            document.getElementById("p2").innerText="You passed the exam.";
            document.getElementById("p3").innerText="We'll send you the certificate in few minutes."
            document.getElementById("p4").innerText="Check your email (including promotions / spam)";
        }
        else{
            document.getElementById("p1").innerText="Sorry!";
            document.getElementById("p2").innerText="You didn't passed the exam.";
            document.getElementById("p3").innerText="You can retry to get the certification by consulting your teacher.";
        }
        const ctx = document.getElementById('myChart');
      
        new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                label: 'answers',
                data: [summary.percentualeSbagliate, summary.percentualeCorrette],
                borderWidth: 0,
                backgroundColor: ["#C2128D", "#00FFFF"]
            }]
        },
        options: {
            cutout: '70%',
        }
    });


}

