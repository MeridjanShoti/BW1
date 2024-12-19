
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

  const questions = [];
  const newArr = [] 

  fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy')
    .then(response => {
      return response.json();
    })
    .then(data => {
      questions.push(...data.results);  //Inserisce gli oggetti nel tuo array locale 
      addQuestion(0)
    })
    .catch(error => {
      console.error('Errore durante il fetch:', error);
    });

   /*  const questions = [
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
 */
// Mischio l'array 

console.log(questions)
const shuffledObj = questions.sort((a, b) => 0.5 - Math.random());


// Imposto le variabili per il numero di risposte, il numero di quelle giuste e quelle sbagliate
let questionNumber = 0;
let totAnswersCorrects = 0;
let totAnswersWrongs = 0;

// Funzione per la gestione delle domande
const addQuestion = n => {

// Imposto un array che serve per creare i bottoni
const myAnswersArr = [];

// Inserisco il tag per le domande
let question = document.querySelector('div.question')
let h1 = document.createElement('h1')
h1.innerHTML = questions[n].question
question.appendChild(h1)



// Aggiungo le risposte in un array 
let form = document.querySelector('form');

// Inserisco la risposta corretta nell'array
myAnswersArr.push(questions[n].correct_answer);

// Inserisco tutte le risposte sbagliate nell'array
for (let i = 0; i < questions[n].incorrect_answers.length; i++) {
  myAnswersArr.push(questions[n].incorrect_answers[i])
}

// Mischio l'array 
const shuffledArray = myAnswersArr.sort((a, b) => 0.5 - Math.random());

// Produco i bottoni in base alle risposte
for (let i = 0; i < myAnswersArr.length; i++) {
  let button = document.createElement('button')
  button.classList.add("normal")
  button.innerHTML = myAnswersArr[i]
  button.addEventListener('click', function (ele) {
    ele.preventDefault();
    answer(button.innerHTML);
    const allButtons = form.querySelectorAll("button");
    allButtons.forEach(btn => {
      btn.disabled = true; // Disabilita il bottone
    });
})

// Inserisco i bottoni nel form
form.appendChild(button)
}

// Imposto il footer per identificare il numero di domanda e il numero totale di domande
let footer = document.querySelector('#question')
footer.innerHTML = `question ${n+1} <span> / ${questions.length}</span>`;

// Imposto il timer per le domande 
const full_dash_array = 283;

// Imposto il tempo per cambiare il colore in arancione
const warning_threshold = 10;

// Imposto il tempo per cambiare il colore in rosso
const alert_threshold = 5;

const color_codes = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: warning_threshold
  },
  alert: {
    color: "red",
    threshold: alert_threshold
  }
};

// Imposto il tempo per ogni domanda
const time_limit = 30;
let timePassed = 0;
let timeLeft = time_limit;
let timerInterval = null;
let remainingPathColor = color_codes.info.color;

// Imposto l'HTML con la variabile che deve cambiare per la diminuzione del tempo colorato in azzurro
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

// Faccio partire il timer ad ogni nuova domanda
startTimer();

// Alla fine del tempo imposto come se la risposta è stata data ma con testo vuoto e di conseguenza errato
function onTimesUp() {
  answer();
}

// Questa funzione gestisce la parte in HTML che viene modificata fino a quando non arriva a zero
function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = time_limit - timePassed;
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

// Questa funzione imposta il cambio di colore dei secondi 
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
// Questa funzione serve per il cambio di colore della parte HTML
function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = color_codes;
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

// Questa funzione calcola le frazioni di HTML da togliere all'immagine svg
function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / time_limit;
  return rawTimeFraction - (1 / time_limit) * (1 - rawTimeFraction);
}

// Questa funzione imposta la modalità in cui togliere le frazione da svg
function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * full_dash_array
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

// Questa funzione controlla le risposte, resetta il timer, aggiunge un numero alla variabili giuste o sbagliate in base al confronto
// Aggiunge anche i colori della risposta se esatta o errata
function answer(a) {
  clearInterval(timerInterval);
  if (a === questions[questionNumber].correct_answer ) {
    totAnswersCorrects +=1;
    //ho aggiunto un p direttamente dall'html con id feedback e cambia colore e contenuto a seconda della risposta
    document.getElementById("feedback").innerText = "Risposta corretta"
    document.getElementById("feedback").style.color = "green"
    for (element of form){
      if (element.innerText === questions[questionNumber].correct_answer){
        element.className = "green"
      }
    }
  } else {
    totAnswersWrongs +=1;
    document.getElementById("feedback").innerText = "Risposta errata"
    document.getElementById("feedback").style.color = "red"
      if (a !== undefined){
      if (event.target.innerText !== questions[questionNumber].correct_answer){
        event.target.className = "red"
      }
    }
    for (element of form){
      if (element.innerText === questions[questionNumber].correct_answer){
        element.className = "green"
      }
    }
  }
  //formattazione comune del p di feedback
    document.getElementById("feedback").style.fontWeight = "600"
    document.getElementById("feedback").style.textAlign = "center"
    document.getElementById("feedback").style.paddingTopTop = "2em"
  
questionNumber +=1;
setTimeout(() => {
// Cancello l'h1 e i bottoni
document.getElementById("feedback").innerText = "";
let h1 = document.querySelector('h1');
h1.parentElement.removeChild(h1);
for (let i = 0; i < myAnswersArr.length; i++) {
  const b = document.querySelector("button");
  b.parentElement.removeChild(b);
}

// Svuoto l'array delle risposte
myAnswersArr.length = 0;

// Se sono arrivato all'ultima domanda salvo le variabili in Local Storage altrimenti passo alla prossima domanda
if (questionNumber === questions.length) {
  localStorage.setItem("risposteGiuste", totAnswersCorrects);
  localStorage.setItem("risposteSbagliate", totAnswersWrongs);
  window.location.href = "./results.html"
} else {
  addQuestion(questionNumber)
}
}, 2000);
}

}

// Alla'avvio della pagina parto subito con la prima domanda
/* addQuestion(questionNumber); */

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

// Soluzione trovata (da verificare se va bene)

stars.forEach (star => {
  star.addEventListener('mouseover',() => {
    if (enable === true) {
      highlightStars (star.dataset.value);
    }
  })
  star.addEventListener('click', () => {
    if (enable === true) {
      enable = false;
      highlightStars (star.dataset.value);
    } else {
      enable = true;
      highlightStars (star.dataset.value);
    }
  })
})
function feedback () {
  let textarea = document.querySelector('textarea');
  textarea.addEventListener ('keypress', function (e){
    if (e.key === 'Enter') {
      document.getElementById('textareafeedback').innerHTML = 
      `<p id="lastparaph">Thank you for your feedback!</p> <br/>
      <a href="https://www.epicode.com"><button class="neonButton"> MORE INFO </button></a>`
      document.getElementById("lastparaph").style.margin = "30vh 0 2em 0"
      
      
    }
   
  })
}
feedback ()
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

// Genera il summary
const summary = generaSummary(somma);

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

