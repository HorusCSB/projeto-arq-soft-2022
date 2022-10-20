function setUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
}

function getUser() {
    return JSON.parse(localStorage.getItem('user'))
}

function getUserById(id) {
    return JSON.parse(localStorage.getItem('accounts')).filter(account => {
        return account.id == id
    })[0]
}

function setAccounts(accounts) {
    localStorage.setItem('accounts', JSON.stringify(accounts))
}

function getAccounts() {
    return JSON.parse(localStorage.getItem('accounts'))
}

function login() {
    let loginObj = { id: null }
    getAccounts().forEach(_account => {
        if ($('#login-text').val() == _account.email && $('#pass-text').val() == _account.senha) {
            loginObj.id = _account.id
        }
    })
    if (loginObj.id) {
        validLogin(loginObj.id)
    } else {
        alert("conta de usuário inexistente!!")
    }
}

function validLogin(id) {
    let userObject = getUser()
    userObject.loggedIn = true
    userObject.id = id
    userObject.page = "gerenciar-perfil-page"
    setUser(userObject)
    changeNavConfig('logged')
    loadPage(userObject.page)
}

function logout() {
    let userObject = getUser()
    userObject.loggedIn = false
    userObject.page = "login-page"
    userObject.id = null
    setUser(userObject)
    changeNavConfig('offline')
    loadPage(userObject.page)
}

function changeNavConfig(type) {
    if (type == 'logged') {
        $("#nav-exit").show()
        $("#nav-gerenciar-perfil").show()
        $("#nav-create-account").hide()
        $("#nav-login").hide()
        $("#nav-click").show()
        $("#nav-anuncie").show()
        $("#nav-rate").hide()
        $("#nav-propagandas").hide()
        $("#nav-denuncias").hide()
    } else if (type == 'loggedAsAdmin') {
        $("#nav-exit").show()
        $("#nav-gerenciar-perfil").hide()
        $("#nav-create-account").hide()
        $("#nav-login").hide()
        $("#nav-anuncie").hide()
        $("#nav-rate").show()
        $("#nav-propagandas").show()
        $("#nav-show").hide()
    } else if (type == 'offline'){
        $("#nav-exit").hide()
        $("#nav-gerenciar-perfil").hide()
        $("#nav-create-account").show()
        $("#nav-login").show()
        $("#nav-click").hide()
        $("#nav-anuncie").show()
        $("#nav-rate").hide()
        $("#nav-propagandas").hide()
        $("#nav-denuncias").hide()
    }
}

function loadPage(page) {
    $("#corpo").load("./pages/" + page + "/" + page + ".html")
    let userObject = getUser()
    userObject.page = page
    setUser(userObject)
}

$(document).ready(function () {
    var userObject = null
    if (getUser() === null) {
        setUser({ loggedIn: false, page: "login-page", id: null })
    }
    if (getAccounts() === null) {
        setAccounts([{
            id: 1,
            tipo: "admin",
            nome_completo: "horus",
            data_nascimento: "09/12/1999",
            endereco: "",
            email: "admin@admin",
            senha: "admin123"
        }])
    }
    var userObject = getUser()
    if (!userObject.loggedIn) {
        changeNavConfig('offline')
        if (userObject.page != 'create-account-page' && userObject.page != 'login-page') {
            userObject.page = "login-page"
        }
        setUser(userObject)
        loadPage(userObject.page)
    } else {
        var userData = getUserById(getUser().id)
        if (userData.tipo == "admin") {
            changeNavConfig('loggedAsAdmin')    
            userObject.page = "avaliar-denuncia-page"
        } else {
            changeNavConfig('logged')
        }        
        $("#nav-exit").show()
        loadPage(userObject.page)
    }
})
