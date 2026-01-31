import { create } from 'zustand'
import type {
  JobDescription,
  Resume,
  CoverLetter,
  JobApplication,
  ATSScore,
  OptimizationChange,
} from '@/types'

interface AppState {
  // Job Descriptions
  currentJobDescription: JobDescription | null;
  jobDescriptions: JobDescription[];
  
  // Resumes
  currentResume: Resume | null;
  resumes: Resume[];
  
  // Cover Letters
  currentCoverLetter: CoverLetter | null;
  coverLetters: CoverLetter[];
  
  // ATS Scoring
  atsScore: ATSScore | null;
  
  // Optimization Changes
  optimizationChanges: OptimizationChange[];
  
  // Applications
  applications: JobApplication[];
  selectedApplication: JobApplication | null;
  
  // Actions
  setCurrentJobDescription: (job: JobDescription | null) => void;
  addJobDescription: (job: JobDescription) => void;
  setCurrentResume: (resume: Resume | null) => void;
  addResume: (resume: Resume) => void;
  setCurrentCoverLetter: (coverLetter: CoverLetter | null) => void;
  addCoverLetter: (coverLetter: CoverLetter) => void;
  setATSScore: (score: ATSScore) => void;
  setOptimizationChanges: (changes: OptimizationChange[]) => void;
  addApplication: (application: JobApplication) => void;
  updateApplication: (id: string, updates: Partial<JobApplication>) => void;
  setSelectedApplication: (application: JobApplication | null) => void;
}

export const useStore = create<AppState>((set) => ({
  // Initial State
  currentJobDescription: null,
  jobDescriptions: [],
  currentResume: null,
  resumes: [],
  currentCoverLetter: null,
  coverLetters: [],
  atsScore: null,
  optimizationChanges: [],
  applications: [],
  selectedApplication: null,
  
  // Actions
  setCurrentJobDescription: (job) => set({ currentJobDescription: job }),
  addJobDescription: (job) => set((state) => ({
    jobDescriptions: [...state.jobDescriptions, job],
  })),
  setCurrentResume: (resume) => set({ currentResume: resume }),
  addResume: (resume) => set((state) => ({
    resumes: [...state.resumes, resume],
  })),
  setCurrentCoverLetter: (coverLetter) => set({ currentCoverLetter: coverLetter }),
  addCoverLetter: (coverLetter) => set((state) => ({
    coverLetters: [...state.coverLetters, coverLetter],
  })),
  setATSScore: (score) => set({ atsScore: score }),
  setOptimizationChanges: (changes) => set({ optimizationChanges: changes }),
  addApplication: (application) => set((state) => ({
    applications: [...state.applications, application],
  })),
  updateApplication: (id, updates) => set((state) => ({
    applications: state.applications.map((app) =>
      app.id === id ? { ...app, ...updates } : app
    ),
    selectedApplication: state.selectedApplication?.id === id
      ? { ...state.selectedApplication, ...updates }
      : state.selectedApplication,
  })),
  setSelectedApplication: (application) => set({ selectedApplication: application }),
}))

