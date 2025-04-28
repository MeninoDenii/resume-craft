import { ResumesList } from "@/components/pages/dashboard/resumes/resumes-list";
import { ResumesListSkeleton } from "@/components/pages/dashboard/resumes/resumes-list/skeleton";
import { Suspense } from "react";

export default function DashBoardResumesPage() {
  return (
    <>
      <h1 className="text-4xl font-(family-name:--font-title) font-bold mb-6">
        Currículos
      </h1>

      <Suspense fallback={<ResumesListSkeleton />}>
        <ResumesList />
      </Suspense>
    </>
  );
}
