window.onload = () => {
    //view.setActiveScreen('registerScreen')
    var firebaseConfig = {
        apiKey: "AIzaSyCs1MGhMFEWTj-XuHyDuzNXmQSTCNoGHq0",
        authDomain: "chatapp-af7f6.firebaseapp.com",
        databaseURL: "https://chatapp-af7f6.firebaseio.com",
        projectId: "chatapp-af7f6",
        storageBucket: "chatapp-af7f6.appspot.com",
        messagingSenderId: "91196454568",
        appId: "1:91196454568:web:94d175d0652094e7b0749d",
        measurementId: "G-SKTYK9XKMF"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    //firebase.analytics();
    firebase.auth().onAuthStateChanged (user => {
        if (user) {
            model.currentUser = {
                displayName: user.displayName,
                uid: user.uid,
                email: user.email
            }
            view.setActiveScreen('chatScreen')
        } else {
            view.setActiveScreen('loginScreen')
        }
    })
}