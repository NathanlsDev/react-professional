const Header = () => <div className="hearder">Calculator</div>;

const Button = ({ value, onClick, className }) => (
  <button
    onClick={() => {
      onClick(value);
    }}
    className={className}
  >
    {value}
  </button>
);

const Calculator = () => {
  const keyPadNumbers = [
    7, 8, 9, "/", "",
    4, 5, 6, "*", "",
    1, 2, 3, "-", "",
    0, ".", "+", "="
  ];

  const [display, setDisplay] = React.useState("");

  const generateButtonNumbers = () =>
    keyPadNumbers.map((keyPad, index) => {
      const span2Class = keyPad === 0 ? "span2" : "";
      const primaryClass = isNaN(keyPad) ? "primary" : "";

      return (
        <Button
          className={`${span2Class}${primaryClass}`}
          value={keyPad}
          key={index}
          onClick={handleClick}
        />
      );
    });

  const handleClick = (value) => value === "=" 
    ? setDisplay(eval(display)) 
    : setDisplay(display + value);
  ;

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="keyboard">{generateButtonNumbers()}</div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Header />
      <Calculator />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
