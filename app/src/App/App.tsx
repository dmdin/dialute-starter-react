import * as styles from "./App.module.css";
import { useEffect, useMemo, useState } from "react";
import { AssistantAppState, createSmartappDebugger, AssistantClient } from "@sberdevices/assistant-client";
import { logger } from "../utils";

// const logger = console;

const init = () => {
  function getState(): AssistantAppState {
    return {};
  }

  // Set token for assistant-client from https://developers.sber.ru/studio/settings/emulator
  const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNjk4NTAzMzgzMjViZmViZjg2ZGVjYjAzZDkzZjkwZDQ2ZmMxNmNmZGZiNTUyMDAzNGQxOTFkMWEwYTQ4NDQyNTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTY1MjA5MTUyMywiaWF0IjoxNjUyMDA1MTEzLCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiNmM3ZmQ3NWQtMmQ5YS00MTBiLTlkNDQtZjc4YTVmMGE5ODFhIiwic2lkIjoiMTIyZmNkOTMtOGIzNS00ZWY3LWIwNWEtY2MzZWIxZDJiZTBiIn0.Y9AMQ0-9QFYeDpBJxZT4tk_lBVEfkSfHF6RXMLX6GNOkGQ1H7P1Wf7HmyjEeq5cB7AxmjzUR_FXXVvgu7Xgipa6wYE7O5W2bpxDIAYdgbMmjc8XySn5KpLLcsffBEfFCAqIvjfFE96kJp2LKW48maRutqUrONyQVSF6ULwD-_-pX5s14dCRanfME7DeREU2etH_6LE35H957dYAE8d0sJtWFG3P-f5KLcIKFojV8rorgbf6bOBGU_KfK0OxWgNEImF_2AuouEBf_wVhkaia9rD8Qw0l1OSuV74OwUn9G1i42NOABl_DZ_hQS5DTVhzlVPdojJcLvV08Z6eAFOQpSHVq0bEp1U97_FwczVJyi8q-_YdxlcF1R7ktbNs3XfFoW3vvQ0RkNsi-knx2rZc-fKR-FcJQhPb-AUZRIuctK6AADTf7dO4LocmN9vYAnCq9Mgtj54w9m2uBEWZBwVRcbLZhxmMR74MJDDuFkreVsg3Y3eSN20ePMMQrs-URTBIlRY2GFeNm0s_Hn_ZiQFigY3tyYv-AQZqHxgnCzz6netGoacbEBmj4Mmqa-c8AP18DbKsrsnfMGXJZzZ_zgvljr6DVbN3y3RKGPyhCaMfnnI7ycguHFOIW-ptLdsyr5P0DEAJVhKlVcsHG7qChJMMJlkDkjXEWgqbpoWlcZuPt2zZA";

  // Set the name of your SmartApp for activation
  const initPhrase = "запусти темлейт";

  logger.log("Called init function");
  // Use it for debugging in browser
  return createSmartappDebugger({
    token,
    initPhrase,
    getState
  });
  // TODO: Use to run it in production mode inside Salute App
  // return createAssistant({getState});
};

function App() {
  const [assistant, setAssistant] = useState();
  const [character, setCharacter] = useState("eva");
  const [state, setState] = useState({ count: 0 });

  useEffect(() => {
    const assistant = init();
    logger.log("Initialized assistant");

    assistant.on("start", () => {
      logger.log("SmartApp started");
    });
    assistant.on("data", (event) => {
      // Set your action or data hooks
      if (!event.type) {
        // Use invariants to prevent errors on Sber Portal
        return;
      }
      // FIXME Add event handler for closing the app and use "assistant.close()" inside it;
      if (event.type === "character") {
        setCharacter(event.character.id);
      }
      if (event.type === "smart_app_data") {
        setState(event.smart_app_data as any);
      }

      logger.log("data event:", event);
    });
    setAssistant(assistant);

  }, []);

  function handleClick() {
    assistant.sendData({
      action: {
        action_id: "click",
        data: {}
      }
    });
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>Hello from Dialute!</h1>
      <h2 className={styles.h2}> Count: {state.count} </h2>
      <button className={styles.button} onClick={handleClick}>Click Me!</button>
      <p className={styles.p}>
        Visit the <a href="https://developer.sberdevices.ru/">Sberdevices Docs</a>
        to learn how to build CanvasApps for Sber Salute.
      </p>
      <p className={styles.p}>Dialute docs comming soon...</p>
    </main>
  );
}

export default App;
