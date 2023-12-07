// https://zhuanlan.zhihu.com/p/469763011#:~:text=%E4%BD%BF%E7%94%A8JS%E7%94%9F%E6%88%90UUID%E7%9A%84%E5%B8%B8%E7%94%A8%E6%96%B9%E6%B3%95%201%20%E4%B8%80%E3%80%81%E4%BD%BF%E7%94%A8Math.random%20%28%29%E3%80%82%202,%E4%BA%8C%E3%80%81%E4%BD%BF%E7%94%A8crypto%E6%8F%90%E4%BE%9B%E7%9A%84randomUUID%E6%96%B9%E6%B3%95%203%20%E4%B8%89%E3%80%81%E4%BD%BF%E7%94%A8crypto%E6%8F%90%E4%BE%9B%E7%9A%84getRandomValues%E6%96%B9%E6%B3%95%204%20%E4%B8%89%E3%80%81%E5%AE%9E%E9%99%85%E5%BC%80%E5%8F%91%E4%B8%AD%E6%8E%A8%E8%8D%90%E7%9A%84%E6%96%B9%E6%B3%95

function getUuid() {
    if (typeof crypto === 'object') {
        if (typeof crypto.randomUUID === 'function') {
            return crypto.randomUUID();
        }
        if (typeof crypto.getRandomValues === 'function' && typeof Uint8Array === 'function') {
            const callback = (c) => {
                const num = Number(c);
                return (num ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))).toString(16);
            };
            return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, callback);
        }
    }
    let timestamp = new Date().getTime();
    let perforNow = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let random = Math.random() * 16;
        if (timestamp > 0) {
            random = (timestamp + random) % 16 | 0;
            timestamp = Math.floor(timestamp / 16);
        } else {
            random = (perforNow + random) % 16 | 0;
            perforNow = Math.floor(perforNow / 16);
        }
        return (c === 'x' ? random : (random & 0x3) | 0x8).toString(16);
    });
};