document.addEventListener('DOMContentLoaded', function () {
    let textoExibido = document.getElementsByClassName('notificacao')[0];
    let textoAviso = document.getElementsByClassName('aviso')[0];
    const elemento = document.getElementById('btn_copiar');

    let jaFoiExibido = false;
    function mostrarUmaVez() {

        if (!jaFoiExibido) {
            elemento.classList.remove('btn_oculto');
            jaFoiExibido = true;
        }
    }

    document.getElementById('btn_copiar').addEventListener('click', function () {
        // Seleciona o elemento de texto
        const texto = document.getElementsByClassName('notificacao')[0].innerText;


        // Usa a API Clipboard para copiar o texto
        navigator.clipboard.writeText(texto).then(() => {
            alert('Texto copiado para a área de transferência!');
        }).catch(err => {
            console.error('Falha ao copiar: ', err);
        });
    });


    function validarTexto(texto) {

        if (!/^[a-z\s]+$/.test(texto) || texto === '') {
            return alert("Não são permitidos espaços vazios, letras maiúsculas e/ou acentos.");
        }
        return null;
    };


    function criptografarTexto() {
        let textoDigitado = document.getElementsByClassName('texto_digite')[0].value;
        let textoString = textoDigitado.toString();

        let erro = validarTexto(textoString);
        if (erro) {
            textoAviso.innerHTML = erro;
            return;
        }

        document.getElementsByClassName("imagem_boneco")[0].style.display = "none";
        document.getElementsByClassName("texto_insira")[0].style.display = "none";
        document.getElementsByClassName('texto_digite')[0].value = "";

        let textoCriptografado =
            textoString.replace(/e/g, "enter")
                .replace(/i/g, "imes")
                .replace(/a/g, "ai")
                .replace(/o/g, "ober")
                .replace(/u/g, "ufat");

        textoExibido.innerHTML = textoCriptografado;
        mostrarUmaVez()
        return textoCriptografado;
    }


    function descriptografarTexto() {
        let textoDigitado = document.getElementsByClassName('texto_digite')[0].value;
        let textoString = textoDigitado.toString();

        let erro = validarTexto(textoString);
        if (erro) {
            textoAviso.innerHTML = erro;
            return;
        }

        document.getElementsByClassName("imagem_boneco")[0].style.display = "none";
        document.getElementsByClassName("texto_insira")[0].style.display = "none";
        document.getElementsByClassName('texto_digite')[0].value = "";

        const mapeamento = {
            "enter": "e",
            "imes": "i",
            "ai": "a",
            "ober": "o",
            "ufat": "u"
        };

        let textoDescriptografado = textoString;

        // Realiza as substituições na ordem correta
        for (const [key, value] of Object.entries(mapeamento)) {
            textoDescriptografado = textoDescriptografado.split(key).join(value);
        }
        textoExibido.innerHTML = textoDescriptografado;
        return textoDescriptografado;
    }

    document.getElementById('btn_criptografar').onclick = criptografarTexto;
    document.getElementById('btn_descriptografar').onclick = descriptografarTexto;
});
