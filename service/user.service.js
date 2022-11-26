const jwt = require('jsonwebtoken');
const { getUser, getUsers, removeUser, createUser, changeUser } = require('../data/controller/user');
const { compareSync } = require('bcryptjs');
const { v4:uuid } = require('uuid');

async function userCreate(username, email, name, password, type) {
    try {
        const users = await getUsers( { $or: [{username}, {email}] });
        if (users.length !== 0)
            return { code: 400, err: 'User exists already' };

        const data = await createUser({ username, email, name, password, type });

        return { code: 200, data };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function userFind(id) {
    try {
        const data = await getUser({ _id: id }).populate('profilePic');
        if (data === null)
            return { code: 404, err: 'User not found' };

        return { code: 200, data };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function userAll() {
    try {
        const data = await getUsers({}).populate('profilePic');

        if (data.length === 0) {
            return { code: 404, err: 'No users found' }; 
        }

        return { code: 200, data };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function userUpdate(id, updatedData) {
    try {
        const user = await getUser({ _id: id });
        if (user===null)
            return { code: 404, err: 'User not found' };

        Object.keys(updateData).forEach( key => user[key] = updatedData[key] );
        user.save();

        return { code: 200 };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function userDelete(id) {
    try {
        const user = await getUser({ _id : id });
        if (user===null)
            return { code: 404, err: 'User not found'};

        await removeUser({ _id: id });
        
        return { code: 200 };
    } catch (e) {
        return {code: 500, err: e.message};
    }
}

async function userSearch(query, limit=40, page=0) {
    try {
        const data = await getUsers({ $text: query }).limit(limit).skip(page * limit);
        if (data.length === 0) {
            return { code: 400, err: 'No results' };
        }

        return { code: 200, data };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

async function userLogin(email, password){
    try {
        const user = await getUser({email});
        if (user===null)
            return { code: 404, err: 'User not found'};

        if (!compareSync(password, user.password))
            return { code: 401, err: 'Wrong email or password' };
        
        const id = uuid();
        const token = jwt.sign( {
            typ: 'auth',
            dat: {
                id,
                user: user._id,
            },
            iat: new Date().getTime(),
        }, process.env.SECRET, { expiresIn: "3y" });

        user.authTokenId = id;
        user.save();

        const data = { token };

        return { code: 200, data };
    } catch (e) {
        return { code: 500, err: e.message };
    }
}

module.exports = {
    userCreate,
    userFind,
    userAll,
    userUpdate,
    userDelete,
    userSearch,
    userLogin,
};