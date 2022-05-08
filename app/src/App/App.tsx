import './App.css';
import { useMemo, useState } from 'react';
import { AssistantAppState, createSmartappDebugger } from '@sberdevices/assistant-client';
// @ts-ignore
import logo from '../logo.svg';
import { logger } from '../utils';

const init = () => {
  function getState(): AssistantAppState {
    logger.log('State was get');
    return {};
  }

  const token =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNjk4NTAzMzgzMjViZmViZjg2ZGVjYjAzZDkzZjkwZDQ2ZmMxNmNmZGZiNTUyMDAzNGQxOTFkMWEwYTQ4NDQyNTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTY1MjA5MTUyMywiaWF0IjoxNjUyMDA1MTEzLCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiNmM3ZmQ3NWQtMmQ5YS00MTBiLTlkNDQtZjc4YTVmMGE5ODFhIiwic2lkIjoiMTIyZmNkOTMtOGIzNS00ZWY3LWIwNWEtY2MzZWIxZDJiZTBiIn0.Y9AMQ0-9QFYeDpBJxZT4tk_lBVEfkSfHF6RXMLX6GNOkGQ1H7P1Wf7HmyjEeq5cB7AxmjzUR_FXXVvgu7Xgipa6wYE7O5W2bpxDIAYdgbMmjc8XySn5KpLLcsffBEfFCAqIvjfFE96kJp2LKW48maRutqUrONyQVSF6ULwD-_-pX5s14dCRanfME7DeREU2etH_6LE35H957dYAE8d0sJtWFG3P-f5KLcIKFojV8rorgbf6bOBGU_KfK0OxWgNEImF_2AuouEBf_wVhkaia9rD8Qw0l1OSuV74OwUn9G1i42NOABl_DZ_hQS5DTVhzlVPdojJcLvV08Z6eAFOQpSHVq0bEp1U97_FwczVJyi8q-_YdxlcF1R7ktbNs3XfFoW3vvQ0RkNsi-knx2rZc-fKR-FcJQhPb-AUZRIuctK6AADTf7dO4LocmN9vYAnCq9Mgtj54w9m2uBEWZBwVRcbLZhxmMR74MJDDuFkreVsg3Y3eSN20ePMMQrs-URTBIlRY2GFeNm0s_Hn_ZiQFigY3tyYv-AQZqHxgnCzz6netGoacbEBmj4Mmqa-c8AP18DbKsrsnfMGXJZzZ_zgvljr6DVbN3y3RKGPyhCaMfnnI7ycguHFOIW-ptLdsyr5P0DEAJVhKlVcsHG7qChJMMJlkDkjXEWgqbpoWlcZuPt2zZA';
  const initPhrase = 'запусти темлейт';

  // Use it for debugging in browser
  return createSmartappDebugger({
    token,
    initPhrase,
    getState,
  });
  // TODO: Use to run it in production mode inside Salute App
  // return createAssistant({getState});
};

function App() {
  const [assistant, setAssistant] = useState(init());
  const [character, setCharacter] = useState('eva');

  // useEffect(() => {
  //   logger.log('Used effect')
  //   setAssistant(init());
  // }, []);

  useMemo(() => {
    if (assistant) {
      return;
    }
    assistant.on('start', () => {
      logger.log('SmartApp started');
    });
    assistant.on('data', (event) => {
      // Set your action or data hooks
      if (!event.type) {
        // Use invariants to prevent errors on Sber Portal
        return;
      }
      // FIXME Add event handler for closing the app and use "assistant.close()" inside it;
      if (event.type === 'character') {
        setCharacter(event.character.id);
      }
      logger.log('Data', event);
    });
  }, [assistant]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
