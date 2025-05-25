"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetAllUserQuery,
  useUpdateVerifyStatusMutation,
} from "@/redux/api/userApi";
import { User } from "@/types/common";
import { Check, FileText, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export function VerificationList() {
  const { data } = useGetAllUserQuery(null);
  const requestedUser = data?.data?.users;
  const [updateVerifyStatus] = useUpdateVerifyStatusMutation();

  const reqUser = requestedUser?.filter(
    (user: User) => user?.verifiedAccount === "REQUESTED"
  );

  const pathName = usePathname();

  // console.log("Vefify",data?.data?.users);

  const handleAcceptRequest = async (userId: string) => {
    console.log("Accepted", userId);

    try {
      const res = await updateVerifyStatus({
        id: userId,
        verifyStatus: "ACCEPTED",
      }).unwrap();

      console.log("Accepted", res);

      if (res.success === true) {
        toast.success("User verified successfully");
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleRejectRequest = (userId: string) => {
    console.log("Rejected", userId);

    try {
      const res = updateVerifyStatus({
        id: userId,
        verifyStatus: "REJECTED",
      }).unwrap();
      if (res.success === true) {
        toast.success("User rejected successfully");
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Verification Request</CardTitle>
        {pathName === "/dashboard/verification" ? (
          ""
        ) : (
          <Button variant="outline" size="sm">
            <Link href="/dashboard/verification">View All</Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SI.</TableHead>
                <TableHead>Buyer List</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead>B. Type</TableHead>
                <TableHead>Trade License</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(reqUser) &&
                reqUser.map((user: User, index: number) => (
                  <TableRow key={user?.id || index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {`${user?.firstName || ""} ${
                        user?.lastName || ""
                      }`.trim() || "N/A"}
                    </TableCell>
                    <TableCell>
                      {user?.companyInfo?.countryName || "N/A"}
                    </TableCell>
                    <TableCell>
                      {user?.companyInfo?.companyName || "N/A"}
                    </TableCell>
                    <TableCell>{user?.role || "N/A"}</TableCell>
                    <TableCell>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-blue-500 p-0"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        Image
                      </Button>
                    </TableCell>
                    <TableCell>
                      {user?.companyInfo?.mainProducts || "N/A"}
                    </TableCell>
                    <TableCell className="flex gap-3 items-center ">
                      <button
                        onClick={() => handleRejectRequest(user?.id)}
                        className="bg-red-500 p-1 text-white rounded-full"
                      >
                        <X className="h-4 w-4 " />
                      </button>
                      <button
                        onClick={() => handleAcceptRequest(user?.id)}
                        className="bg-green-500 p-1 text-white rounded-full"
                      >
                        <Check className="h-4 w-4 " />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
