import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import "./styles.css";

const ENEMIES = [
    { 
        id: 'e1', 
        name: 'Goblin Ladrão', 
        hp: 80, 
        maxHp: 80, 
        atk: 22, 
        def: 8,
        sprites: {
            idle: 'Sprits/Goblin.parado.png',
            attack: 'Sprits/Goblin.ataque.png',
            damage: 'Sprits/Goblin.dano.png'
        }
    },
    { 
        id: 'e2', 
        name: 'Esqueleto Guerreiro', 
        hp: 100, 
        maxHp: 100, 
        atk: 20, 
        def: 12,
        sprites: {
            idle: 'Sprits/Esqueleto.parado.png',
            attack: 'Sprits/Esqueleto.ataque.png',
            damage: 'Sprits/Esqueleto.dano.png'
        }
    },
    { 
        id: 'e3', 
        name: 'Slime Gigante', 
        hp: 150, 
        maxHp: 150, 
        atk: 20, 
        def: 15,
        sprites: {
            idle: 'Sprits/Slime.parado.png',
            attack: 'Sprits/Slime.ataque.png',
            damage: 'Sprits/Slime.dano.png'
        }
    },
    { 
        id: 'e4', 
        name: 'Mago Corrompido', 
        hp: 70, 
        maxHp: 70, 
        atk: 25, 
        def: 5,
        sprites: {
            idle: 'Sprits/Mago.parado.png',
            attack: 'Sprits/Mago.ataque.png',
            damage: 'Sprits/Mago.dano.png'
        }
    },
    { 
        id: 'e5', 
        name: 'Dragão Jovem', 
        hp: 200, 
        maxHp: 200, 
        atk: 30, 
        def: 20,
        sprites: {
            idle: 'Sprits/Dragao.parado.png',
            attack: 'Sprits/Dragao.ataque.png',
            damage: 'Sprits/Dragao.dano.png'
        }
    },
    { 
        id: 'e6', 
        name: 'Aranha Gigante', 
        hp: 90, 
        maxHp: 90, 
        atk: 25, 
        def: 10,
        sprites: {
            idle: 'Sprits/Aranha.parado.png',
            attack: 'Sprits/Aranha.ataque.png',
            damage: 'Sprits/Aranha.dano.png'
        }
    },
    { 
        id: 'e7', 
        name: 'Elemental de Fogo', 
        hp: 110, 
        maxHp: 110, 
        atk: 28, 
        def: 8,
        sprites: {
            idle: 'Sprits/Elemental.parado.png',
            attack: 'Sprits/Elemental.ataque.png',
            damage: 'Sprits/Elemental.dano.png'
        }
    },
    { 
        id: 'e8', 
        name: 'Troll das Cavernas', 
        hp: 180, 
        maxHp: 180, 
        atk: 22, 
        def: 18,
        sprites: {
            idle: 'Sprits/Troll.parado.png',
            attack: 'Sprits/Troll.ataque.png',
            damage: 'Sprits/Troll.dano.png'
        }
    }
];

const getPlayerStats = () => {
    const savedStats = localStorage.getItem('playerStats');
    const savedAvatar = localStorage.getItem('playerAvatar');
    return {
        id: 'h1',
        name: 'Herói',
        hp: savedStats ? JSON.parse(savedStats).hp : 100,
        maxHp: savedStats ? JSON.parse(savedStats).hp : 100,
        atk: savedStats ? JSON.parse(savedStats).atk : 20,
        def: savedStats ? JSON.parse(savedStats).def : 10,
        potions: savedStats ? (JSON.parse(savedStats).potions || 0) : 0,
        avatar: savedAvatar || ''
    };
};

