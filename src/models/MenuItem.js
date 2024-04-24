
import moongoose, { Schema, model, models } from "mongoose";


const ExtraPriceShema = new Schema({
    name: String, // Sử dụng 'String' thay vì 'string'
    price: Number,
});


const MenuItemSchema = new Schema({
    name: {type: String},
    description: {type: String},
    category: {type: moongoose.Types.ObjectId},
    basePrice: {type: Number},
    sizes: {type: [ExtraPriceShema]},
    extraIngredientPrices: {type: [ExtraPriceShema]},
}, {timestamps: true});
export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema); 