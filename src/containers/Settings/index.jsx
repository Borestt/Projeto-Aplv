import { Link } from 'react-router-dom';
import { useAudio } from '../../contexts/AudioContext';
import './styles.css';

function Settings() {
  const { volume, setVolume, isPlaying, togglePlay } = useAudio();

  const handleVolumeChange = (event) => {
    const newVolume = parseInt(event.target.value, 10);
    setVolume(newVolume);
  };

  const toggleMute = () => {
    setVolume(volume === 0 ? 50 : 0);
  };

  const PlayIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M5 3v18l15-9L5 3z" fill="#ffd166" stroke="#7a4b00" strokeWidth="0.5"/>
    </svg>
  );

  const PauseIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="4" y="3" width="5" height="180" fill="#ffd166" stroke="#7a4b00" strokeWidth="0.5"/>
      <rect x="15" y="3" width="5" height="180" fill="#ffd166" stroke="#7a4b00" strokeWidth="0.5"/>
    </svg>
  );

  const SpeakerOn = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M3 10v4h4l5 4V6L7 10H3z" fill="#fff" stroke="#7a4b00" strokeWidth="0.5"/>
      <path d="M16.5 8.5c1.5 1.5 1.5 5 0 6.5" stroke="#ffd166" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );

  const SpeakerOff = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M3 10v4h4l5 4V6L7 10H3z" fill="#666" stroke="#222" strokeWidth="0.5"/>
      <line x1="16" y1="8" x2="22" y2="14" stroke="#cc0000" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  return (
    <div className="settings-container">
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
                    <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fillRule="nonzero"></path>
                    <path d="M7.16075,10.9724 C8.44534,9.45943 10.3615,8.5 12.5,8.5 C16.366,8.5 19.5,11.634 19.5,15.5 C19.5,16.3284 20.1715,17 21,17 C21.8284,17 22.5,16.3284 22.5,15.5 C22.5,9.97715 18.0228,5.5 12.5,5.5 C9.55608,5.5 6.91086,6.77161 5.08155,8.79452 L4.73527,6.83068 C4.59142,6.01484 3.81343,5.47009 2.99759,5.61394 C2.18175,5.7578 1.637,6.53578 1.78085,7.35163 L2.82274,13.2605 C2.89182,13.6523 3.11371,14.0005 3.43959,14.2287 C3.84283,14.5111 4.37354,14.5736 4.82528,14.4305 L10.4693,13.4353 C11.2851,13.2915 11.8299,12.5135 11.686,11.6976 C11.5422,10.8818 10.7642,10.337 9.94833,10.4809 L7.16075,10.9724 Z" id="路径" fill="#ff6f00"></path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </p>
      </Link>

      <h1 className="settings-title">Volume</h1>

      <div className="volume-control rpg-frame">
        <button onClick={togglePlay} className="rpg-button play-button" aria-pressed={isPlaying} title={isPlaying ? 'Pausar' : 'Tocar'}>
          {isPlaying ? PauseIcon : PlayIcon}
        </button>

        <button className="volume-toggle" onClick={toggleMute} aria-pressed={volume === 0} title={volume === 0 ? 'Desmutar' : 'Mutar'}>
          {volume > 0 ? SpeakerOn : SpeakerOff}
        </button>

        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
          aria-label="Volume"
        />

        <span className="volume-value">{volume}%</span>
      </div>
    </div>
  );
}

export default Settings;