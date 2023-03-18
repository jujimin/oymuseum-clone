// 메뉴버튼 ///////////////////////////////////////////////
const menuBtn = document.querySelector(".header-menu-icon");
const header = document.querySelector(".header-wrapper");
const lnb = document.querySelector(".lnb");

menuBtn.addEventListener("click", function() {
  menuBtn.classList.toggle("open");
  header.classList.toggle("lnbopen");
  lnb.classList.toggle("lnbopen");
});


// 슬라이더 ///////////////////////////////////////////////

const slideItems = document.querySelectorAll(".slide-item");
const slideContainer = document.querySelector(".slide-container");
const slideBtn = document.querySelectorAll(".slide-btn");
const preBtn = document.querySelector(".preBtn");
const nextBtn = document.querySelector(".nextBtn");

// 이미지 전환 시간
var slideDuration = 3000;
// 전환 효과 시간
var transitionDuration = 500;

// 이미지 투명도 전환 시간 CSS 설정
for (const item of slideItems){
  item.style.transition = `opacity ${transitionDuration}ms`;
}

// 현재 이미지 인덱스 초기화
let currentSlideIndex = 0;

// next 이미지 전환 함수
// 1->2: 0(none) 1(auto) 1(auto)
// 2->3: 0(none) 0(none) 1(auto)
// 3->1: 1(auto) 1(auto) 1(auto)
function nextSlide() {
  if(currentSlideIndex < (slideItems.length - 1)){
    slideItems[currentSlideIndex].style.opacity = 0;
    slideItems[currentSlideIndex].style.pointerEvents = "none";
  }
  // 마지막 이미지인 경우 첫번째 이미지로 전환
  else {
    for (const item of slideItems){
      item.style.opacity = 1;
      item.style.pointerEvents = "auto";
    }
  }
  // 나머지연산자를 사용해 현재 인덱스 업데이트
  currentSlideIndex = (currentSlideIndex + 1) % slideItems.length;
}

// prev 이미지 전환 함수
// 1->3: 0(none) 0(none) 1(auto)
// 3->2: 0(none) 1(auto) 1(auto)
// 2->1: 1(auto) 1(auto) 1(auto)
function prevSlide() {
  if(currentSlideIndex > 0){
    slideItems[currentSlideIndex-1].style.opacity = 1;
    slideItems[currentSlideIndex-1].style.pointerEvents = "auto";
    currentSlideIndex = currentSlideIndex - 1
  }
  // 첫번째 이미지인 경우, 마지막 이미지로 전환
  else {
    for (const item of slideItems){
      item.style.opacity = 0;
      item.style.pointerEvents = "none";
    }
    slideItems[slideItems.length - 1].style.opacity = 1;
    slideItems[slideItems.length - 1].style.pointerEvents = "auto";

    currentSlideIndex = slideItems.length - 1;
  }
}

// 루프 슬라이드 시작
var loopSlideShow = setInterval(nextSlide, slideDuration);

// 슬라이드 버튼 이벤트
preBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

// 슬라이드 드래그 이벤트
var currentX, lastX, startPoint, endPoint, slideOpacity, itemWidth;
var isdragging = false;

slideContainer.addEventListener("mousedown", function(e){
  startPoint = e.clientX;
  isdragging = true;
});

slideContainer.addEventListener("mousemove", function(e){
  currentX = e.clientX;
  itemWidth = e.currentTarget.offsetWidth;

  if(isdragging) {
    slideOpacity = 1 - Math.abs(currentX-startPoint) / (itemWidth/2);

    // next
    if(currentX < startPoint) {
      if(currentSlideIndex < slideItems.length - 1){
        e.target.parentElement.style.opacity = slideOpacity;
      } else { // 마지막 이미지인 경우, 첫번째 이미지 보이게
        slideItems[0].style.opacity = 1 - slideOpacity;
      }
    } 
    // prev
    else if(currentX > startPoint) {
      if(currentSlideIndex > 0){
        slideItems[currentSlideIndex-1].style.opacity = 1 - slideOpacity;
      } else { // 첫번째 이미지인 경우, 마지막 이미지 보이게
        for (const item of slideItems){item.style.opacity = slideOpacity;}
        slideItems[slideItems.length - 1].style.opacity = 1;
      }
    }
  }
});


// 투명도 0.5 보다 작은 경우, 다음/이전 슬라이드 보여주기
// 투명도 0.5 보다 큰 경우, 기존 이미지 보여주기
slideContainer.addEventListener("mouseup", function(e) {
  endPoint = e.clientX;
  isdragging = false;

  // next
  if(endPoint < startPoint) {
    if(slideOpacity < 0.5 ){
      nextSlide();
    } else { 
      if(currentSlideIndex < slideItems.length - 1) {
        e.target.parentElement.style.opacity = 1;
      } else { // 마지막 이미지인 경우
        slideItems[0].style.opacity = 0;
      }
    }
  } // prev
  else if(endPoint > startPoint) {
    if(slideOpacity < 0.5 ){
      prevSlide();
    } else {
      if(currentSlideIndex > 0) {
        slideItems[currentSlideIndex].style.opacity = 1;
        slideItems[currentSlideIndex-1].style.opacity = 0;
      } else { // 첫번째 이미지인 경우
        for (const item of slideItems){item.style.opacity = 1;}
      }
    }
  }
});



// 슬라이드 버튼에 마우스 올리면 루프 멈추기 / 떼면 루프 작동하기
slideBtn.forEach(btn => {
  btn.addEventListener("mouseover", () => {
    clearInterval(loopSlideShow);
  });
  btn.addEventListener("mouseout", () => {
    loopSlideShow = setInterval(nextSlide, slideDuration);
  });
});

// 슬라이드 드래그시 루프 멈추기
slideContainer.addEventListener("mousedown", () => {
  clearInterval(loopSlideShow);
});
slideContainer.addEventListener("mouseup", () => {
    loopSlideShow = setInterval(nextSlide, slideDuration);
});