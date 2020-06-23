const model = {};
model.currentUser = undefined
model.conversations = undefined
model.currentConversation = undefined
model.register = ({ firstName, lastName, email, password }) => {
    document.getElementById("register-text").style = 'display: none;'
    document.getElementById("loading-icon").style = 'display: block;'

    //console.log(firstName)
    firebase.auth().createUserWithEmailAndPassword(email, password).then((res) => {
        //console.log(res)
        firebase.auth().currentUser.sendEmailVerification()
        firebase.auth().currentUser.updateProfile({
            displayName: firstName + " " + lastName
        })
        //console.log(firebase.auth().currentUser)
        view.setActiveScreen("loginScreen")
    }).catch((err) => {
        //console.log(err)
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
            // model.currentUser = {
            //     displayName: res.user.displayName,
            //     uid: res.user.uid,
            //     email: res.user.email
            // }
            // view.setActiveScreen('chatScreen')
        }
        //console.log(res)
    }).catch((err) => {
        //console.log(err)
        document.getElementById("login-text").style = 'display: block;'
        document.getElementById("loading-icon").style = 'display: none;'
        alert("Please re-enter password");

    })
}
// phai co async thi moi dung dc await
//model.loadConversation = async () => {...}
model.loadConversation = () => {
    const promise = new Promise((resolve, reject) => {
        const collectionName = 'conversations'
        // await usage
        // const res = await firebase.firestore().collection(collectionName).where(...).get()
        firebase.firestore().collection(collectionName).where('users', 'array-contains', model.currentUser.email).get().then(res => {
            model.conversations = getDataFromDocs(res.docs)
            if (model.conversations.length > 0) {
                model.currentConversation = model.conversations[0]
                view.setConversations()
            }

            resolve()
        })

    })
    return promise
}
model.setUpListenConversations = () => {
    const collectionName = 'conversations'
    let isFirstRun = true
    firebase.firestore().collection(collectionName).where('users', 'array-contains', model.currentUser.email).onSnapshot(snapshot => {
        console.log(snapshot)
        if (isFirstRun) {
            isFirstRun = false
            return
        }
        console.log(snapshot.docChanges)
        const docChanges = snapshot.docChanges()
        for (docChange of docChanges) {
            const type = docChange.type
            const doc = getDataFromDoc(docChange.doc)
            if (type === 'modified') {
                for (let index = 0; index < model.conversations.length; index++) {
                    if (model.conversations[index].id === doc.id) {
                        model.conversations[index] = doc
                        if (doc.messages[doc.messages.length-1].owner !== model.currentUser.email) {
                            view.setNotification(doc.id)
                        }
                    }
                }
                if (model.currentConversation.id === doc.id) {
                    if (model.currentConversation.users.length === doc.users.length) {
                        model.currentConversation = doc
                        view.addMessage(model.currentConversation.messages[model.currentConversation.messages.length - 1])
                    } else {
                        model.currentConversation = doc
                        view.addUser(doc.users[doc.users.length-1])
                    }

                }

            }
            else if (type == 'added') {
                model.conversations.push(doc)
                view.addConversation(doc)

            }
            console.log(doc)
        }
    })
}
model.setCurrentConversation = (conversationId) => {
    const conversation = model.conversations.filter(item => {
        return item.id === conversationId
    })[0]
    model.currentConversation = conversation
    view.setCurrentConversation()

}
model.addMessage = (message) => {
    const dataToUpdate = {
        messages: firebase.firestore.FieldValue.arrayUnion(message)
    }
    firebase.firestore().collection('conversations').doc(model.currentConversation.id).update(dataToUpdate).then(res => {
        console.log('Updated')
    })
}
model.addUser = (user) => {
    if (user === '') {

    } else {
        const dataToUpdate = {
            users: firebase.firestore.FieldValue.arrayUnion(user)
        }
        firebase.firestore().collection('conversations').doc(model.currentConversation.id).update(dataToUpdate)
    }
}
model.addConversation = (conversation) => {
    if (conversation.title === '' || conversation.users[0] === '') {

    } else {
        firebase.firestore().collection('conversations').add(conversation).then(res => {
            console.log('Updated')
        })
    }
}
model.logOut = () => {
    firebase.auth().signOut()
    model.conversations = undefined
    model.currentConversation = undefined
    model.currentUser = undefined
    model.isFirstRun = true
}
getDataFromDoc = (doc) => {
    let user = doc.data()
    user.id = doc.id
    return user
}

getDataFromDocs = (docs) => {
    return docs.map(getDataFromDoc)
}

