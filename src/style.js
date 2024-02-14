// // //get the element 

// const btn = document.getElementById('captureButton');
// // const frontPage = document.getElementById('frontPage');
// const videoSection = document.getElementById('video_section');
// const countdown = document.getElementById("countdown1");





// btn.addEventListener('click',()=>{
//     // frontPage.style.display = 'none';
//     videoSection.classList.remove('hidden');


//     let counter = 10;

//     function updateCounter() {
//       counter -= 1;
//       countdown.style.cssText = `--value: ${counter}`
//     }


//     const intervalId = setInterval(updateCounter, 1000);

    

//     function stopCounter() {
//       clearInterval(intervalId);
//       console.log("Counter stopped.");
//       captureAndDownload()
//     }
//     setTimeout(stopCounter,10000);


// });



// const cursorRounded = document.querySelector('.rounded');
// const cursorPointed = document.querySelector('.pointed');


// const moveCursor = (e)=> {
//   const mouseY = e.clientY-1000;
//   const mouseX = e.clientX;
   
//   cursorRounded.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  
//   cursorPointed.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
 
// }

// window.addEventListener('mousemove', moveCursor)

const targetElement = document.getElementById('target');

// Add an event listener to change the cursor when the mouse enters the element
targetElement.addEventListener('mouseenter', () => {
    targetElement.classList.add('custom-pointer'); // Change cursor to custom
});

// Add an event listener to revert to the default cursor when the mouse leaves the element
targetElement.addEventListener('mouseleave', () => {
    targetElement.classList.remove('custom-pointer'); // Revert to default cursor
});