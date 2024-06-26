import {  model, models,Schema } from "mongoose";


const UserInfoSchema = new Schema({
    email: {type: String, required: true},
    address: { type: String},
    postalCode: { type: String},
    city: { type: String},
    country: { type: String},
    admin: {type: Boolean, default: false},
    phone: { type: String},
}, {timestamps: true});

export const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema);