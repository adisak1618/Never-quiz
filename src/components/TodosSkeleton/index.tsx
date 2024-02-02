import { Skeleton } from "components/ui/skeleton";

export function TodosSkeleton() {
  return (
    <div className="space-y-6 px-4">
      <Skeleton className="w-full h-20 rounded-md" />
      <Skeleton className="w-full h-20 rounded-md" />
      <Skeleton className="w-full h-20 rounded-md" />
      <Skeleton className="w-full h-20 rounded-md" />
    </div>
  );
}
