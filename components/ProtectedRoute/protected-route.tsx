"use client";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

export default function ProtectedRoute({ children }: any) {
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      redirect("/login");
    }
  }, []);

  return (
    <div>
      {children}
    </div>
  );
}
