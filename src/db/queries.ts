import { cache } from "react";
import { auth } from "@/lib/auth";
import { db } from "./drizzle";
import { ResumeDTo } from "./types";

export const getResumes = cache(async (): Promise<ResumeDTo[]> => {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) return [];

  const userResumes = await db.query.resumes.findMany({
    where: (resumes, { eq }) => eq(resumes.userId, userId),
    orderBy: (resumes, { desc }) => [desc(resumes.createdAt)],
  });

  return userResumes;
});

export const getResumeById = cache(
  async (id: string): Promise<ResumeDTo | undefined> => {
    const session = await auth();

    const userId = session?.user?.id;

    if (!userId) return undefined;

    const resume = await db.query.resumes.findFirst({
      where: (resumes, { eq }) => eq(resumes.id, id),
    });

    return resume;
  }
);
