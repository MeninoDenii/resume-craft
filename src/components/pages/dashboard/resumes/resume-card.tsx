import { ResumeDTo } from "@/db/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";
import { formatDistanceToNow } from "date-fns";

type ResumeCardProps = {
  title: string;
  description: string;
  icon?: ReactNode;
};

export const ResumeCardButton = ({
  description,
  title,
  icon,
}: ResumeCardProps) => {
  return (
    <button
      className={cn(
        "w-full h-[300px] bg-muted/50 rounded border border-muted-foreground/20",
        "flex items-center justify-center relative outline-none overflow-hidden",
        "hover:brightness-105 dark:hover:brightness-125 transition-all"
      )}
    >
      {icon}
      <div className="absolute w-full left-0 bottom-0 p-3 text-left bg-gradient-to-t from-background/80">
        <p className="text-sm font-semibold font-(family-name:--font-title)">
          {title}
        </p>
        <span className="block text-xs text-muted-foreground">
          {description}
        </span>
      </div>
    </button>
  );
};

type ResumeCard = {
  resume: ResumeDTo;
};

export const ResumeCard = ({ resume }: ResumeCard) => {
  const formattedLastUpdated = formatDistanceToNow(new Date(resume.upDatedAt), {
    addSuffix: true,
  });

  return (
    <Link href={`/dashboard/resumes/${resume.id}`} className="block w-full">
      <ResumeCardButton
        title={resume.title}
        description={`Última atualização ${formattedLastUpdated}`}
      />
    </Link>
  );
};
