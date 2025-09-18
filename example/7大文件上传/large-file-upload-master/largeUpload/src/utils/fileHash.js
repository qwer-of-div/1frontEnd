import SparkMD5 from "spark-md5";

export const fileHash1 = (chunk) => {
    return new Promise((resolve) => {
        const spark = new SparkMD5.ArrayBuffer()
        _read(0)
        function _read(i) {
            if (i>= chunk.length) {
                resolve(spark.end())
                return
            }
            const blob = chunk[i]
            spark.append(blob.hash)
                _read(i+1)
        }
    })
    
}