import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './Components/SingleCard';

const cardImages = [
  { "src": "/img/helmet-1.png",matched:false },
  { "src": "/img/potion-1.png",matched:false },
  { "src": "/img/ring-1.png",matched:false },
  { "src": "/img/scroll-1.png",matched:false },
  { "src": "/img/shield-1.png",matched:false },
  { "src": "/img/sword-1.png",matched:false },
]
function App() {
  const [cards,setCards] = useState([]);
  const [turns,setTurns] = useState(0);
  const [choiceOne,setChoiceOne] = useState()
  const [choicetwo,setChoicetwo] = useState()
  const [disabled, setDisabled] = useState(false)

  //shuffle cards
  const shuffleCards = () =>{
    const shuffledCards = [...cardImages,...cardImages]
    .sort(()=>Math.random() - 0.5)
    .map((card)=>({...card,id:Math.random()}))
    setChoiceOne(null)
    setChoicetwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }
  
  //Handle a choice
  const handleChoice = (card) =>{
    if(card.id === choiceOne?.id) return
    choiceOne ? setChoicetwo(card) : setChoiceOne(card)
  }

  //Compare two selected cards
  useEffect(() => {
    if(choiceOne && choicetwo){
      setDisabled(true)
      if(choiceOne.src === choicetwo.src){
        setCards(prevCards => {
          return prevCards.map(card =>{
            if(card.src === choiceOne.src){
              return {...card,matched:true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      }else{
        setTimeout(() => resetTurn(),1000)
      }
    }
  }, [choiceOne,choicetwo])

  //start game at render

  useEffect(() => {
    shuffleCards()
  }, [])
  

  
  //reset choices and increase turn

  const resetTurn = () => {
    setChoiceOne(null)
    setChoicetwo(null)
    setTurns(prevTurns => prevTurns+1)
    setDisabled(false)
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard  
          key={card.id} 
          card={card} 
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choicetwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
      <p> {turns} </p>
    </div>
  );
}

export default App