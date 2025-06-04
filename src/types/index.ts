export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Resume {
  id: string;
  userId: string;
  title: string;
  type: 'resume' | 'coverLetter';
  createdAt: string;
  updatedAt: string;
  content: ResumeContent | CoverLetterContent;
}

export interface ResumeContent {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
  };
  summary: string;
  description?: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  certifications: Certification[];
}

export interface CoverLetterContent {
  recipientName: string;
  companyName: string;
  jobTitle: string;
  content: string;
  tone: 'professional' | 'friendly' | 'confident';
}

export interface WorkExperience {
  id: string;
  companyName: string;
  position: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  location?: string;
  description: string;
  // achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  location?: string;
  gpa?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate?: string;
  expiryDate?: string;
  credentialId?: string;
}