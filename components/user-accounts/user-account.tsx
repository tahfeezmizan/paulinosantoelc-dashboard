"use client";
import {
  useDeleteUserMutation,
  useGetUserByIdQuery,
} from "@/redux/api/userApi";
import { CompanyDataType } from "@/types/common";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import BusinessInfo from "./business-info";
import CompanyDetails from "./company-details";
import CompanyInformation from "./company-information";
import ContactAndOwnerInfo from "./contact-and-owner-info";

export default function UserAccount({ userId }: string) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { data } = useGetUserByIdQuery(userId);
  const companyData: CompanyDataType = data?.companyInfo || {};
  const route = useRouter();
  const pathName = usePathname();
  const basePath = pathName.split("/").slice(0, 3).join("/");
  
  // console.log(basePath);
  
  const [deleteUser] = useDeleteUserMutation();
  const handleDelete = async () => {
    // console.log("Delete User");
    setIsDeleting(true);

    try {
      const res = await deleteUser(userId).unwrap();

      // console.log(res);

      if (res.success) {
        // console.log("User deleted successfully");
        route.push(basePath);
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

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

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-[#00A9EA] capitalize">
              Delete {data?.role}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete buyer Account?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700"
              >
                {isDeleting ? "Deleting..." : "Yes"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <CompanyInformation
        companyData={companyData}
        user={
          data
            ? {
                isVerified: data.isVerified || false,
                firstName: data.firstName || "",
                lastName: data.lastName || "",
                email: data.email || "",
                phoneNumber: data.phoneNumber || "",
              }
            : {
                isVerified: false,
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
              }
        }
      />

      <BusinessInfo companyData={companyData} />
      <CompanyDetails companyData={companyData} />

      <ContactAndOwnerInfo
        companyData={companyData}
        user={
          data
            ? {
                firstName: data.firstName || "",
                lastName: data.lastName || "",
                email: data.email || "",
                phoneNumber: data.phoneNumber || "",
              }
            : {
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
              }
        }
      />
    </div>
  );
}
