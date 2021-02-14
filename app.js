const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
const validation=document.getElementById('input-validation')
// selected image 
let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';

// show images 
const showImages = (images) => {
  if (images.length == 0 || searchText.value == '') {
    imagesArea.style.display = 'none';
    validation.style.display = 'block';
    if (searchText.value == '') {
      const errorMessageCheck = `
      <h5 class="text-center text-danger mt-2">Input Field  Cannot Be Empty</h5>
      `
      validation.innerHTML=errorMessageCheck;
    } 
    else {
      const errorMessageCheck = `
      <h5 class="text-center text-danger mt-2">This Item  Not Available</h5>
      `
      validation.innerHTML=errorMessageCheck;
    }
  } else {
    validation.style.display = 'none';
    imagesArea.style.display = 'block';
    gallery.innerHTML = '';
    // show gallery title
    galleryHeader.style.display = 'flex';
    images.forEach((image) => {
      let div = document.createElement('div');
      div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
      div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
      gallery.appendChild(div);
    });
    searchText.value = '';
  }
  document.getElementById('duration').value = '';
  dispalyLoadingSpiner(false);
};
// Keyboard Enter Event handler 
const SearchBtn = document.getElementById("search-btn");
const searchText = document.getElementById("search");

searchText.addEventListener("keypress", function(event) {
    if (event.key == 'Enter')
    SearchBtn.click();
});
const getImages = (query) => {
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => showImages(data.hits))
    .catch(err => console.log(err))
    dispalyLoadingSpiner(true)
}

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.toggle('added');
  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  } else {
    sliders.splice(item, 1)
  }
}
var timer
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }
  const durationCount=document.getElementById("duration").value
    if(durationCount<0){
      alert('Timer can not Be Negative !!!! Input Possitive Time')
      return;
    }
  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;
  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';
  const duration = document.getElementById('duration').value || 1000;
  // Timer count Conditional Statement
    sliders.forEach(slide => {
      let item = document.createElement('div')
      item.className = "slider-item";
      item.innerHTML = `<img class="w-100"
      src="${slide}"
      alt="">`;
      sliderContainer.appendChild(item)
    })
  changeSlide(0)
  timer = setInterval(function () {
    slideIndex++;
    changeSlide(slideIndex);
  }, duration);
}
// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}
// change slide item
const changeSlide = (index) => {
  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };
  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }
  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}
searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 0;
  
})
sliderBtn.addEventListener('click', function () {
  createSlider()
})
// Spiner Loading function
const dispalyLoadingSpiner=(show)=>{
  const spiner=document.getElementById("spiner")
  if(show){
    spiner.classList.remove('d-none');
}else{
  spiner.classList.add('d-none');
}
}

