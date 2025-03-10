import { BaseDialogProps, Dialog } from "@/components/ui/dialog";

export const NewResumeDialog = (props: BaseDialogProps) => {
  return (
    <Dialog
      {...props}
      title="Criar novo currículo"
      description="Para começar, escolha um título para seu currículo"
      content={<form>Formulário de criação de currículo</form>}
    />
  );
};
