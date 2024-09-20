// src/botService.js
import { DirectLine } from "botframework-directlinejs";

const directLine = new DirectLine({
  token:
    "eyJhbGciOiJSUzI1NiIsImtpZCI6ImZqSG90RHFBNkI5TmJMYTNHYktpa1pHRUZvUSIsIng1dCI6ImZqSG90RHFBNkI5TmJMYTNHYktpa1pHRUZvUSIsInR5cCI6IkpXVCJ9.eyJib3QiOiI4NzI3MjQ2Zi1iYWVmLTNhNzUtN2Q3ZS1jN2Q0ZDM5M2I2OWUiLCJzaXRlIjoib2ktU3NlMV9RSDAiLCJjb252IjoiMkNtc2JjZWN0eWE5SGhnY051bnpmeS11cyIsInVzZXIiOiJhMDdhZDVjYi02Yjk5LTRhOWYtYjE4Mi05NmM5YjIzNDMxNTUiLCJuYmYiOjE3MjY3NjYyNjEsImV4cCI6MTcyNjc2OTg2MSwiaXNzIjoiaHR0cHM6Ly9kaXJlY3RsaW5lLmJvdGZyYW1ld29yay5jb20vIiwiYXVkIjoiaHR0cHM6Ly9kaXJlY3RsaW5lLmJvdGZyYW1ld29yay5jb20vIn0.Rh_rwYZDSzJ2sFHpYV7eoCRzTOnzW_IJDKbZVisBkmQCMVV1sR5ECLtmepa3cMgH-ASXLlAi23lLe478nKQmoNLW5NnhDwtnhAIN-94FcHySKIQRQ6YKb7_lzaOeb85aJ4uqb0ZHFGRXAvXv84ET4DplR_w0A4VEgNo0Obi0aMxNsHULLYV6AKBFTkHulYW1kfThNvvFW_JzHnX8BzQhCTF_Iod6_TdfA49PjWxzbykARCOv8BYcG1U-hcuYfjW-tdEZExxQQAqDu3b4qjsFer_uKlaQDCHulzxDBlXjKTNFYtRFsPngFKT5cxmQ-Xpzg16aovDiQcSV25uh5E3deg",
});

export const sendMessageToBot = (message) => {
  return new Promise((resolve, reject) => {
    directLine
      .postActivity({
        from: { id: "user1" },
        type: "message",
        text: message,
      })
      .subscribe(
        (id) => {
          console.log(`Posted activity, assigned ID ${id}`);
          resolve(id);
        },
        (error) => {
          console.log(`Error posting activity ${error}`);
          reject(error);
        }
      );
  });
};

export const receiveMessageFromBot = (callback) => {
  directLine.activity$.subscribe((activity) => {
    console.log(`Received activity: ${activity.type}`);
    if (activity.type === "message") {
      console.log(`Received message from bot: ${activity.text}`);
      callback(activity.text);
    } else {
      console.log(`Received activity of type ${activity.type}`);
    }
  });
};
