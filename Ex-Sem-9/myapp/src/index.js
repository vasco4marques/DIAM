import React from "react";
import ReactDom from "react-dom/client";

class Bilhete extends React.Component {
    constructor(){
        super();
        this.state = {preco: "5"};
    }
    render(){
        return <h2>Esta é uma entrada para a festa de finalistas!</h2>
    }
}

function Entrada(props){
    return(
        <div>
            <h2>O preço do bilete para a festa é {props.price}</h2>
        </div>
    );
}


function Jogo(){
    const jogada = (a,b)=>{
        alert(b.type);
    }
    return(
        <button onClick={(event)=> jogada("Golo!",event)} >Remate aqui!</button>
    )

}

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
    <div>
        <Bilhete/>
        <Entrada price="5€"/>
        <Jogo/>
    </div>
);