var userData = null
var fisica = null
var juridica = null
function validateForm() {
    const formData = $('form').serializeArray();
    let senha1 = "";
    let valid = true;
    formData.forEach(data => {
        if (data.name == 'senha') {
            senha1 = data.value
        }
        if (data.name == 'confirme' && data.value != senha1) {
            valid = false;
            alert("as senhas devem ser iguais!")
        }
    });
    let formJson = $('form').formToJson()
    delete formJson.confirme
    let accounts = getAccounts()
    if (valid) {
        alert("cadastro atualizado com sucesso");
        formJson.id = userData.id
        formJson.tipo = userData.tipo
        let splitDate = formJson.data_nascimento.split("-")
        let date = splitDate[2] + "/" + splitDate[1] + "/" + splitDate[0]
        console.log(splitDate);
        console.log(date);
        formJson.data_nascimento = date
        accounts.forEach((account, index) => {
            if (account.id == userData.id) {
                accounts[index] = formJson
            }
        })
        setAccounts(accounts)
    }
    return false
}
function deleteLogin() {
    if (
        confirm('Tem certeza que deseja deletar a sua conta?')

    ) {
        let accounts = getAccounts()
        accounts.forEach((account, index) => {
            if (account.id == userData.id) {
                accounts.splice(index, 1)
            }
        })
        setAccounts(accounts)
        logout()

    } else {
        return
    }

}
function setFormValues(tipo) {
    if (tipo == 'fisica') {
        $("input[name='nome_completo']").val(userData.nome_completo);
        let splitDate = userData.data_nascimento.split("/")
        let date = splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0]
        $("input[name='data_nascimento']").val(date);
    } else if (tipo == 'juridica') {
        $("input[name='nome_empresa']").val(userData.nome_empresa);
        $("input[name='CNPJ']").val(userData.CNPJ);
        $("input[name='razao']").val(userData.razao);
    }
    $("input[name='endereco']").val(userData.endereco);
    $("input[name='email']").val(userData.email);

}


$(document).ready(() => {
    userData = getUserById(getUser().id)
    console.log(userData);
    if (userData.tipo == "fisica") {
        $("#juridica").detach()
    } else if (userData.tipo == "juridica") {
        $("#fisica").detach()
    }
    setFormValues(userData.tipo);
})
