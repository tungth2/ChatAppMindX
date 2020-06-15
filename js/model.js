const model = {};
model.currentUser = undefined
model.conversations = undefined
model.currentConversation = undefined
model.register = ({ firstName, lastName, email, password }) => {
    document.getElementById("register-text").style = 'display: none;'
    document.getElementById("loading-icon").style = 'display: block;'

    console.log(firstName)
    firebase.auth().createUserWithEmailAndPassword(email, password).then((res) => {
        console.log(res)
        firebase.auth().currentUser.sendEmailVerification()
        firebase.auth().currentUser.updateProfile({
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

model.login = ({ email, password }) => {
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
    }).catch((err) => {
        console.log(err)
        document.getElementById("login-text").style = 'display: block;'
        document.getElementById("loading-icon").style = 'display: none;'
        alert("Please re-enter password");

    })
}

model.loadConversation = () => {
    const promise = new Promise ((resolve, reject) => {
        const collectionName = 'conversations'
        firebase.firestore().collection(collectionName).where('users', 'array-contains', model.currentUser.email).get().then(res => {
            model.conversations = getDataFromDocs(res.docs)
            if (model.conversations.length > 0) {
                model.currentConversation = model.conversations[0]
            }
            resolve()
        })
        
    })
    return promise
}

model.updateConversation = (message) => {

    firebase.firestore().collection('conversations').doc('uVbV9sabWqTEUvetpPj7').update(message).then(res => {
        console.log('Updated')
    })
}
getDataFromDoc = (doc) => {
    let user = doc.data()
    user.id = doc.id
    return user
}

getDataFromDocs = (docs) => {
    return docs.map(getDataFromDoc)
}