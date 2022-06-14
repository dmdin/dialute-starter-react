// @ts-ignore
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
  const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNjk4NTAzMzgzMjViZmViZjg2ZGVjYjAzZDkzZjkwZDQ2ZmMxNmNmZGZiNTUyMDAzNGQxOTFkMWEwYTQ4NDQyNTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTY1NTMwMTQ2MywiaWF0IjoxNjU1MjE1MDUzLCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiOGExZmFhNGYtZDc5YS00OTYxLWJmNDYtZTkyNjcyNDI1ZmRkIiwic2lkIjoiMjViNzkzZmMtMGY4YS00NzAwLTkwNmEtNjI4ZGQxNjU2NGU5In0.Z87FEcdU9uZgvq5-i1boYxQ36UZa6U9ZFn8epn70jV2tNxzq0cGMhCPzM4NUijW6UBW5bwXrUHXz_DACgz2x46cDo5rBpKBMVAe7uMTgoGer5uYnADXlEW61lkXAKrsn54s0wa818d-xUHXC5V7wPsLRmtfpWurIlxCQxWLrVoThhaN_qohrGlaKQjwERsVlCpbLmxT2C1tWpYZbOzvKj2HQmLkoDq1VyvV2R_ZeGc5Qj9ca8HxakyV3E-oYNpIxLJp8693QwpP6mTMBJ4ChflkuH4tZpk-Xz_--lgVdFQgjzK6sjnz8Dd0PJUXLl7GhZDYuWDcrcBczuZG0NzpQLcjNKHTwep_kzs_ctZq8PX5b1xNLi4XuUyfItklZCoV2AtQrbRkN5u5JSH71HGxjBv0MNlmJLZsBd1oJlhoLlJ9Op2ZF334-7KZcwhjFRaouKBg-eAmCOXzRniSi50xSmss5KgcBdZaQYuiCWealTraW0dW--iC_D3-E0qTobPqgADNsxv_M4u7dCcAEMHrDWsU-ZFg9HjiE9NR69e3ozxInmK6QBWFqiNTVfE9JU35sxUvYRxOWPmgkuluFvJuX9qAX_OXDPRRxQUljYFG44_ZhBkUdyd01mE3RyQHso6cJ29RGlqkX25kTNYQ37H3ZOubmsBCdZcb-RW2vLLxTUEY";

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
      <p>Read <a href="https://dialute.vercel.app/">Dialute docs</a> for more details about the framework</p>
    </main>
  );
}

export default App;
