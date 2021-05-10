import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAxNzaEmDyyMWGvIm38MpytFdHARmrJ5OQ",
    authDomain: "neurons-inc.firebaseapp.com",
    projectId: "neurons-inc",
    storageBucket: "neurons-inc.appspot.com",
    messagingSenderId: "1039683784806",
    appId: "1:1039683784806:web:969dca7eeca0fc52861da7"
};
    // Initialize Firebase
    const fire = firebase.initializeApp(firebaseConfig);

export default fire;