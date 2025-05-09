"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { InfosSidebar } from "./infos-sidebar";
import { ResumeContent } from "./resume-content";
import { StructureSidebar } from "./structure-sidebar";
import { FormProvider, useForm } from "react-hook-form";
import { User } from "next-auth";
import { useCallback, useEffect, useRef } from "react";
import { useDebonce } from "@/hooks/use-debonce";
import { updatedResumeData } from "@/db/actions";
import { useParams } from "next/navigation";
import { mergician } from "mergician";

type ResumePageProps = {
  title: string;
  initialData: Partial<ResumeData>;
  user?: User;
};

export const ResumePage = ({ initialData, title, user }: ResumePageProps) => {
  const params = useParams();

  const resumeId = params.id as string;

  const defaultValues: ResumeData = {
    content: {
      image: {
        visible: true,
        url: user?.image ?? "",
      },
      infos: {
        email: user?.email ?? "",
        phone: "",
        fullName: user?.name ?? "",
        headLine: "",
        location: "",
        website: "",
      },
      summary: "<p></p>",
      certifications: [],
      educations: [],
      experiences: [],
      languages: [],
      projects: [],
      skills: [],
      socialmedias: [],
    },
    structure: {
      template: "ditto",
      colorTheme: "slate",
      language: "portuguese",
      layout: {
        mainSections: [
          { key: "socialmedias" },
          { key: "summary" },
          { key: "experiences" },
          { key: "educations" },
          { key: "certifications" },
          { key: "projects" },
        ],
        sidebarSections: [{ key: "languages" }, { key: "skills" }],
      },
    },
  };
  const methods = useForm<ResumeData>({
    defaultValues: mergician(defaultValues, initialData),
  });

  const data = methods.watch();
  const debouncedData = useDebonce(JSON.stringify(data));

  const shouldSave = useRef(false);

  const handleSaveUpdates = useCallback(() => {
    try {
      if (!shouldSave.current) {
        shouldSave.current = true;
        return;
      }

      const updatedData = methods.getValues();
      updatedResumeData(resumeId, updatedData);
    } catch (error) {
      console.error("Error saving updates:", error);
    }
  }, [methods, resumeId]);

  useEffect(() => {
    handleSaveUpdates();
  }, [debouncedData, handleSaveUpdates]);

  return (
    <FormProvider {...methods}>
      <main className="w-full h-screen overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="w-full h-full">
          <ResizablePanel minSize={20} maxSize={40} defaultSize={30}>
            <InfosSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />

          <ResizablePanel>
            <ResumeContent title={title} />
          </ResizablePanel>
          <ResizableHandle withHandle />

          <ResizablePanel minSize={20} maxSize={35} defaultSize={25}>
            <StructureSidebar />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </FormProvider>
  );
};
