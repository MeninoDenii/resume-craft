"use server";

import { auth } from "@/lib/auth";
import { db } from "./drizzle";
import { resumes } from "./schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const getUserIdOrThrow = async () => {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) throw new Error("Usuário não encontrado");

  return userId;
};

export const createResume = async (title: string) => {
  const userId = await getUserIdOrThrow();

  const newResume = await db
    .insert(resumes)
    .values({
      title,
      userId,
    })
    .returning();

  revalidatePath("/dashboard/resumes");

  return newResume[0];
};

export const updatedResumeData = async (id: string, data: ResumeData) => {
  await getUserIdOrThrow();

  const updatedResume = await db
    .update(resumes)
    .set({ data, upDatedAt: new Date() })
    .where(eq(resumes.id, id))
    .returning();

  revalidatePath("/dashboard/resumes");

  return updatedResume[0];
};

export const deleteResume = async (id: string) => {
  const userId = await getUserIdOrThrow();

  const resume = await db.query.resumes.findFirst({
    where: eq(resumes.id, id),
  });

  if (!resume) throw new Error("Currículo não encontrado");

  if (resume.userId !== userId)
    throw new Error("Você não tem permissão para deletar este currículo");

  await db.delete(resumes).where(eq(resumes.id, id)).execute();

  revalidatePath("/dashboard/resumes");
};

export const duplicateResume = async (id: string, title: string) => {
  const userId = await getUserIdOrThrow();

  const resume = await db.query.resumes.findFirst({
    where: eq(resumes.id, id),
  });

  if (!resume) throw new Error("Currículo não encontrado");

  if (resume.userId !== userId)
    throw new Error("Você não tem permissão para duplicar este currículo");

  const newResume = await db
    .insert(resumes)
    .values({
      title,
      data: resume.data,
      userId,
    })
    .returning();

  revalidatePath("/dashboard/resumes");

  return newResume[0];
};
