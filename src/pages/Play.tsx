import { useEffect, useState } from 'react';
import Dice from '../Dice';
import { usePoints } from '../PointsContext';

const getRandomNumber = () => Math.floor(Math.random() * 6) + 1;

function Play() {
  const [dice, setDice] = useState([getRandomNumber(), getRandomNumber(), getRandomNumber()]);
  const [currSum, setCurrSum] = useState<number | null>(dice.reduce((sum, current) => sum + current, 0));
  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem('streakScore');
    return savedScore ? Number(savedScore) : 0; 
  });  const [gameOver, setGameOver] = useState(false);


  const {points, roundFee, incrementAllPoints, getMax} = usePoints();

  const handlePrediction = (pred: 'higher' | 'lower') => {
      const nextDice = [getRandomNumber(), getRandomNumber(), getRandomNumber()];
      const nextSum = nextDice.reduce((sum, current) => sum + current, 0);
      
      if (currSum !== null) {
          const isHigher: boolean = nextSum >= currSum;
          const correctPrediction = (pred === 'higher' && isHigher) || (pred === 'lower' && !isHigher);
          
          if (correctPrediction) {
            setScore(prevScore => {
              const newScore = prevScore + 1;
              localStorage.setItem('streakScore', newScore.toString()); 
              incrementAllPoints();
              getMax(newScore);
              return newScore;
            });
          } else {
            setGameOver(true);
          }
      }
      
      roundFee();
      setCurrSum(nextSum);
      setDice(nextDice);
  };

  const resetGame = () => {
    setDice([getRandomNumber(), getRandomNumber(), getRandomNumber()]);
    setCurrSum(dice.reduce((sum, current) => sum + current, 0));
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    if (gameOver) {
      localStorage.removeItem('streakScore'); 
    }
  }, [gameOver]);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <div style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '40px', marginTop: '100px', marginLeft: '110px' }}>
        Streak: {score}
      </div>
      <div style={{fontSize: '20px', marginBottom: '20px'}}>Cost 10 points per round</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        {dice.map((value, index) => (
          <Dice key={index} value={value} />
        ))}
      </div>
      {gameOver ? (
        <div style={{ marginTop: '20px' }}>
          <h2>Game Over!</h2>
          <div style={{ fontSize: '24px', margin: '20px' }}>
            Sum: {currSum}
          </div>
          <button
            onClick={resetGame}
            style={{ marginTop: '20px', height: '50px', width: '80px', fontSize: '15px', marginRight: 0 }}
            className="cancel-button"
          >
            Restart
          </button>
        </div>
      ) : (
        <div>
          <div style={{ fontSize: '24px', margin: '20px' }}>
            Sum: {currSum}
          </div>
          <div style={{fontSize: '20px'}}>Next Sum Prediction:
            <span >
              <button
                onClick={() => handlePrediction('higher')}
                style={{ margin: '0 10px', height: '50px', width: '80px', fontSize: '15px' }}
                className={`delete-button ${points < 10 ? 'disabled' : ''}`} 
              >
                Higher ({'>'}=)
              </button>
              <button
                onClick={() => handlePrediction('lower')}
                style={{ margin: '0 10px', height: '50px', width: '80px', fontSize: '15px' }}
                className={`delete-button ${points < 10 ? 'disabled' : ''}`} 
              >
                Lower ({'<'})
              </button>
            </span>
          </div>
          <br></br>
          <br></br>
          <div style={{fontSize: '20px', marginBottom: '20px'}}>
            <div>How to play:</div>  
            <div>Refering to the current sum above, determine if the next sum will be higher or lower</div>  
            <div>Correct Guess: 1+ point</div>
            <div>Incorrect Guess: GAME OVER</div>  
          </div>
        </div>
      )}
    </div>
  );
}



export default Play;
