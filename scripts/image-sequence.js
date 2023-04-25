const html = document.documentElement;
const canvas = document.getElementById("image-sequence");
const context = canvas.getContext("2d");
const frameCount = 250;
const preloadedImages = [];
let frameIndex = 0;

window.scrollTo(0, 0);

canvas.width = 1080;
canvas.height = 1080;

const currentFrame = (index) =>
  `images/image-sequence-jpg/${index.toString().padStart(4, "0")}.jpg`;

const preloadImages = () => {
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i + 1);
    preloadedImages.push(img);
  }
};

const updateImage = (index) => {
  const imageToDraw = preloadedImages[index];
  if (imageToDraw) {
    context.drawImage(imageToDraw, 0, 0);
  }
  console.log("Image:", imageToDraw);
  console.log("Index:", index);
};

const updateScrollPosition = (index) => {
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const newScrollTop = (index / (frameCount - 1)) * maxScrollTop;
  window.scrollTo(0, newScrollTop);
};

const easeOutCubic = (t) => {
  return 1 - Math.pow(1 - t, 3);
};

const animateFrames = async (startIndex, endIndex) => {
  const step = startIndex < endIndex ? 1 : -1;
  const totalFrames = Math.abs(endIndex - startIndex);
  const duration = 600; 

  const startTime = performance.now();

  const animate = () => {
    const currentTime = performance.now();
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const easedProgress = easeOutCubic(progress);
    const currentFrame = Math.round(
      startIndex + step * easedProgress * totalFrames
    );

    updateImage(currentFrame);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      frameIndex = endIndex;
    }
  };

  animate();
};

const scrollToFrame = (targetFrame) => {
  animateFrames(frameIndex, targetFrame).then(() => {
    frameIndex = targetFrame; 
    updateScrollPosition(frameIndex);
  });
};

const navDots = document.querySelectorAll(".nav-dot");

navDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const frame = dot.getAttribute("data-frame");
    scrollToFrame(parseInt(frame));
  });
});

preloadImages();

const img = new Image();
img.src = currentFrame(1);
img.onload = function () {
  context.drawImage(img, 0, 0);
};

window.addEventListener("scroll", () => {
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

  if (frameIndex !== newFrameIndex) {
    frameIndex = newFrameIndex;
    updateImage(frameIndex);
  }
});
