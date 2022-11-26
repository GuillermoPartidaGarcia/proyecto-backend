const { Schema } = require('mongoose');
const { hash } = require('bcryptjs');

const userSchema = new Schema({
    username: { type: Schema.Types.String, required: true },
    name: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true },
    password: { type: Schema.Types.String, required: true },
    authTokenId: { type: Schema.Types.String },
    type: { type: Schema.Types.String, enum: ['buyer', 'seller'] },
    // refs
    profilePic: { type: Schema.Types.ObjectId, ref: 'Media' },
    orders: { type: [Schema.Types.ObjectId], ref: 'Order' },
    planner: { type: Schema.Types.ObjectId, ref: 'Planner' },
    reviews: { type: [Schema.Types.ObjectId], ref: 'Review' },
    comments: { type: [Schema.Types.ObjectId], ref: 'Comment' },
});

// encriptar la contrasena cada que cambie
userSchema.pre('save', function preSave(next) {
    if (!this.isModified('password') || !this.password){
        next();
        return;
    }

    hash(this.password, 10, (err, password)=>{
        if(err) {
            next();
            return;
        }
        this.password = password;
        next();
    });
});

// indice para busqueda por texto
userSchema.index({name: 'text', email: 'text'});

module.exports = userSchema;
