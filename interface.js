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
        const avatarUrl = `https://api.dicebear.com/8.x/pixel-art/svg?seed=${seed}&backgroundColor=e89d5a`;

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
// ...existing code...
function selecionarAvatar(imgElement) {
    // 1. Remove a classe 'selecionado' de qualquer outra imagem
    const todasAsImagens = opcoesContainer.querySelectorAll('img');
    todasAsImagens.forEach(img => img.classList.remove('selecionado'));

    // 2. Adiciona a classe 'selecionado' à imagem clicada
    imgElement.classList.add('selecionado');

    // 3. Mostra o avatar escolhido em tamanho maior
    avatarEscolhidoImg.src = imgElement.src;

    // Remove o texto de instrução
    const textoInstrucao = document.getElementById('url-escolhida');
    if (textoInstrucao) {
        textoInstrucao.textContent = '';
    }
}

// Gera as opções iniciais assim que a página carrega
window.onload = gerarOpcoes;