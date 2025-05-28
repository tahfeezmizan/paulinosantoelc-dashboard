"use client";

import { useSocket } from "@/contenxt/SocketContext";
import { useEffect, useState } from "react";

export const useChat = () => {
  const { socket } = useSocket();
  const [messages, setMessages] = useState<any[]>([]);
  const [typingStatus, setTypingStatus] = useState<{
    userId: string;
    isTyping: boolean;
  } | null>(null);
  const [chatMembers, setChatMembers] = useState<any[]>([]);

  // Initialize all socket listeners
  useEffect(() => {
    if (!socket) return;

    // Message received
    socket.on("receiveMessage", (message: any) => {
      setMessages((prev) => [...prev, message]);
    });

    // Message history when joining
    socket.on("messageHistory", (history: any[]) => {
      setMessages(history);
    });

    // Typing indicator
    socket.on("typing", (data: { userId: string; isTyping: boolean }) => {
      setTypingStatus(data);
    });

    // Message read receipt
    socket.on("messageRead", ({ messageId }: { messageId: string }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, isRead: true } : msg
        )
      );
    });

    // Chat members list
    socket.on("chatMembers", (members: any[]) => {
      setChatMembers(members);
      // console.log("useChat: chatMembers", members);
    });

    // Error handling
    socket.on("chatError", (error: any) => {
      console.error("Chat error:", error);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("messageHistory");
      socket.off("typing");
      socket.off("messageRead");
      socket.off("chatMembers");
      socket.off("chatError");
    };
  }, [socket]);

  // Helper functions
  const joinChat = (joinUserId: string) => {
    socket?.emit("joinChat", { joinUserId });
  };

  const sendMessage = (
    receiverId: string,
    content: string,
    callback: (response: any) => void
  ) => {
    socket?.emit("sendMessage", { receiverId, content }, callback);
  };

  const setTyping = (chatroomId: string, isTyping: boolean) => {
    socket?.emit("typing", { chatroomId, isTyping });
  };

  const markAsRead = (messageId: string, chatroomId: string) => {
    socket?.emit("markAsRead", { messageId, chatroomId });
  };

  const getAllChatMembers = () => {
    socket?.emit("getAllChatMembers", {});
  };

  return {
    messages,
    typingStatus,
    chatMembers,
    joinChat,
    sendMessage,
    setTyping,
    markAsRead,
    getAllChatMembers,
  };
};
