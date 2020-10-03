import * as moogose from 'mongoose';

export const ProductSchema = new moogose.Schema({
    owner:{
        type:moogose.Schema.Types.ObjectId,
        ref:'User'
    },
    title : String,
    description:String,
    image:String,
    price:String,
    created:{
        type: Date,
        default: Date.now
    },
    
})