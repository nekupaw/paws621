
var firebaseConfig = {
    apiKey: "AIzaSyDxwMf0VXc8Q4H5s2UIrzJtreCY9JBQCak",
    authDomain: "paws621-be248.firebaseapp.com",
    projectId: "paws621-be248",
    storageBucket: "paws621-be248.appspot.com",
    messagingSenderId: "540893716546",
    appId: "1:540893716546:web:40a2250255059865e6cddb"
};

firebase.initializeApp(firebaseConfig);


    var user = firebase.auth().currentUser;
    var userId;



    const uploadContainerDate = document.getElementById('uploadContainerDate');
    const uploadContainerUsername = document.getElementById('uploadContainerUsername');
    const uploadContainerPFP = document.getElementById('uploadContainerPFP');

    const fs = firebase.firestore();
    const FireStorage = firebase.storage();



    function onPageLoad() {
        document.body.classList.add('no-scroll');
        unlockSite();
        getAuthCookie();
        LoadDate();

        if(user)
        {
            console.log('user ist angemeldet');
        }
    
    }


    


    function getAuthCookie()
    {
        return decodeURIComponent(document.cookie)
        .split('; ')
        .find(cookie => cookie.startsWith("authToken="))
        ?.split('=')[1] || null;
    }



    firebase.auth().onAuthStateChanged(function(user)
    {

    if (user)
    {
    LoadUserName();
    LoadPFP();

    var userId = user.uid;

    }
    else
    {

    }

    });

    



function LoadUserName()
{
    var user = firebase.auth().currentUser;


            const db = firebase.database();
            const usernameRef = db.ref('usernames').child(user.uid);

            usernameRef.once('value')
            .then(snapshot => 
            {
            FirebaseUsername = snapshot.val();
            
            document.getElementById("Username").textContent = FirebaseUsername;
            uploadContainerUsername.innerHTML = FirebaseUsername;
            })

    
}



function LoadDate()
{
    var cureentDate = new Date();
    var formattedDate = cureentDate.toLocaleDateString('en-EN', {day: 'numeric', month: 'long', year: 'numeric'})

    uploadContainerDate.innerHTML = formattedDate;
}


function unlockSite() {
    var SplashDisplay = document.getElementById('splashScreen');
    SplashDisplay.style.display = "none";
    document.body.classList.remove('no-scroll');
}





function LoadPFP() {

const db = firebase.database();
var user = firebase.auth().currentUser;

const userRef = db.ref('PFP/' + user.uid);
var PFP = document.getElementById("currentPFP");

var PFPURL;

userRef.child('pfURL').on('value', function(snapshot)
{
    const pfURL = snapshot.val();

    if (pfURL)
    {
        PFPURL = "url('"+ pfURL +"')"

        PFP.style.backgroundImage = PFPURL;
        
        uploadContainerPFP.src = ""+ pfURL +"";
    }
    else
    {

    }
});
}




document.addEventListener('scroll', function() {
    var elements = ['TopBarID', 'LogoID', 'currentPFP', 'AccountBarID', 'Username', 'TopBarContainerID', 'Btn1', 'Btn2', 'Btn3', 'PostBtn'];
    var TimelineBtn = document.getElementById('Btn1');
    var GalleryBtn = document.getElementById('Btn2');
    var ChatBtn = document.getElementById('Btn3');


    elements.forEach(function(elementId) {
        var element = document.getElementById(elementId);
        element.classList.toggle('scrolled', window.scrollY > 0);
    });

    const IconStyle = 'height: 22px; width: 22px;';

if (window.scrollY > 0) {
    TimelineBtn.innerHTML = `<img src="ui_design/pets_FILL0_wght400_GRAD0_opsz24.png" style="${IconStyle}">`;
    GalleryBtn.innerHTML = `<img src="ui_design/photo_library_FILL0_wght400_GRAD0_opsz24_black.png" style="${IconStyle}">`;
    ChatBtn.innerHTML = `<img src="ui_design/chat_FILL0_wght400_GRAD0_opsz24.png" style="${IconStyle}">`;
} else {
    TimelineBtn.innerHTML = `<img src="ui_design/pets_FILL0_wght400_GRAD0_opsz24.png" style="${IconStyle}">Timeline`;
    GalleryBtn.innerHTML = `<img src="ui_design/photo_library_FILL0_wght400_GRAD0_opsz24_black.png" style="${IconStyle}">Gallery`;
    ChatBtn.innerHTML = `<img src="ui_design/chat_FILL0_wght400_GRAD0_opsz24.png" style="${IconStyle}">Chat`;
}
});






