import { Friends } from "../../database/models/Friends.js"
export const getFriends = async function(user){
    return await Friends.findById(user._id).populate();
}
export const addFriend = async function(user, other){
    await Friends.findByIdAndUpdate({_id: user._id}, {$push: {friends: other_id}});
}
export const removeFriend = async function(user, other){
    await Friends.findByIdAndUpdate({_id: user._id}, {$pull: {friends: other_id}});
}
export const isFriend = async function(user, other){
    const userFriendsDocument = await Friends.findById({_id: user._id});
    return userFriendsDocument.friends.includes(other_id);
}
// remove friend