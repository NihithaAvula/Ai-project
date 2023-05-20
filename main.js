song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftwrist = 0; 
scorerightwrist = 0;

function preload(){
   song1 = loadSound("music.mp3");
   song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(500,400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("poseNet is initialized");
}


function draw(){
    image(video, 0, 0, 500, 400);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreleftwrist > 0.2){
        circle(leftWristX,leftWristY,20);
        if(song2.isPlaying()){
            song2.stop();
            song1.play();
            song1.setVolume(1);
            song1.rate(1);
            document.getElementById("song").innerHTML = "playing Harry Potter theme Song";
        }
    }
    if(scorerightwrist > 0.2){
        circle(rightWristX,rightWristY,20);
        if(song1.isPlaying()){
            song1.stop();
            song2.play();
            song2.setVolume(1);
            song2.rate(1);
            document.getElementById("song").innerHTML = "playing Peter Pan Song";
        }
    }
}

function play(){
   song2.play();
   song2.setVolume(1);
   song2.rate(1);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("left wrist X =" + leftWristX + ", left Wrist Y ="+ leftWristY);
        console.log("right wrist X =" + rightWristX + ", right Wrist Y ="+ rightWristY);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("score left wrist = "+ scoreleftwrist);
        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log("score right wrist = "+ scorerightwrist);

    }
}
