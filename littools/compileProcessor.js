// Credit: https://juejin.cn/post/7237782663936327737

const fs = require("fs");

const htmlPath = "./dist/index.html"; // 打包后的html文件路径
const htmlText = fs.readFileSync(htmlPath, 'utf8');
const htmlArr = htmlText.match(/.*\n/g) || [];

let result = "";

htmlArr.forEach(v => {
    v = v
        .replace(/script ?nomodule\s?/g, "script ")
        .replace(/\s?crossorigin\s?/g, " ")
        .replace(/data-src/g, 'src');
    if (!v.includes(`script type="module"`)) {
        result += v;
    }
});

fs.writeFileSync(htmlPath, result, 'utf8');

console.log("处理完成");
