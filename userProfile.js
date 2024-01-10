document.addEventListener('DOMContentLoaded', function()
{
    LoadUserSitePFP();
    LoadUserSiteName();
})





var currentUserSiteId = 'dAtAOYAi7cVAs3KPW0YhwBb2lw12';
const db = firebase.database();

PFPRef = db.ref('PFP/' + currentUserSiteId + '/pfURL');
usernameRef = db.ref('usernames/' + currentUserSiteId);

function LoadUserSitePFP()
{
    const documentPFPId = document.getElementById('currentUserPFP');
    
    PFPRef.once('value')
    .then(function (snapshot)
    {
        document.getElementById('currentUserPFP').style.backgroundImage = 'url('+snapshot.val()+')'
    })
}


function LoadUserSiteName()
{
    usernameRef.once('value')
    .then(function (snapshot)
    {
        document.getElementById('ProfileSiteUsername').textContent = '@' + snapshot.val();
    });
}

const ProfileVerifyMarkSpan = document.createElement('span');
ProfileVerifyMarkSpan.id = 'ProfileVerifyMark';
ProfileVerifyMarkSpan.className = 'ProfileSiteVerifyMark';

const ProfileVerifyMarkNoteSpan = document.createElement('span');
ProfileVerifyMarkNoteSpan.id = 'ProfileVerifyMarkNote';
ProfileVerifyMarkNoteSpan.className = 'VerfyMarkNote';

const ProfileVerifyMarkContainer = document.getElementById('ProfileVerifyMarkContainer');

const UserVerifyCheckRef = fs.collection('User').doc(currentUserSiteId);

UserVerifyCheckRef.get()
.then(function (doc)
{
    if (doc.data().Verify === true)
    {
        ProfileVerifyMarkContainer.appendChild(ProfileVerifyMarkSpan);
        ProfileVerifyMarkContainer.appendChild(ProfileVerifyMarkNoteSpan);
    }
});

ProfileVerifyMarkSpan.addEventListener('mouseover', function()
{
    hoverTimeOut = setTimeout(function()
    {
        ProfileVerifyMarkNoteSpan.style.opacity = '1';
    }, 500);
})


ProfileVerifyMarkSpan.addEventListener('mouseleave', function()
{
    clearTimeout(hoverTimeOut);
    ProfileVerifyMarkNoteSpan.style.opacity = '0';

})


const FollowerCountRef = fs.collection('User/' + currentUserSiteId + '/follower');

FollowerCountRef.onSnapshot(function (querySnapshot)
{
    document.getElementById('FollowerCountID').textContent = querySnapshot.size + ' Follower';
})