const PostScreen = document.getElementById('PostScreen');
var PostUploadInput = document.getElementById('BarkPostText');
const barkPostUploadContainer = document.getElementById('barkPostUploadContainerID');
const uploadCloseBtn = document.getElementById('uploadCloseBtnId');


function EnterPostScreen()
{
        PostScreen.style.display = 'flex';

        uploadCloseBtn.classList.add('visible');

        PostScreen.classList.add('visible');
        barkPostUploadContainer.classList.add('visible');
}

function ExitPostScreen()
{
    PostScreen.classList.remove('visible');
    barkPostUploadContainer.classList.remove('visible');
    uploadCloseBtn.classList.remove('visible');

        PostScreen.style.display = 'none';
        PostUploadInput.value = '';

        var BarkAddedImages = document.getElementById('AddImageToBarkID');
        var selectedImage = BarkAddedImages.files[0];
        const ImageContainer = document.getElementById('BarkAddedImagesContainer');
    
        if(selectedImage)
        {
            ImageContainer.removeChild(ImageContainer.firstChild);
        }
}



function AddPicutreToBark() {
    var BarkAddedImages = document.getElementById('AddImageToBarkID');
    var selectedImage = BarkAddedImages.files[0];
    const ImageContainer = document.getElementById('BarkAddedImagesContainer');

    while (ImageContainer.firstChild) {
        ImageContainer.removeChild(ImageContainer.firstChild);
    }

    if (selectedImage) {
        const AddedImageURL = URL.createObjectURL(selectedImage);

        const imageDiv = document.createElement('div');
        imageDiv.className = 'BarkAddPictureView';
        imageDiv.style.backgroundImage = 'url(' + AddedImageURL + ')';
        imageDiv.id = "BarkAddPictureImage"
        imageDiv.setAttribute('onmouseover', 'barkAddPictureMouseOver()');
        imageDiv.setAttribute('onmouseleave', 'barkAddPictureMouseLeave()');

        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.className = 'removePictureOnBarkBtn';
        removeButton.id = 'removePictureOnBarkBtnId';
        removeButton.textContent = 'X';
        removeButton.setAttribute('onclick', 'RemovePictureToBark()');

        imageDiv.appendChild(removeButton);

        ImageContainer.appendChild(imageDiv);
    }
}



function RemovePictureToBark()
{
    var BarkAddedImages = document.getElementById('AddImageToBarkID');
    var selectedImage = BarkAddedImages.files[0];
    const ImageContainer = document.getElementById('BarkAddedImagesContainer');

    if(selectedImage)
    {
        ImageContainer.removeChild(ImageContainer.firstChild);
        BarkAddedImages.value = null;
    }


}




function bark()
{
    var BarkAddedImages = document.getElementById('AddImageToBarkID');
    var selectedImage = BarkAddedImages.files[0];
    const ImageContainer = document.getElementById('BarkAddedImagesContainer');

    var noContentText = document.getElementById('noContentText');

    console.log("First function aufgerufen");

    var PostUploadInput = document.getElementById('BarkPostText').value;

    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    var collectionRef = fs;

    var user = firebase.auth().currentUser;
    var userId = user.uid;


    const barkData =
    {
        userId: userId,
        barkText: PostUploadInput,
        timestamp: timestamp,
        ImageUrl: null,
        LikeCount: 0,
    }


    

        if (PostUploadInput.length > 0)
        {
            console.log(userId)
            console.log(PostUploadInput)


            if (selectedImage)
            {

                var storageRef = FireStorage.ref(`bark_images/${userId}/${selectedImage.name}`);
                var ImageUploadTask = storageRef.put(selectedImage);

                ImageUploadTask.on('state_changed', 
                        () =>
                            {
                                console.log('Bild erfolgreich hochgeladen');
                        
                                ImageUploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>
                                {
                                barkData.ImageUrl = downloadURL;
                                console.log(barkData.ImageUrl);

                                fs.collection('barks').add(barkData)
                                .then((docRef) =>{
                                console.log('bark erstellt');
                                ExitPostScreen();
                                LoadNextBarks();
                                });
                        });
                    });
                
            }
            else
            {
                fs.collection('barks').add(barkData)
                .then((docRef) =>{
                console.log('bark erstellt');
                ExitPostScreen();
                LoadNextBarks();
                });
            }

        }
        else
        {
            if(selectedImage)
            {
                noContentText.innerText = 'give your picture some content input!'
            }
            else
            {
                noContentText.innerText = 'give ur Bark some content input!'
            }
        }

}


