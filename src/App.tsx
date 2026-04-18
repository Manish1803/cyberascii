import { useState } from 'react';
import { NeuralPanel } from './components/NeuralPanel';
import { ASCIICameraView } from './components/ASCIICameraView';
import { ControlPanel } from './components/ControlPanel';

function App() {
  const [options, setOptions] = useState({
    fontSize: 10,
    gain: 1.0,
    contrast: 1.0,
    charset: ' .:-=+*#%@',
    mode: 'Matrix',
    aiMode: false,
  });

  const [faceDetected, setFaceDetected] = useState(false);

  return (
    <div className="app-container">
      <NeuralPanel aiMode={options.aiMode} faceDetected={faceDetected} />
      
      <main className="content">
        <ASCIICameraView options={options} onFaceDetect={setFaceDetected} />
      </main>

      <ControlPanel options={options} setOptions={setOptions} />

      <style>{`
        .app-container {
          display: flex;
          flex-direction: column;
          height: 100dvh;
          overflow: hidden;
        }
        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: var(--void);
          position: relative;
          min-height: 0; /* Important: Allows flex child to shrink */
        }
      `}</style>
    </div>
  );
}

export default App;
