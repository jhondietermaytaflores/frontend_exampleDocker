import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
function App() {
  const [count, setCount] = useState(0);
  const [saludo, setSaludo] = useState('');
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Obtener saludo y contador inicial del backend
  useEffect(() => {
    fetch(`${apiUrl}/api/saludo`)
      .then(res => res.json())
      .then(data => setSaludo(data.mensaje))
      .catch(() => setSaludo('Error al conectar con el backend'));

    fetch(`${apiUrl}/api/clicks`)
      .then(res => res.json())
      .then(data => {
        if (typeof data.count === 'number') setCount(data.count);
      });
  }, [apiUrl]);
  // Actualizar contador en backend
  const handleClick = () => {
    setLoading(true);
    fetch(`${apiUrl}/api/clicks`, {
      method: 'POST'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setCount(data.count);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: '33rem', background: '#222' }}>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 style={{ fontSize: '2.5rem', margin: '1rem 0', color: '#fff', textShadow: '1px 1px 8px #000' }}>Pruebita v1 for Docker</h1>
      <div className="card" style={{ width: '350px', margin: '0 auto', background: '#333', borderRadius: '12px', boxShadow: '0 2px 8px #0008', textAlign: 'center', color: '#fff' }}>
        <button onClick={handleClick} disabled={loading} style={{ fontSize: '1.2rem', padding: '0.7em 2em', marginBottom: '1em', background: '#083460ff', color: '#fff', border: 'none', borderRadius: '6px', boxShadow: '0 1px 4px #0004', cursor: 'pointer' }}>
          el contador es <span style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#ffd600' }}>{count}</span>
        </button>
        <p>
          <span style={{ color: '#bdbdbd' }}>Editame esta!! <code style={{ color: '#ffd600' }}>src/App.jsx</code> y guarda para probar HMR</span>
        </p>
      </div>
      <div style={{marginTop: '2rem', width: '350px', background: '#0a325aff', borderRadius: '8px', padding: '1em', textAlign: 'center', color: '#fff', boxShadow: '0 1px 4px #0002'}}>
        <strong style={{ color: '#ffd600' }}>Respuesta del backend:</strong>
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginTop: '0.5em' }}>{saludo}</div>
      </div>
    </div>
  );
}

export default App;
