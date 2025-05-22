"use client";
import { useGetUserByIdQuery } from "@/redux/api/userApi";
import { CompanyDataType } from "@/types/common";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

export default function UserAccount({ userId }: string) {
  console.log("From User Account", userId);

  const { data, isLoading } = useGetUserByIdQuery(userId);
  const companyData: CompanyDataType = data?.companyInfo || {};

  console.log(data);

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-6">
          <Image
            src={companyData?.logo || "/placeholder.svg"}
            alt="company logo"
            width={100}
            height={100}
            className="rounded-full"
          />

          <div className="">
            <h3 className="text-2xl md:text-4xl font-semibold font-hanken mb-2">
              {companyData?.companyName}
            </h3>
            <p className="flex items-center gap-6">
              <span className="text-gray-600 text-lg">
                {data?.firstName + "  " + data?.lastName}
              </span>
              <span className="text-[#00A9EA]">Verified</span>
            </p>
          </div>
        </div>
        <Button className="bg-[#00A9EA] capitalize">Delete {data?.role}</Button>
      </div>

      
    </div>
  );
}
