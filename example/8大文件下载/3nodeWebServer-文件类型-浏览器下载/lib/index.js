var fs = require('fs');

exports.getextName = function(extname) {
	var extJson = fs.readFileSync('./lib/mime.json');
	var res = JSON.parse(extJson.toString());
	return res[extname];
}



// exports.getextName = function(extname) {
// 	switch (extname) {
// 		case '.html':
// 			return 'text/html';
// 			break;
// 		case '.css':
// 			return 'text/css';
// 			break;
// 		case '.js':
// 			return 'text/javascript';
// 			break;
// 		case '.jpg':
// 			return 'image/jpeg';
// 			break;
// 		default:
// 			return 'text/html';
// 			break;
// 	}
// }