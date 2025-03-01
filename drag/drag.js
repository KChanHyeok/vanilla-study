const items = document.getElementsByClassName("box");
for (let i = 0; i < items.length; i++) {
  let offsetX = 0;
  let offsetY = 0;

  let initialX;
  let initialY;
  let currentX;
  let currentY;

  let active = false;
  items[i].addEventListener("mousedown", (event) => {
    initialX = event.clientX - offsetX;
    initialY = event.clientY - offsetY;
    active = true;
    items[i].style.zIndex = 1;
  });

  items[i].addEventListener("mousemove", (event) => {
    if (active) {
      currentX = event.clientX - initialX;
      currentY = event.clientY - initialY;

      offsetX = currentX;
      offsetY = currentY;
      dragPostion(items[i], currentX, currentY);
    }
  });
  items[i].addEventListener("mouseleave", (event) => {
    initialX = currentX;
    initialY = currentY;
    active = false;
    items[i].style.zIndex = 0;
  });

  items[i].addEventListener("mouseup", (event) => {
    initialX = currentX;
    initialY = currentY;
    active = false;
  });
}

function dragPostion(item, x, y) {
  item.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
}
