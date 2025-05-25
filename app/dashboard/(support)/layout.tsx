import MessageList from "@/components/message-list";
import ChatList from "@/components/support/chatList";
import React from "react";

export default function layout({ children }: any) {
  return (
    <div className="grid grid-cols-6  gap-6">
      <div className="col-span-2  ">
        {/* <MessageList /> */}
        <ChatList />
      </div>

      <div className="col-span-4 ">{children}</div>
    </div>
  );
}
