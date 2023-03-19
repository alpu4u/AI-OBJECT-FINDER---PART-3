objectName = "";
statusModel = "";
objects=[]

function setup()
{ 
    canvas= createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(statusModel !="")
    {
        objectDetector.detect(video, gotResult)
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML="Status; Objects Detected"
            document.getElementById("number_of_objects").innerHTML="Number of Objects Detected are : "+objects.length
        
            fill('green')
            percent=floor(objects[i].confidence * 100)
        text(objects[i].label+""+percent+"%", objects[i].x+15, objects[i].y + 15)
        noFill()
    stroke("blue")
    rect(objects[i].x, objects[i].y,objects[i].width,objects[i].height)

    if(objects[i].label==objectName)
    {
        video.stop()
        objectDetector.detect(gotResult)
        document.getElementById("status").innerHTML=objectName+" found"
        synth=window.SpeechSynthesis
        utterthis=new SpeechSynthesisUtterance(objectName+" found")
        synth.speak(utterthis)
    }
    else
    {
        document.getElementById("status").innerHTML=objectName+" not found"
    }
        }
    }
}

function start()
{
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= "Status: Detecting Objects";
    objectName = document.getElementById("objName").value;   
}

function modelLoaded()
{
    console.log('Model Loaded');
    statusModel = true; 
}

function gotResult(error, results)
{
if(error)
{
    console.log(error)
}
console.log(results)
objects = results
}