import React, {useState} from 'react';

export default function PopupTexto() {
    const [texto, setTexto] = useState('');

    const mostrarPopup = () => {
      alert(texto);
    };
  
    const handleInputChange = (event) => {
      setTexto(event.target.value);
    };
  
    return (
      <div>
        <input 
          type="text" 
          value={texto} 
          onChange={handleInputChange} 
          placeholder="Digite aqui..."
        />
        <button onClick={mostrarPopup}>Mostrar Popup</button>
      </div>
    );
}

