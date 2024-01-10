
var user = firebase.auth().currentUser;
var userId;

db = firebase.database();

var lastLoadedTimestamp;

const timeline = document.getElementById('timelineID');

var barkCounter = 0;




document.addEventListener('DOMContentLoaded', function(){

    LoadNextBarks();

    setInterval(function ()
    {
        LoadNextBarks();
        console.log('Loaded');
    }, 10000);

});

function LoadBarkAd()
{
    const timeline = document.getElementById('timelineID');

    const bark = document.createElement('span');
    bark.className = 'bark';
    bark.id = 'ad';

    const barkProfileCard = document.createElement('div');
    barkProfileCard.className = 'barkProfileCard';

    const barkProfileCardData = document.createElement('div')
    barkProfileCardData.className = 'barkProfileCardData';

    const barkUsernameContainer = document.createElement('div');
    barkUsernameContainer.style.display = 'flex';
    barkUsernameContainer.style.flexDirection = 'row';
    barkUsernameContainer.style.gap = '5px';

    const barkAdMark = document.createElement('div');
    barkAdMark.className = 'AdMark';

    const AdScript = document.createElement('script');
    AdScript.async = true;
    AdScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8133483889722888';
    AdScript.crossOrigin = 'anonymous';

    const AdWindowScript = document.createElement('script');
    AdWindowScript.innerHTML = '(adsbygoogle = window.adsbygoogle || []).push({});';

    const AdContainer = document.createElement('ins');
    AdContainer.className = 'adsbygoogle';
    AdContainer.style.display = 'block';
    AdContainer.setAttribute('data-ad-client', 'ca-pub-8133483889722888');
    AdContainer.setAttribute('data-ad-slot', '9484644758');
    AdContainer.setAttribute('data-ad-format', 'auto');
    AdContainer.setAttribute('data-full-width-responsive', 'true');
    

    barkProfileCard.appendChild(barkProfileCardData);
    barkUsernameContainer.appendChild(barkAdMark);
    barkProfileCardData.appendChild(barkUsernameContainer);

    bark.appendChild(barkProfileCard);
    bark.appendChild(AdScript);
    bark.appendChild(AdContainer);
    bark.appendChild(AdWindowScript);


    timeline.appendChild(bark);
}




function LoadNextBarks(){



    

var query = fs.collection('barks')
    .orderBy('timestamp', 'desc')


if (lastLoadedTimestamp)
    {
        query = query.startAfter(lastLoadedTimestamp);
    }


    const monthNames = ['Jaaaanuary', 'FebrUwUary', 'March', 'March (lol, already April)', 'May', 'June (pride moooonth)', 'July', 'August', 'September', 'AWOOOOctober', 'NOwOvember', 'December'];

query.get()
    .then((querySnapshot) =>
    {
        if(!querySnapshot.empty)
        {
        querySnapshot.forEach((doc) =>
        {
            const barkData = doc.data();
            var timestamp = barkData.timestamp;

            
            var barkUid = barkData.userId;
            var barkPFP;
            let barkUsernameVal;

            var barkLikes;
            var LikeCountBefore;

            var barkImageUrl = barkData.ImageUrl;

            var barkID = doc.id;


            var userVerify;

            fs.collection('User').doc(barkUid).get().then((doc) =>
            {
                userVerify = doc.data().Verify;
            });

            
            db.ref('PFP/' + barkUid + '/pfURL').once('value')
            .then((snapshot) =>
            {
                barkPFP = snapshot.val();

                
                db.ref('usernames/' + barkUid).once('value')
                .then((snapshot) =>
                {
                    barkUsernameVal = snapshot.val();

                    var BarkDate = timestamp.toDate();
                    var day = BarkDate.getDate();
                    var monthIndex = BarkDate.getMonth();
                    var month = monthNames[monthIndex]
                    var year = BarkDate.getFullYear();
                    var formattedDate = day + '. ' + month + ' ' + year;


                    LikeCountBefore = barkData.LikeCount;
            
                    if (LikeCountBefore === undefined){
                        barkLikes = 0;
                    }
                    else{
                        barkLikes = LikeCountBefore;
                    }
        
                    updateTimeline(barkData, formattedDate, barkPFP, barkUsernameVal, userVerify, barkLikes, barkID, barkImageUrl);
                });

            })

        });

        lastLoadedTimestamp = querySnapshot.docs[querySnapshot.docs.length - 1].data().timestamp.toDate();
        }
    })
}




