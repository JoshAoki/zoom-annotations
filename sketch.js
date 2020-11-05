let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/Pb2c2Z2mK/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

let question;
let no;
let yes;
let hello;

let questionFade = 0;
let yesFade = 0; 
let noFade = 0;
let helloFade = 0;


// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  question = loadImage("question.png");
  yes = loadImage("yes.png");
  no = loadImage("no.png");
  hello = loadImage("hello.png");
}

function setup() {
  createCanvas(1280, 720);
  // Create the video
  video = createCapture(VIDEO);
  video.size(160, 120);
  //video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0,255,0);
  // Draw the video
  tint(255);
  //image(flippedVideo, 0, 0);

  if (label == 'question') {
    questionFade = 255;
  }
  else if (label == 'no') {
    noFade = 255;
  }
  else if (label == 'yes') {
    yesFade = 255;
  }
  else if (label == 'hello') {
    helloFade = 255;
  }
  

  if(questionFade > 0) {
    tint(255, questionFade);
    image(question, 280,0);
    questionFade-=10;
  }
  else if(yesFade > 0) {
    tint(255, yesFade);
    image(yes, 280,0);
    yesFade-=10;
  }
  else if(noFade > 0) {
    tint(255, noFade);
    image(no, 280,0);
    noFade-=10;
  }
  else if(helloFade > 0) {
    tint(255, helloFade);
    image(hello, 280,0);
    helloFade-=10;
  }
  
  
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}