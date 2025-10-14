const opcoesContainer = document.getElementById('opcoes-avatar');
const avatarEscolhidoImg = document.getElementById('avatar-escolhido');
const urlEscolhidaP = document.getElementById('url-escolhida');
const numeroDeOpcoes = 8; // Você pode mudar a quantidade de avatares gerados

// Função para gerar uma string aleatória que servirá como seed
function gerarSeedAleatoria() {
    return Math.random().toString(36).substring(2, 15);
}

// Função principal que gera e exibe as opções de avatares
function gerarOpcoes() {
    // Limpa as opções anteriores
    opcoesContainer.innerHTML = ''; // sem isso, iria acumulando de 8 em 8

    for (let i = 0; i < numeroDeOpcoes; i++) {
        const seed = gerarSeedAleatoria();
        const avatarUrl = `https://api.dicebear.com/8.x/pixel-art/svg?seed=${seed}&backgroundColor=999e9b`;

        // Cria o elemento de imagem
        const imgElement = document.createElement('img');
        imgElement.src = avatarUrl;
        imgElement.alt = `Avatar opção ${i + 1}`;

        // Adiciona o evento de clique para selecionar o avatar
        imgElement.onclick = () => selecionarAvatar(imgElement);

        // Adiciona a imagem ao container
        opcoesContainer.appendChild(imgElement);
    }
}

// Função chamada quando um avatar é clicado
let rolagensRestantes = 3;

function selecionarAvatar(imgElement) {
    // 1. Remove a classe 'selecionado' de qualquer outra imagem
    const todasAsImagens = opcoesContainer.querySelectorAll('img');
    todasAsImagens.forEach(img => img.classList.remove('selecionado'));

    // 2. Adiciona a classe 'selecionado' à imagem clicada
    imgElement.classList.add('selecionado');

    // 3. Mostra o avatar escolhido em tamanho maior
    avatarEscolhidoImg.src = imgElement.src;

    rolagensRestantes = 3;
    const btn = document.getElementById('rolar-dados-btn');
    btn.disabled = false;
    btn.textContent = `Role os Atributos (${rolagensRestantes})`;

      btn.onclick = function() {
        if (rolagensRestantes > 0) {
            const classe = document.getElementById('classe-personagem').value;
            let hp, atk, def;

            if (classe === 'guerreiro') {
                hp = Math.floor(Math.random() * 51) + 120; // 120-170
                atk = Math.floor(Math.random() * 11) + 20; // 20-30
                def = Math.floor(Math.random() * 11) + 10; // 10-20   
            } else if (classe === 'mago') {
                hp = Math.floor(Math.random() * 31) + 50; // 50-80
                atk = Math.floor(Math.random() * 61) + 30; // 30-90
                def = Math.floor(Math.random() * 6) + 5; // 5-10
            } else if (classe === 'guardiao') {
                hp = Math.floor(Math.random() * 41) + 80; // 80-120
                atk = Math.floor(Math.random() * 6) + 15; // 15-20
                def = Math.floor(Math.random() * 26) + 40; // 40-65
            }
            document.getElementById('ficha-hp').textContent = hp;
            document.getElementById('ficha-atk').textContent = atk;
            document.getElementById('ficha-def').textContent = def;

            rolagensRestantes--;
            btn.textContent = `Role os Atributos (${rolagensRestantes})`;

            if (rolagensRestantes === 0) {
                btn.disabled = true;
                btn.textContent = "Limite de rolagens atingido!";
            }
        }
    }
}
// Gera as opções iniciais assim que a página carrega
window.onload = gerarOpcoes;