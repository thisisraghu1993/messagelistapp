import React from "react";
import MessageCard from "./MessageCard";

const MessageList = (props) => {
  let { messages, ...otherProps } = props;
  return messages.map((message, idx) => {
    return (
      <MessageCard
        key={message.id}
        message={message}
        messageIdx={idx}
        {...otherProps}
      />
    );
  });
};

export default MessageList;