const BattleUI = () => { 
    const [menuState, setMenuState] = useState('MAIN');
    const [message, setMessage] = useState('Seu turno! Escolha uma ação...');
    const [currentEnemy, setCurrentEnemy] = useState(() => ({
        ...ENEMIES[Math.floor(Math.random() * ENEMIES.length)],
        isAnimating: false,
        currentSprite: 'idle'
    }));
    const [playerState, setPlayerState] = useState(() => ({
        ...getPlayerStats(),
        isAnimating: false,
        tempDef: 0
    }));
    const [turnState, setTurnState] = useState('PLAYER');
    const [actionLocked, setActionLocked] = useState(false);
    const dropProcessedRef = useRef(false);
    const [battleLog, setBattleLog] = useState([]);
    const logRef = useRef(null);

    useEffect(() => {
        if (message) {
            const time = new Date().toLocaleTimeString();
            setBattleLog(prev => [...prev, `${time} — ${message}`]);
        }
        if (logRef.current) {
            logRef.current.scrollTop = logRef.current.scrollHeight;
        }

        if (currentEnemy.hp <= 0 && !dropProcessedRef.current) {
            dropProcessedRef.current = true;
            const dropped = Math.random() < 0.5;
            if (dropped) {
                setPlayerState(prev => ({ ...prev, potions: (prev.potions || 0) + 1 }));
                setMessage('Você venceu! O inimigo foi derrotado e dropou uma Poção de Vida!');
            } else {
                setMessage('Você venceu! O inimigo foi derrotado!');
            }
            setMenuState('VICTORY');
            setActionLocked(false);
            return;
        }

        if (playerState.hp <= 0) {
            setMenuState('DEFEAT');
            setMessage('Game Over! Você foi derrotado...');
            setActionLocked(false);
        }
    }, [currentEnemy.hp, playerState.hp, message]);

    const clearLog = () => setBattleLog([]);

    const applyDamage = (target, damage) => {
        if (target === 'enemy') {
            setCurrentEnemy(prev => ({
                ...prev,
                isAnimating: true,
                currentSprite: 'damage',
                hp: Math.max(0, prev.hp - damage)
            }));
            setTimeout(() => {
                setCurrentEnemy(prev => ({ ...prev, isAnimating: false, currentSprite: 'idle' }));
            }, 300);
        } else {
            setPlayerState(prev => ({
                ...prev,
                isAnimating: true,
                hp: Math.max(0, prev.hp - damage)
            }));
            setTimeout(() => {
                setPlayerState(prev => ({ ...prev, isAnimating: false }));
            }, 300);
        }
    };

    const handleEnemyTurn = () => {
        setActionLocked(true);
        setTurnState('ENEMY');
        setMenuState('ENEMY_TURN');
        
        setCurrentEnemy(prev => ({ ...prev, currentSprite: 'attack' }));
        setMessage(`${currentEnemy.name} se prepara para atacar!`);

        setTimeout(() => { 
            const effectiveDef = (playerState.def || 0) + (playerState.tempDef || 0);
            const damage = Math.max(0, currentEnemy.atk - effectiveDef);
            const finalDamage = Math.floor(damage * (1 + Math.random() * 0.3));

            applyDamage('player', finalDamage);
            setMessage(`${currentEnemy.name} ataca e causa ${finalDamage} de dano!`);

            setTimeout(() => {
                if (playerState.hp - finalDamage > 0) {
                    setTurnState('PLAYER');
                    setMenuState('MAIN');
                    setMessage('Seu turno! Escolha uma ação...');
                    setCurrentEnemy(prev => ({ ...prev, currentSprite: 'idle' }));
                }
                if (playerState.tempDef && playerState.tempDef > 0) {
                    setPlayerState(prev => ({ ...prev, tempDef: 0 }));
                }
                setActionLocked(false);
            }, 1500);
        }, 1000);
    };

    const handleNewBattle = () => {
        setCurrentEnemy({
            ...ENEMIES[Math.floor(Math.random() * ENEMIES.length)],
            isAnimating: false,
            currentSprite: 'idle'
        });
        setPlayerState(prev => ({ ...prev, isAnimating: false, tempDef: 0 }));
        dropProcessedRef.current = false;
        setMenuState('MAIN');
        setTurnState('PLAYER');
        setMessage('Um novo inimigo aparece! Prepare-se para a batalha!');
    };

    const handleDefend = () => {
        if (turnState !== 'PLAYER' || actionLocked) return;
        setActionLocked(true);
        setPlayerState(prev => ({ ...prev, tempDef: Math.ceil((prev.def || 0) * 0.5) }));
        setMessage(`${playerState.name} se protege — DEF aumentada por 1 turno!`);

        setTimeout(() => {
            handleEnemyTurn();
        }, 700);
    };

    const handleAttack = () => {
        if (turnState !== 'PLAYER' || actionLocked) return;
        setMenuState('TARGET_ENEMY');
        setMessage('Selecione um alvo...');
    };

    const handleSelectEnemyTarget = () => {
        if (turnState !== 'PLAYER' || actionLocked) return;

        setActionLocked(true);
        setTurnState('ENEMY');

        const damage = Math.max(0, playerState.atk - currentEnemy.def);
        const finalDamage = Math.floor(damage * (1 + Math.random() * 0.3));

        applyDamage('enemy', finalDamage);
        setMessage(`${playerState.name} ataca ${currentEnemy.name} causando ${finalDamage} de dano!`);

        setTimeout(() => {
            if (currentEnemy.hp - finalDamage > 0) {
                handleEnemyTurn();
            } else {
                setActionLocked(false);
            }
        }, 1500);
    };

    const handleOpenItemMenu = () => {
        if (turnState !== 'PLAYER' || actionLocked) return;
        setMenuState('ITEM');
    };

    const handleUsePotion = () => {
        if (actionLocked || turnState !== 'PLAYER' || (playerState.potions || 0) <= 0) return;
        setActionLocked(true);
        const heal = 50;
        setPlayerState(prev => ({ ...prev, hp: Math.min(prev.maxHp, prev.hp + heal), potions: (prev.potions || 0) - 1 }));
        setMessage(`${playerState.name} usa uma Poção de Vida e recupera até ${heal} HP!`);

        setTimeout(() => {
            setMenuState('MAIN');
            handleEnemyTurn();
        }, 900);
    };

    const renderMainMenu = () => (
        <div className="battle-window command-menu">
            <ul>
                <li onClick={handleAttack} role="button" tabIndex={0}>Atacar</li>
                <li onClick={handleOpenItemMenu} role="button" tabIndex={0}>Itens</li>
                <li onClick={handleDefend} role="button" tabIndex={0}>Defender</li>
            </ul>
        </div>
    );

    const renderItemMenu = () => (
        <div className="battle-window magic-menu">
            <ul>
                <li>Poções: {playerState.potions || 0}</li>
                <li onClick={handleUsePotion} style={{ opacity: (playerState.potions || 0) > 0 ? 1 : 0.5 }} role="button" tabIndex={0}>
                    Usar Poção
                </li>
                <li onClick={() => setMenuState('MAIN')} role="button" tabIndex={0}>Voltar</li>
            </ul>
        </div>
    );

    const renderVictoryDefeatMenu = () => (
        <div className="battle-window victory-defeat-menu">
            <ul>
                {menuState === 'VICTORY' && <li onClick={handleNewBattle}>Continuar</li>}
                <li onClick={() => window.location.href = '/'}>Voltar ao Menu</li>
            </ul>
        </div>
    );

    return (
        <div className={`battle-screen ${menuState === 'VICTORY' ? 'victory' : ''} ${menuState === 'DEFEAT' ? 'defeat' : ''}`}>
            <div className="enemy-area">
                <div
                    className={`enemy-sprite ${menuState === 'TARGET_ENEMY' ? 'targetable' : ''} ${currentEnemy.isAnimating ? 'damage-animation' : ''}`}
                    onClick={() => menuState === 'TARGET_ENEMY' && handleSelectEnemyTarget(currentEnemy.id)}
                >
                    <div className="enemy-name">{currentEnemy.name}</div>
                    <img 
                        src={currentEnemy.sprites ? currentEnemy.sprites[currentEnemy.currentSprite || 'idle'] : "https://via.placeholder.com/128x128.png?text=Enemy"} 
                        alt={currentEnemy.name} 
                    />

                    <div className="hp-bar enemy-hp-bar" aria-hidden>
                        <div
                            className="hp-fill"
                            style={{ width: `${Math.max(0, Math.floor((currentEnemy.hp / currentEnemy.maxHp) * 100))}%` }}
                        />
                    </div>

                    <div className="enemy-hp">HP: {currentEnemy.hp} / {currentEnemy.maxHp}</div>
                </div>
            </div>

            <div className="player-ui-container">
                <div className="battle-window party-status-window">
                    <div className={`status-box active ${playerState.isAnimating ? 'damage-animation' : ''}`}>
                        <img src={playerState.avatar || 'https://via.placeholder.com/48x48.png?text=Hero'} alt="Player Avatar" className="player-avatar" />
                        <span className="name">{playerState.name}</span>
                        <span className="hp">HP: {playerState.hp} / {playerState.maxHp}</span>

                        <div className="hp-bar player-hp-bar" aria-hidden>
                            <div
                                className="hp-fill"
                                style={{ width: `${Math.max(0, Math.floor((playerState.hp / playerState.maxHp) * 100))}%` }}
                            />
                        </div>

                        <div className="stats">
                            <span>ATK: {playerState.atk}</span>
                            <span>DEF: {playerState.def + (playerState.tempDef || 0)}{playerState.tempDef ? ` (+${playerState.tempDef})` : ''}</span>
                        </div>
                    </div>
                </div>

                <div className="battle-window message-window">
                    <p>{message}</p>
                </div>

                <div className="battle-window battle-log-window">
                    <div className="battle-log" ref={logRef} aria-live="polite">
                        {battleLog.length === 0 ? (
                            <div className="log-empty">Nenhum evento registrado ainda.</div>
                        ) : (
                            battleLog.map((line, idx) => (
                                <div className="log-line" key={idx}>{line}</div>
                            ))
                        )}
                    </div>
                    <div className="log-controls">
                        <button onClick={clearLog} className="log-clear">Limpar</button>
                    </div>
                </div>

                <div className="menu-container">
                    {menuState === 'MAIN' && turnState === 'PLAYER' && renderMainMenu()}
                    {menuState === 'ITEM' && renderItemMenu()}
                    {(menuState === 'VICTORY' || menuState === 'DEFEAT') && renderVictoryDefeatMenu()}
                </div>
            </div>
        </div>
    );
};

