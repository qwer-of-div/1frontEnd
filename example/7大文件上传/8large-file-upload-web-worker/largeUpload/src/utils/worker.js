import { createChunk } from "./creatChunk";
onmessage = async function (e) {
    const { file, start, end, chunkSize } = e.data;
    const result = []
    for (let i = start; i < end; i ++) {
        const chunk = await createChunk(file, i, chunkSize);
        result.push(chunk)
    }
    const chunks = await Promise.all(result)
    postMessage(chunks)
}