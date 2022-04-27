// @ts-ignore
import logo from '../logo.svg';
import './App.css';
import { useEffect, useMemo, useState } from 'react';
import { AssistantAppState, createSmartappDebugger } from '@sberdevices/assistant-client';

const init = () => {
  function getState(): AssistantAppState {
    console.log('State was get');
    return {};
  }

  const token =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNjk4NTAzMzgzMjViZmViZjg2ZGVjYjAzZDkzZjkwZDQ2ZmMxNmNmZGZiNTUyMDAzNGQxOTFkMWEwYTQ4NDQyNTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTY1MTE0MjYyMCwiaWF0IjoxNjUxMDU2MjEwLCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiYjVjYThjZmEtNmVjMS00OGM2LWEwZGYtMjUwNzgxMDM0Y2IwIiwic2lkIjoiN2RmOGYzZmMtNWQwMy00NTlhLTgwNTAtMWFlYTczODQyMTg1In0.mE7S-ypsO6pvSsRp0I1hnTw7K88tu87ez5mM9cwViR1w4QXyL0h-5qlDVNCbYktqa8Vb2VqezRfeFvm4Nn8YHFItf7g54689n5WhfaeG28S2qdi0MjqE2LQ39kZGiyMoGEoj1kDrqOF6x_DP-Xl3EVM8MXgmXGTZW0aAdOym2yP41SJY2S3vTrfGYkazw1TbQIYr_bOnvWbu0WOD_Hwv1DM8wsbHa-3vdrg7Pi-3uRptyMS_iRr34AM5qDXdYACKk4tJSEk3wN058kR1fDJvA395nEEsqmPO-Z2FhJxaMMOne34MsgTHtK3jgFABNxGI-UsBeT1oGjKMzcUGj7mYzdH8YbkWe1RMkywNBjIO8UvD4T1HeR-ZKufzz2qgtKRXLM67f11Yw450c6lHvthNEkB-4p9nXpXQki6qJ0wHVpiamF3g_560XSvculfTFm598iLTGRJYY6PkpawfKUavtrp_bBDNwRPMDUaeAYnQT8uJvfCS598_Fvw-VWSVXYtlhzXCsnXnkXrQrN23DvHBJi3WbL9_sNQlcNGhyjSTYD6Bo5-xfun_NS-JNLp0x7BtOhhudhkeS6bRz04j7J23BBMMCSP87Q7Et_2R3-UdvEH8oUPiOdrVnKHnQoXi4mfMMCN70Axt1PqswpcE6HmTyHNh9ZA3KmdP3rHKeSVYJFw';
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
  //   console.log('Used effect')
  //   setAssistant(init());
  // }, []);

  useMemo(() => {
    if (!!assistant) {
      return;
    }
    assistant.on('start', () => {
      console.log('SmartApp started');
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
      console.log('Data', event);
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
