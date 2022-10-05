/* eslint-disable */

const React = (function () {
  const hooks = [];
  let index = 0;

  function useState(initValue) {
      const state = hooks[index] || initValue;
      hooks[index] = state;
      const currentIndex = index;
      const setState = newValue => {
          hooks[currentIndex] = newValue;
      };
      index++;

      return [state, setState];
  }

  function useEffect(callback, deps) {
      const oldDeps = hooks[index];
      let hasChanged = true;
      if (oldDeps) {
          // JavaScript에서 NaN === NaN은 false로 찍힌다.
          // 이런 상황을 피할 수 있는 더 나은 방법으로는 Object.is를 사용하는 것.
          // Object.is(NaN, NaN)은 true로 찍힌다.
          // some은 하나라도 true이면 true를 반환한다.
          // 따라서 다음 코드는 하나라도 다르면 hasChanged는 true가 된다.
          // some은 빈 배열에서 호출하면 무조건 false를 반환한다. 
          // 따라서 deps가 빈 배열이면 hasChanged는 밑의 코드에서 false가 된다.
          hasChanged = deps.some((dep, idx) => !Object.is(dep, oldDeps[idx]));
      }
      if (hasChanged) callback();
      hooks[index] = deps;
      index++;
  }
  
  function render(Component) {
    index = 0;
    const C = Component();
    C.render();

    return C;
}

  return { useState, useEffect, render };
})();

function testComponent() {
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState('apple');
  React.useEffect(() => {
      console.log('frontend study');
  }, [count]);

  return {
      render: () => console.log({ count, text }),
      click: () => setCount(count + 1),
      type: word => setText(word),
  };
}

var App = React.render(testComponent);
App.click();
var App = React.render(testComponent);
App.click();
var App = React.render(testComponent);
App.type('pear');
var App = React.render(testComponent);
