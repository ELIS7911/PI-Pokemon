//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Type } = require('./src/db.js');
const axios = require('axios');

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
	let info = await axios.get('https://pokeapi.co/api/v2/type');
	info = info.data.results.map((p) => ({
		name: p.name,
	}));

	let types = info.map((type) =>
		Type.findOrCreate({
			where: { name: type.name },
		})
	);

	Promise.all(types).then((resp) => {
		console.log('Carga correcta...');
	});

	server.listen(3001, () => {
		console.log('%s listening at 3001'); // eslint-disable-line no-console
	});
});
