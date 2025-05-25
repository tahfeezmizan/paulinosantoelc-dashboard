"use client";

import userImage from "@/public/chat-person.png";
import { socket } from "@/config/socket";
import { useChat } from "@/hooks/use-chat";
import { useGetAllUserQuery } from "@/redux/api/userApi";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export default function ChatList() {
  const { data } = useGetAllUserQuery({});
  const users = data?.data?.users;

  console.log(data?.data?.users);

  const { joinChat } = useChat();

  const handleJoinChat = (userId: string) => {
    joinChat(userId);
    socket?.emit("joinChat", { joinUserId: userId });
    console.log("JJoin chat", userId);
  };

  return (
    <div className="bg-white p-6 rounded-2xl">
      <h2 className="mb-4 text-3xl">All Users</h2>

      <div className="space-y-2 overflow-y-auto">
        {users?.map((user: any) => (
          <div
            onClick={() => handleJoinChat(user?.id)}
            key={user.id}
            className="overflow-y-auto"
          >
            <Link key={user.id} href={`/dashboard/support/${user.id}`}>
              <div className=" flex items-center gap-3 p-2 justify-between hover:bg-slate-200 duration-200 ease-in-out overflow-y-auto">
                <div className="flex items-center gap-4 ">
                  <Image
                    src={users?.companyInfo?.logo || userImage}
                    alt={`${user?.logo} logo`}
                    className="object-cover w-12 h-12 rounded-md transition duration-300 ease-in-out hover:scale-105"
                    width={50}
                    height={50}
                    priority
                  />
                  <div className="space-y-1">
                    <h1 className="text-base font-medium">
                      {user?.firstName} {user?.lastName} -{" "}
                    </h1>
                    <p className="text-sm text-gray-500">New Message</p>
                  </div>
                </div>

                <div className=" flex items-end gap-2 flex-col">
                  <p className="text-[#8B8D97] text-base">12:30 PM</p>
                  <button className="">
                    <Star className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
