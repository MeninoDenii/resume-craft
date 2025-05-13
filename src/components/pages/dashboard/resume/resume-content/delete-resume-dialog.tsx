"use client";

import { Button } from "@/components/ui/button";
import { BaseDialogProps, Dialog } from "@/components/ui/dialog";
import { deleteResume } from "@/db/actions";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const DeleteResumeDialog = (props: BaseDialogProps) => {
  const [open, setOpen] = useState(false);

  const params = useParams();
  const router = useRouter();

  const resumeId = params.id as string;

  const onDelete = async () => {
    try {
      await deleteResume(resumeId);
      toast.success("Currículo deletado com sucesso.");
      router.push("/dashboard/resumes");
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("Erro ao deletar currículo, tente novamente mais tarde.");
    }
  };

  return (
    <Dialog
      {...props}
      open={open}
      setOpen={setOpen}
      title="Deletar Currículo"
      description="Você tem certeza que deseja deletar este currículo? Essa ação não pode ser desfeita."
      content={
        <div className="flex gap-2 ml-auto">
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="destructive" onClick={onDelete}>
            Deletar
          </Button>
        </div>
      }
    />
  );
};
