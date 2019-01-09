let lives = 3;
let scores = 0;
const startGame = function(eggId, eggMargin) {
  let timer = 30;
  let interval = setInterval(function() {
    let life = getElement("live");
    let basket = getElement("basket");
    let egg = getElement(eggId);
    dropEgg(egg, eggMargin);
    catchEgg(egg, interval, basket);
    initializeMissedegg(egg, life, interval);
  }, timer);
};

const getDimension = function(element, attribute) {
  return +element.style[attribute].replace("px", "");
};

const getElement = function(id) {
  return document.getElementById(id);
};

const dropEgg = function(egg, eggMargin) {
  let topIncrement = 10;
  let eggTopValue = getDimension(egg, "top") + topIncrement + "px";
  egg.style.marginLeft = eggMargin + "px";
  egg.style.top = eggTopValue;
};

const catchEgg = function(egg, interval, basket) {
  let eggTop = getDimension(egg, "top");
  let eggLeft = getDimension(egg, "marginLeft");
  let basketLeft = getDimension(basket, "marginLeft");
  let basketTop = 590;
  let basketWidth = 200;
  let eggInitialTop = -160;
  if (
    eggTop > basketTop &&
    eggLeft > basketLeft &&
    eggLeft < basketLeft + basketWidth
  ) {
    scores = scores + 1;
    getElement("score").innerText = scores;
    egg.style.top = eggInitialTop + "px";
    clearInterval(interval);
  }
};

const gameOverAction = function(lives) {
  if (lives <= 0) {
    getElement("container").style.textAlign = "center";
    getElement("container").innerHTML =
      "<h1 id='message'>GAME OVER</h1><h2>Your Score is :" +
      scores +
      "</h2><button class='restart' onclick='reload()'>RESTART</button>";
    getElement("message").style.backgroundColor = "black";
    getElement("message").style.width = "500px";
    getElement("message").style.height = "300px";
    getElement("message").style.borderRadius = "5%";
  }
};

const initializeMissedegg = function(egg, life, interval) {
  let pageTop = 650;
  let eggInitialTop = -160;
  if (getDimension(egg, "top") > pageTop - 50) {
    egg.src = "images/omlet.png";
  }
  if (getDimension(egg, "top") > pageTop) {
    egg.style.top = eggInitialTop + "px";
    lives -= 1;
    life.innerText = lives;
    egg.src = "images/egg.png";
    gameOverAction(lives);
    clearInterval(interval);
  }
};

const moveLeft = function(basketStyle, basketMarginLeft) {
  let pageExtremeLeft = -10;
  if (basketMarginLeft >= pageExtremeLeft) {
    basketStyle.marginLeft = basketMarginLeft - 15 + "px";
  }
};

const moveRight = function(basketStyle, basketMarginLeft) {
  let pageExtremeRight = 1200;
  if (basketMarginLeft <= pageExtremeRight) {
    basketStyle.marginLeft = basketMarginLeft + 15 + "px";
  }
};

const startMovement = function() {
  let timer = 3000;
  let eggId = 1;
  setInterval(function() {
    let eggMargin = Math.floor(Math.random() * 1000 + 1);
    startGame(eggId, eggMargin);
  }, timer);
};

const getMovement = function(event) {
  let events = new Object();
  events["ArrowLeft"] = moveLeft;
  events["ArrowRight"] = moveRight;
  let basket = getElement("basket");
  let basketMarginLeft = getDimension(basket, "marginLeft");
  events[event.key](basket.style, basketMarginLeft);
};

const reload = function() {
  document.location.reload();
};
