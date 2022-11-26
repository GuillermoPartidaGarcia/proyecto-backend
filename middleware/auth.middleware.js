const { verify } = require('jsonwebtoken');
const { getUser } = require('../data/controller/user');

function validateToken(req, _res, next) {
	const authorization = req.get('authorization');
	if (!authorization) {
		next();
		return;
	}

	const token = authorization.split(' ')[1];
	verify(token, process.env.SECRET, async (err, payload) => {
		if (err) {
			next();
			return;
		}

		const user = await getUser({ _id: payload.dat.user });
		if (user === null) {
			next();
			return;
		}

		if (user.authTokenId !== payload.dat.id) {
			next();
			return;
		}

		req.user = user;
		next();
	});
}

module.exports = validateToken;
