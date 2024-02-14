
//set browser zoom level at 67%
document.body.style.zoom = "67%";


// =============== 4th try here i add the mirror effect and user can download the picture with a button ==============
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const qrCode = document.querySelector("#qr-code");
const ctx = canvas.getContext('2d');
// //get the element 

const videoSection = document.getElementById('video_section');


const sequenceFolder = 'png/';
const imageFileExtension = '.png';
const numberOfFrames = 117; // Adjust this to the number of frames in your sequence.
let currentFrame = 1;
const frameRate = 24; // Frames per second (adjust this to slow down or speed up).
let overlayImageSrc = "male.png";


// start the video camera feed
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (error) {
        console.error('Error accessing camera:', error);
    }
}


// overlay the image
function overlayImage() {
    // const imgBack = new Image();
    // imgBack.src = 'main.jpg';

    const imgFront = new Image();
    imgFront.src = overlayImageSrc;

    imgFront.onload = function () {
        // canvas.width = video.videoWidth;
        // canvas.height = video.videoHeight;

        canvas.height = 1150;
        canvas.width = 1500;


        ctx.save();
        ctx.scale(-1, 1); // Mirror effect: Flip the video horizontally.
        ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
        ctx.restore();
        
        const scaleFactor = 0.3;
        const hf = imgFront.height * scaleFactor;
        const wf = imgFront.width * scaleFactor;
        const hb = video.videoHeight;
        // const hb = imgBack.height;
        // const wb = imgBack.width;

        ctx.drawImage(imgFront, -500,-50, 2500, 1200);

        // Load the next frame
        currentFrame = (currentFrame % numberOfFrames) + 1;

        // Calculate the delay in milliseconds based on frame rate.
        const delay = 1000 / frameRate;

        
        // Use setTimeout to slow down the sequence.
        setTimeout(requestAnimationFrame(overlayImage), delay);
    };
}
startCamera().then(overlayImage);

// add button to capture imqage
// Add an event listener for the capture button 
const captureButton = document.getElementById('captureButton');
const countdown = document.getElementById("countdown1");
function captureFunction(){
    videoSection.classList.remove('hidden');

    let counter = 10;

    function updateCounter() {
      counter -= 1;
      countdown.style.cssText = `--value: ${counter}`
    }


    const intervalId = setInterval(updateCounter, 1000);

    

    function stopCounter() {
      clearInterval(intervalId);
      console.log("Counter stopped.");
      captureAndDownload()
    }
    setTimeout(stopCounter,10000);
}
captureButton.addEventListener('click', captureFunction);

//character change button 
const femaleBtn = document.getElementById("female");
const maleBtn = document.getElementById("male");
maleBtn.addEventListener('click',()=>{
    overlayImageSrc = "male.png";
})
femaleBtn.addEventListener('click',()=>{
    overlayImageSrc = "Female.png";
})


// function for convert dataURL to file 
function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}


// const url2 = 'https://xri.com.bd/AR?q=1';
// const url2 = 'https://arbooth.cyclic.cloud/image/625fea3c-c86b-414d-9bea-a2533c94527d'

function createQrCode(url){
    document.getElementById("qr-code").innerHTML = '';
    const qr = new QRCode(document.getElementById("qr-code"), {
          text: url,
          width: 250,
          height: 250,
        });

    console.log(qr);

}

// const videoSection = document.getElementById('video_section');
const qrcodeSection = document.getElementById('qrcode-section');
//generat QR code & show it
function genQR(url){
    videoSection.classList.add('hidden');
    qrcodeSection.classList.remove('hidden');
    const longUrl = "https:xri.com.bd/ARbooth.html?q=" + url;
    createQrCode(longUrl);
}
function uploadImage(file){
    // Create a FormData object and append the image file to it
    const formData = new FormData();
    formData.append('image', file);

    // Make a POST request to the API
    fetch('https://dull-erin-caiman-vest.cyclic.cloud/upload', {
        method: 'POST',
        body: formData,
    })
        .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to upload image');
        }
        })
        .then((data) => {
        // Handle the API response here
        genQR(data.id);
        console.log('Image upload successful:', data);
        })
        .catch((error) => {
        // Handle errors here
        console.error('Error uploading image:', error);
        });
}


// ============ 
function captureAndDownload() {
    // Capture the current content of the canvas
    const capturedImage = new Image();
    
    const srcValue = canvas.toDataURL('image/jpeg'); // You can choose the desired image format (e.g., 'image/png', 'image/jpeg')
    console.log(srcValue);
    capturedImage.src = srcValue;
    
    // Create a download link for the captured image
    const downloadLink = document.createElement('a');
    downloadLink.href = capturedImage.src;
    downloadLink.download = 'captured_image.jpg'; // Set the desired file name and extension

    // Simulate a click on the download link to trigger the download
    // downloadLink.click();
    var file = dataURLtoFile(srcValue, 'filename.jpg');
    console.log("file details: ",file);
    uploadImage(file);
    
}

//add a function to capture the image when press the space button from the keyboard
document.addEventListener('keydown', function(event) {
    if (event.keyCode === 32) { // Check if the key pressed is the space bar
        captureFunction(); // Call your capture function
    }
});

// add a function to reload the pages when a user press 'x' it will reload the page
document.addEventListener('keydown', function(event) {
    if (event.keyCode === 88) { // Check if the key pressed is 'x'
        reloadPage(); // Call the reloadPage function
    }
});

function reloadPage() {
    // Reload the page
    location.reload();
}

// add a function that change the character when it press 1 it will show character 1
document.addEventListener('keydown', function(event) {
    if (event.keyCode === 49) { // Check if the key pressed is '1'
        overlayImageSrc = 'Female.png'
    }
});


// add a function that change the character when it press 2 it will show character 2

document.addEventListener('keydown', function(event) {
    if (event.keyCode === 50) { // Check if the key pressed is '1'
        overlayImageSrc = 'male.png'
    }
});

document.addEventListener('keydown', function(event) {
    console.log(event.keyCode);
});

// Function to toggle full screen
function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
  
  // Listen for the "F" key press
document.addEventListener('keydown', (event) => {
    if (event.key === 'F' || event.key === 'f') {
      toggleFullScreen();
    }
  });
  







