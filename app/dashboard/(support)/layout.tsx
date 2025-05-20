import MessageList from "@/components/message-list";
import React from "react";

export default function layout({ children }: any) {
  return (
    <div className="grid grid-cols-6  min-h-screen gap-6">
      <div className="col-span-2 h-screen ">
        <MessageList />
      </div>

      <div className="col-span-4 h-screen">{children}</div>
    </div>
  );
}
