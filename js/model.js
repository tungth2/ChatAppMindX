const model = {};
model.currentUser = undefined
model.register = ({firstName, lastName, email, password}) => {
    document.getElementById("register-text").style = 'display: none;'
    document.getElementById("loading-icon").style = 'display: block;'

    console.log (firstName)
    firebase.auth().createUserWithEmailAndPassword(email, password).then((res) => {
        console.log(res)
        firebase.auth().currentUser.sendEmailVerification()
        firebase.auth().currentUser.updateProfile ({
            displayName: firstName + " " + lastName
        })
        console.log(firebase.auth().currentUser)
        view.setActiveScreen("loginScreen")
    }).catch((err) => {
        console.log(err)
        document.getElementById("register-text").style = 'display: block;'
        document.getElementById("loading-icon").style = 'display: none;'
        alert(err.message)
    })
}

model.login = ({email, password}) => {
    document.getElementById("login-text").style = 'display: none;'
    document.getElementById("loading-icon").style = 'display: block;'

    firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
        if (!res.user.emailVerified) {
            alert("Please verify your email")
        } else {
            model.currentUser = {
                displayName: res.user.displayName,
                uid: res.user.uid,
                email: res.user.email
            }
            view.setActiveScreen('chatScreen')
        }
        console.log(res)
    }).catch ((err) => {
        console.log(err)
        document.getElementById("login-text").style = 'display: block;'
        document.getElementById("loading-icon").style = 'display: none;'
        alert("Please re-enter password");
        
    })
}