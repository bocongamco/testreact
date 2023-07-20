import logo from './logo.svg';
import './App.css';
import { useState } from 'react';



function Squared({ value,onSquareClick }){
  // const [value,setValue] = useState(null);
  // function ClickedHandler(){
  //   setValue('X')
  // }

  return <button className="squared" onClick={onSquareClick}> {value} </button>
}

function  Board({xIsNext,squares,onPlay}){
 
  const winner = calculateWinner(squares);
  //console.log("winner: ",winner)
  let status;
  if (winner){
    status = "Winner: " + winner;
  }
  else{
    status = "Next player: " + (xIsNext ? "X" : "0");
  }

  function calculateWinner(squares){
    const line = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    for (let i = 0; i < line.length; i++){
      const [a,b,c] = line[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }
    } 
    return null;
  }

  function handleClick(i){
   
    if(squares[i] || calculateWinner(squares)){
      return;
    }
    const nextSquares = squares.slice();
    if(xIsNext){
      nextSquares[i] = "X";
    }
    else{
      nextSquares[i] = "O";
    }
    
    onPlay(nextSquares);
  }
  return (
    <>
      
      <div className = "board">
      <div className="status">{status}</div>
        <div className='board-row'>
          <Squared value ={squares[0]} onSquareClick={ ()=>handleClick(0)}/>
          <Squared value ={squares[1]} onSquareClick={ ()=>handleClick(1)}/>
          <Squared value ={squares[2]} onSquareClick={ ()=>handleClick(2)}/>
        </div>

        <div className='board-row'>
        <Squared value ={squares[3]} onSquareClick={ ()=>handleClick(3)}/>
        <Squared value ={squares[4]} onSquareClick={ ()=>handleClick(4)}/>
        <Squared value ={squares[5]} onSquareClick={ ()=>handleClick(5)}/>
        </div>
          
        <div className='board-row'>
        <Squared value ={squares[6]} onSquareClick={ ()=>handleClick(6)}/>
        <Squared value ={squares[7]} onSquareClick={ ()=>handleClick(7)}/>
        <Squared value ={squares[8]} onSquareClick={ ()=>handleClick(8)}/>
        </div>
      </div>
    </>
  ) ;
}

export default function Game(){

  
  const [history,setHistory] = useState([Array(9).fill(null)]);
  const [currentMove,setCurrentMove] = useState(0)
  const currentSquares = history[currentMove];
  const xIsNext = currentMove %2 ===0;
 
  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0,currentMove+1),nextSquares];
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length-1);
    
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
    
  }
  const moves = history.map((square,move)=>{
    let description;
    if (move > 0) {
      description = "Go to Move #" + move;
      console.log("Go to Move ",move);
    }
    else{
      description = "Go to game Start";
    }
    return (
      <li key = {move}>
        <button onClick= {()=> jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  })

  return (
    <div className = "Game">
      <div className = "Game-board">
        <Board xIsNext = {xIsNext} squares = {currentSquares} onPlay = {handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
};
