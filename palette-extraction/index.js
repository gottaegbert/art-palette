// const fs = require('fs');

// // 定义要处理的文件夹路径
// const dirPath = '../public/初唐书-322/';

// // 读取目录中所有文件的名称
// readdir(dirPath, (err, files) => {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   // 过滤掉非图片文件
//   const imageFiles = files.filter(fileName => {
//     const ext = fileName.split('.').pop().toLowerCase();
//     return ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'gif';
//   });

//   // 将包含所有图片文件名的数组作为参数传递给 processImages() 函数
//   processImages(imageFiles.map(fileName => `${dirPath}/${fileName}`));
// });



const img = new Image();
          
function loadImage(src) {
            return new Promise((resolve, reject) => {
              img.onload = function() {
                // 创建一个画布
                const canvas = document.createElement('canvas');
                const canvasContext = canvas.getContext('2d');
          
                // 设置画布的宽高和图片一致
                canvas.width = img.width;
                canvas.height = img.height;
          
                // 将图片绘制到画布上
                // canvasContext.drawImage(img, 0, 0);
          
                // 获取图像数据数组
                // const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);

                // // 遍历图像数据，将 RGB 转为灰度值
                // for (let i = 0; i < imageData.data.length; i += 4) {
                //   const r = imageData.data[i];
                //   const g = imageData.data[i + 1];
                //   const b = imageData.data[i + 2];
                //   const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
                //   imageData.data[i] = gray;
                //   imageData.data[i + 1] = gray;
                //   imageData.data[i + 2] = gray;
                // }

                const PALETTE_COLORS_COUNT = 5;
                  const IMAGE_MAX_WIDTH = 400;
              
                  const paletteElement = document.querySelector(".palette");
                  const paletteElements =  [];
                  let i = 0;
                  while (i < PALETTE_COLORS_COUNT) {
                    const li = document.createElement('li');
                    paletteElement.appendChild(li);
                    paletteElements.push(li);
                    i++;
                  }
                  document.body.appendChild(canvas);
                  const paletteExtractor = new PaletteExtractor();
                  const drawableRatio = img.width / img.height;
                  img.width = Math.min(IMAGE_MAX_WIDTH, img.width);
                  img.height = parseInt(img.width / drawableRatio, 10);
                  canvas.width = img.width;
                  canvas.height = img.height;
                  canvasContext.drawImage(img, 0, 0, img.width, img.height);
              
                  const data =canvasContext.getImageData(0, 0, img.width, img.height).data;
                  // Extracts the colors palette from image data.
                  const hexPalette =
                      paletteExtractor.processImageData(data, PALETTE_COLORS_COUNT);
              
                  let index = 0;
                  for(const paletteColorElem of paletteElements){
                    paletteColorElem.style.backgroundColor = hexPalette[index];
                    index++;
                  }
                // // 将修改后的图像数据重新放回画布
                // canvasContext.putImageData(imageData, 0, 0);
          
                // 将修改后的图像数据作为 Promise 的返回值
                resolve(canvas.toDataURL());
              };
              img.onerror = reject;
              img.src = src;
            });
          }  



// 定义一个函数用于批量处理图片
async function processImages(images) {
  for (let i = 0; i < images.length; i++) {
    // 加载图片并将其转换为黑白模式
    const blackAndWhiteDataUrl = await loadImage(images[i]);

    // // 将转换后的图像数据添加到页面上
    // const img = document.createElement('img');
    // img.src = blackAndWhiteDataUrl;
    // document.body.appendChild(img);
  }
}

processImages([
    '../public/初唐书-57窟/1 .png',
  '../public/初唐书-57窟/2 .png',
  '../public/初唐书-57窟/3 .png',
  '../public/初唐书-57窟/4 .png',
  '../public/初唐书-57窟/5 .png',
  '../public/初唐书-57窟/6 .png',
  '../public/初唐书-57窟/7 .png',
  '../public/初唐书-57窟/8 .png',
  '../public/初唐书-57窟/9 .png',

  '../public/初唐书-322/1 .png',
  '../public/初唐书-322/2 .png',
  '../public/初唐书-322/3 .png',
  '../public/初唐书-322/4 .png',
  '../public/初唐书-322/5 .png',
  '../public/初唐书-322/6 .png',
  '../public/初唐书-322/7 .png',
  '../public/初唐书-322/8 .png',
  '../public/初唐书-322/9 .png',
  '../public/初唐书-322/10 .png',
  '../public/初唐书-322/11 .png',

  '../public/晚唐-869/1.png',
  '../public/晚唐-869/2.png',
  '../public/晚唐-869/3.png',
  '../public/晚唐-869/4.png',
  '../public/晚唐-869/5.png',
  '../public/晚唐-869/6.png',
  '../public/晚唐-869/7.png',
  '../public/晚唐-869/8.png',
  '../public/晚唐-869/9.png',
  '../public/晚唐-869/10.png',
  '../public/晚唐-869/11.png',
  '../public/晚唐-869/12.png',
  '../public/晚唐-869/13.png',
  '../public/晚唐-869/14.png',
  '../public/晚唐-869/15.png',
  '../public/晚唐-869/16.png',
  '../public/晚唐-869/17.png',
  '../public/晚唐-869/18.png',
  '../public/晚唐-869/19.png',
  '../public/晚唐-869/20.png',
  '../public/晚唐-869/21.png',
  

]);


    // /**
    //   * Loads input files.
    //   * @param {!Element} inputNode
    //   * @param {!Function} callbackSuccess
    //   * @param {!Function} callbackError
    //   */
    // const readInputFile = function(inputNode, callbackSuccess, callbackError) {
    //   if (inputFileReader) {
    //     inputFileReader.onload = null;
    //     inputFileReader.onerror = null;
    //     inputFileReader.abort();
    //     inputFileReader = null;
    //   }
    //   if (inputNode.files && inputNode.files[0]) {
    //     inputFileReader = new FileReader();
    //     inputFileReader.onload = function(event) {
    //       callbackSuccess(event.target.result);
    //     };
    //     inputFileReader.onerror = callbackError;
    //     inputFileReader.readAsDataURL(inputNode.files[0]);
    //   }
    // };

