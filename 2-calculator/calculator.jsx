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
    7,  8,  9,  "/",  "C",
    4,  5,  6,  "*",  "Del",
    1,  2,  3,  "-",  "",
    0,  ".",  "+",  "=",
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

  const handleClick = (value) => {
    const actions = {
      "=": () => setDisplay(eval(display)),
      C: () => setDisplay(""),
      Del: () => setDisplay(display.slice(0, -1)),
      default: () => setDisplay(`${display}${value}`),
    };

    const action = actions[value] || actions["default"];
    action();
  };

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
