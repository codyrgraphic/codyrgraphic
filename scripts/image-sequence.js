const html = document.documentElement;
const canvas = document.getElementById("image-sequence");
const context = canvas.getContext("2d");

const frameCount = 250;
const currentFrame = (index) =>
  `images/image-sequence-jpg/${index.toString().padStart(4, "0")}.jpg`;

const preloadedImages = [];

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    preloadedImages.push(img);
  }
};

preloadImages();

const img = new Image();
img.src = currentFrame(1);
canvas.width = 1080;
canvas.height = 1080;
img.onload = function () {
  context.drawImage(img, 0, 0);
};

const updateImage = (index) => {
  console.log("Updating image with index:", index); // Keep this line
  const imageToDraw = preloadedImages[index - 1];
  console.log("Image object:", imageToDraw); // Add this line to log the image object
  context.drawImage(imageToDraw, 0, 0);
};

let frameIndex = 0; // Declare the variable outside the event listener

window.addEventListener("scroll", () => {
  console.log("Scroll event triggered");
  const scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const newFrameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );

  // Only update the image if the frameIndex has changed
  if (frameIndex !== newFrameIndex) {
    frameIndex = newFrameIndex;
    console.log(frameIndex); // Log the frameIndex value
    updateImage(frameIndex); // Call the updateImage function
  }
});