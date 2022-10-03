import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';


// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById("root")
// );




const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
      <Provider store={store}>
    <App />
    </Provider>
);