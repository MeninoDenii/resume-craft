type ResumeImageData = {
  url: string;
  visible: boolean;
};

type ResumeInfosData = {
  fullName: string;
  headLine: string;
  email: string;
  website: string;
  phone: string;
  location: string;
};

type ResumeSocialMediaData = {
  name: string;
  username: string;
  url: string;
  icon: string;
};

type ResumeExperienceData = {
  company: string;
  position: string;
  date: string;
  location: string;
  website: string;
  summary: string;
};

type ResumeEducationData = {
  institution: string;
  degree: string;
  location: string;
  date: string;
  website: string;
  summary: string;
};

type ResumeSkillData = {
  name: string;
  description: string;
  level: number;
  keywords: string;
};

type ResumeLanguageData = {
  name: string;
  description: string;
  level: number;
};

type ResumeCertificationData = {
  name: string;
  institution: string;
  date: string;
  website: string;
  summary: string;
};

type ResumeProjectData = {
  name: string;
  description: string;
  date: string;
  website: string;
  summary: string;
  keywords: string[];
};

type ResumeContentData = {
  image: ResumeImageData;
  infos: ResumeInfosData;
  summary: string;
  socialmedias: Partial<ResumeSocialMediaData>[];
  experiences: Partial<ResumeExperienceData>[];
  educations: Partial<ResumeEducationData>[];
  skills: Partial<ResumeSkillData>[];
  languages: Partial<ResumeLanguageData>[];
  certifications: Partial<ResumeCertificationData>[];
  projects: Partial<ResumeProjectData>[];
};

type ResumeLayoutSection = {
  id?: string;
  key: ResumeSections;
};

type ResumeLanguages =
  | "english"
  | "portuguese"
  | "spanish"
  | "french"
  | "german"
  | "italian";

type ResumeStructureData = {
  template: ResumeTemplates;
  colorTheme: string;
  layout: {
    mainSections: ResumeLayoutSection[];
    sidebarSections: ResumeLayoutSection[];
  };
  language: ResumeLanguages;
};

type ResumeData = {
  content: ResumeContentData;
  structure: ResumeStructureData;
};

type ResumeSections =
  | "summary"
  | "socialmedias"
  | "experiences"
  | "educations"
  | "skills"
  | "languages"
  | "certifications"
  | "projects";

type ResumeTemplates = "eevee" | "onix" | "jynx" | "ditto";
