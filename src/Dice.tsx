type DiceProps = {
  value: number;
}

function Dice ({value}: DiceProps) {
  return (
    <div style={{ 
      width: '200px', 
      height: '200px', 
      border: '1px solid black', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      fontSize: '60px' 
    }}>
      {value}
    </div>
  );
};

export default Dice;