const Game = () => { 
    return (
        <div className="game-container">
            <Link to="/">
                <p className="backButton">
                    <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#ff6f00" transform="rotate(0)">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <title>back_2_fill</title>
                            <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g id="Arrow" transform="translate(-480.000000, -50.000000)" fillRule="nonzero">
                                    <g id="back_2_fill" transform="translate(480.000000, 50.000000)">
                                        <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.1026481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fillRule="nonzero"></path>
                                        <path d="M7.16075,10.9724 C8.44534,9.45943 10.3615,8.5 12.5,8.5 C16.366,8.5 19.5,11.634 19.5,15.5 C19.5,16.3284 20.1715,17 21,17 C21.8284,17 22.5,16.3284 22.5,15.5 C22.5,9.97715 18.0228,5.5 12.5,5.5 C9.55608,5.5 6.91086,6.77161 5.08155,8.79452 L4.73527,6.83068 C4.59142,6.01484 3.81343,5.47009 2.99759,5.61394 C2.18175,5.7578 1.637,6.53578 1.78085,7.35163 L2.82274,13.2605 C2.89182,13.6523 3.11371,14.0005 3.43959,14.2287 C3.84283,14.5111 4.37354,14.5736 4.82528,14.4305 L10.4693,13.4353 C11.2851,13.2915 11.8299,12.5135 11.686,11.6976 C11.5422,10.8818 10.7642,10.337 9.94833,10.4809 L7.16075,10.9724 Z" id="路径" fill="#ff6f00"></path>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                </p>
            </Link>
            <BattleUI />
        </div>
    );
};

export default Game;