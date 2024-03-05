import React, { useState } from 'react';
import axios from 'axios';
import NumberPicker from "react-widgets/NumberPicker";
import "./my_style.scss"

function App() {
    const [poemInput, setPoemInput] = useState('');
    const [nbrLine, setNbrLine] = useState(1);
    const [wordsPerLine, setWordsPerLine] = useState(1);
    const [craziness, setCraziness] = useState(1.0);
    const [poem, setPoem] = useState('');

  const fetchPoem = async () => {
      try {
          const response = await axios.get(`http://localhost:5000/?poem=${poemInput}&line=${nbrLine}&words=${wordsPerLine}&crazy=${craziness}`);
          setPoem(response.data);
      } catch (error) {
          console.error("Erreur lors de la récupération du poème", error);
      }
  };

    return (
        <div className="App">
            <header className="App-header">
                <h1>VerseCraft: AI Poetry Companion</h1>
            </header>
            <view>
                <t3>
                    Theme of poem :
                </t3>
                <p></p>
                <input
                    type="text"
                    value={poemInput}
                    onChange={(e) => setPoemInput(e.target.value)}
                    placeholder="Entrez votre texte initial ici"
                /><p></p>
            </view>
            <view>
                <t3>
                    Number of line :
                </t3>
                <NumberPicker
                    min={1}
                    defaultValue={5}
                    step={1}
                    onChange={(e) => setNbrLine(e)}
                /><p></p>
            </view>
            <view>
                <t3>
                    Number of words per line :
                </t3>
                <NumberPicker
                    min={1}
                    defaultValue={5}
                    step={1}
                    onChange={(e) => setWordsPerLine(e)}
                /><p></p>
            </view>
            <view>
                <t3>
                    Liberty of IA :
                </t3>
                <NumberPicker
                    max={1.9}
                    min={0.1}
                    precision={1}
                    defaultValue={1.0}
                    step={0.1}
                    onChange={(e) => setCraziness(e)}
                /><p></p>
            </view>
            <button onClick={fetchPoem}>Générer un Poème</button>
                <div className="poem-output">
                    {poem && poem.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
        </div>
);
}

export default App;
