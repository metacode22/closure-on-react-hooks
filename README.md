## Closure 개념을 활용한 React의 useState, useEffect 간단히 구현해보기

참고한 동영상 : https://www.youtube.com/watch?v=KJP1E-Y-xyo

<br/>

## 개요

useState가 어떻게 상태를 계속 기억하고 있는지 궁금했는데, 클로저를 이용해서 기억할 수 있었다는 것을 알게 되었다. 또한 최상단에서 Hooks를 호출해야 한다는 규칙을 이해할 수 있었다. 그렇지 않으면 hooks의 index가 뒤로 밀리는 등, 에러 혹은 버그를 유발할 수 있다.

<br/>
<br/>

## 실행 방법
```
npm install
npm start
```

<br/>
<br/>

## 시연

count만 useEffect의 의존성 배열에 주입

<img src="https://user-images.githubusercontent.com/93233930/194539890-332a012f-1c37-4f24-9408-3443844c6d92.gif" />

<br/>
<br/>

## 블로그 글로 정리

<a href="https://velog.io/@metamong/Closure-on-React-Hooks" target="_blank" rel="noopener noreferrer">Closure on React Hooks</a>

<br/>
<br/>

## 전체 코드

`src/index.js`

```javascript
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
			<h1>Closure on React Hooks</h1>
			<div>
				<h3>State 1. count</h3>
				<p>Count: {count}</p>
				<button onClick={() => setCount(count + 1)}>Increase Count</button>
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
```
