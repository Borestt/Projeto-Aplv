import React, { useState } from 'react';
import "./styles.css"; 

const mockHeroes = [
    { id: 'h1', name: 'Boris', hp: 170, maxHp: 200, mp: 80, maxMp: 100 },
];

const mockEnemies = [
    { id: 'e1', name: 'Goblin', hp: 50, maxHp: 50 }
];
// ---------------------------------

// --- COMPONENTE BATTLEUI (AGORA DO LADO DE FORA) ---

const BattleUI = () => {
    const [menuState, setMenuState] = useState('MAIN');
    const [activeHeroId, setActiveHeroId] = useState('h1');
    const [message, setMessage] = useState("Turno de Boris!");

    const handleAttack = () => {
        setMenuState('TARGET_ENEMY');
        setMessage('Selecione um alvo...');
    };

    const handleMagic = () => {
        setMenuState('MAGIC');
        setMessage('Selecione uma magia...');
    };

    const handleSelectEnemyTarget = (targetId) => {
        const target = mockEnemies.find(e => e.id === targetId);
        const attacker = mockHeroes.find(h => h.id === activeHeroId);
        
        setMessage(`${attacker.name} ataca ${target.name}!`);
        setMenuState('MAIN');
    };

    const renderMainMenu = () => (
        <div className="battle-window command-menu">
            <ul>
                <li onClick={handleAttack}>Attack</li>
                <li onClick={handleMagic}>Magic</li>
                <li>Item</li>
                <li>Defend</li>
            </ul>
        </div>
    );

    const renderMagicMenu = () => (
        <div className="battle-window magic-menu">
            <ul>
                <li>Fire</li>
                <li>Ice</li>
                <li>Cure</li>
                <li onClick={() => setMenuState('MAIN')}>Back</li>
            </ul>
        </div>
    );

    return (
        <div className="battle-screen">

            {/* --- ÁREA DOS INIMIGOS --- */}
            <div className="enemy-area">
                {mockEnemies.map(enemy => (
                    <div
                        key={enemy.id}
                        className={`enemy-sprite ${menuState === 'TARGET_ENEMY' ? 'targetable' : ''}`}
                        onClick={() => menuState === 'TARGET_ENEMY' && handleSelectEnemyTarget(enemy.id)}
                    >
                        {enemy.name}
                    </div>
                ))}
            </div>

            {/* --- INTERFACE DO JOGADOR (UI) --- */}
            <div className="player-ui-container">

                {/* Janela de Status dos Heróis */}
                <div className="battle-window party-status-window">
                    {mockHeroes.map(hero => (
                        <div key={hero.id} className={`status-box ${hero.id === activeHeroId ? 'active' : ''}`}>
                            <span className="name">{hero.name}</span>
                            <span className="hp">HP: {hero.hp} / {hero.maxHp}</span>
                            <span className="mp">MP: {hero.mp} / {hero.maxMp}</span>
                        </div>
                    ))}
                </div>

                {/* Janela de Mensagem */}
                <div className="battle-window message-window">
                    <p>{message}</p>
                </div>

                {/* Janela de Comandos */}
                <div className="menu-container">
                    {menuState === 'MAIN' && renderMainMenu()}
                    {menuState === 'MAGIC' && renderMagicMenu()}
                </div>

            </div>
        </div>
    );
};


// --- COMPONENTE APP (AGORA RENDERIZANDO O BATTLEUI) ---
function App() {
  // O return do App é o que decide o que vai para a tela
  return (
    <div className="App">
        {/* Agora sim estamos mandando a UI de batalha aparecer! */}
        <BattleUI />
    </div>
  );
}

export default App;