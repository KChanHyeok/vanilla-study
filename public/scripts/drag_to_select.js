// document.addEventListener("DOMContentLoaded", function () {

const canvas = document.getElementById("canvas");
const board = document.getElementById("board");
const progressBar = document.getElementById("progress_time");
const rect = document.getElementById("rect");
const audio = new Audio("/sounds/swoosh.mp3");

const intro = document.getElementById("intro");
const nav = document.getElementById("nav");
const start_btn = document.getElementById("start-btn");
const replay_btn = document.getElementById("replay-btn");
const score = document.getElementById("score");

const resultMessage = document.getElementById("result-message");
const resultBoard = document.getElementById("result-board");

const randomX = (Math.random() < 0.5 ? 1 : -1) * (Math.floor(Math.random() * 10) + 1);
const randomR = Math.floor(Math.random(10)); // Random value between -250px and 250px

let box;
let timer = 10;
let score_num = 0;

let startX, startY;

let selectNumbers = [];
let numbers = [];

const initNumbers = () => {
  document.querySelectorAll(".number").forEach((el) => el.remove());
  for (let i = 1; i <= 104; i++) {
    box = document.createElement("div");
    box.className = "box number";
    box.innerText = Math.floor(Math.random() * 9) + 1;
    board.append(box);
  }
  numbers = document.querySelectorAll(".number");
};

// 마우스 눌렀을 때
canvas.addEventListener("mousedown", (e) => {
  startX = e.clientX;
  startY = e.clientY;

  // 사각형을 클릭 시 보이도록 설정
  rect.style.left = `${startX}px`;
  rect.style.top = `${startY}px`;
  rect.style.width = "0px";
  rect.style.height = "0px";
  rect.style.display = "block";
});

// 마우스 이동 시 사각형 크기 조정
canvas.addEventListener("mousemove", (e) => {
  if (rect.style.display === "block") {
    const width = e.clientX - startX;
    const height = e.clientY - startY;

    // 사각형 크기 업데이트
    rect.style.width = `${Math.abs(width)}px`;
    rect.style.height = `${Math.abs(height)}px`;

    // 사각형 위치 업데이트 (음수 크기를 방지)
    rect.style.left = `${width < 0 ? e.clientX : startX}px`;
    rect.style.top = `${height < 0 ? e.clientY : startY}px`;

    // 사각형 안에 숫자가 있는지 확인
    findNumbersInRect(startX, startY, width, height);
  }
});

// 마우스 클릭을 떼면 사각형이 사라짐
canvas.addEventListener("mouseup", (e) => {
  rect.style.display = "none";
  let sum = 0;

  const result = selectNumbers.reduce((acc, curr) => {
    return (sum += Number(curr.innerHTML));
  }, sum);
  console.log(result);
  if (result === 10) {
    selectNumbers.map((div) => {
      div.style.animation = "fall 1s ease-in-out forwards";
    });
    score_num += selectNumbers.length;
    score.innerHTML = score_num;
    audio.play();
  }
  numbers.forEach((div) => {
    div.style.backgroundColor = "";
  });

  selectNumbers = [];
});

start_btn.addEventListener("click", initstartGame);

replay_btn.addEventListener("click", replayGame);

function initstartGame() {
  initNumbers();
  intro.style.display = "none";
  board.style.display = "grid";
  nav.style.visibility = "";
  const time = setInterval(() => {
    if (progressBar.value > 0) {
      progressBar.value -= 1;
    } else {
      clearInterval(time);
      board.style.display = "none";
      nav.style.visibility = "hidden";
      resultBoard.style.display = "block";
      resultMessage.innerText = score_num;
      progressBar.value = 90;
    }
  }, 1000);
}

function replayGame() {
  intro.style.display = "block";
  board.style.display = "none";
  nav.style.visibility = "hidden";
  resultBoard.style.display = "none";
  progressBar.value = 90;
  score.innerHTML = 0;
  score_num = 0;
  selectNumbers = [];
}

function findNumbersInRect(startX, startY, width, height) {
  const rectBounds = {
    left: Math.min(startX, startX + width),
    top: Math.min(startY, startY + height),
    right: Math.max(startX, startX + width),
    bottom: Math.max(startY, startY + height),
  };

  const foundNumbers = [];

  numbers.forEach((numberDiv) => {
    const numberRect = numberDiv.getBoundingClientRect();
    // 번호가 사각형 영역 내에 있는지 확인
    if (
      numberRect.left < rectBounds.right &&
      numberRect.right > rectBounds.left &&
      numberRect.top < rectBounds.bottom &&
      numberRect.bottom > rectBounds.top
    ) {
      if (numberDiv.style.visibility !== "hidden") {
        foundNumbers.push(numberDiv); // 번호를 배열에 추가
        numberDiv.style.backgroundColor = "yellow"; // 번호를 yellow로 표시
      }
    }
  });
  selectNumbers = foundNumbers;
}

window.addEventListener("beforeunload", (event) => {
  if (board.style.display === "grid") {
    event.preventDefault();
    const confirmationMessage = "게임이 중단됩니다?";
    event.returnValue = confirmationMessage; // 표준에 따라 반환값 지정
    return confirmationMessage; // 레거시 방식
  }
});

document.documentElement.style.setProperty("--random-x", `${randomX}px`);
