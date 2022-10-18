function setUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
}

function getUser() {
    return  JSON.parse(localStorage.getItem('user'))
}

function login() {
    if($('#login-text').val() == 'cpfuser' && $('#pass-text').val() == '1234') {
        alert("login efetuado com sucesso!")
        let userObject = getUser()
        userObject.loggedIn = true
        userObject.page = "home-page"
        setUser(userObject)
        changeNavConfig('logged')
        loadPage(userObject.page)
    } else {
        alert("conta de usuário inexistente!!")
    }
}

function logout() {
    let userObject = getUser()
    userObject.loggedIn = false
    userObject.page = "login-page"
    setUser(userObject)
    changeNavConfig('offline')
    loadPage(userObject.page)
}

function changeNavConfig(type) {
    if(type == 'logged'){
        $("#nav-exit").show()
        $("#nav-create-account").hide()
        $("#nav-login").hide()
    } else {
        $("#nav-exit").hide()
        $("#nav-create-account").show()
        $("#nav-login").show()
    }
}

function loadPage(page) {
    $("#corpo").load("./pages/"+page+"/"+page+".html")
}

$(document).ready(function() {
    var userObject = null
    if (getUser() === null) {
        setUser({loggedIn: false , page: "login-page"})
    }
    var userObject = getUser()
    if (!userObject.loggedIn) {
        changeNavConfig('offline')
        userObject.page = "login-page"
        setUser(userObject)
        loadPage(userObject.page)
    } else {
        changeNavConfig('logged')
        $("#nav-exit").show()
        loadPage(userObject.page)
    }
})

