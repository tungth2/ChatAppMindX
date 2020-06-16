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
    const promise = new Promise((resolve, reject) => {
        const collectionName = 'conversations'
        firebase.firestore().collection(collectionName).where('users', 'array-contains', model.currentUser.email).get().then(res => {
            model.conversations = getDataFromDocs(res.docs)
            console.log(model.conversations)
            if (model.conversations.length > 0) {
                model.currentConversation = model.conversations[0]
            }
            resolve()
        })

    })
    return promise
}

model.setUpListenConversations = () => {
    const collectionName = 'conversations'
    let isFirstRun = true
    firebase.firestore().collection(collectionName).where('users', 'array-contains', model.currentUser.email).onSnapshot((snapshot) => {
        if (isFirstRun) {
            isFirstRun = false
            return
        }
        console.log(snapshot.docChanges())
        const docChanges = snapshot.docChanges()
        for (docChange of docChanges) {
            const type = docChange.type
            const doc = getDataFromDoc(docChange.doc)
            if (type === 'modified') {
                for (let index = 0; index < model.conversations.length; index++) {
                    if (model.conversations[index].id === doc.id) {
                        model.conversations[index] = doc
                    }
                }
                if (model.currentConversation.id === doc.id) {
                    model.currentConversation = doc
                    view.addMessage(model.currentConversation.messages[model.currentConversation.messages.length-1])
                }
            }
            console.log(doc)
        }
    })
}
model.addMessage = (message) => {
    const dataToUpdate = {
        messages: firebase.firestore.FieldValue.arrayUnion(message)
    }
    firebase.firestore().collection('conversations').doc(model.currentConversation.id).update(dataToUpdate).then(res => {
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