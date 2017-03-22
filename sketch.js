var font, input, wordButton, timeButton, canvas;
var dots = [];
var wordMode = false;
var wordo = "CLOCK";
var maxL = 630;

function preload() {
  font = loadFont('https://drive.google.com/file/d/0B-eJ2cIBKaXLYUNhamFMOUZOd0k/');
}

function setup() {
  canvas = createCanvas(600, 300);
  canvas.position(25, 25);
  background(51);

  input = createInput("Input");
  input.position(canvas.x, canvas.y + canvas.height + 25);
  wordButton = createButton("Word Mode");
  wordButton.position(input.x + input.width, input.y);
  wordButton.mousePressed(setWordMode);
  timeButton = createButton("Time Mode");
  timeButton.position(wordButton.x + wordButton.width, wordButton.y);
  timeButton.mousePressed(setTimeMode);
  dots[0] = new Dot(0.5 * width, 0.5 * height);
}

function draw() {
  background(51);

  if (dots.length <= 0) {
    dots[0] = new Dot(-10, -10);
  }

  translate(10, 0);

  for (var i = 0; i < dots.length; i++) {
    var d = dots[i];
    d.force();
    d.update();
    d.show();
  }
  getTime();

  if (dots.length > maxL && !wordMode) {
    while (dots.length > maxL) {
      dots.pop();
    }
  }
}

function newWord(word) {
  var points = font.textToPoints(word, 0, 200, 150, {
    sampleFactor: 0.175
  });

  var diff = points.length - dots.length;

  if (diff > 0) {
    for (var i = 0; i < diff; i++) {
      var dot = new Dot(
        dots[dots.length - 1].pos.x,
        dots[dots.length - 1].pos.y
      );
      dots.push(dot);
    }
  } else if (diff < 0) {
    for (var i = diff; i < 0; i++) {
      var home = dots.length + diff - 1;
      if (home < 0) {
        dots.pop();
      } else {
        dots[dots.length + i].newTarget(
          dots[home].pos.x,
          dots[home].pos.y
        );
      }
    }
  }

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    dots[i].newTarget(pt.x, pt.y);
    dots[i].color = 255;
  }
}

function digits(num) {
  if (num < 10) {
    num = "0" + num;
  }
  return num;
}

function getTime() {

  var today = new Date();

  var timezone = today.getTimezoneOffset() / 60;

  var seconds = today.getUTCSeconds();
  var minutes = today.getUTCMinutes();
  var hours = today.getUTCHours() - timezone;

  if (hours < 0) {
    hours = 24 + hours;
  }
  if (hours >= 24) {
    hours = hours - 24;
  }

  seconds = digits(seconds);
  minutes = digits(minutes);
  hours = digits(hours);

  var time = (hours + ":" + minutes + ":" + seconds);

  if (wordMode) {
    newWord(wordo);
  } else {
    newWord(time);
  }

}

function setWordMode() {
  wordMode = true;
  wordo = input.value();
}

function setTimeMode() {
  wordMode = false;
}
