import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Router} from "./Components/Router";
import {Provider} from "react-redux";
import store from "./store/store";

import styled from "styled-components";

const Scrollbar = styled.div`
  display: none;
  root::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  root::-webkit-scrollbar-track {
    background: transparent;
  }

  root::-webkit-scrollbar-thumb {
    background: #888;
  }

  root::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router/>
    </Provider>
  </React.StrictMode>
);