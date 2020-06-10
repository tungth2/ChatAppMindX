const components = {};
components.registerScreen = `
<div class = "register-wrapper">
<div class = 'form-wrapper'>
    <div class = 'title'>
        MindX Chat
    </div>
    <form id="register-form">
        <div class = "name-wrapper">
            <div class = 'input-wrapper'>
                <input class = "input" type="text" name = 'firstName' placeholder = "First Name">
                <div class = "error" id = "error-first-name"></div>
            </div>
            <div class = 'input-wrapper'>
                <input class = "input" type="text" name = "lastName" placeholder = "Last Name">
                <div class = "error" id = "error-last-name"></div>
            </div>
        </div>
        <div class = 'input-wrapper'>
            <input class = "input" type="text" name = "email" placeholder = "Email">
            <div class = "error" id = "error-email"></div>
        </div>
        <div class = 'input-wrapper'>
            <input class = "input" type="password" name = "password" placeholder = "Password">
            <div class = "error" id = "error-password"></div>
        </div>
        <div class = 'input-wrapper'>
            <input class = "input" type="password" name = "confirmPassword" placeholder = "Confirm Password">
            <div class = "error" id = "error-confirm-password"></div>
        </div>
        <div class = "submit-wrapper">
            <div> 
                Already have an account? <a id = "redirect-login"> Login </a>
            </div>
            <button type = "submit">
            <span id = "register-text">Register</span>
            <i id = "loading-icon" class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
            
            </button>
        </div>
    </form>
</div>
</div>
`

components.loginScreen = `
    <div class=login-wrapper>
            <div class=form-wrapper>
                <div class = "title">MindXChat</div>
                <form id="login-form">
                    <div class="input-wrapper">
                        <input type="text" class = "input" name="email" placeholder="Email">
                        <div class = "error" id = "error-email"></div>
                    </div>
                    <div class="input-wrapper">
                        <input type="password" class = "input" name="password" placeholder="Password">
                        <div class = "error" id = "error-password"></div>
                    </div>
                    <div class="submit-wrapper">
                        <div>Don't have an account? <a id = "redirect-register">Register</div>
                        <button type = "submit">
                        <span id = "login-text">Login</span>
                        <i id = "loading-icon" class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                        
                        </button>
                    </div>
                </form>
            </div>
        </div>
`

components.chatScreen = `
<div class="chat-container">
<div class="header">MindXChat</div>
<div class="main">
    <div class="conversation-name">MindXChat</div>
    <div class="conversation-detail">
    </div>
    <form id="chat-form">

        <div class="input-chat-wrapper">
            <input type="text" name="message" placeholder="Type a message...">
            <button type="submit"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
        </div>

    </form>
</div>
</div>
`