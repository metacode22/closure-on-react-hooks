/* eslint-disable */

const { useState, useEffect } = (function makeMyHooks() {
  let hookIndex = 0;
  const hooks = [];

  const useState = (initialValue) => {
    const state = hooks[hookIndex] || initialValue;
    hooks[hookIndex] = state;

    const setState = (function () {
      const currentHookIndex = hookIndex;

      return (value) => {
        hooks[currentHookIndex] = value;
        hookIndex = 0;
        render();
      };
    })();

    increaseIndex();
    return [state, setState];
  };

  const useEffect = (effect, deps) => {
    const prevDeps = hooks[hookIndex];

    const hasChanged = isFirstCall(prevDeps) || isDepsChanged(prevDeps, deps);

    if (hasChanged) {
      effect();
    }

    hooks[hookIndex] = deps;
    increaseIndex();
  };

  const increaseIndex = () => {
    log();
    hookIndex++;
  };

  const log = () => {
    console.group(`currentHookIndex: ${hookIndex}`);
    console.log("hooks", JSON.stringify(hooks));
    console.groupEnd();
  };

  return { useState, useEffect };
})();

function App() {
  const [count, setCount] = useState(1);
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("useEffect!");
  }, [text, count]);

  return (
    <div>
      <section>
        <h1>count: {count}</h1>
        <button onClick={() => setCount(count + 1)}>up</button>
      </section>
      <br />
      <br />
      <br />
      <section>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </section>
    </div>
  );
}

// render
const root = ReactDOM.createRoot(document.getElementById("root"));
function render() {
  root.render(<App />);
}

// util
function isDepsChanged(prevDeps, deps) {
  return deps.some((dep, idx) => dep !== prevDeps[idx]);
}

function isFirstCall(prevDeps) {
  return !prevDeps;
}

// initialize
render();