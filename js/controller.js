const controller = {};

controller.register = (formData) => {
    if (!formData.firstName || formData.firstName === "") {
        view.setMessageError('error-first-name', 'Please input first name')
    } else {
        view.setMessageError('error-first-name', '')
    }
    if (!formData.lastName || formData.lastName === "") {
        view.setMessageError('error-last-name', 'Please input last name')
    } else {
        view.setMessageError('error-last-name', '')
    }
    if (!formData.email || formData.email === "") {
        view.setMessageError('error-email', 'Please input email')
    } else {
        view.setMessageError('error-email', '')
    }
    if (!formData.password || formData.password === "") {
        view.setMessageError('error-password', 'Please input password')
    } else {
        view.setMessageError('error-password', '')
    }
    if (!formData.confirmPassword || formData.confirmPassword === "") {
        view.setMessageError('error-confirm-password', "Please input confirm password")
    } else if (formData.confirmPassword !== formData.password) {
        view.setMessageError('error-confirm-password', "Password didn't match")
    } else {
        view.setMessageError('error-confirm-password', '')
    }
    if (formData.firstName && formData.lastName && formData.email && formData.password && formData.confirmPassword) {
        model.register({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password
        })
    }
}
controller.login = (loginForm) => {
    if (!loginForm.email || loginForm.email === "") {
        view.setMessageError('error-email', 'Please input email')
    } else {
        view.setMessageError('error-email', '')
    }
    if (!loginForm.password || loginForm.password === "") {
        view.setMessageError('error-password', 'Please input password')
    } else {
        view.setMessageError('error-password', '')
    }
    if (loginForm.email && loginForm.password) {
        model.login({
            email: loginForm.email,
            password: loginForm.password
        })
    }
}