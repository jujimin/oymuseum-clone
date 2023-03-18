// 메뉴버튼
const menuBtn = document.querySelector(".header-menu-icon");
const header = document.querySelector(".header-wrapper");
const lnb = document.querySelector(".lnb");

menuBtn.addEventListener("click", function() {
  menuBtn.classList.toggle("open");
  header.classList.toggle("lnbopen");
  lnb.classList.toggle("lnbopen");
});





// 슬라이더

const slideItem = document.querySelectorAll(".slide-item");
const slideContainer = document.querySelector(".slide-container");
const slideBtn = document.querySelectorAll(".slide-btn");

// 루프 슬라이드 듀레이션
var showDuration = 3000;
// 트랜지션 듀레이션
var transitionDuration = 500;

slideItem.forEach(function(item){
  item.style.transition = `opacity ${transitionDuration}ms`;
});


// 슬라이드 작동 함수 //////////////////////////////////////////////////////////

// 다음 슬라이드 이동
function slideNext() {
  // 첫번째 요소가 투명도0이 된다
  // firstElementChild != [0]
  slideContainer.firstElementChild.style.opacity = "0";
  // 첫번째 요소가 맨 뒤에 붙는다.
  // 투명도 트랜지션 이후 이동할 수 있도록 setTimeout으로 시차를 준다.
  setTimeout(function(){
    slideContainer.appendChild(slideContainer.firstElementChild);
  }, transitionDuration);
  // 마지막 요소가 투명도1이 된다
  slideContainer.lastElementChild.style.opacity = "1";
}

// 이전 슬라이드 이동
function slidePre() {
  // 마지막 요소가 투명도0이 된다
  slideContainer.lastElementChild.style.opacity = "0";
  // 마지막 요소가 맨 앞에 붙는다.
  slideContainer.prepend(slideContainer.lastElementChild);
  // 첫번째 요소가 투명도1이 된다.
  // 앞에 붙은 후 투명도 변할 수 있도록 setTimeout으로 시차를 준다.
  setTimeout(function(){
    slideContainer.firstElementChild.style.opacity = "1";
  }, 10);
}

// 슬라이드 작동 //////////////////////////////////////////////////////////////

// 슬라이드 루프
var loopSlideShow = setInterval(slideNext, showDuration);

// 슬라이드 버튼
slideBtn[1].onclick = slideNext;
slideBtn[0].onclick = slidePre;

// 드래그







// var mousePoint = 0;
// var startPoint = 0;
// var endPoint = 0;
// var itemWidth = 0;
// var slideOpacity = 0;

// var currentX, lastX;

// slideContainer.addEventListener("mousedown", function(e){
//   startPoint = e.clientX;

//   slideContainer.addEventListener("dragover", function(e){
//     currentX = e.clientX;

//     // next
//     if(currentX < startPoint){
//       slideOpacity = currentX / startPoint;
//       e.target.parentElement.style.opacity = slideOpacity;
//     }

//     // prev
//     if(currentX > startPoint){
//       slideContainer.lastElementChild.style.opacity = "0";
//       slideContainer.prepend(slideContainer.lastElementChild);
    
//       slideContainer.addEventListener("dragover", function(e){
//         slideOpacity = (currentX-startPoint) / startPoint;
//         lastElementChild.style.opacity = slideOpacity;
//       });
//     }

//   });
// });








// slideContainer.addEventListener("dragover", function(e){
//   // 아이템 투명도 조절 = (드래그할 때 마우스 x좌표 / 아이템 너비)
//   mousePoint = e.clientX;
//   itemWidth = e.currentTarget.offsetWidth;
//   slideOpacity = mousePoint/itemWidth;
//   e.target.parentElement.style.opacity = slideOpacity;

//   if(startPoint < itemWidth/2){
//     slideOpacity = (itemWidth-mousePoint)/itemWidth;
//     e.target.parentElement.style.opacity = slideOpacity;
//   }
// });


// slideContainer.addEventListener("mousedown", function(e){
//   startPoint = e.clientX;

//   // Next (마우스)
//   if(startPoint > itemWidth/2){
//     slideContainer.lastElementChild.style.opacity = "0";
//     slideContainer.prepend(slideContainer.lastElementChild);

//     slideContainer.addEventListener("dragover", function(e){

//     });
//   }
// });

// slideContainer.addEventListener("mouseup", function(e){
//   endPoint = e.clientX;

//   if(slideOpacity < 0.5) {
//     slideNext();
//   } else {
//     e.target.parentElement.style.opacity = 1;
//   }
// });



// 슬라이드 동시 작동 방지 ////////////////////////////////////////////////////////

// 슬라이드 버튼에 마우스 올리면 루프 멈추기 / 떼면 루프 작동하기
slideBtn.forEach(btn => {
  btn.addEventListener("mouseover", () => {
    clearInterval(loopSlideShow);
  });
  btn.addEventListener("mouseout", () => {
    loopSlideShow = setInterval(slideNext, showDuration);
  });
});

// 슬라이드 드래그시 루프 멈추기
slideContainer.addEventListener("dragstart", () => {
  clearInterval(loopSlideShow);
});
slideContainer.addEventListener("dragend", () => {
    loopSlideShow = setInterval(slideNext, showDuration);
});