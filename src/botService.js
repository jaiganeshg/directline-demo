// src/botService.js
import { DirectLine } from "botframework-directlinejs";

const directLine = new DirectLine({
  token: "oi-Sse1_QH0.W_gEtYm1ZfG78DO9ImiOZJAE3hjVvEkzwaTkRXML6wM",
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
