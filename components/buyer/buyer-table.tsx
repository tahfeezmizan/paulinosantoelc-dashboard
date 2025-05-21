import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { FileText } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { TableCell, TableRow } from "../ui/table";
import { User } from "@/types/common";

export default function BuyerTable({
  buyer,
  index,
}: {
  buyer: User;
  index: number;
}) {
  console.log(buyer)
  return (
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
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit buyer</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    
  );
}
