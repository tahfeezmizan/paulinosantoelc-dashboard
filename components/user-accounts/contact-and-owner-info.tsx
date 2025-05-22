"use client";

import { CompanyDataType } from "@/types/common";

export default function ContactAndOwnerInfo({
  companyData,
  user,
}: {
  companyData?: CompanyDataType;
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
  };
}) {
  if (!companyData) {
    return <p className="text-red-500">Company information not available.</p>;
  }

  const { ownerName = "", ownerEmail = "", ownerPhone = "" } = companyData;

  return (
    <div className="mt-10">
      {/* Contact Person this components load Company CEO Info data */}
      <div className="space-y-4">
        <div className="border-b mb-6">
          <h2 className="text-2xl font-hanken font-semibold py-4">
            Contact Person
          </h2>
        </div>

        <div className="space-y-2">
          <div className="flex flex-col md:flex-row items-start lg:items-center">
            <span className="w-80 text-start text-lg font-medium">
              Full Name*
            </span>
            <span className="text-base">
              {user?.firstName || "Not provided"}{" "}
              {user?.lastName ? " " + user?.lastName : ""}
            </span>
          </div>
          <div className="flex flex-col md:flex-row items-start lg:items-center">
            <span className="w-80 text-start text-lg font-medium">E-mail*</span>
            <span className="text-base">{user?.email || "Not provided"}</span>
          </div>
          <div className="flex flex-col md:flex-row items-start lg:items-center">
            <span className="w-80 text-start text-lg font-medium">
              Phone Number*
            </span>
            <span className="text-base">
              {user?.phoneNumber || "Not provided"}
            </span>
          </div>
        </div>
      </div>

      {/* Company Owner Info */}
      <div className="space-y-4 mt-10">
        <div className="border-b mb-6">
          <h2 className="text-2xl font-hanken font-semibold py-4">
            Company Owner Info
          </h2>
        </div>

        <div className="space-y-2">
          <div className="flex flex-col md:flex-row items-start lg:items-center">
            <span className="w-80 text-start text-lg font-medium">
              Full Name*
            </span>
            <span className="text-base">{ownerName || "Not provided"}</span>
          </div>
          <div className="flex flex-col md:flex-row items-start lg:items-center">
            <span className="w-80 text-start text-lg font-medium">E-mail*</span>
            <span className="text-base">{ownerEmail || "Not provided"}</span>
          </div>
          <div className="flex flex-col md:flex-row items-start lg:items-center">
            <span className="w-80 text-start text-lg font-medium">
              Phone Number*
            </span>
            <span className="text-base">{ownerPhone || "Not provided"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
