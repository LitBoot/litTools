/**
 * 将 16 进制颜色转换为 RGB 格式
 * @param {string} hex - 16 进制颜色字符串，支持 3 位或 6 位格式
 * @returns {{r: number, g: number, b: number}} - 包含红、绿、蓝通道值的对象
 */
export function hexToRgb(hex) {
    // 移除可能包含的 # 字符
    hex = hex.replace(/^#/, '');

    // 如果是 3 位格式，则扩展为 6 位
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    // 将字符串解析为十六进制数值
    const num = parseInt(hex, 16);

    // 提取红、绿、蓝通道值
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;

    return { r, g, b };
}

// 示例用法
const hexColor = "#1a2b3c";
const rgbColor = hexToRgb(hexColor);

console.log('Hex:', hexColor);
console.log('RGB:', rgbColor);
