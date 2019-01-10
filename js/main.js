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

const hasTouchedGround = function(eggPosition, pageTop) {
  return eggPosition > pageTop;
};

const isInBasket = function(eggTop, eggLeft, basketLeft) {
  let basketTop = 590;
  let basketWidth = 200;
  return (
    eggTop > basketTop &&
    eggLeft > basketLeft &&
    eggLeft < basketLeft + basketWidth
  );
};

const getPosition = function(element, attribute) {
  return +element.style[attribute].replace("px", "");
};

const getElement = function(id) {
  return document.getElementById(id);
};

const dropEgg = function(egg, eggMargin) {
  let topIncrement = 10;
  let eggTopValue = getPosition(egg, "top") + topIncrement + "px";
  egg.style.marginLeft = eggMargin + "px";
  egg.style.top = eggTopValue;
};

const catchEgg = function(egg, interval, basket) {
  let eggTop = getPosition(egg, "top");
  let eggLeft = getPosition(egg, "marginLeft");
  let basketLeft = getPosition(basket, "marginLeft");
  let eggInitialTop = -160;
  // if (eggTop == 560 && eggLeft > basketLeft && eggLeft < basketLeft + 200) {
  //   basket.src = "images/henwithegg.png";
  // }
  if (isInBasket(eggTop, eggLeft, basketLeft)) {
    // basket.src = "images/basket.png";
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
      "<img id='message' src='/images/gameOver.png'><h2>Your Score is :" +
      scores +
      "</h2><button class='restart' onclick='restart()'>RESTART</button>";
    getElement("message").style.width = "500px";
    getElement("message").style.height = "300px";
    getElement("message").style.borderRadius = "5%";
  }
};

const initializeMissedegg = function(egg, life, interval) {
  let pageTop = 650;
  let eggInitialTop = -160;
  let eggPosition = getPosition(egg, "top");
  if (eggPosition > pageTop - 50) {
    egg.src = "/images/omlet.png";
  }
  if (hasTouchedGround(eggPosition, pageTop)) {
    egg.style.top = eggInitialTop + "px";
    lives -= 1;
    life.innerText = lives;
    egg.src = "/images/egg.png";
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
  let basketMarginLeft = getPosition(basket, "marginLeft");
  events[event.key](basket.style, basketMarginLeft);
};

const restart = function() {
  document.location.reload();
  startMovement();
};
