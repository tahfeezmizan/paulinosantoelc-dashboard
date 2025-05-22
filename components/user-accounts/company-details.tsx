"use client";

import { CompanyDataType } from "@/types/common";

export default function CompanyDetails({
  companyData,
}: {
  companyData?: CompanyDataType;
}) {
  if (!companyData) {
    return <p className="text-red-500">Company information not available.</p>;
  }
  const {
    companyAddress = "",
    zipCode = "",
    district = "",
    companyName = "",
  } = companyData;

  return (
    <div className="mt-6 space-y-6 font-roboto">
      <div className="border-b mb-6">
        <h2 className="text-2xl font-hanken font-semibold py-4">
          {companyName || "Not provided"}
        </h2>
      </div>

      {/* Company Address */}
      <div className="flex flex-col md:flex-row items-start lg:items-center">
        <span className="w-80 text-lg font-medium">Company Address*</span>
        <span className="text-base">{companyAddress || "Not provided"}</span>
      </div>

      {/* Zip and District */}
      <div className="flex flex-col md:flex-row items-start lg:items-center">
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2">
          <span className="w-80 text-lg font-medium">Zip / Postal Code *</span>
          <span className="text-base">{zipCode || "Not provided"}</span>
        </div>

        <div className="flex flex-col md:flex-row items-center w-full md:w-1/2">
          <span className="w-32 text-lg font-medium">District*</span>
          <span className="text-base">{district || "Not provided"}</span>
        </div>
      </div>
    </div>
  );
}
