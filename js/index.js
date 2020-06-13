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
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            model.currentUser = {
                displayName: user.displayName,
                uid: user.uid,
                email: user.email
            }
            if (firebase.auth().currentUser.emailVerified) {
                view.setActiveScreen('chatScreen')
            }
        } else {
            view.setActiveScreen('loginScreen')
        }
    })
}

let templateFunction = () => {
    const collectionName = 'users'
    // get 1 document
    const docId = '9cT7pAKdR6mLJeKfKDik'
    firebase.firestore().collection(collectionName).doc(docId).get().then(res => {
        console.log (getDataFromDoc(res))
    }).catch(err => {

    })

    // get multiple document
    firebase.firestore().collection(collectionName).where('name','==','Bich').get().then (res => {
        console.log(getDataFromDocs(res.docs))
    })

    // update document
    const dataToUpdate = {
        name: 'Nam',
        age: 19,
        phoneNumber: firebase.firestore.FieldValue.arrayUnion('090190202'),        
        phoneNumber: firebase.firestore.FieldValue.arrayRemove('090190202')
    }
    firebase.firestore().collection(collectionName).doc(docId).update(dataToUpdate).then(res => {
        console.log('Updated')
    }).catch(err => {

    })

    // create document
    const dataToCreate = {
        name: 'Hoang',
        age: 19,
        phoneNumber: ["090900003"],
        address: "Ha Noi"
    }
    // firebase.firestore().collection(collectionName).add(dataToCreate).then (res => {
    //     console.log('Created')
    // })

    // delete document

    const docIdDelete = '712Rmoh7RWjGARgbzCPf'
    firebase.firestore().collection(collectionName).doc(docIdDelete).delete().then(res => {
        console.log('Deleted')
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

function learnMap () {
    const array = [1, 2, 3, 4]
    arr2 =[]
    arr2 = array.map(x => x * 2)
    console.log(arr2)
    return arr2
}