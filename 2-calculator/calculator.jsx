const Header = () => <div className="hearder">Calculator</div>;

const Button = (props) => (
  <button
    onClick={() => {
      props.onNumberClick(props.value);
    }}
  >
    {props.value}
  </button>
);

const Calculator = () => {
  const keyPadNumbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
  const [display, setDisplay] = React.useState("");

  const generateButtonNumbers = () =>
    keyPadNumbers.map((number, index) => (
      <Button value={number} key={index} onNumberClick={handleNumberClicked} />
    ));

  const handleNumberClicked = (value) => {
    setDisplay(display + value);
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
