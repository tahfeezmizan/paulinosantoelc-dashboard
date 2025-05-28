/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
// import { socket } from "@/config/socket";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Define TypeScript interfaces for better type safety
interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  lastMessage: string;
  updatedAt: Date;
  unread: boolean;
}

interface MessageListProps {
  initialActiveContact?: number | null;
}

const userImage = "/placeholder.svg";
const currentUserId = "67d302f65093cbc7d6113ba1";

// Sample contacts data
const contacts: Contact[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    role: "Friend",
    lastMessage: "Hey, how are you?",
    updatedAt: new Date(),
    unread: true,
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    role: "Colleague",
    lastMessage: "Meeting at 3pm",
    updatedAt: new Date(Date.now() - 86400000),
    unread: false,
  },
];

export default function MessageList({
  initialActiveContact = null,
}: MessageListProps) {
  // Get user from Redux store

  // State management
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [activeContact, setActiveContact] = useState<number | null>(
    initialActiveContact
  );
  const [showChat, setShowChat] = useState(false);

  // console.log(messages);

  // Handle socket connection and message receiving
  // useEffect(() => {
  //   // Get contact ID from URL if present
  //   const pathParts = window.location.pathname.split("/");
  //   const contactIdFromUrl = pathParts[pathParts.length - 1];
  //   if (contactIdFromUrl && !isNaN(parseInt(contactIdFromUrl))) {
  //     handleContactClick(parseInt(contactIdFromUrl));
  //   }

  // Socket connection handling
  // if (socket.connected) {
  //   connectToChat();
  // }

  // function connectToChat() {
  //   // Join chat room
  //   const joinData = {
  //     userId: user?.id,
  //     otherUserId: activeContact?.toString(),
  //   };
  //   socket.emit("joinChat", joinData);

  //   // Listen for incoming messages
  //   socket.on("receiveMessage", (data) => {
  //     console.log("New message received:", data);
  //     setMessages((prev) => [...prev, data]);
  //   });
  // }

  // Socket event listeners
  // socket.on("connect", connectToChat);
  // socket.on("disconnect", () => {
  //   console.log("Disconnected from chat");
  // });

  // Cleanup function
  //   return () => {
  //     socket.off("connect", connectToChat);
  //     socket.off("disconnect");
  //     socket.off("receiveMessage");
  //   };
  // }, [user?.id, activeContact]);

  // Handle clicking on a contact
  const handleContactClick = (contactId: number) => {
    setActiveContact(contactId);
    setShowChat(true);
    setMessages([]); // Clear previous messages

    // Join new chat room
    // socket.emit("joinChat", {
    //   userId: currentUserId,
    //   otherUserId: contactId.toString(),
    // });

    // Load previous messages
    // socket.emit("loadMessage", {
    //   senderId: currentUserId,
    //   receiverId: contactId.toString(),
    // });
  };

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeContact) return;

    const messageData = {
      senderId: currentUserId,
      receiverId: activeContact.toString(),
      message: newMessage.trim(),
    };

    // Send message through socket
    // socket.emit("sendMessage", messageData);

    // Update local messages
    setMessages((prev) => [...prev, messageData]);
    setNewMessage(""); // Clear input
  };

  console.log(handleSendMessage());

  return (
    <div
      className={`${
        showChat ? "hidden" : "flex"
      } md:flex md:w-full flex-col bg-white w-full rounded-2xl h-full`}
    >
      <div className="p-4">
        <h1 className="text-xl font-bold">Messages</h1>
      </div>

      <div className="overflow-y-auto">
        {contacts.map((contact) => (
          <Link href={`/dashboard/support/${contact.id}`} key={contact.id}>
            <div
              className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${
                activeContact === contact.id ? "bg-gray-50" : ""
              }`}
              onClick={() => handleContactClick(contact.id)}
            >
              <div className="relative">
                <Image
                  src={userImage}
                  alt={`${contact.firstName} ${contact.lastName}`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                {contact.unread && (
                  <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full" />
                )}
              </div>
              <div className="ml-3">
                <p className="font-medium">
                  {contact.firstName} {contact.lastName}
                </p>
                <p className="text-sm text-gray-600">{contact.lastMessage}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
