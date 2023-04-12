import cv2

# 读取扫描图片并转换为灰度图像
img = cv2.imread("./output/outputpage_48.jpg")
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# 阈值化图像
_, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV+cv2.THRESH_OTSU)

# 填充边框为黑色
border_value = 0
border_size = 100  
thresh=cv2.copyMakeBorder(thresh,border_size,border_size,border_size,border_size,cv2.BORDER_CONSTANT,value=border_value)

# 检测轮廓，获取最大轮廓和最大轮廓的矩形
contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
max_contour = max(contours, key=cv2.contourArea)
x, y, w, h = cv2.boundingRect(max_contour)

# 裁剪ROI区域并保存结果图像
cropped = img[y:y+h, x:x+w]
cv2.imwrite("cropped_image.jpg", cropped)
