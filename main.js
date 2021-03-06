const schemeList = [];
let colours = document.querySelector('.colours');

const APP = {
    canvas: null,
    ctx: null,
    data: [],
    img: null,
    init() {
        APP.canvas = document.querySelector('main canvas');
        APP.ctx = APP.canvas.getContext('2d');
        APP.canvas.width = 900;
        APP.canvas.style.width = 900;
        APP.canvas.height = 600;
        APP.canvas.style.height = 600;
        APP.img = document.createElement('img');

        //once the image is loaded, add it to the canvas
        APP.img.onload = (ev) => {
        APP.ctx.drawImage(APP.img, 0, 0);

        //call the context.getImageData method to get the array of [r,g,b,a] values
        let imgDataObj = APP.ctx.getImageData(
            0,
            0,
            APP.canvas.width,
            APP.canvas.height
        );
        APP.data = imgDataObj.data; //data prop is an array
        // console.log(APP.data.length, 900 * 600 * 4); //  has 2,160,000 elements
        
        // 1st EVENT LISTENER: catch current pixel on canvas
        APP.canvas.addEventListener('mousemove', APP.getPixel);
        APP.canvas.addEventListener('click', APP.addBox);      
        };
    },

    getPixel(ev) {
      //as the mouse moves around the image
      // let canvas = ev.target;
        let cols = APP.canvas.width;
      // let rows = canvas.height;
        let { offsetX, offsetY } = ev;
      //call the method to get the r,g,b,a values for current pixel
        let c = APP.getPixelColor(cols, offsetY, offsetX);
      //build a colour string for css
      let clr = `rgb(${c.red}, ${c.green}, ${c.blue})`; //${c.alpha / 255}
        document.getElementById('pixelColor').style.backgroundColor = clr;
      //save the string to use elsewhere
        APP.pixel = clr;
    },

    getPixelColor(cols, x, y) {
      //see grid.html as reference for this algorithm
      let pixel = cols * x + y;
      let arrayPos = pixel * 4;
        return {
        red: APP.data[arrayPos],
        green: APP.data[arrayPos + 1],
        blue: APP.data[arrayPos + 2],
        alpha: APP.data[arrayPos + 3],
        };
    },

    addBox(ev) {
      //user clicked. Let's add boxes below with the pixel and the average
        let pixel = document.createElement('span');
        getColorScheme(APP.pixel);
        console.log(APP.pixel);
        setTimeout(() => {
          pixel.className = 'box';
          pixel.setAttribute('data-label', 'Exact pixel');
          pixel.setAttribute('data-color', APP.pixel);
          pixel.setAttribute('id', 'exactPixel');
          
          let scheme1 = document.createElement('span');
          scheme1.className = 'box';
          scheme1.setAttribute('data-label', 'Scheme1');
          scheme1.setAttribute('data-color', schemeList[0]);
          scheme1.setAttribute('id', 'scheme1');

          let scheme2 = document.createElement('span');
          scheme2.className = 'box';
          scheme2.setAttribute('data-label', 'Scheme2');
          scheme2.setAttribute('data-color', schemeList[1]);
          scheme2.setAttribute('id', 'scheme2');
          
          let scheme3 = document.createElement('span');
          scheme3.className = 'box';
          scheme3.setAttribute('data-label', 'Scheme3');
          scheme3.setAttribute('data-color', schemeList[2]);
          scheme3.setAttribute('id', 'scheme3');
  
          let scheme4 = document.createElement('span');
          scheme4.className = 'box';
          scheme4.setAttribute('data-label', 'Scheme4');
          scheme4.setAttribute('data-color', schemeList[3]);
          scheme4.setAttribute('id', 'scheme4');
  
          let scheme5 = document.createElement('span');
          scheme5.className = 'box';
          scheme5.setAttribute('data-label', 'Scheme5');
          scheme5.setAttribute('data-color', schemeList[4]);
          scheme5.setAttribute('id', 'scheme5')

          pixel.style.backgroundColor = APP.pixel;
          scheme1.style.backgroundColor = schemeList[0];
          scheme2.style.backgroundColor = schemeList[1];
          scheme3.style.backgroundColor = schemeList[2];
          scheme4.style.backgroundColor = schemeList[3];
          scheme5.style.backgroundColor = schemeList[4];

          colours.append(pixel);
          colours.append(pixel, scheme1);
          colours.append(pixel, scheme2);
          colours.append(pixel, scheme3);
          colours.append(pixel, scheme4);
          colours.append(pixel, scheme5);
        }, 500);
    },
  };
    
// When user clicks it, fetch data from API and send it to color extraction tool
// Iterated data by using FOREACH
function getColorScheme(elm) {
    fetch(`https://www.thecolorapi.com/scheme?rgb=${elm}`)
    .then(res => res.json())
    .then(data => {
        data.colors.forEach(item => {
            schemeList.unshift(item.rgb.value)
            console.log(item.rgb.value);
            console.log(schemeList);
        })
    })
    .catch(error => alert('Color Is Not Selected Yet'))
};

const imageInput = document.getElementById('image_input')
let uploadedImage = "";
const imgURLList = [];
let imgURL;


// 2nd EVENT LISTENER for users to upload files
imageInput.addEventListener('change', getImage)

function getImage(e) {
    const reader = new FileReader()
    reader.addEventListener('load',()=>{
        uploadedImage = reader.result;
        document.getElementById('display_image').style.backgroundImage = `url(${uploadedImage})`
    })

    reader.readAsDataURL(e.target.files[0])
    imgURLList.unshift(e.target.files[0].name);

    APP.img.src = imgURLList[0];
}

// Random color change by event listener 
// 3rd EVENT LISTENER to decorate the header
const h1 = document.querySelector('h1');

h1.addEventListener('mousemove', () => {
    
    let dr = (Math.random()*255);
    let dg = (Math.random()*255);
    let db = (Math.random()*255);
    h1.style.backgroundColor = `rgb(${dr}, ${dg}, ${db})`;
    }
);

document.addEventListener('DOMContentLoaded', APP.init);
