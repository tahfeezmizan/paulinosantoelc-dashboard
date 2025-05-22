"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { CompanyDataType } from "@/types/common";
import { BadgeCheck, Pencil, X } from "lucide-react";

export default function CompanyInformation({
  companyData,
  user,
}: {
  companyData?: CompanyDataType;
  user: {
    isVerified: boolean;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
  };
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!companyData) {
    return <p className="text-red-500">Company information not available.</p>;
  }

  const {
    businessIdentification = "Not provided",
    companyEstablish = "Not provided",
    companyName = "Not provided",
    companyWebsite = "Not provided",
    countryName = "Not provided",
    numberOfEmployees = "Not provided",
    tradeLicense = "",
  } = companyData;

  const { isVerified } = user;

  return (
    <>
      <div>
        <div className=" border-b py-4">
          <h2 className="text-2xl font-hanken font-semibold ">
            Company Information
          </h2>
        </div>

        <div className="mt-6 space-y-2 font-roboto">
          <div className="flex flex-col md:flex-row items-start lg:items-center">
            <span className="w-96 text-start text-lg font-medium">
              Company Name*
            </span>
            <span className="text-base">{companyName || "No Company"}</span>
          </div>
          <div className="flex flex-col md:flex-row items-start lg:items-center">
            <span className="w-96 text-start text-lg font-medium">
              Country Name*
            </span>
            <span className="text-base">{countryName || "Bangladesh"}</span>
          </div>
          <div className="flex flex-col md:flex-row items-start lg:items-center">
            <span className="w-96 text-start text-lg font-medium">
              Company Establish*
            </span>
            <span className="text-base">
              {companyEstablish || "20-10-2004"}
            </span>
          </div>
          <div className="flex flex-col md:flex-row items-start lg:items-center">
            <span className="w-96 text-start text-lg font-medium">
              Number of Employees*
            </span>
            <span className="text-base">{numberOfEmployees || "100"}</span>
          </div>
          <div className="flex flex-col md:flex-row items-start lg:items-center">
            <span className="w-96 text-start text-lg font-medium">
              Company Website (URL)*
            </span>
            <span className="text-base">
              {companyWebsite || "www.google.com"}
            </span>
          </div>
          <div className="flex flex-col md:flex-row items-start lg:items-center">
            <span className="w-96 text-start text-lg font-medium">
              Business Identification Number*
            </span>
            <span className="text-base">
              {businessIdentification || "4587656"}
            </span>
          </div>
          <div className="flex flex-col md:flex-row items-start lg:items-center">
            <span className="w-96 text-start text-lg font-medium">
              Trade license*
            </span>
            {tradeLicense ? (
              <Image
                src={tradeLicense}
                alt="Trade License"
                width={100}
                height={100}
                onClick={() => setIsModalOpen(true)}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
            ) : (
              <span className="text-base">Not provided</span>
            )}
          </div>
        </div>
      </div>

      {/* Full Screen Modal */}
      {isModalOpen && tradeLicense && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 z-60 text-white bg-red-500 rounded-full p-2 hover:bg-red-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <Image
              src={tradeLicense}
              alt="Trade License (Full Screen)"
              width={1000}
              height={1000}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
