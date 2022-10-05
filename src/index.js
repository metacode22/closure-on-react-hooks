/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

const { useState, useEffect, render } = (function makeMyHooks() {
	const hooks = [];
	let index = 0;

	const useState = (initValue) => {
		const state = hooks[index] || initValue;
		hooks[index] = state;
		const currentIndex = index;
		const setState = (value) => {
			hooks[currentIndex] = value;
			render();
		};
		index++;

		return [state, setState];
	};

	const useEffect = (callback, deps) => {
		const oldDeps = hooks[index];
		let hasChanged = true;
		if (oldDeps) {
			hasChanged = deps.some((dep, idx) => !Object.is(dep, oldDeps[idx]));
		}
		if (hasChanged) callback();
		hooks[index] = deps;
		index++;
	};

	const render = () => {
		index = 0;
		root.render(<App />);
	};

	return { useState, useEffect, render };
})();

function App() {
	const [count, setCount] = useState(0);
	const [text, setText] = useState('');

	const handleInput = (event) => {
		event.preventDefault();
		setText(event.target.value);
	};

	useEffect(() => {
		console.log('useEffect!');
	}, [count]);

	return (
		<div>
			<h1> Jungle Frontend Study</h1>
			<div>
				<h3>State 1. count</h3>
				<p>Count: {count}</p>
				<button onClick={() => setCount(count + 1)}>Increase</button>
			</div>
      <br />
			<br />
			<hr />
			<br />
      <br />
			<div>
				<h3>State 2. text</h3>
				<input onChange={handleInput}></input>
				<div>{text}</div>
			</div>
		</div>
	);
}

render();
