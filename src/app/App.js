// @ts-ignore
import logo from '../logo.svg';
import './App.css';
import {useEffect, useMemo, useState} from "react";
import {createSmartappDebugger} from '@sberdevices/assistant-client'
import {logger} from "../utils/logger";

const token = '';
const initPhrase = '';

const init = () => {
  function getState() {
    logger.log('State was get');
    return {};
  }

  // Use it for debugging in browser
  return createSmartappDebugger({
    token,
    initPhrase,
    getState,
    settings: {debugging: false}
  })
  // TODO: Use to run it in production mode inside Salute App
  // return createAssistant({getState});
}

function App() {
  const [assistant, setAssistant] = useState({})
  const [character, setCharacter] = useState('eva')

  useEffect(() => {
    setAssistant(init());
  }, []);


  useMemo(() => {
    if (!!assistant) {
      return;
    }
    assistant.on('start', () => {
      logger.log('SmartApp started',);
    });
    assistant.on('data', (event) => {  // Set your action or data hooks
      if (!event.type) {  // Use invariants to prevent errors on Sber Portal
        return;
      }
      // FIXME Add event handler for closing the app and use "assistant.close()" inside it;
      if (event.type === 'character') {
        setCharacter(event.character.id);
      }
      logger.log('Data', event);
    });
  }, [assistant])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
