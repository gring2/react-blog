import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
//import registerServiceWorker from './registerServiceWorker';
import routes from './routes';
import { matchPath } from 'react-router';
import 'styles/base.scss';


const render = async () => {
  if(process.env.NODE_ENV === 'development') {
    // 개발 모드에서는 바로 렌더링을 합니다
    return ReactDOM.render(<Root />, document.getElementById('root'));
  }

  // 프로덕션 모드에서는 일치하는 라우트를 찾아 미리 불러온 다음 렌더링을 합니다
  const getComponents = [];
  const { pathname } = window.location;

  routes.forEach(
    route => {
      // 일치하는 라우트를 찾고, getComponent를 호출하여 getComponents에 넣습니다.
      const match = matchPath(pathname, route);
      if(!match) return;
      const { getComponent } = route.component;
      if(!getComponent) return;
      getComponents.push(getComponent());
    }
  );
  // getComponents가 끝날 때까지 기다립니다
  await Promise.all(getComponents)
  
  return ReactDOM.hydrate(<Root />, document.getElementById('root'))
// render가 아닌 hydrate를 사용합니다(설명 참조).
}

render(); // render 호출

// registerServiceWorker();
// import React from 'react';
// import ReactDOM from 'react-dom';
// import Root from './Root';
// //import * as serviceWorker from './serviceWorker';
// import 'styles/base.scss'
// import routes from './routes'
// import { matchPath } from 'react-router'

// const render = async () => {
//   if(process.env.NODE_ENV === 'development') {
//     return ReactDOM.render(<Root />, document.getElementById('root'));

//   }

//   const getComponents = []
//   const { pathname } = window.location

//   routes.forEach(
//     route => {
//       const match = matchPath(pathname, route)
//       if(!match) return
//       const { getComponent } = route.component
//       if(!getComponent) return
//       console.log('component : ', route)
//       getComponents.push(getComponent())
//     }
//   )
//     console.dir(getComponents)
//   await Promise.all(getComponents)

//   return ReactDOM.hydrate(<Root />, document.getElementById('root'))
// }
// render()
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// // serviceWorker.unregister();

// // ReactDOM.render(<Root />, document.getElementById('root'))
