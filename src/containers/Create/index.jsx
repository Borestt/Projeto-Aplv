import { useState, useEffect } from 'react';

// Um componente separado para o avatar, para manter o código limpo
function Avatar({ seed, onClick }) {
  const apiUrl = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}`;
  return (
    <img
      src={apiUrl}
      alt={`Avatar ${seed}`}
      width="100"
      height="100"
      onClick={() => onClick(seed)} // Chama a função do pai quando clicado
      style={{ cursor: 'pointer', margin: '5px', border: '2px solid transparent' }}
    />
  );
}

// Componente principal da tela de criação
function CreateCharacterScreen() {
  // --- ESTADO (STATE) ---
  // Guarda os dados que podem mudar na tela
  const [opcoesAvatar, setOpcoesAvatar] = useState([]);
  const [avatarEscolhido, setAvatarEscolhido] = useState(null);
  const [classe, setClasse] = useState('');
  const [stats, setStats] = useState({ hp: 100, atk: 20, def: 5 });

  // --- FUNÇÕES (HANDLERS) ---
  // Funções que alteram o estado
  const gerarOpcoes = () => {
    // Gera 4 "seeds" (sementes) aleatórias para os avatares
    const novasOpcoes = Array.from({ length: 4 }, () => Math.random().toString(36).substring(7));
    setOpcoesAvatar(novasOpcoes);
  };

  const rolarAtributos = () => {
    const hp = Math.floor(Math.random() * 50) + 80; // HP entre 80 e 130
    const atk = Math.floor(Math.random() * 15) + 10; // ATK entre 10 e 25
    const def = Math.floor(Math.random() * 10) + 5;  // DEF entre 5 e 15
    setStats({ hp, atk, def });
  };
  
  // --- EFEITOS (EFFECTS) ---
  // Roda o código quando o componente é montado pela primeira vez
  useEffect(() => {
    gerarOpcoes(); // Gera as opções iniciais de avatar
  }, []); // O array vazio [] significa que só roda uma vez

  // Roda quando a 'classe' muda, para definir os stats base
  useEffect(() => {
    if (classe === 'guerreiro') setStats({ hp: 120, atk: 25, def: 10 });
    else if (classe === 'mago') setStats({ hp: 80, atk: 35, def: 5 });
    else if (classe === 'guardiao') setStats({ hp: 150, atk: 15, def: 20 });
  }, [classe]); // Roda sempre que a variável 'classe' mudar

  // --- RENDERIZAÇÃO (JSX) ---
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Escolha seu Avatar</h1>
      <button onClick={gerarOpcoes}>Gerar Novas Opções</button>

      {/* Mapeia o array de opções para renderizar os componentes Avatar */}
      <div id="opcoes-avatar" style={{ margin: '20px 0' }}>
        {opcoesAvatar.map(seed => (
          <Avatar key={seed} seed={seed} onClick={setAvatarEscolhido} />
        ))}
      </div>

      {/* Renderização condicional: só mostra o avatar escolhido se ele existir */}
      {avatarEscolhido && (
        <div id="resultado">
          <h2>Seu Avatar Escolhido:</h2>
          <img
            src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${avatarEscolhido}`}
            alt="Avatar escolhido"
            width="150"
            height="150"
            style={{ border: '3px solid gold', borderRadius: '10px' }}
          />
        </div>
      )}

      <div id="atributos-personagem" style={{ marginTop: '20px' }}>
        <label htmlFor="classe-personagem">Escolha sua classe: </label>
        {/* O valor do select é controlado pelo estado 'classe' */}
        <select value={classe} onChange={(e) => setClasse(e.target.value)}>
          <option value="">Selecione...</option>
          <option value="guerreiro">Guerreiro</option>
          <option value="mago">Mago</option>
          <option value="guardiao">Guardião</option>
        </select>

        <div style={{
            background: 'rgba(0,0,0,0.7)', borderRadius: '12px', padding: '20px',
            maxWidth: '250px', color: '#fff', margin: '20px auto'
          }}>
          <h2>Ficha do Personagem</h2>
          {/* Os valores vêm do estado 'stats' */}
          <p>❤️ <strong>HP:</strong> <span>{stats.hp}</span></p>
          <p>⚔️ <strong>ATK:</strong> <span>{stats.atk}</span></p>
          <p>🛡️ <strong>DEF:</strong> <span>{stats.def}</span></p>
          <button onClick={rolarAtributos} style={{ marginTop: '15px', width: '100%' }}>
            Role os Atributos!
          </button>
        </div>
      </div>

      <footer>
        <p>version 0.0.05</p>
      </footer>
    </div>
  );
}

export default CreateCharacterScreen;