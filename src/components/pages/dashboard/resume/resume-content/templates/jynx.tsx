import { sectionIsEmpty } from "@/lib/utils";
import { BaseResumeProps } from ".";
import { Element } from "../resume-element";
import { BasicInfos } from "./shared/basic-infos";
import { sectionLabels } from "../../structure-sidebar/layout-drag-list";
import { ResumeSectionContent } from "./shared/sections-content";

export const Jynx = ({ data }: BaseResumeProps) => {
  const { content } = data;
  const { infos } = content;

  const mainSections = data.structure.layout.mainSections.filter((section) => {
    return !sectionIsEmpty(section.key, data.content);
  });

  const sidebarSections = data.structure.layout.sidebarSections.filter(
    (section) => {
      return !sectionIsEmpty(section.key, data.content);
    }
  );

  return (
    <div className="w-full h-full flex flex-col">
      <section className="w-full min-h-[120px] bg-[var(--resume-primary)] text-white flex items-center p-4">
        <div className="relative w-[300px] flex-shrink-0 flex justify-center items-center">
          {content.image.url && content.image.visible && (
            <img
              src={content.image.url}
              className="w-36 h-36 object-cover rounded-full"
            />
          )}
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <Element className="text-3xl font-bold">{infos.fullName}</Element>
          <Element>{infos.headLine}</Element>
        </div>
      </section>

      <div className="flex flex-1">
        <section className="p-6 pt-20 flex-shrink-0 flex flex-col gap-4 w-1/3">
          {sidebarSections.map((section) => (
            <div key={`section-item-${section.key}`}>
              <p className="font-extrabold mb-2">
                {sectionLabels[section.key][data.structure.language]}
              </p>
              <ResumeSectionContent
                key={section.id}
                section={section}
                content={data.content}
              />
            </div>
          ))}
        </section>

        <section className="pr-6 pb-6 flex-1 flex flex-col gap-4">
          <BasicInfos
            infos={infos}
            className="justify-start gap-y-2 mb-4 pt-4"
          />
          {mainSections.map((section) => (
            <div key={`section-item-${section.key}`} className="flex flex-col">
              <p className="font-bold text-sm mb-2">
                {sectionLabels[section.key][data.structure.language]}
              </p>
              <div className="border-l-4 border-[var(--resume-primary)] pl-4">
                <ResumeSectionContent
                  key={section.id}
                  section={section}
                  content={data.content}
                />
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
