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
import { useGetAllUserQuery } from "@/redux/api/userApi";
import { User } from "@/types/common";
import { FileText  } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function VerificationList() {
  const { data } = useGetAllUserQuery(null);
  const requestedUser = data?.data?.users;

  const reqUser = requestedUser?.filter(
    (user: User) => user?.verifiedAccount === "REQUESTED"
  );
  console.log("Verification", data?.data?.users);

  console.log("Verification", reqUser);

  const pathName = usePathname();

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
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1.5 7C1.22386 7 1 7.22386 1 7.5C1 7.77614 1.22386 8 1.5 8H13.5C13.7761 8 14 7.77614 14 7.5C14 7.22386 13.7761 7 13.5 7H1.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </Button>
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
