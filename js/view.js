const view = {};
// phai co async moi dung dc await
// view.setActiveScreen = async (screenName) => {...}
view.setActiveScreen = (screenName) => {
    switch (screenName) {
        case 'registerScreen':
            document.getElementById('app').innerHTML = components.registerScreen
            const registerForm = document.getElementById('register-form')
            registerForm.addEventListener('submit', (event) => {
                event.preventDefault()
                const formData = {
                    firstName: registerForm.firstName.value,
                    lastName: registerForm.lastName.value,
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                    confirmPassword: registerForm.confirmPassword.value
                }
                controller.register(formData)
            })
            const loginRedirect = document.getElementById("redirect-login")
            loginRedirect.addEventListener('click', (e) => {
                view.setActiveScreen('loginScreen')
            })

            break

        case 'loginScreen':
            document.getElementById('app').innerHTML = components.loginScreen
            const loginForm = document.getElementById("login-form")
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const loginData = {
                    email: loginForm.email.value,
                    password: loginForm.password.value
                }
                controller.login(loginData)
            })
            const registerRedirect = document.getElementById("redirect-register")
            registerRedirect.addEventListener('click', (e) => {
                view.setActiveScreen('registerScreen')
            })
            break
        case 'chatScreen':
            document.getElementById('app').innerHTML = components.chatScreen
            
            //await usage
            /*
            await model.loadConversation()
            if (model.currentConversation) {
                view.setCurrentConversation()
            }
            */
            model.loadConversation().then(res => {
                if (model.currentConversation) {
                    view.setCurrentConversation()
                }
            })
            model.setUpListenConversations()
            const sendMessageForm = document.getElementById("chat-form")
            sendMessageForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const message = {
                    owner: model.currentUser.email,
                    content: sendMessageForm.message.value,
                    createdAt: new Date().toISOString()
                }
                if (sendMessageForm.message.value !== "") {
                    model.addMessage(message)
                }
                

                // view.addMessage(message)
                // const chatBotMessage = {
                //     message: sendMessageForm.message.value,
                //     user: "ChatBot"
                // }
                // view.addMessage(chatBotMessage)
                sendMessageForm.message.value = ''
            })
            const createConversationForm = document.getElementById('create-conversation')
            createConversationForm.addEventListener('submit',(e) => {
                e.preventDefault()
                const conversation = {
                    title: createConversationForm.title.value,
                    users: [createConversationForm.email.value, model.currentUser.email],
                    createdAt: new Date().toISOString() ,
                    messages: []
                }
                model.addConversation(conversation)
                controller.addConversation(conversation)
                createConversationForm.title.value = ''
                createConversationForm.email.value = ''
            })
            const addUser = document.getElementById('add-user')
            addUser.addEventListener('submit', (e) => {
                e.preventDefault()
                controller.addUser(addUser.email.value)
                model.addUser(addUser.email.value)
                view.setUsers()
                addUser.email.value = ''
            })
            const typeMessage = document.querySelector(".input-chat-wrapper input") 
            typeMessage.addEventListener('click', (e) => {
                document.getElementById(model.currentConversation.id).lastElementChild.style = 'display: none;'
            })

            const logOut = document.querySelector('.header button')
            logOut.addEventListener('click', (e) => {
                model.logOut()
            })
            break
    }
}

view.setMessageError = (elementId, message) => {
    document.getElementById(elementId).innerText = message
}

view.addMessage = (message) => {
    const messageWrapper = document.createElement('div')
    messageWrapper.classList.add('message-container')
    const className = (message.owner === model.currentUser.email) ? 'your' : 'their'
    messageWrapper.innerHTML = `
        <div class="message ${className}">
            <span class="sender">${message.owner}</span>
            <span class="message-content">${message.content}</span>
        </div>
    `
    if (message.content === "") {
    } else {
        document.getElementsByClassName('conversation-detail')[0].appendChild(messageWrapper)
    }
}


view.setCurrentConversation = () => {
    document.getElementsByClassName('conversation-detail')[0].innerHTML = ''
    document.getElementsByClassName('conversation-name')[0].innerText = model.currentConversation.title
    view.setUsers()
    // for (let index = 0; index < model.currentConversation.users.length; index++) {
    //     addUsers(model.currentConversation.users[index])
    // }

    for (message of model.currentConversation.messages)
        view.addMessage(message)
}
view.addConversation = (conversation) => {
    const conversationWrapper = document.createElement('div')
    conversationWrapper.classList.add('conversation')
    conversationWrapper.id = conversation.id
    if (conversation.id === model.currentConversation.id) {
        conversationWrapper.classList.add('current')
    }

    conversationWrapper.innerHTML = `
        <div class="conversation-title">${conversation.title}</div>
        <div class="conversation-user">${conversation.users.length} users</div>
        <div class='conversation-new-message'> </div>
    `
    conversationWrapper.addEventListener('click', (e) => {
        model.setCurrentConversation(conversation.id)
        document.getElementsByClassName('current')[0].classList.remove('current')
        conversationWrapper.classList.add('current')
        document.getElementById(model.currentConversation.id).lastElementChild.style = 'display: none;'
    })
    const mediaQueryString = window .matchMedia('screen and (max-width: 768px)')
    mediaQueryString.addListener((mediaQuery) => {
        //console.log(mediaQuery)
        if (mediaQuery.matches) {
            conversationWrapper.firstElementChild.innerText = conversation.title.charAt(0).toUpperCase()
        } else {
            conversationWrapper.firstElementChild.innerText = conversation.title
        }
    })
    document.getElementsByClassName('list-conversation')[0].appendChild(conversationWrapper)
}
view.setConversations = () => {
    for (oneConversation of model.conversations) {
        view.addConversation(oneConversation)
    }
}

view.setUsers = () => {
    document.getElementsByClassName('list-users')[0].innerHTML = ''
    // const userWrapper = document.createElement('div')
    // userWrapper.classList.add('one-user')
    // userWrapper.innerHTML = `${user}`
    // document.getElementsByClassName('list-uesrs')[0].appendChild(userWrapper)
    for (oneUser of model.currentConversation.users) {
        view.addUser(oneUser)
    }
}

view.addUser = (oneUser) => {
    const user = document.createElement('div')
    user.classList.add('one-user')
    user.innerText = oneUser
    document.getElementsByClassName('list-users')[0].appendChild(user)
}

view.setNotification = (docId) => {
    const conversationChange = document.getElementById(docId)
    conversationChange.lastElementChild.style = 'display: block;'
}