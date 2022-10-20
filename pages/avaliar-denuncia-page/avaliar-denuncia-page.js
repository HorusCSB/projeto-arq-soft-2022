$("#denuncia-pato").hide();

function redirecionarDenuncia() {
    $("#lista-denuncias").hide();
    $("#denuncia-pato").show();
}

function excluirAnuncio() {
    var confirmar = confirm("Tem certeza que deseja excluir o anúncio?");
    if (confirmar == false) {
        preventDefault();
    } else {
        // excluir anuncio
        $("#lista-denuncias").show();
        $("#denuncia-pato").hide();
    }
}

function ignorarDenuncia() {
    // excluir anuncio
    $("#lista-denuncias").show();
    $("#denuncia-pato").hide();
}
