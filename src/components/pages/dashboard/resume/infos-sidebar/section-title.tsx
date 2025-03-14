import { LucideIcon } from "lucide-react";

type SectionTitleProps = {
  icon: LucideIcon;
  title: string;
};

export const SectionTitle: React.FC<SectionTitleProps> = ({
  icon: Icon,
  title,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Icon size={18} className="text-muted-foreground" />
      <h3 className="text-2xl font-(family-name:--font-title)">{title}</h3>
    </div>
  );
};
