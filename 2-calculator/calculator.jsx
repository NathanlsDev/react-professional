const calcRegex = /^([0-9]|-|\+|\*|\/|\.)*$/;

const keyPad = [
  7, 8, 9, "/", "C",
  4, 5, 6, "*", "Del",
  1, 2, 3, "-", "Ad",
  0, ".", "+", "=",
];

const advancedKeyPad = ["(", ")", "Hist", "Up", "AC"];

const Header = () => <div className="hearder title">Calculator</div>;

const Button = ({ value, onClick, className }) => (
  <button onClick={() => {
    onClick(value);
  }} className={className}>
    {value}
  </button>
);

const Calculator = () => {
  const [display, setDisplay] = React.useState("");
  const [error, setError] = React.useState();
  const [showAdvanced, toggleAdvanced] = React.useState(false);
  const [history, setHistory] = React.useState([]);
  const [showHistory, toggleHistory] = React.useState(false);
  const histRef = React.useRef();

  React.useEffect(() => {
    if (error) {
      setError();
    }
  }, [display]);

  React.useEffect(() => {
    if (history.length > 2 && showHistory) {
      histRef.current.scrollTop = histRef.current.scrollHeight;
    }
  }, [history.length, showHistory]);

  const clearDisplay = () => setDisplay("");

  const doTheMath = () => {
    try {
      const result = eval(display);
      setHistory(
        [].concat(history, {
          calculation: display,
          result,
        })
      );
      setDisplay(`${result}`);
    } catch (err) {
      setError(`Invalid Expression, ${err.message}`);
    }
  };

  const lastExpression = () => {
    const lastIndex = history.length - 1;
    if (lastIndex > -1) {
      const newDisplay = history[lastIndex].calculation;
      const newHistory = history.slice(0, lastIndex);
      setDisplay(newDisplay);
      setHistory(newHistory);
    }
  };

  const handleClick = value => {
    const actions = {
      "=": () => doTheMath(),
      C: () => clearDisplay(),
      Del: () => setDisplay(display.slice(0, -1)),
      Ad: () => toggleAdvanced(!showAdvanced),
      Hist: () => toggleHistory(!showHistory),
      AC: () => clearDisplay(setHistory([])),
      Up: () => lastExpression(),
      default: () => setDisplay(`${display}${value}`),
    };

    const action = actions[value] || actions["default"];
    action();
  };

  const generateButtons = arr =>
    arr.map(keyPad => {
      const span2Class = keyPad === 0 ? "span2" : "";
      const primaryClass = isNaN(keyPad) ? "primary" : "";

      return (
        <Button
          className={`${span2Class}${primaryClass}`}
          value={keyPad}
          key={keyPad}
          onClick={handleClick}
        />
      );
    });

  return (
    <div className="calculator">
      {showHistory && (
        <div ref={histRef} className="history">
          {history.map(({ calculation, result }, index) => (
            <p key={index}>{`${calculation} = ${result}`}</p>
          ))}
        </div>
      )}
      <input
        type="text"
        className="display"
        value={display}
        onChange={event => {
          const { value } = event.target;
          if (calcRegex.test(value)) {
            setDisplay(event.target.value);
          }
        }}
        onKeyDown={event => {
          if (event.key === "Enter") {
            doTheMath();
          }
          if (event.code === "KeyC") {
            clearDisplay();
          }
        }}
      />
      {error && <p className="error">{error}</p>}
      {showAdvanced && (
        <div className="keyboard">{generateButtons(advancedKeyPad)}</div>
      )}
      <div className="keyboard">{generateButtons(keyPad)}</div>
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
