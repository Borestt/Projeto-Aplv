  const gameContainer = document.getElementById('game-container');
        const dungeonMap = document.getElementById('dungeon-map');
        const player = document.getElementById('player');
        const battleUI = document.getElementById('battle-ui');
        const battleLog = document.getElementById('battle-log');
        
        // Stats do jogador
        let playerHP = 100;
        let playerMaxHP = 100;
        let playerATK = 20;
        let playerDEF = 5;
        let gold = 0;
        let kills = 0;
        let isDefending = false;
        
        // Posição do jogador (em tiles)
        let playerTileX = 1;
        let playerTileY = 1;
        
        const tileSize = 40;
        const mapWidth = 20;
        const mapHeight = 15;
        
        const keys = {};
        const enemies = [];
        const chests = [];
        
        let currentEnemy = null;
        let inBattle = false;

        // Layout do mapa (0=parede, 1=chão, 2=porta, 3=tocha, 4=baú)
        const mapLayout = [
            [0,0,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1,0],
            [0,1,0,4,0,1,1,1,1,1,1,1,1,1,0,4,0,0,1,0],
            [0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,1,0],
            [0,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0],
            [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
            [0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0],
            [0,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,1,0],
            [0,1,0,4,0,1,1,1,1,1,1,1,1,1,0,4,0,0,1,0],
            [0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,0,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,0]
        ];

        // Criar mapa
        function createDungeon() {
            for (let y = 0; y < mapHeight; y++) {
                for (let x = 0; x < mapWidth; x++) {
                    const tile = document.createElement('div');
                    tile.className = 'tile';
                    
                    const tileType = mapLayout[y][x];
                    
                    if (tileType === 0) {
                        tile.classList.add('wall');
                    } else if (tileType === 1) {
                        tile.classList.add('floor');
                    } else if (tileType === 2) {
                        tile.classList.add('door');
                    } else if (tileType === 3) {
                        tile.classList.add('floor');
                        const torch = document.createElement('div');
                        torch.className = 'torch';
                        tile.appendChild(torch);
                    } else if (tileType === 4) {
                        tile.classList.add('floor');
                        const chest = document.createElement('div');
                        chest.className = 'chest';
                        chest.onclick = () => openChest(x, y);
                        tile.appendChild(chest);
                        chests.push({x, y, opened: false, element: chest});
                    }
                    
                    dungeonMap.appendChild(tile);
                }
            }

            // Adicionar tochas nas paredes
            addTorches();
            
            // Spawn inimigos
            spawnEnemies();
        }

        function addTorches() {
            const torchPositions = [
                {x: 2, y: 1}, {x: 5, y: 1}, {x: 10, y: 1}, {x: 17, y: 1},
                {x: 1, y: 5}, {x: 18, y: 5},
                {x: 2, y: 9}, {x: 5, y: 9}, {x: 10, y: 9}, {x: 17, y: 9},
                {x: 1, y: 13}, {x: 5, y: 13}, {x: 10, y: 13}, {x: 18, y: 13}
            ];

            torchPositions.forEach(pos => {
                const index = pos.y * mapWidth + pos.x;
                const tile = dungeonMap.children[index];
                if (tile.classList.contains('floor')) {
                    const torch = document.createElement('div');
                    torch.className = 'torch';
                    tile.appendChild(torch);
                }
            });
        }

        function spawnEnemies() {
            const enemyTypes = [
                {class: 'goblin', name: 'Goblin', hp: 40, atk: 8, def: 2, gold: 10},
                {class: 'skeleton', name: 'Esqueleto', hp: 50, atk: 12, def: 3, gold: 15},
                {class: 'demon', name: 'Demônio', hp: 70, atk: 15, def: 5, gold: 25}
            ];

            const spawnPositions = [
                {x: 8, y: 3}, {x: 15, y: 3}, {x: 4, y: 7}, {x: 10, y: 7}, 
                {x: 15, y: 7}, {x: 5, y: 11}, {x: 11, y: 11}
            ];

            spawnPositions.forEach(pos => {
                const type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
                const enemy = document.createElement('div');
                enemy.className = `enemy ${type.class}`;
                
                const enemyData = {
                    element: enemy,
                    x: pos.x,
                    y: pos.y,
                    ...type,
                    maxHP: type.hp
                };
                
                enemy.innerHTML = `
                    <div class="enemy-hp">
                        <div class="enemy-hp-bar" style="width: 100%"></div>
                    </div>
                `;
                
                enemy.onclick = () => startBattle(enemyData);
                positionEnemy(enemy, pos.x, pos.y);
                gameContainer.appendChild(enemy);
                enemies.push(enemyData);
            });
        }

        function positionEnemy(element, x, y) {
            const mapRect = dungeonMap.getBoundingClientRect();
            element.style.left = (mapRect.left + x * tileSize + tileSize/2 - 17.5) + 'px';
            element.style.top = (mapRect.top + y * tileSize + tileSize/2 - 17.5) + 'px';
        }

        function updatePlayerPosition() {
            const mapRect = dungeonMap.getBoundingClientRect();
            player.style.left = (mapRect.left + playerTileX * tileSize + tileSize/2 - 17.5) + 'px';
            player.style.top = (mapRect.top + playerTileY * tileSize + tileSize/2 - 17.5) + 'px';
        }

        // Movimentação
        document.addEventListener('keydown', (e) => {
            if (!inBattle && !keys[e.key]) {
                keys[e.key] = true;
                let newX = playerTileX;
                let newY = playerTileY;

                if (e.key === 'ArrowUp') newY--;
                else if (e.key === 'ArrowDown') newY++;
                else if (e.key === 'ArrowLeft') newX--;
                else if (e.key === 'ArrowRight') newX++;

                if (canMoveTo(newX, newY)) {
                    playerTileX = newX;
                    playerTileY = newY;
                    updatePlayerPosition();
                }
            }
        });

        document.addEventListener('keyup', (e) => {
            keys[e.key] = false;
        });

        function canMoveTo(x, y) {
            if (x < 0 || x >= mapWidth || y < 0 || y >= mapHeight) return false;
            const tile = mapLayout[y][x];
            return tile !== 0;
        }

        function openChest(x, y) {
            const chest = chests.find(c => c.x === x && c.y === y);
            if (!chest || chest.opened) return;

            const distance = Math.abs(playerTileX - x) + Math.abs(playerTileY - y);
            if (distance > 1.5) {
                addLog('Muito longe do baú!');
                return;
            }

            chest.opened = true;
            chest.element.classList.add('opened');

            const goldFound = 20 + Math.floor(Math.random() * 30);
            gold += goldFound;
            document.getElementById('gold').textContent = gold;

            const message = document.createElement('div');
            message.style.position = 'fixed';
            message.style.left = '50%';
            message.style.top = '50%';
            message.style.transform = 'translate(-50%, -50%)';
            message.style.color = '#ffd700';
            message.style.fontSize = '32px';
            message.style.fontWeight = 'bold';
            message.style.zIndex = '2000';
            message.style.textShadow = '0 0 10px #ffd700';
            message.textContent = `+${goldFound} Ouro!`;
            document.body.appendChild(message);

            setTimeout(() => message.remove(), 2000);
        }

        // Sistema de Batalha
        function startBattle(enemy) {
            if (inBattle) return;

            const distance = Math.abs(playerTileX - enemy.x) + Math.abs(playerTileY - enemy.y);
            if (distance > 2) return;

            currentEnemy = enemy;
            inBattle = true;
            isDefending = false;
            battleUI.classList.add('active');

            document.getElementById('enemy-name').textContent = `${enemy.name} Apareceu!`;
            updateBattleUI();
            addLog(`Batalha contra ${enemy.name} começou!`);
        }

        function updateBattleUI() {
            document.getElementById('battle-player-hp').textContent = playerHP;
            document.getElementById('battle-player-atk').textContent = playerATK;
            document.getElementById('battle-player-def').textContent = playerDEF;

            document.getElementById('battle-enemy-hp').textContent = currentEnemy.hp;
            document.getElementById('battle-enemy-atk').textContent = currentEnemy.atk;
            document.getElementById('battle-enemy-def').textContent = currentEnemy.def;

            const playerHPPercent = (playerHP / playerMaxHP) * 100;
            const enemyHPPercent = (currentEnemy.hp / currentEnemy.maxHP) * 100;

            document.getElementById('battle-player-hp-bar').style.width = playerHPPercent + '%';
            document.getElementById('battle-enemy-hp-bar').style.width = enemyHPPercent + '%';
        }

        function playerAttack() {
            isDefending = false;
            const isCritical = Math.random() < 0.2;
            let damage = Math.max(1, playerATK - currentEnemy.def + Math.floor(Math.random() * 5));
            
            if (isCritical) {
                damage = Math.floor(damage * 1.5);
                addLog(`<span class="critical-hit">💥 CRÍTICO! Você causou ${damage} de dano!</span>`);
            } else {
                addLog(`⚔️ Você causou ${damage} de dano!`);
            }

            currentEnemy.hp = Math.max(0, currentEnemy.hp - damage);
            updateBattleUI();

            const hpBar = currentEnemy.element.querySelector('.enemy-hp-bar');
            if (hpBar) {
                hpBar.style.width = ((currentEnemy.hp / currentEnemy.maxHP) * 100) + '%';
            }

            if (currentEnemy.hp <= 0) {
                setTimeout(() => victory(), 500);
                return;
            }

            setTimeout(() => enemyAttack(), 1000);
        }

        function enemyAttack() {
            let damage = Math.max(1, currentEnemy.atk - playerDEF + Math.floor(Math.random() * 3));
            
            if (isDefending) {
                damage = Math.floor(damage * 0.5);
                addLog(`🛡️ Você defendeu! Inimigo causou apenas ${damage} de dano!`);
                isDefending = false;
            } else {
                addLog(`👹 ${currentEnemy.name} causou ${damage} de dano!`);
            }

            playerHP = Math.max(0, playerHP - damage);
            updateBattleUI();
            document.getElementById('player-hp').textContent = playerHP;

            if (playerHP <= 0) {
                setTimeout(() => defeat(), 500);
            }
        }

        function defend() {
            isDefending = true;
            addLog('🛡️ Você assumiu postura defensiva!');
            setTimeout(() => enemyAttack(), 1000);
        }

        function victory() {
            addLog(`<span class="victory-msg">🎉 Você derrotou ${currentEnemy.name}!</span>`);
            
            gold += currentEnemy.gold;
            kills++;
            document.getElementById('gold').textContent = gold;
            document.getElementById('kills').textContent = kills;

            addLog(`<span class="gold-text">+${currentEnemy.gold} Ouro!</span>`);

            currentEnemy.element.remove();
            enemies.splice(enemies.indexOf(currentEnemy), 1);

            if (Math.random() < 0.3) {
                const hpGain = 20;
                playerHP = Math.min(playerMaxHP, playerHP + hpGain);
                document.getElementById('player-hp').textContent = playerHP;
                addLog(`❤️ Você recuperou ${hpGain} HP!`);
            }

            setTimeout(() => endBattle(), 2500);
        }

        function defeat() {
            addLog('<span class="defeat-msg">💀 Você foi derrotado!</span>');

            setTimeout(() => {
                playerHP = playerMaxHP;
                playerTileX = 1;
                playerTileY = 1;
                updatePlayerPosition();
                updateBattleUI();
                document.getElementById('player-hp').textContent = playerHP;
                addLog('Você acordou na entrada da dungeon...');
                setTimeout(() => endBattle(), 1500);
            }, 2000);
        }

        function runAway() {
            const escapeChance = 0.6;
            if (Math.random() < escapeChance) {
                addLog('🏃 Você fugiu da batalha!');
                setTimeout(() => endBattle(), 1000);
            } else {
                addLog('❌ Não conseguiu fugir!');
                setTimeout(() => enemyAttack(), 1000);
            }
        }

        function endBattle() {
            inBattle = false;
            battleUI.classList.remove('active');
            battleLog.innerHTML = '';
            currentEnemy = null;
        }

        function addLog(message) {
            const p = document.createElement('p');
            p.innerHTML = message;
            battleLog.appendChild(p);
            battleLog.scrollTop = battleLog.scrollHeight;
        }

        // Inicializar
        createDungeon();
        updatePlayerPosition();