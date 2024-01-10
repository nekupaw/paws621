async function likeBark(barkId)
{
    let userId = firebase.auth().currentUser.uid;

const likeRef = firebase.database().ref(`LikeCount/${barkId}/${userId}`);
const likeSnapshot = await likeRef.once("value");
const hasLiked = likeSnapshot.exists();


const db = firebase.database();

    
if (hasLiked)
{
    db.ref(likeRef).remove()
    .then(() =>
    {
        
    });
}
else
{
    db.ref(likeRef).set(true)
    .then(() =>
    {
        
    });
}
}