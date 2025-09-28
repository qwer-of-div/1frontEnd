import SparkMD5 from "spark-md5";
// 导出一个函数createChunk，用于创建文件块
export const createChunk = (file, index, size) => {
    // 返回一个Promise对象
    return new Promise((resolve) => {
        // 计算文件块的起始位置
        const start = index * size;
        // 计算文件块的结束位置
        const end = start + size
        // 创建一个SparkMD5对象，用于计算文件块的hash值
        const spark = new SparkMD5.ArrayBuffer();
        const fileReader = new FileReader();
        const blob = file.slice(start, end);
        fileReader.onload = (e) => {
            spark.append(e.target.result);
            resolve({
                start,
                end,
                index,
                hash: spark.end(),
                blob
            })
        }
        fileReader.readAsArrayBuffer(blob);
    })
}