let lives = 3;
let scores = 0;

const checkEggStatuses = function(egg, basket, life, interval, eggMargin) {
  dropEgg(egg, eggMargin);
  catchEgg(egg, interval, basket);
  missedEggs(egg, life, interval);
  return;
};

const getGameElements = function(eggId) {
  let life = getElement("live");
  let basket = getElement("basket");
  let egg = getElement(eggId);
  return { life, egg, basket };
};

const startGame = function(eggId, eggMargin) {
  let timer = 20;
  let interval = setInterval(function() {
    let { life, egg, basket } = getGameElements(eggId);
    checkEggStatuses(egg, basket, life, interval, eggMargin);
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

const moveEggDownwards = function(egg) {
  let topIncrement = 10;
  let eggTopValue = getPosition(egg, "top") + topIncrement + "px";
  return eggTopValue;
};

const dropEgg = function(egg, eggMargin) {
  egg.style.marginLeft = eggMargin + "px";
  egg.style.top = moveEggDownwards(egg);
};

const getObjectDetails = function(egg, basket) {
  let eggTop = getPosition(egg, "top");
  let eggLeft = getPosition(egg, "marginLeft");
  let basketLeft = getPosition(basket, "marginLeft");
  return { eggTop, eggLeft, basketLeft };
};

const incrementScore = function() {
  return scores++;
};

const catchEgg = function(egg, interval, basket) {
  let { eggTop, eggLeft, basketLeft } = getObjectDetails(egg, basket);

  if (isInBasket(eggTop, eggLeft, basketLeft)) {
    incrementScore();
    getElement("score").innerText = scores;
    egg.style.top = "-160px";
    clearInterval(interval);
  }
};

const isLivesOver = function(lives) {
  return lives <= 0;
};

const customiseMessageBody = function() {
  getElement("message").style.width = "500px";
  getElement("message").style.height = "300px";
  getElement("message").style.borderRadius = "5%";
};

const createMessageBody = function() {
  getElement("container").innerHTML =
    "<img id='message' src='/images/gameOver.png'><h2>Your Score is :" +
    scores +
    "</h2><button class='restart' onclick='restart()'>RESTART</button>";
};

const gameOverAction = function(lives) {
  if (isLivesOver(lives)) {
    getElement("container").style.textAlign = "center";
    createMessageBody();
    customiseMessageBody();
  }
};

const decrementLives = function(life) {
  lives -= 1;
  life.innerText = lives;
};

const regulateGameStatus = function(interval) {
  gameOverAction(lives);
  clearInterval(interval);
};

const eggMissed = function(egg, life, interval) {
  egg.style.top = "-160px";
  decrementLives(life);
  egg.src = "/images/egg.png";
  regulateGameStatus(interval);
  return;
};

const brokenEgg = function(egg, pageTop, eggPosition) {
  if (eggPosition > pageTop - 50) {
    egg.src = "/images/omlet.png";
  }
  return egg;
};

const missedEggs = function(egg, life, interval) {
  let pageTop = 650;
  let eggPosition = getPosition(egg, "top");
  brokenEgg(egg, pageTop, eggPosition);
  if (hasTouchedGround(eggPosition, pageTop)) {
    eggMissed(egg, life, interval);
  }
};

const isInsideLeftBorder = function(basketMarginLeft) {
  let pageExtremeLeft = -40;
  return basketMarginLeft >= pageExtremeLeft;
};

const moveLeft = function(basketStyle, basketMarginLeft) {
  if (isInsideLeftBorder(basketMarginLeft)) {
    basketStyle.marginLeft = basketMarginLeft - 15 + "px";
  }
};

const isInsideRightBorder = function(basketMarginLeft) {
  let pageExtremeRight = 1160;
  return basketMarginLeft <= pageExtremeRight;
};

const moveRight = function(basketStyle, basketMarginLeft) {
  if (isInsideRightBorder(basketMarginLeft)) {
    basketStyle.marginLeft = basketMarginLeft + 15 + "px";
  }
};

const startMovement = function() {
  let eggId = "egg";
  setInterval(function() {
    let eggMargin = Math.floor(Math.random() * 1000 + 1);
    startGame(eggId, eggMargin);
  }, 3000);
};

const getBasket = function() {
  let basket = getElement("basket");
  let basketMarginLeft = getPosition(basket, "marginLeft");
  return { basket, basketMarginLeft };
};

const applyMovement = function(event, events) {
  let { basket, basketMarginLeft } = getBasket();
  events[event.key](basket.style, basketMarginLeft);
};

const createEventsObject = function() {
  return { ArrowLeft: moveLeft, ArrowRight: moveRight };
};

const getMovements = function(event) {
  let events = createEventsObject();
  applyMovement(event, events);
};

const restart = function() {
  document.location.reload();
  startMovement();
};
