# CrawlLover

## Visão Geral do Projeto

Este projeto consiste em um RPG por turnos baseado no clássico Final Fantasy. O projeto simula um sistema de combate onde o jogador cria um personagem, determina suas estatísticas através de uma mecânica de aleatoriedade (rolagem de dados) e engaja em combate tático.

## Mecânicas Principais

O ciclo é estruturado em três fases distintas:

1.  **Seleção de Classe:** O usuário seleciona uma classe de personagem. Esta escolha determina os modificadores base.
    
2.  **Geração de Atributos (Rolagem de Dados):**
    * O sistema utiliza uma lógica randômica (simulando a rolagem de dados) para definir os três atributos principais: **HP (Pontos de Vida)**, **ATK (Ataque)** e **DEF (Defesa)**.
    * Isso garante que cada partida ofereça um conjunto único de estatísticas (fator replay).

3.  **Fase de Combate:**
    * Um sistema de batalha por turnos onde o jogador e o inimigo alternam ações.
    * O cálculo de dano considera os valores de ATK e DEF gerados anteriormente.

## Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes stack tecnológicas:

* **JavaScript**: Lógica central.
* **React.js**: Interface de usuário e gerenciamento de estado (Hooks).
* **HTML5**: Estrutura semântica.
* **CSS3**: Estilização e layout responsivo.

## Instalação e Execução

Para rodar este projeto localmente, siga os passos abaixo. Certifique-se de ter o **Node.js** e o **npm** instalados em sua máquina.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Borestt/Projeto-Aplv.git
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd Projeto-Aplv
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Execute a aplicação:**
    ```bash
    npm run dev
    ```

A aplicação será iniciada no seu navegador padrão no endereço `http://localhost:3000`.

## Estrutura do Projeto

* `/public`: Contém as imagens e audios.
* `/Sprits/`: Png das criaturas em combate.
* `/src/containers`: É onde se localiza as abas do jogo, Create = Aba de criação | Game = Aba do combate | Home = Primeira tela | Infos = Informações do projeto | Settings = Volume global 
* `/src/contexts`: Lógica para o audio se aplicar globalmente no projeto
* `/src/index.css`: Botão de voltar para aba o Home
* `/src/main.jsx`: Lógica central de todo o projeto, é aqui o coração! Responsável por permitir a ferramenta BrowserRouter linkar as páginas

## Melhorias Futuras

* Implementação de armazenamento persistente (Local Storage) para salvar o progresso do personagem.
* Criação de Contas.
* Adição de sistemas de magia/habilidades além dos ataques básicos.
* Suporte a múltiplos inimigos.

## Equipe de Desenvolvimento

| Colaborador | Função / Responsabilidade | GitHub |
| :--- | :--- | :--- |
| **Galdino** (Borestt) | Desenvolvedor Líder (Core React) | [@Borestt](https://github.com/Borestt) |
| **Johny** (JustJk) | Mecânicas de Combate & Balanceamento | [@JustJk](https://github.com/JustJKz) |
| **Ithalo** (Flork) | Sound Design & Atmosfera | [@Flork](https://github.com/ithalo098) |
| **Ian** (Ecko) | Front-End & Estilização (UI) | [@Ecko](https://github.com/ianzrocha) |
