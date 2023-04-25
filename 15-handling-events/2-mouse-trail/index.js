let scheduled = null;

document.body.addEventListener("mousemove", (event) => {
  if (!scheduled) {
    setTimeout(() => {
      const size = 10;

      const dot = document.createElement("div");

      dot.className = "trail";
      dot.style.width = size + "px";
      dot.style.height = size + "px";
      dot.style.left = event.clientX - size + "px";
      dot.style.top = event.clientY - size + "px";

      document.body.appendChild(dot);

      let scale = 1;

      const decreaseSize = () => {
        if (Math.abs(scale.toFixed(1)) === 0) {
          return;
        }

        scale -= 0.05;
        dot.style.transform = `scale(${scale})`;

        requestAnimationFrame(decreaseSize);
      };

      requestAnimationFrame(decreaseSize);

      setTimeout(() => {
        document.body.removeChild(dot);
      }, 250);

      scheduled = null;
    }, 5);
  }

  scheduled = event;
});
