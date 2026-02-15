
import { UserTable } from "@/components/admin/user-table";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function UserTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-32" />
      </div>
      <Skeleton className="h-96 w-full" />
    </div>
  )
}

export default function AdminPage() {
  return (
    <div className="container py-12 md:py-16">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage patient registrations for various departments.
        </p>
      </header>
      <Suspense fallback={<UserTableSkeleton />}>
        <UserTable />
      </Suspense>
    </div>
  );
}
