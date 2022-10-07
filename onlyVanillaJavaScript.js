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
          hasChanged = deps.some((dep, idx) => !Object.is(dep, oldDeps[idx]));
      }
      if (hasChanged) callback();
      hooks[index] = deps;
      index++;
  }
  
  function render(Component) {
    const C = Component();
    index = 0;
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