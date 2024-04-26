import React, {useState} from 'react';

export default function Mostraeesconde() {
    const [mostraImagem, setMostraImagem] = useState(false);

    const toggleMostra = () => {
        setMostraImagem(!mostraImagem);
    };

    return (
        <div>
            <button onClick={toggleMostra}>
                {mostraImagem ? 'Mostrar Texto' : 'Mostrar Imagem'}
            </button>
            {mostraImagem ? (
                <img src='/vasco.png' alt="nice" />
            ) : (
                <p>Texto a ser mostrado quando a imagem está escondida.</p>
            )}
        </div>
    );
}

