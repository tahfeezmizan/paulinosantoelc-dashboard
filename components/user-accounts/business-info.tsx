"use client";

import { CompanyDataType } from "@/types/common";
import { CheckCircle } from "lucide-react";

export default function BusinessInfo({
  companyData,
}: {
  companyData?: CompanyDataType;
}) {
  if (!companyData) {
    return <p className="text-red-500">Company information not available.</p>;
  }

  const {
    businessCategory = "Construction & Real estate",
    businessType = [],
    subCategory = "",
    about = "",
    mainProducts = "",
  } = companyData;

  return (
    <div className="mt-10 ">
      <div className="border-b mb-6">
        <h2 className="text-2xl font-hanken font-semibold py-4">
          About Your Business
        </h2>
      </div>

      <div className="space-y-6">
        {/* Business Type */}
        <div className="flex flex-col sm:flex-row">
          <div className="w-96 text-start text-lg font-medium">
            Business Type<span className="text-red-500">*</span>
          </div>
          <div className="capitalize">
            {Array.isArray(businessType) && businessType.length > 0
              ? businessType.join(", ")
              : "N/A"}
          </div>
        </div>

        {/* Business Category */}
        <div className="flex flex-col md:flex-row items-start lg:items-center">
          <div className="w-96 text-start text-lg font-medium">
            Business Category<span className="text-red-500">*</span>
          </div>
          <div className="capitalize">
            {businessCategory || "Construction & Real estate"}
          </div>
        </div>

        {/* Sub-Category */}
        <div className="flex flex-col md:flex-row items-start lg:items-center">
          <div className="w-96 text-start text-lg font-medium">
            Sub-Category<span className="text-red-500">*</span>
          </div>
          <div className="capitalize">
            {subCategory || "Safety & security Equipments"}
          </div>
        </div>

        {/* About Company */}
        <div className="flex flex-col md:flex-row items-start lg:items-start">
          <div className="w-96 text-start text-lg font-medium">
            About Company<span className="text-red-500">*</span>
          </div>
          <div className="">
            <p className="text-sm text-gray-700 ">
              {about ||
                `At Back to Basics Swim, we believe that everyone deserves to feel
              safe and confident in the water. Located in Canada, we specialize
              in high-quality swimming lessons for all ages and skill levels.
              Our expert instructors focus on building strong fundamentals,
              water safety, and stroke techniques in a fun, supportive
              environment.`}
            </p>
          </div>
        </div>

        {/* Main Products */}
        <div className="flex flex-col md:flex-row items-start lg:items-center">
          <div className="w-96 text-start text-lg font-medium">
            Main Products<span className="text-red-500">*</span>
          </div>
          <div>{mainProducts || "Metal Plate Fiber Laser Cutting"}</div>
        </div>

        {/* After-Sales Service & Support */}
        <div className="flex flex-col md:flex-row items-start lg:items-center">
          <div className="w-96 text-start text-lg font-medium">
            After-Sales Service & Support<span className="text-red-500">*</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-cyan-500 mr-2" />
            <span>Yes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
