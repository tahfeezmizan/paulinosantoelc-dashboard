"use client";

import { useDeleteUserMutation } from "@/redux/api/userApi";
import { User } from "@/types/common";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { FileText } from "lucide-react";
import Link from "next/link";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { TableCell, TableRow } from "../ui/table";

export default function BuyerTable({
  buyer,
  index,
  refetch,
}: {
  buyer: User;
  index: number;
  refetch: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteUser(buyer.id).unwrap();
      if (res.success) {
        console.log("User deleted successfully");
        // router.push(basePath);
        await refetch();
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
      setOpen(false);
    }
  };

  return (
    <>
      <TableRow key={buyer?.id}>
        <TableCell className="text-[#475569]">{index + 1}.</TableCell>
        <TableCell>{buyer?.firstName + " " + buyer?.lastName}</TableCell>
        <TableCell>{buyer?.companyInfo?.countryName}</TableCell>
        <TableCell>{buyer?.companyInfo?.companyName}</TableCell>
        <TableCell>
          <Button variant="link" className="text-blue-500 p-0 h-auto">
            <FileText className="h-4 w-4 mr-1" />
            Image
          </Button>
        </TableCell>
        <TableCell>{buyer?.companyInfo?.mainProducts}</TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
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
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={`/dashboard/buyers/${buyer.id}`}>
                <DropdownMenuItem>View Details</DropdownMenuItem>
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    className="text-red-600"
                    onSelect={(e) => {
                      e.preventDefault();
                      setOpen(true);
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent open={open} onOpenChange={setOpen}>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete the customer account?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={() => setOpen(false)}
                      disabled={isDeleting}
                    >
                      No
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                      Yes
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </>
  );
}
