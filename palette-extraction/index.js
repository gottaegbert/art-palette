  const PALETTE_COLORS_COUNT = 6;
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

    const canvas = document.createElement('canvas');
    const canvasContext = canvas.getContext('2d');
    document.body.appendChild(canvas);

    const imageInput = document.getElementById("image-input");

    const paletteExtractor = new PaletteExtractor();

    let inputFileReader = null;
    let image = null;

    imageInput.addEventListener("change", (event) => {
      const input = /** @type {!Element} */ (event.target);
      readInputFile(
          input,
          (dataUrl) => {
            image = new Image();
            image.onload = () => {
              if (image.width < 1 || image.height < 1) {
                return [];
              }

              const drawableRatio = image.width / image.height;
              image.width = Math.min(IMAGE_MAX_WIDTH, image.width);
              image.height = parseInt(image.width / drawableRatio, 10);
              canvas.width = image.width;
              canvas.height = image.height;
              canvasContext.drawImage(image, 0, 0, image.width, image.height);

              const data =
                  canvasContext.getImageData(0, 0, image.width, image.height)
                      .data;
              // Extracts the colors palette from image data.
              const hexPalette =
                  paletteExtractor.processImageData(data, PALETTE_COLORS_COUNT);

              let index = 0;
              for(const paletteColorElem of paletteElements){
                paletteColorElem.style.backgroundColor = hexPalette[index];
                index++;
              }
            };
            image.src = dataUrl;
          },
          (error) => {
            console.log(error);
          });
      // To allow uploading the same image twice.
      input.value = null;
    });


const img = new Image();

function loadImage(src) {
  return new Promise((resolve, reject) => {
    img.onload = function() {
      // 创建一个画布
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      // 设置画布的宽高和图片一致
      canvas.width = img.width;
      canvas.height = img.height;

      // 将图片绘制到画布上
      context.drawImage(img, 0, 0);

      // 获取图像数据数组
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

      // 遍历图像数据，将 RGB 转为灰度值
      // for (let i = 0; i < imageData.data.length; i += 4) {
      //   const r = imageData.data[i];
      //   const g = imageData.data[i + 1];
      //   const b = imageData.data[i + 2];
      //   const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      //   imageData.data[i] = gray;
      //   imageData.data[i + 1] = gray;
      //   imageData.data[i + 2] = gray;
      // }

      // 将修改后的图像数据重新放回画布
      context.putImageData(imageData, 0, 0);

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

    // 将转换后的图像数据添加到页面上
    const img = document.createElement('img');
    img.src = blackAndWhiteDataUrl;
    document.body.appendChild(img);
  }
}

processImages([
  '../public/初唐书-322/322-1-说法图.png',
  '../public/初唐书-322/322-10-群飞天.png',
]);


    /**
      * Loads input files.
      * @param {!Element} inputNode
      * @param {!Function} callbackSuccess
      * @param {!Function} callbackError
      */
    const readInputFile = function(inputNode, callbackSuccess, callbackError) {
      if (inputFileReader) {
        inputFileReader.onload = null;
        inputFileReader.onerror = null;
        inputFileReader.abort();
        inputFileReader = null;
      }
      if (inputNode.files && inputNode.files[0]) {
        inputFileReader = new FileReader();
        inputFileReader.onload = function(event) {
          callbackSuccess(event.target.result);
        };
        inputFileReader.onerror = callbackError;
        inputFileReader.readAsDataURL(inputNode.files[0]);
      }
    };

