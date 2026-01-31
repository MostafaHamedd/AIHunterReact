export type ApplicationStatus = 
  | 'not_applied'
  | 'applied'
  | 'interview'
  | 'offer'
  | 'rejected';

export interface JobDescription {
  id: string;
  url?: string;
  title: string;
  company: string;
  description: string;
  extractedData: {
    requiredSkills: string[];
    keywords: string[];
    technologies: string[];
    softSkills: string[];
    responsibilities: string[];
  };
  createdAt: Date;
}

export interface ResumeSection {
  summary: string;
  experience: ExperienceItem[];
  skills: string[];
  projects: ProjectItem[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  bullets: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
}

export interface Resume {
  id: string;
  name: string;
  originalContent: ResumeSection;
  optimizedContent: ResumeSection;
  version: string;
  createdAt: Date;
}

export interface CoverLetter {
  id: string;
  name: string;
  originalContent: string;
  optimizedContent: string;
  version: string;
  createdAt: Date;
}

export interface KeywordMatch {
  keyword: string;
  matched: boolean;
  suggested: boolean;
  category: 'skill' | 'technology' | 'soft-skill' | 'keyword';
}

export interface ATSScore {
  score: number; // 0-100
  matchedKeywords: KeywordMatch[];
  missingKeywords: KeywordMatch[];
  suggestedKeywords: KeywordMatch[];
}

export interface OptimizationChange {
  id: string;
  section: 'summary' | 'experience' | 'skills' | 'projects';
  original: string;
  optimized: string;
  explanation: string;
  keywordsAdded: string[];
}

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  jobLink: string;
  resumeId: string;
  coverLetterId?: string;
  status: ApplicationStatus;
  applicationDate?: Date;
  notes: ApplicationNote[];
  timeline: TimelineEvent[];
  createdAt: Date;
}

export interface ApplicationNote {
  id: string;
  content: string;
  createdAt: Date;
}

export interface TimelineEvent {
  id: string;
  type: 'optimized' | 'submitted' | 'status_change' | 'note';
  title: string;
  description: string;
  date: Date;
}

export interface RoleVariant {
  id: string;
  name: string;
  seniority: 'junior' | 'mid' | 'senior' | 'lead';
  focus: string[];
}

