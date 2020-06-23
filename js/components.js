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
<div class="header">MindXChat
    <button class='log-out' type='click'><i class="fa fa-sign-out" aria-hidden="true"></i></div>
</div>
        <div class="chat-container">
            <div class='aside-left'>
                <div class="list-conversation">
                    
                </div>
                <form id="create-conversation">
                    <div class="input-wrapper">
                        <input class="input" name="title" type="text" placeholder="Conversation Name">
                        <div class='error' id='conversation-name-error'></div>
                    </div>
                    <div class="input-wrapper">
                        <input class="input" name="email" type="text" placeholder="User's email">
                        <div class='error' id='conversation-email-error'></div>
                    </div>
                    <button class="btn" type="submit">Create</button>
                </form>
            </div>
            
            <div class="main">
                <div class="conversation-name"></div>
                <div class="conversation-detail">
                </div>
                <form id="chat-form">
                    <div class="input-chat-wrapper">
                        <input type="text" name="message" placeholder="Type a message...">
                        <button type="submit"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                    </div>
                </form>
            </div>
            <div class="aside-right">
                <div class="list-users">
 
                </div>
                <form id="add-user">
                    <div class="input-wrapper">
                        <input class="input" type="text" name="email" placeholder="Email">
                        <div class="error" id="user-error-email"></div>
                        <button class="btn" type="submit">Add</button>
                    </div>
                </form>
            </div>


</div>
`