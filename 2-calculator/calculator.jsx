const Header = () => <div class="hearder">Calculator</div>;
const Calculator = () => {
  return (
    <div class="calculator">
      <div class="display"></div>
      <div class="keyboard">
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>0</button>
      </div>
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
}

ReactDOM.render(<App />, document.getElementById("root"));
