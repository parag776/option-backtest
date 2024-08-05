import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const friendsSchema = new Schema({
    friends: [{type: mongoose.Schema.Types.ObjectId, ref:"User"}]
})

export const Friends = mongoose.model('Friends', friendsSchema);