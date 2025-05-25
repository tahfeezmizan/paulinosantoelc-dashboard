"use client";

import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_SOCKET_URL;

export const socket = io(SOCKET_URL as string, {
  auth: { token: localStorage.getItem("accessToken") },
});
