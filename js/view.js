const view = {};

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
            const sendMessageForm = document.getElementById("chat-form")
            sendMessageForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const message = {
                    message: sendMessageForm.message.value,
                    user: model.currentUser.displayName
                }
                view.addMessage(message)
                
                const chatBotMessage = {
                    message: sendMessageForm.message.value,
                    user: "ChatBot"
                }
                view.addMessage(chatBotMessage)
                message: sendMessageForm.message.value = ''
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
    const className = (message.user === model.currentUser.displayName) ? 'your' : 'their'
    messageWrapper.innerHTML = `
        <div class="message ${className}">
            <span class="sender">${message.user}</span>
            <span class="message-content">${message.message}</span>
        </div>
    `
    document.getElementsByClassName('conversation-detail')[0].appendChild(messageWrapper)
}