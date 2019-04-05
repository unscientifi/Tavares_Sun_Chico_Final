//https://www.taniarascia.com/how-to-create-a-memory-game-super-mario-with-plain-javascript/
//Here is an easy tutorial for a memory game. There are a lot of links to additional articles about DOM, HTML, JS variables and etc. which is very helpful

(() => {
  console.log('memory game fired!');

//Cards displayed
const cardsArray = [{
    'name': 'pill',
    'img': 'images/game/card1.png',
  },
  {
    'name': 'echometer',
    'img': 'images/game/card2.png',
  },
  {
    'name': 'tooth',
    'img': 'images/game/card3.png',
  },
  {
    'name': 'heart',
    'img': 'images/game/card4.png',
  },
  {
    'name': 'microscope',
    'img': 'images/game/card5.png',
  },
  {
    'name': 'briefcase',
    'img': 'images/game/card6.png',
  },
];

let gameGrid = cardsArray.concat(cardsArray);
//Math.random is to shuffle cards in random order every time the page gets refreshed
gameGrid.sort(() => 0.5 - Math.random());

//set variables
var firstGuess = '';
var secondGuess = '';
var count = 0;
var previousTarget = null;
var delay = 1200;
var timerStarted = false;
var score = 0;
let modal = document.getElementById("window")
let closeicon = document.querySelector(".close");

//Here we are grabbing the div called game we created in our HTML
var game = document.getElementById('game');
//Creating a section with a class of grid, because cards are displayed in a grid
var grid = document.createElement('section');
grid.setAttribute('class', 'grid'); //we are setting an attribute class of grid
game.appendChild(grid);

gameGrid.forEach(function (item) {
  var name = item.name,
      img = item.img;

//creating divs that are gonna be our cards. we are giving them c lass of card
  var card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

//this is a div for a front face of the card
  var front = document.createElement('div');
  front.classList.add('front');

//this is a div for a back face of the card
  var back = document.createElement('div');
  back.classList.add('back'); //an attribute of class
  back.style.backgroundImage = `url(${item.img})`;

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

//variable if two cards match each other
var match = function match() {
  score ++;
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.add('match');
  });
  //timer stops when player matches all of the pairs
  if (score == 6) {
    clearInterval(interval);
    finalTime = timer.innerHTML;
    modal.classList.add("show");
          //showing move, rating, time on modal
          document.getElementById("totalTime").innerHTML = finalTime;

          //closeicon on modal
          closeModal();
      };
  }
  function closeModal(){
      closeicon.addEventListener("click", function(e){
          modal.classList.remove("show");
          startGame();
      });
  };



//variable for resetting guesses
var resetGuesses = function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  count = 0;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.remove('selected');
  });
};

//adding event listener to make cards get selected and flip when clicked
grid.addEventListener('click', function (event) {
  if (timerStarted === false) {
    startTimer();
  }
  var clicked = event.target;
//this prevents the grid from being clicked. only the divs inside grid can be clicked
  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected')) {
    return;
  }


//this only lets to select 2 cards at a time
  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }
});


    //timer add interval
  var second = 0, minute = 0; hour = 0;
  var timer = document.querySelector(".timer");
  var interval;
  function startTimer(){
    //debugger;
    timerStarted = true;
    //remove the vent listener from all the cards
      interval = setInterval(function(){
        console.log ('timer fired!');
          timer.innerHTML = minute+"mins "+second+"secs";
          second++;
          if(second == 60){
              minute++;
              second=0;
          }
          if(minute == 60){
              hour++;
              minute = 0;
          }
      },1000);
  }

  //start timer on the firt move
  function firstMove(){
    //debugger;
    startTimer();
  }
  //If player guessed all cards timer stops


})();

//loop through all the cards for each
 //timer.addEventListener("click", startTimer);
