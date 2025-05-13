"use client";

import { Button } from "@/components/ui/button";
import { BaseDialogProps, Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { duplicateResume } from "@/db/actions";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  title: string;
};

export const DuplicateResumeDialog = (props: BaseDialogProps) => {
  const [open, setOpen] = useState(false);

  const methods = useForm<FormData>();

  const params = useParams();
  const router = useRouter();

  const resumeId = params.id as string;

  const onSubmit = async (data: FormData) => {
    try {
      const newResume = await duplicateResume(resumeId, data.title);
      toast.success("Currículo duplicado com sucesso.");
      router.replace(`/dashboard/resumes/${newResume.id}`);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao duplicar currículo, tente novamente mais tarde.");
    }
  };

  return (
    <Dialog
      {...props}
      open={open}
      setOpen={setOpen}
      title="Duplicar Currículo"
      description="Será criado uma cópia do currículo atual. Você pode editar o título da cópia."
      content={
        <form
          className="flex flex-col"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Controller
            control={methods.control}
            name="title"
            rules={{ required: "Título é obrigatório" }}
            render={({ field }) => (
              <Input type="text" placeholder="Novo título" {...field} />
            )}
          />

          <div className="flex ml-auto gap-4 mt-4">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Duplicar</Button>
          </div>
        </form>
      }
    />
  );
};
