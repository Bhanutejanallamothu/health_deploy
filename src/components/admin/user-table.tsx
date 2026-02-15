
"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Search, Filter, MoreHorizontal, Trash2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Registration } from "@/lib/types";
import { registrations as initialRegistrations } from "@/lib/placeholder-data";
import { departments } from "@/lib/placeholder-data";
import { useToast } from "@/hooks/use-toast";

export function UserTable() {
  const [registrations, setRegistrations] = React.useState<Registration[]>(initialRegistrations);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterDepartment, setFilterDepartment] = React.useState("all");
  const [viewingUser, setViewingUser] = React.useState<Registration | null>(null);
  const [deletingUser, setDeletingUser] = React.useState<Registration | null>(null);
  const { toast } = useToast();

  const filteredRegistrations = React.useMemo(() => {
    return registrations
      .filter((user) =>
        filterDepartment === "all" ? true : user.department === filterDepartment
      )
      .filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [registrations, searchTerm, filterDepartment]);

  const handleDelete = (userId: string) => {
    setRegistrations((prev) => prev.filter((user) => user.id !== userId));
    setDeletingUser(null);
    toast({
      title: "User Deleted",
      description: "The registration has been successfully deleted.",
    });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>
                Filter by Department
                {filterDepartment !== "all" && `: ${filterDepartment}`}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Department</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setFilterDepartment("all")}>
              All Departments
            </DropdownMenuItem>
            {departments.map((dept) => (
              <DropdownMenuItem
                key={dept.id}
                onSelect={() => setFilterDepartment(dept.name)}
              >
                {dept.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Age</TableHead>
              <TableHead className="hidden lg:table-cell">Gender</TableHead>
              <TableHead className="hidden md:table-cell">Contact</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRegistrations.length > 0 ? (
              filteredRegistrations.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{user.age}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge variant={user.gender === "Female" ? "default" : "secondary"}>
                      {user.gender}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    <div>{user.email}</div>
                    <div>{user.phone}</div>
                  </TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onSelect={() => setViewingUser(user)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onSelect={() => setDeletingUser(user)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Details Dialog */}
      <Dialog open={!!viewingUser} onOpenChange={() => setViewingUser(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-headline">{viewingUser?.name}</DialogTitle>
            <DialogDescription>
              Full registration details.
            </DialogDescription>
          </DialogHeader>
          {viewingUser && (
            <div className="grid gap-4 py-4 text-sm">
                <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                  <span className="text-muted-foreground">Age</span>
                  <span>{viewingUser.age}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                  <span className="text-muted-foreground">Gender</span>
                  <span>{viewingUser.gender}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                  <span className="text-muted-foreground">Phone</span>
                  <span>{viewingUser.phone}</span>
                </div>
                 <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                  <span className="text-muted-foreground">Email</span>
                  <span>{viewingUser.email}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] items-start gap-4">
                  <span className="text-muted-foreground">Address</span>
                  <span>{viewingUser.address}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                  <span className="text-muted-foreground">Department</span>
                  <span>{viewingUser.department}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] items-start gap-4">
                  <span className="text-muted-foreground">Condition</span>
                  <p className="leading-relaxed">{viewingUser.medicalCondition || "None specified"}</p>
                </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingUser} onOpenChange={() => setDeletingUser(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the registration for <span className="font-semibold">{deletingUser?.name}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(deletingUser!.id)} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
