
        const dungeonMap = document.getElementById('dungeon-map');
        const viewport = document.getElementById('viewport');
        const battleUI = document.getElementById('battle-ui');
        const battleLog = document.getElementById('battle-log');
        
        let playerHP = 100;
        let playerMaxHP = 100;
        let playerATK = 20;
        let playerDEF = 5;
        let gold = 0;
        let kills = 0;
        let isDefending = false;
        
        let playerX = 20;
        let playerY = 25;
        
        const tileSize = 40;
        const mapWidth = 40;
        const mapHeight = 30;
        
        const keys = {};
        const enemies = [];
        const chests = [];
        
        let currentEnemy = null;
        let inBattle = false;
        let playerElement = null;
        let canAttack = true;

        const map = [
            [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
            [9,9,9,9,9,9,9,9,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,9,9,9,9,9,9,9,9,9],
            [9,9,9,9,9,9,9,9,9,9,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,9,9,9,9,9,9,9,9,9,9],
            [9,9,9,9,9,9,9,9,9,9,0,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,1,4,1,0,9,9,9,9,9,9,9,9,9,9],
            [9,9,9,9,9,9,9,9,9,9,0,1,0,1,0,1,1,1,1,1,1,1,1,0,1,0,1,1,1,0,9,9,9,9,9,9,9,9,9,9],
            [9,9,9,9,9,9,9,9,9,9,0,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,1,1,1,0,9,9,9,9,9,9,9,9,9,9],
            [9,9,9,9,9,9,9,9,9,9,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,9,9,9,9,9,9,9,9,9,9],
            [9,9,9,9,9,9,9,9,9,9,0,0,0,0,0,1,1,1,2,1,1,1,0,0,0,0,0,0,0,0,9,9,9,9,9,9,9,9,9,9],
            [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,1,1,1,1,1,1,1,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
            [9,9,9,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,9,9,9],
            [9,9,9,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,9,9,9,9],
            [9,9,9,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,4,1,1,0,9,9,9,9],
            [9,9,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,0,9,9,9,9],
            [9,9,9,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,0,9,9,9,9],
            [9,9,9,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,9,9,9,9],
            [9,9,9,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,9,9,9,9],
            [9,9,9,9,9,9,9,9,9,1,1,1,9,9,9,9,9,9,9,9,9,9,9,9,1,1,1,9,9,9,9,9,9,9,9,9,9,9,9,9],
            [9,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,2,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,9,9,9,9],
            [9,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,9,9,9,9],
            [9,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,9,9,9,9],
            [9,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,9,9,9,9],
            [9,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,9,9,9,9],
            [9,9,9,9,9,9,9,9,9,1,1,1,9,9,9,9,9,9,9,9,9,9,9,9,1,1,1,9,9,9,9,9,9,9,9,9,9,9,9,9],
            [9,9,9,9,9,9,9,9,9,1,1,1,0,0,0,0,0,0,2,0,0,0,0,0,1,1,1,9,9,9,9,9,9,9,9,9,9,9,9,9],
            [9,9,9,9,9,9,9,9,9,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,9,9,9,9,9,9,9,9,9,9,9,9,9],
            [9,9,9,9,9,9,9,9,9,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,9,9,9,9,9,9,9,9,9,9,9,9,9],
            [9,9,9,9,9,9,9,9,9,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,9,9,9,9,9,9,9,9,9,9,9,9,9],
            [9,9,9,9,9,9,9,9,9,1,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,1,9,9,9,9,9,9,9,9,9,9,9,9,9],
            [9,9,9,9,9,9,9,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,9,9,9,9,9,9,9,9,9,9,9,9],
            [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9]
        ];

        function createDungeon() {
            // Primeiro cria o mapa
            for (let y = 0; y < mapHeight; y++) {
                for (let x = 0; x < mapWidth; x++) {
                    const tile = document.createElement('div');
                    tile.className = 'tile';
                    const t = map[y][x];
                    
                    if (t === 0) tile.classList.add('wall');
                    else if (t === 1) tile.classList.add('floor');
                    else if (t === 2) tile.classList.add('door');
                    else if (t === 4) {
                        tile.classList.add('floor');
                        const chest = document.createElement('div');
                        chest.className = 'chest';
                        tile.appendChild(chest);
                        chests.push({x, y, opened: false, element: chest});
                    }
                    else if (t === 9) tile.classList.add('void');
                    
                    dungeonMap.appendChild(tile);
                }
            }
            
            // Adiciona decorações
            addTorches();
            
            // Aguarda o DOM estar pronto antes de adicionar inimigos e player
            setTimeout(() => {
                spawnEnemies();
                createPlayer();
            }, 100);
        }

        function createPlayer() {
            playerElement = document.createElement('div');
            playerElement.id = 'player';
            playerElement.innerHTML = '<div class="player-sprite"></div>';
            dungeonMap.appendChild(playerElement);
            updatePlayer();
        }

        function addTorches() {
            const pos = [
                [12,2],[15,2],[20,2],[25,2],
                [5,10],[30,10],
                [5,18],[18,18],[30,18],
                [10,25],[26,25]
            ];

            pos.forEach(p => {
                const idx = p[1] * mapWidth + p[0];
                const tile = dungeonMap.children[idx];
                if (tile && tile.classList.contains('floor')) {
                    const torch = document.createElement('div');
                    torch.className = 'torch';
                    tile.appendChild(torch);
                }
            });
        }

        function spawnEnemies() {
            const types = [
                {c: 'goblin', n: 'Goblin', hp: 40, atk: 8, def: 2, g: 10, m: true},
                {c: 'skeleton', n: 'Esqueleto', hp: 50, atk: 12, def: 3, g: 15, m: false},
                {c: 'demon', n: 'Demônio', hp: 70, atk: 15, def: 5, g: 25, m: true}
            ];

            // Novas posições DENTRO do mapa em áreas de chão (type 1)
            const spawns = [
                [16,3,0], [27,3,2], [7,11,0], [20,10,2],
                [32,11,0], [5,19,1], [18,19,2], [30,19,1],
                [12,25,0], [20,25,2]
            ];

            spawns.forEach(s => {
                const t = types[s[2]];
                
                // Verifica se a posição é válida
                if (s[1] >= mapHeight || s[0] >= mapWidth || map[s[1]][s[0]] !== 1) {
                    console.log(`Posição inválida: [${s[0]}, ${s[1]}]`);
                    return;
                }
                
                const e = document.createElement('div');
                e.className = `enemy ${t.c}`;
                
                const data = {
                    el: e, x: s[0], y: s[1], name: t.n,
                    hp: t.hp, maxHP: t.hp, atk: t.atk, def: t.def,
                    gold: t.g, canMove: t.m, dir: 1, timer: 0,
                    startX: s[0], range: 3
                };
                
                // Cria a barra de HP separada
                const hpContainer = document.createElement('div');
                hpContainer.className = 'enemy-hp';
                const hpBar = document.createElement('div');
                hpBar.className = 'enemy-hp-bar';
                hpBar.style.width = '100%';
                hpContainer.appendChild(hpBar);
                e.appendChild(hpContainer);
                
                data.hpBar = hpBar;
                
                e.onclick = () => startBattle(data);
                
                // Posiciona o inimigo
                e.style.left = (s[0] * tileSize + tileSize/2 - 17.5) + 'px';
                e.style.top = (s[1] * tileSize + tileSize/2 - 17.5) + 'px';
                e.style.position = 'absolute';
                
                dungeonMap.appendChild(e);
                enemies.push(data);
                
                console.log(`Inimigo ${t.n} criado em [${s[0]}, ${s[1]}]`);
            });
            
            console.log(`Total de inimigos criados: ${enemies.length}`);
        }

        function posEnemy(el, x, y) {
            el.style.left = (x * tileSize + tileSize/2 - 17.5) + 'px';
            el.style.top = (y * tileSize + tileSize/2 - 17.5) + 'px';
        }

        function updatePlayer() {
            if (!playerElement) return;
            playerElement.style.left = (playerX * tileSize + tileSize/2 - 17.5) + 'px';
            playerElement.style.top = (playerY * tileSize + tileSize/2 - 17.5) + 'px';
            updateCamera();
        }

        function updateCamera() {
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            
            const px = playerX * tileSize + tileSize/2;
            const py = playerY * tileSize + tileSize/2;
            
            let ox = vw/2 - px;
            let oy = vh/2 - py;
            
            const mw = mapWidth * tileSize;
            const mh = mapHeight * tileSize;
            
            if (mw <= vw) {
                ox = (vw - mw) / 2;
            } else {
                ox = Math.min(0, Math.max(vw - mw, ox));
            }
            
            if (mh <= vh) {
                oy = (vh - mh) / 2;
            } else {
                oy = Math.min(0, Math.max(vh - mh, oy));
            }
            
            dungeonMap.style.transform = `translate(${ox}px, ${oy}px)`;
        }

        document.addEventListener('keydown', (e) => {
            if (inBattle || keys[e.key]) return;
            keys[e.key] = true;
            
            let nx = playerX, ny = playerY;
            const k = e.key.toLowerCase();
            
            if (k === 'arrowup' || k === 'w') ny--;
            else if (k === 'arrowdown' || k === 's') ny++;
            else if (k === 'arrowleft' || k === 'a') nx--;
            else if (k === 'arrowright' || k === 'd') nx++;

            if (canMove(nx, ny)) {
                playerX = nx;
                playerY = ny;
                updatePlayer();
                checkChests();
            }
        });

        document.addEventListener('keyup', (e) => {
            keys[e.key] = false;
        });

        function canMove(x, y) {
            if (x < 0 || x >= mapWidth || y < 0 || y >= mapHeight) return false;
            const t = map[y][x];
            return t !== 0 && t !== 9;
        }

        function checkChests() {
            chests.forEach(c => {
                if (c.opened) return;
                const d = Math.abs(playerX - c.x) + Math.abs(playerY - c.y);
                if (d <= 1) openChest(c);
            });
        }

        function openChest(c) {
            c.opened = true;
            c.element.classList.add('opened');

            const g = 20 + Math.floor(Math.random() * 30);
            gold += g;
            document.getElementById('gold').textContent = gold;

            showMessage(`+${g} Ouro!`, '#ffd700');
        }

        function showMessage(txt, color) {
            const m = document.createElement('div');
            m.style.cssText = `position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);color:${color};font-size:32px;font-weight:bold;z-index:2000;text-shadow:0 0 10px ${color}`;
            m.textContent = txt;
            document.body.appendChild(m);
            setTimeout(() => m.remove(), 2000);
        }

        function moveEnemies() {
            if (inBattle) return;

            enemies.forEach(e => {
                if (!e.canMove) return;

                e.timer++;
                if (e.timer < 60) return;
                e.timer = 0;

                const nx = e.x + e.dir;

                if (nx < e.startX - e.range || nx > e.startX + e.range || !canMove(nx, e.y)) {
                    e.dir *= -1;
                } else {
                    e.x = nx;
                    posEnemy(e.el, e.x, e.y);
                }
            });
        }

        function startBattle(e) {
            if (inBattle) return;

            const d = Math.abs(playerX - e.x) + Math.abs(playerY - e.y);
            if (d > 2) return;

            currentEnemy = e;
            inBattle = true;
            isDefending = false;
            canAttack = true;
            
            // Esconde todas as barras de HP
            document.querySelectorAll('.enemy-hp').forEach(hp => {
                hp.style.display = 'none';
            });
            
            battleUI.classList.add('active');

            document.getElementById('enemy-name').textContent = `${e.name} Apareceu!`;
            updateBattleUI();
            addLog(`Batalha contra ${e.name} começou!`);
        }

        function updateBattleUI() {
            document.getElementById('battle-player-hp').textContent = playerHP;
            document.getElementById('battle-player-atk').textContent = playerATK;
            document.getElementById('battle-player-def').textContent = playerDEF;

            document.getElementById('battle-enemy-hp').textContent = currentEnemy.hp;
            document.getElementById('battle-enemy-atk').textContent = currentEnemy.atk;
            document.getElementById('battle-enemy-def').textContent = currentEnemy.def;

            const php = Math.max(0, Math.min(100, (playerHP / playerMaxHP) * 100));
            const ehp = Math.max(0, Math.min(100, (currentEnemy.hp / currentEnemy.maxHP) * 100));

            const playerBar = document.getElementById('battle-player-hp-bar');
            const enemyBar = document.getElementById('battle-enemy-hp-bar');
            
            if (playerBar) playerBar.style.width = php + '%';
            if (enemyBar) enemyBar.style.width = ehp + '%';
        }

        function playerAttack() {
            if (!canAttack) return;
            
            canAttack = false;
            isDefending = false;
            const crit = Math.random() < 0.2;
            let dmg = Math.max(1, playerATK - currentEnemy.def + Math.floor(Math.random() * 5));
            
            if (crit) {
                dmg = Math.floor(dmg * 1.5);
                addLog(`<span class="critical-hit">💥 CRÍTICO! Você causou ${dmg} de dano!</span>`);
            } else {
                addLog(`⚔️ Você causou ${dmg} de dano!`);
            }

            currentEnemy.hp = Math.max(0, currentEnemy.hp - dmg);
            updateBattleUI();

            // Atualiza a barra de HP no mapa
            if (currentEnemy.hpBar) {
                currentEnemy.hpBar.style.width = ((currentEnemy.hp / currentEnemy.maxHP) * 100) + '%';
            }

            if (currentEnemy.hp <= 0) {
                setTimeout(() => victory(), 500);
            } else {
                setTimeout(() => {
                    enemyAttack();
                    setTimeout(() => {
                        canAttack = true;
                    }, 1000);
                }, 1000);
            }
        }

        function enemyAttack() {
            let dmg = Math.max(1, currentEnemy.atk - playerDEF + Math.floor(Math.random() * 3));
            
            if (isDefending) {
                dmg = Math.floor(dmg * 0.5);
                addLog(`🛡️ Você defendeu! Inimigo causou apenas ${dmg} de dano!`);
                isDefending = false;
            } else {
                addLog(`👹 ${currentEnemy.name} causou ${dmg} de dano!`);
            }

            playerHP = Math.max(0, playerHP - dmg);
            updateBattleUI();
            document.getElementById('player-hp').textContent = playerHP;

            if (playerHP <= 0) {
                setTimeout(() => defeat(), 500);
            }
        }

        function defend() {
            if (!canAttack) return;
            
            canAttack = false;
            isDefending = true;
            addLog('🛡️ Você assumiu postura defensiva!');
            setTimeout(() => {
                enemyAttack();
                setTimeout(() => {
                    canAttack = true;
                }, 1000);
            }, 1000);
        }

        function victory() {
            addLog(`<span class="victory-msg">🎉 Você derrotou ${currentEnemy.name}!</span>`);
            
            gold += currentEnemy.gold;
            kills++;
            document.getElementById('gold').textContent = gold;
            document.getElementById('kills').textContent = kills;

            addLog(`<span class="gold-text">+${currentEnemy.gold} Ouro!</span>`);

            currentEnemy.el.remove();
            enemies.splice(enemies.indexOf(currentEnemy), 1);

            if (Math.random() < 0.3) {
                const heal = 20;
                playerHP = Math.min(playerMaxHP, playerHP + heal);
                document.getElementById('player-hp').textContent = playerHP;
                addLog(`❤️ Você recuperou ${heal} HP!`);
            }

            setTimeout(() => endBattle(), 2500);
        }

        function defeat() {
            addLog('<span class="defeat-msg">💀 Você foi derrotado!</span>');

            setTimeout(() => {
                playerHP = playerMaxHP;
                playerX = 20;
                playerY = 25;
                updatePlayer();
                updateBattleUI();
                document.getElementById('player-hp').textContent = playerHP;
                addLog('Você acordou na entrada...');
                setTimeout(() => endBattle(), 1500);
            }, 2000);
        }

        function runAway() {
            if (!canAttack) return;
            
            canAttack = false;
            if (Math.random() < 0.6) {
                addLog('🏃 Você fugiu da batalha!');
                setTimeout(() => {
                    endBattle();
                    canAttack = true;
                }, 1000);
            } else {
                addLog('❌ Não conseguiu fugir!');
                setTimeout(() => {
                    enemyAttack();
                    setTimeout(() => {
                        canAttack = true;
                    }, 1000);
                }, 1000);
            }
        }

        function endBattle() {
            inBattle = false;
            battleUI.classList.remove('active');
            battleLog.innerHTML = '';
            
            // Mostra novamente as barras de HP
            document.querySelectorAll('.enemy-hp').forEach(hp => {
                hp.style.display = 'block';
            });
            
            currentEnemy = null;
        }

        function addLog(msg) {
            const p = document.createElement('p');
            p.innerHTML = msg;
            battleLog.appendChild(p);
            battleLog.scrollTop = battleLog.scrollHeight;
        }

        function gameLoop() {
            moveEnemies();
            requestAnimationFrame(gameLoop);
        }

        document.getElementById('attack-btn').onclick = playerAttack;
        document.getElementById('defend-btn').onclick = defend;
        document.getElementById('run-btn').onclick = runAway;

        window.addEventListener('resize', updateCamera);

        createDungeon();
        gameLoop();