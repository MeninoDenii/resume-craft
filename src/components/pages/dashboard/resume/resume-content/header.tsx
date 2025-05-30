import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Copy, Download, Home, Trash } from "lucide-react";
import Link from "next/link";
import { DeleteResumeDialog } from "./delete-resume-dialog";
import { DuplicateResumeDialog } from "./duplicate-resume-dialog";

type NavigationHeaderProps = {
  title: string;
};

export const NavigationHeader = ({ title }: NavigationHeaderProps) => {
  return (
    <header
      className={cn(
        "absolute w-full left-0 top-0 z-10 p-2 bg-background border-b border-muted flex items-center justify-between",
        "gap-2"
      )}
    >
      <div className="flex items-center gap-2">
        <Tooltip content="Voltar ao painel">
          <Link href="/dashboard/resumes" passHref>
            <Button
              variant="secondary"
              className="w-8 h-8 bg-transparent"
              size="icon"
            >
              <Home size={18} />
            </Button>
          </Link>
        </Tooltip>
        <span className="text-muted-foreground">/</span>
        <p className="text-lg font-(family-name:--font-title) font-bold ml-1">
          {title}
        </p>
      </div>

      <div className="flex gap-1">
        <DeleteResumeDialog>
          <Tooltip content="Deletar Currículo">
            <Button
              variant="secondary"
              className="w-8 h-8 bg-transparent"
              size="icon"
            >
              <Trash size={18} />
            </Button>
          </Tooltip>
        </DeleteResumeDialog>

        <DuplicateResumeDialog>
          <Tooltip content="Duplicar Currículo">
            <Button
              variant="secondary"
              className="w-8 h-8 bg-transparent"
              size="icon"
            >
              <Copy size={18} />
            </Button>
          </Tooltip>
        </DuplicateResumeDialog>

        <Tooltip content="Baixar PDF">
          <Button
            variant="secondary"
            className="w-8 h-8 bg-transparent"
            size="icon"
          >
            <Download size={18} />
          </Button>
        </Tooltip>
      </div>
    </header>
  );
};