function updateTimeline(barkData, formattedDate, barkPFP, barkUsernameVal, userVerify, barkLikes, barkID, barkImageUrl) {

    barkCounter++;

    if (barkCounter % 4 === 0)
    {
        LoadBarkAd();
        updateTimelineWithBark(barkData, formattedDate, barkPFP, barkUsernameVal, userVerify, barkLikes, barkID, barkImageUrl);
    }
    else{
        updateTimelineWithBark(barkData, formattedDate, barkPFP, barkUsernameVal, userVerify, barkLikes, barkID, barkImageUrl);
    }


function updateTimelineWithBark()
{
    const timeline = document.getElementById('timelineID');

    const bark = document.createElement('span');
    bark.className = 'bark';
    bark.id = `${barkID}`

    const barkProfileCard = document.createElement('div');
    barkProfileCard.className = 'barkProfileCard';

    const barkProfileCardPFP = document.createElement('div');
    barkProfileCardPFP.className = 'barkProfileCardPFP';
    barkProfileCardPFP.style.backgroundImage = `url('${barkPFP}')`;

    const barkProfileCardData = document.createElement('div')
    barkProfileCardData.className = 'barkProfileCardData';

    const barkUsernameContainer = document.createElement('div');
    barkUsernameContainer.style.display = 'flex';
    barkUsernameContainer.style.flexDirection = 'row';
    barkUsernameContainer.style.gap = '5px';

    const barkUsername = document.createElement('div');
    barkUsername.style.fontSize = '19px';
    barkUsername.style.color = 'black';
    barkUsername.textContent = `@${barkUsernameVal}`;


    const barkCreateDate = document.createElement('div');
    barkCreateDate.style.fontSize = '12px';
    barkCreateDate.style.color = 'rgb(105, 105, 105)';
    barkCreateDate.textContent = `${formattedDate}`;

    const barkContent = document.createElement('p');
    barkContent.className = 'barkContent';
    barkContent.textContent = `${barkData.barkText}`;

    const barkBottomSpace = document.createElement('div');
    barkBottomSpace.className = 'barkBottomSpace';

    const barkLikeBtn = document.createElement('button');
    barkLikeBtn.type = 'button';
    barkLikeBtn.className = 'LikeBtn';
    barkLikeBtn.title = 'like';

    const functions = firebase.functions();
    const handleLikeButtonClick = functions.httpsCallable('handleLikeButtonClick');
    
    barkLikeBtn.addEventListener('click', async function()
    {

        db.ref('LikeCount/' + barkID).child(firebase.auth().currentUser.uid).once('value', (snapshot) =>
        {
            if (snapshot.exists())
            {
                db.ref('LikeCount/' + barkID).once('value', (snapshot) =>
                {
                    barkLikeCountNumber.textContent = snapshot.numChildren() - 1;
                });
        

                barkLikeBtn.classList.remove('animated');
                barkLikeCountNumber.style.color = 'black';
            }
            else
            {
                db.ref('LikeCount/' + barkID).once('value', (snapshot) =>
                {
                    barkLikeCountNumber.textContent = 1 + snapshot.numChildren();
                });
        
                barkLikeBtn.classList.add('animated');
                barkLikeCountNumber.style.color = '#1d82fe';
        
            }
        });

        likeBark(barkID);
        
        //try{
        //    const result = await handleLikeButtonClick({ barkID: barkID });
        //}
        //catch
        //{
        //    console.error('something went wrong, please try again');
        //    barkLikeBtn.classList.remove('animated');
        //    barkLikeCountNumber.style.color = 'black';
        //}
    });

    const barkLikeCountNumber = document.createElement('p');
    barkLikeCountNumber.style.fontSize = '13px';
    barkLikeCountNumber.style.marginLeft = '5px';
    
    db.ref('LikeCount/' + barkID).on('value', (snapshot) =>
    {
        barkLikeCountNumber.textContent = snapshot.numChildren();
    });

    db.ref('LikeCount/' + barkID).child(firebase.auth().currentUser.uid).on('value', (snapshot) =>
    {
        if (snapshot.exists())
        {
            barkLikeBtn.classList.add('animated');
            barkLikeCountNumber.style.color = '#1d82fe';
        }
        else
        {
            barkLikeBtn.classList.remove('animated');
            barkLikeCountNumber.style.color = 'black';
        }
    });

    const barkCommentBtn = document.createElement('button');
    barkCommentBtn.className = 'commentBtn';
    barkCommentBtn.title = 'comment'
    barkCommentBtn.type = 'button';

    barkCommentBtn.addEventListener('click', function()
    {
        const CloseBtnContainer = document.createElement('div');
        CloseBtnContainer.style.width = '680px';
        CloseBtnContainer.style.marginBottom = '15px';

        const CloseBtn = document.createElement('button');
        CloseBtn.classList.add('closeBtn');
        CloseBtn.innerHTML = 'X';
        CloseBtn.addEventListener('click', function()
        {
            document.getElementById('Site').removeChild(commentContainer);
        });

        const commentContainer = document.createElement('div');
        commentContainer.classList.add('commentFrame');
        
        const commentContainerInput = document.createElement('div');
        commentContainerInput.classList.add('commentInputContainer');
        
        const commentContainerProfile = document.createElement('div');
        commentContainerProfile.style.paddingBottom = '10px';
        commentContainerProfile.style.paddingTop = '10px';
        commentContainerProfile.classList.add('commentScreenProfileContainer');
        
        const commentContainerDecoration = document.createElement('div');
        commentContainerDecoration.classList.add('commentReplyDecoration');
        
        const commentContainerProfileSubcontainer = document.createElement('span');
        commentContainerProfileSubcontainer.style.display = 'flex';
        commentContainerProfileSubcontainer.style.flexDirection = 'column';
        commentContainerProfileSubcontainer.style.gap = '5px';
        
        const commentContainerProfileReplytext = document.createElement('p');
        commentContainerProfileReplytext.style.color = '#585858';
        commentContainerProfileReplytext.style.margin = '0';
        commentContainerProfileReplytext.textContent = 'reply to';
        
        const commentContainerProfileProfileName = document.createElement('p');
        commentContainerProfileProfileName.style.color = '#585858';
        commentContainerProfileProfileName.style.margin = '0';
        commentContainerProfileProfileName.style.cursor = 'pointer';
        commentContainerProfileProfileName.textContent = `@${barkUsernameVal}`;
        
        const commentContainerInputContainer = document.createElement('div');
        commentContainerInputContainer.classList.add('inputContainer');
        
        const commentContainerInputTextarea = document.createElement('textarea');
        commentContainerInputTextarea.classList.add('commentTextarea');
        commentContainerInputTextarea.placeholder = 'What do you have to comment!?';
        commentContainerInputTextarea.cols = '30';
        commentContainerInputTextarea.rows = '10';

        commentContainerBarkbtnContainer = document.createElement('div');
        commentContainerBarkbtnContainer.style.paddingBottom = '12px';

        const uploadBtn = document.createElement('button');
        uploadBtn.classList.add('uploadPostBtn');
        uploadBtn.innerText = 'bark!';

        commentContainer.appendChild(CloseBtnContainer);
        CloseBtnContainer.appendChild(CloseBtn);
        commentContainer.appendChild(commentContainerInput);
        commentContainerInput.appendChild(commentContainerProfile);
        commentContainerProfile.appendChild(commentContainerDecoration);
        commentContainerProfile.appendChild(commentContainerProfileSubcontainer);
        commentContainerProfileSubcontainer.append(commentContainerProfileReplytext, commentContainerProfileProfileName);
        commentContainerInput.appendChild(commentContainerInputContainer);
        commentContainerInputContainer.appendChild(commentContainerInputTextarea);
        commentContainerInput.appendChild(commentContainerBarkbtnContainer);
        commentContainerBarkbtnContainer.appendChild(uploadBtn);
        
        document.getElementById('Site').appendChild(commentContainer);
        

    });

    const barkCommentContNumber = document.createElement('p');
    barkCommentContNumber.style.fontSize = '13px';
    barkCommentContNumber.style.marginLeft = '5px';
    barkCommentContNumber.textContent = '0';

    const barkViewCountIcon = document.createElement('div');
    barkViewCountIcon.className = 'viewsIcon';

    const barkViewContNumber = document.createElement('p');
    barkViewContNumber.style.fontSize = '13px';
    barkViewContNumber.style.marginLeft = '5px';
    barkViewContNumber.textContent = '0';

    barkProfileCard.appendChild(barkProfileCardPFP);
    barkProfileCard.appendChild(barkProfileCardData);
    barkUsernameContainer.appendChild(barkUsername);
    barkProfileCardData.appendChild(barkUsernameContainer);
    barkProfileCardData.appendChild(barkCreateDate);

    barkBottomSpace.appendChild(barkLikeBtn);
    barkBottomSpace.appendChild(barkLikeCountNumber);
    barkBottomSpace.appendChild(barkCommentBtn);
    barkBottomSpace.appendChild(barkCommentContNumber);
    barkBottomSpace.appendChild(barkViewCountIcon);
    barkBottomSpace.appendChild(barkViewContNumber);

    bark.appendChild(barkProfileCard);
    bark.appendChild(barkContent);

    if (barkImageUrl !== null)
    {
        const barkImage = document.createElement('img');
        barkImage.className = 'barkImageContainer';
        barkImage.src = barkImageUrl;
        barkImage.loading = 'lazy';

        bark.appendChild(barkImage);
    }

    bark.appendChild(barkBottomSpace);

    timeline.appendChild(bark);


    
    if (userVerify)
    {
        const barkVerfiyHoverContainer = document.createElement('div');
        barkVerfiyHoverContainer.className = 'barkVerifyHoverContainerStyle';
    
    
        const barkVerifyMarkSpan = document.createElement('span');
        barkVerifyMarkSpan.className = 'barkVerifyMark';
    
        let hoverTimeOut;
        barkVerifyMarkSpan.addEventListener('mouseover', function()
        {
            hoverTimeOut = setTimeout(function(){
                barkVerifyMarkNoteSpan.style.opacity = '1';
            }, 500);
        })
            barkVerifyMarkSpan.addEventListener('mouseleave', function()
        {
            clearTimeout(hoverTimeOut);
            barkVerifyMarkNoteSpan.style.opacity = '0';
        })
    
        const barkVerifyMarkNoteSpan = document.createElement('span');
        barkVerifyMarkNoteSpan.className = 'VerfyMarkNote';

        barkVerfiyHoverContainer.appendChild(barkVerifyMarkNoteSpan);
        barkVerfiyHoverContainer.appendChild(barkVerifyMarkSpan);
        barkUsernameContainer.appendChild(barkVerfiyHoverContainer);
    }

    return bark;

}
}