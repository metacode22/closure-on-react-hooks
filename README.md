## Closure 개념을 활용한 React의 useState, useEffect 간단히 구현해보기

참고한 동영상 : https://www.youtube.com/watch?v=KJP1E-Y-xyo
<br/>

useState가 어떻게 상태를 계속 기억하고 있는지 궁금했는데, 클로저를 이용해서 기억할 수 있었다는 것을 알게 되었다. 또한 최상단에서 Hooks를 호출해야 한다는 규칙을 이해할 수 있었다. 그렇지 않으면 hooks의 index가 뒤로 밀리는 등, 에러 혹은 버그를 유발할 수 있다.