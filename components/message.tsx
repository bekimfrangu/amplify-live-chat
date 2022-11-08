import React from "react";
import styles from "../styles/Message.module.css";

export default function Message({ test, isMe }:any) {  
  return (
    <div
      className={
        isMe ? styles.sentMessageContainer : styles.receivedMessageContainer
      }
    >
      {
        test?.body[0].messages.length > 1 ?
        test?.body[0].messages
        .sort((a:any, b:any) => {return a.time.localeCompare(b.time)})
        .map((doc:any) => (
          <>
          <p className={styles.senderText}>{test?.owner}</p>
          <div className={isMe ? styles.sentMessage : styles.receivedMessage}>
           <p>{doc?.message}</p>
          </div>
          </>
        )) : (   
        <>
        <p className={styles.senderText}>{test?.owner}</p>
        <div className={isMe ? styles.sentMessage : styles.receivedMessage}>
         <p>{test?.body[0].messages[0].message}</p>
        </div>
        </>
        )
      }
   
    </div>
  );
}