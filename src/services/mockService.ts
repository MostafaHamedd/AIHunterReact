import type {
  JobDescription,
  Resume,
  CoverLetter,
  ATSScore,
  OptimizationChange,
  ResumeSection,
} from '@/types'

// Mock service functions - will be replaced with actual API calls later

export const mockExtractJobData = async (_urlOrText: string): Promise<JobDescription['extractedData']> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    requiredSkills: ['React', 'TypeScript', 'Node.js', 'REST APIs'],
    keywords: ['frontend', 'full-stack', 'agile', 'scrum'],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
    softSkills: ['communication', 'teamwork', 'problem-solving'],
    responsibilities: [
      'Develop and maintain web applications',
      'Collaborate with cross-functional teams',
      'Write clean, maintainable code',
    ],
  };
};

export const mockParseResume = async (_file: File): Promise<ResumeSection> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    summary: 'Experienced software engineer with 5+ years in full-stack development.',
    experience: [
      {
        id: '1',
        company: 'Tech Corp',
        role: 'Senior Software Engineer',
        duration: '2020 - Present',
        bullets: [
          'Developed backend APIs',
          'Led team of 3 developers',
          'Improved system performance by 40%',
        ],
      },
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python'],
    projects: [
      {
        id: '1',
        name: 'E-commerce Platform',
        description: 'Built a full-stack e-commerce solution',
        technologies: ['React', 'Node.js', 'MongoDB'],
      },
    ],
  };
};

export const mockCalculateATSScore = async (
  _resume: Resume,
  _jobDescription: JobDescription
): Promise<ATSScore> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    score: 75,
    matchedKeywords: [
      { keyword: 'React', matched: true, suggested: false, category: 'technology' },
      { keyword: 'TypeScript', matched: true, suggested: false, category: 'technology' },
      { keyword: 'Node.js', matched: true, suggested: false, category: 'technology' },
    ],
    missingKeywords: [
      { keyword: 'PostgreSQL', matched: false, suggested: false, category: 'technology' },
      { keyword: 'AWS', matched: false, suggested: false, category: 'technology' },
    ],
    suggestedKeywords: [
      { keyword: 'REST APIs', matched: false, suggested: true, category: 'skill' },
      { keyword: 'agile', matched: false, suggested: true, category: 'keyword' },
    ],
  };
};

export const mockOptimizeResume = async (
  _resume: Resume,
  _jobDescription: JobDescription
): Promise<{ optimized: ResumeSection; changes: OptimizationChange[] }> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const changes: OptimizationChange[] = [
    {
      id: '1',
      section: 'experience',
      original: 'Developed backend APIs',
      optimized: 'Developed scalable Spring Boot REST APIs with proper error handling',
      explanation: 'Added specific technology (Spring Boot) and emphasized scalability and error handling to match job requirements.',
      keywordsAdded: ['Spring Boot', 'REST APIs', 'scalable'],
    },
  ];
  
  const optimized: ResumeSection = {
    ..._resume.optimizedContent,
    experience: _resume.optimizedContent.experience.map((exp: any) => ({
      ...exp,
      bullets: exp.bullets.map((bullet: any) => {
        if (bullet === 'Developed backend APIs') {
          return 'Developed scalable Spring Boot REST APIs with proper error handling';
        }
        return bullet;
      }),
    })),
  };
  
  return { optimized, changes };
};

export const mockOptimizeCoverLetter = async (
  coverLetter: CoverLetter,
  jobDescription: JobDescription
): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return coverLetter.optimizedContent + '\n\n[AI Optimized for ' + jobDescription.company + ']';
};

