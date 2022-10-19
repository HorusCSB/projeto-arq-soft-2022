    function show(option) {
        if (option === "fisica") {
            fisica.appendTo('#appendable')
        } else if (option === "juridica") {
            juridica.appendTo('#appendable')
        }

        $(".card-option").hide();
    }

    function validateForm() {
        const formData = $('form').serializeArray();
        let senha1 = "";
        let valid = true;
        formData.forEach(data => {
            if(data.name == 'senha') {
                senha1 = data.value
            }
            if(data.name == 'confirme' && data.value != senha1) {
                valid = false;
                alert("as senhas devem ser iguais!")
            }
        });
        let formJson = $('form').formToJson()
        delete formJson.confirme
        let accounts = getAccounts()
        if (accounts.filter(_account => _account.email == formJson.email).length > 0) {
            alert("você já possui conta cadastrada!")
            return false
        }
        if(valid) {
            alert("cadastro salvo com sucesso, seja bem vindo!");
            formJson.id = accounts.length + 1;
            accounts.push(formJson)
            setAccounts(accounts)
            validLogin(formJson.id)
        }
        return false
    }

    function alertErrors(alertObject) {

    }
    var fisica = null
    var juridica = null
    var button = null
    $(document).ready(() => {
        fisica = $('#fisica').detach();
        juridica = $('#juridica').detach();

    })
