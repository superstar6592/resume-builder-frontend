import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Save, Download, Undo } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';
import { Resume, ResumeContent } from '../types';
import { mockResumes } from '../utils/mockData';

const UpdateResume: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [resume, setResume] = useState<Resume | null>(null);
  const [resumeContent, setResumeContent] = useState<ResumeContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [jobDescription, setJobDescription] = useState<string>('');
  const [showOptimizeForm, setShowOptimizeForm] = useState<boolean>(false);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchResume = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        const foundResume = mockResumes.find(r => r.id === id);
        
        if (foundResume) {
          setResume(foundResume);
          if ('personalInfo' in foundResume.content && 'workExperience' in foundResume.content && 'skills' in foundResume.content) {
            setResumeContent(foundResume.content as ResumeContent);
          } else {
            toast.error('Invalid resume content');
            navigate('/dashboard');
          }
        } else {
          toast.error('Resume not found');
          navigate('/dashboard');
        }
      } catch (error) {
        toast.error('Failed to load resume');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResume();
  }, [id, navigate]);

  const handleSave = async () => {
    try {
      // In a real app, this would call an API
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success('Resume saved successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to save resume');
    }
  };

  const handleOptimize = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please enter a job description for optimization');
      return;
    }
    
    setIsOptimizing(true);
    
    try {
      // In a real app, this would call an AI API
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For this demo, we just keep the same content
      toast.success('Resume optimized for the job description');
      setShowOptimizeForm(false);
    } catch (error) {
      toast.error('Failed to optimize resume');
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    toast.success('Downloaded resume as PDF');
  };

  const handleDownloadDOCX = () => {
    // In a real app, this would generate and download a DOCX file
    toast.success('Downloaded resume as DOCX');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!resume || !resumeContent) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Resume not found</h3>
            <div className="mt-6">
              <Button onClick={() => navigate('/dashboard')}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header with actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{resume.title}</h1>
            <p className="mt-1 text-gray-500">
              Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              icon={<Download className="h-4 w-4" />}
              onClick={handleDownloadPDF}
            >
              Export as PDF
            </Button>
            <Button 
              variant="outline" 
              icon={<Download className="h-4 w-4" />}
              onClick={handleDownloadDOCX}
            >
              Export as DOCX
            </Button>
            <Button 
              icon={<Save className="h-4 w-4" />}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </div>
        
        {/* Optimize for Job Button */}
        {!showOptimizeForm ? (
          <div className="mb-8">
            <Button 
              variant="secondary"
              onClick={() => setShowOptimizeForm(true)}
            >
              Optimize for Job Description
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Optimize Resume for Job</h2>
              <button
                onClick={() => setShowOptimizeForm(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
                  Paste Job Description
                </label>
                <p className="text-sm text-gray-500">
                  Our AI will analyze this job description and tailor your resume to highlight relevant skills and experience.
                </p>
                <textarea
                  id="jobDescription"
                  rows={8}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                  placeholder="Paste the job description here..."
                ></textarea>
              </div>
              
              <div className="flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowOptimizeForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isOptimizing}
                  onClick={handleOptimize}
                >
                  Optimize Resume
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Resume Editor */}
        <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
          {/* Personal Info Section */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={resumeContent.personalInfo.name}
                  onChange={(e) => setResumeContent({
                    ...resumeContent,
                    personalInfo: {
                      ...resumeContent.personalInfo,
                      name: e.target.value
                    }
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={resumeContent.personalInfo.email}
                  onChange={(e) => setResumeContent({
                    ...resumeContent,
                    personalInfo: {
                      ...resumeContent.personalInfo,
                      email: e.target.value
                    }
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  value={resumeContent.personalInfo.phone}
                  onChange={(e) => setResumeContent({
                    ...resumeContent,
                    personalInfo: {
                      ...resumeContent.personalInfo,
                      phone: e.target.value
                    }
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  value={resumeContent.personalInfo.location}
                  onChange={(e) => setResumeContent({
                    ...resumeContent,
                    personalInfo: {
                      ...resumeContent.personalInfo,
                      location: e.target.value
                    }
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={resumeContent.personalInfo.linkedin || ''}
                  onChange={(e) => setResumeContent({
                    ...resumeContent,
                    personalInfo: {
                      ...resumeContent.personalInfo,
                      linkedin: e.target.value
                    }
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Website
                </label>
                <input
                  type="url"
                  value={resumeContent.personalInfo.website || ''}
                  onChange={(e) => setResumeContent({
                    ...resumeContent,
                    personalInfo: {
                      ...resumeContent.personalInfo,
                      website: e.target.value
                    }
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
          
          {/* Summary Section */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Professional Summary</h2>
            <textarea
              value={resumeContent.summary}
              onChange={(e) => setResumeContent({
                ...resumeContent,
                summary: e.target.value
              })}
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
            />
          </div>
          
          {/* Work Experience Section */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Work Experience</h2>
            
            {resumeContent.workExperience.map((exp, index) => (
              <div key={exp.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Company
                    </label>
                    <input
                      type="text"
                      value={exp.companyName}
                      onChange={(e) => {
                        const newWorkExperience = [...resumeContent.workExperience];
                        newWorkExperience[index] = { ...exp, companyName: e.target.value };
                        setResumeContent({ ...resumeContent, workExperience: newWorkExperience });
                      }}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                    />
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Position
                    </label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => {
                        const newWorkExperience = [...resumeContent.workExperience];
                        newWorkExperience[index] = { ...exp, position: e.target.value };
                        setResumeContent({ ...resumeContent, workExperience: newWorkExperience });
                      }}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                    />
                  </div>
                  
                  <div className="sm:col-span-6">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => {
                        const newWorkExperience = [...resumeContent.workExperience];
                        newWorkExperience[index] = { ...exp, description: e.target.value };
                        setResumeContent({ ...resumeContent, workExperience: newWorkExperience });
                      }}
                      rows={3}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                    />
                  </div>
                  
                  {/* <div className="sm:col-span-6">
                    <label className="block text-sm font-medium text-gray-700">
                      Achievements
                    </label>
                    <div className="mt-1 space-y-2">
                      {exp.achievements.map((achievement, achievementIndex) => (
                        <div key={achievementIndex} className="flex items-center">
                          <input
                            type="text"
                            value={achievement}
                            onChange={(e) => {
                              const newWorkExperience = [...resumeContent.workExperience];
                              const newAchievements = [...exp.achievements];
                              newAchievements[achievementIndex] = e.target.value;
                              newWorkExperience[index] = { ...exp, achievements: newAchievements };
                              setResumeContent({ ...resumeContent, workExperience: newWorkExperience });
                            }}
                            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                          />
                          {exp.achievements.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const newWorkExperience = [...resumeContent.workExperience];
                                const newAchievements = [...exp.achievements];
                                newAchievements.splice(achievementIndex, 1);
                                newWorkExperience[index] = { ...exp, achievements: newAchievements };
                                setResumeContent({ ...resumeContent, workExperience: newWorkExperience });
                              }}
                              className="ml-2 text-error-600 hover:text-error-800"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const newWorkExperience = [...resumeContent.workExperience];
                          const newAchievements = [...exp.achievements, ''];
                          newWorkExperience[index] = { ...exp, achievements: newAchievements };
                          setResumeContent({ ...resumeContent, workExperience: newWorkExperience });
                        }}
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        + Add Achievement
                      </button>
                    </div>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
          
          {/* Skills Section */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resumeContent.skills.map((skill, index) => (
                <div
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => {
                      const newSkills = [...resumeContent.skills];
                      newSkills.splice(index, 1);
                      setResumeContent({ ...resumeContent, skills: newSkills });
                    }}
                    className="ml-1.5 text-primary-600 hover:text-primary-800 focus:outline-none"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <div>
                <input
                  type="text"
                  placeholder="Add a skill..."
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      e.preventDefault();
                      const newSkills = [...resumeContent.skills, e.currentTarget.value.trim()];
                      setResumeContent({ ...resumeContent, skills: newSkills });
                      e.currentTarget.value = '';
                    }
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Save Changes Button */}
          <div className="p-6 bg-gray-50 flex justify-end">
            <Button
              onClick={handleSave}
              icon={<Save className="h-4 w-4" />}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

const X = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export default UpdateResume;