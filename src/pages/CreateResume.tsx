import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';
import PersonalInfoForm from '../components/ui/ResumeForm/PersonalInfoForm';
import { ResumeContent, WorkExperience, Education, Certification } from '../types';
import { FileText, Save, Download, Wand2 } from 'lucide-react';
import { improveSummary, addResume } from '../utils/axios';

const CreateResume: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [resumeTitle, setResumeTitle] = useState('');

  const [formData, setFormData] = useState<ResumeContent>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
    },
    summary: '',
    workExperience: [
      {
        id: crypto.randomUUID(),
        companyName: '',
        position: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        location: '',
        description: ''
        // achievements: [''],
      },
    ],
    education: [
      {
        id: crypto.randomUUID(),
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        location: '',
        gpa: '',
      },
    ],
    skills: [''],
    certifications: [
      {
        id: crypto.randomUUID(),
        name: '',
        issuer: '',
        issueDate: '',
        expiryDate: '',
        credentialId: '',
      }
    ]
  });

  // Handle form changes
  const handleFormChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Work Experience Handlers
  const addWorkExperience = () => {
    setFormData({
      ...formData,
      workExperience: [
        ...formData.workExperience,
        {
          id: crypto.randomUUID(),
          companyName: '',
          position: '',
          startDate: '',
          endDate: '',
          isCurrent: false,
          location: '',
          description: '',
          // achievements: [''],
        },
      ],
    });
  };

  const removeWorkExperience = (index: number) => {
    if (formData.workExperience.length > 1) {
      setFormData({
        ...formData,
        workExperience: formData.workExperience.filter((_, i) => i !== index),
      });
    } else {
      toast.error('You must have at least one work experience entry');
    }
  };

  const handleWorkExperienceChange = (index: number, field: string, value: any) => {
    const updatedExperiences = [...formData.workExperience];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      workExperience: updatedExperiences,
    });
  };

  // Education Handlers
  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          id: crypto.randomUUID(),
          institution: '',
          degree: '',
          fieldOfStudy: '',
          startDate: '',
          endDate: '',
          isCurrent: false,
          location: '',
          gpa: '',
        },
      ],
    });
  };

  const removeEducation = (index: number) => {
    if (formData.education.length > 1) {
      setFormData({
        ...formData,
        education: formData.education.filter((_, i) => i !== index),
      });
    } else {
      toast.error('You must have at least one education entry');
    }
  };

  const handleEducationChange = (index: number, field: string, value: any) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      education: updatedEducation,
    });
  };

  // Skills Handler
  const handleSkillsChange = (skillsString: string) => {
    const skillsArray = skillsString
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill !== '');
    setFormData({
      ...formData,
      skills: skillsArray.length ? skillsArray : [''],
    });
  };

  // Certification Handlers
  const addCertification = () => {
    setFormData({
      ...formData,
      certifications: [
        ...formData.certifications,
        {
          id: crypto.randomUUID(),
          name: '',
          issuer: '',
          issueDate: '',
          expiryDate: '',
          credentialId: '',
        },
      ],
    });
  };

  const removeCertification = (index: number) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter((_, i) => i !== index),
    });
  };

  const handleCertificationChange = (index: number, field: string, value: string) => {
    const updatedCertifications = [...formData.certifications];
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      certifications: updatedCertifications,
    });
  };

  // Save resume
  const handleSave = async () => {
    try {
      // In a real app, this would call an API to save the resume
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Resume saved successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to save resume');
    }
  };

  // Download resume
  const handleDownload = async (format: 'pdf' | 'docx') => {
    try {
      // In a real app, this would generate and download the file
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`Resume downloaded as ${format.toUpperCase()}`);
    } catch (error) {
      toast.error(`Failed to download resume as ${format.toUpperCase()}`);
    }
  };

  // Generate resume using AI
  const generateResume = async () => {
    console.log(formData);
    setIsGenerating(true);

    try {
      const response = await addResume(formData, resumeTitle, jobDescription);
      // const improvedSummary = await improveSummary(formData.summary, jobDescription);
      // alert(improvedSummary);
      // setFormData({
      //   ...formData,
      //   summary: improvedSummary,
      // });

      try {
        // In a real app, this would call an AI API
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast.success('Resume generated successfully!');
        setShowPreview(true);
      } catch (error) {
        toast.error('Failed to generate resume');
      } finally {
        setIsGenerating(false);
      }

    } catch (error) {
      toast.error('Failed to improve summary');
    }
    
    
  };

  // Preview component
  const ResumePreview = () => (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{formData.personalInfo.name}</h2>
        <div className="text-gray-600 mt-2">
          <p>{formData.personalInfo.email} • {formData.personalInfo.phone}</p>
          <p>{formData.personalInfo.location}</p>
          {formData.personalInfo.linkedin && <p>LinkedIn: {formData.personalInfo.linkedin}</p>}
          {formData.personalInfo.website && <p>Website: {formData.personalInfo.website}</p>}
        </div>
      </div>

      {formData.summary && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Summary</h3>
          <p className="text-gray-700">{formData.summary}</p>
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Experience</h3>
        {formData.workExperience.map((exp) => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between">
              <h4 className="font-medium text-gray-900">{exp.position}</h4>
              <span className="text-gray-600">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</span>
            </div>
            <p className="text-gray-700">{exp.companyName}</p>
            <p className="text-gray-600 mb-2">{exp.location}</p>
            <p className="text-gray-700">{exp.description}</p>
            {/* {exp.achievements.length > 0 && (
              <ul className="list-disc list-inside mt-2">
                {exp.achievements.map((achievement, index) => (
                  <li key={index} className="text-gray-700">{achievement}</li>
                ))}
              </ul>
            )} */}
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
        {formData.education.map((edu) => (
          <div key={edu.id} className="mb-4">
            <div className="flex justify-between">
              <h4 className="font-medium text-gray-900">{edu.degree}</h4>
              <span className="text-gray-600">{edu.startDate} - {edu.isCurrent ? 'Present' : edu.endDate}</span>
            </div>
            <p className="text-gray-700">{edu.institution}</p>
            <p className="text-gray-600">{edu.location}</p>
            {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
          </div>
        ))}
      </div>

      {formData.skills.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Render form steps
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="resumeTitle" className="block text-sm font-medium text-gray-700">
                Resume Title *
              </label>
              <input
                type="text"
                id="resumeTitle"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                placeholder="e.g., Software Engineer Resume"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                required
              />
            </div>
            <PersonalInfoForm formData={formData} onChange={handleFormChange} />
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
            
            {formData.workExperience.map((experience, index) => (
              <div key={experience.id} className="p-4 border border-gray-200 rounded-md bg-white">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-md font-medium">
                    Experience #{index + 1}
                  </h4>
                  {formData.workExperience.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeWorkExperience(index)}
                      className="text-error-600 hover:text-error-800 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={experience.companyName}
                      onChange={(e) => handleWorkExperienceChange(index, 'companyName', e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Position *
                    </label>
                    <input
                      type="text"
                      value={experience.position}
                      onChange={(e) => handleWorkExperienceChange(index, 'position', e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={experience.startDate}
                      onChange={(e) => handleWorkExperienceChange(index, 'startDate', e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-gray-700">
                        End Date
                      </label>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`current-job-${index}`}
                          checked={experience.isCurrent}
                          onChange={(e) => handleWorkExperienceChange(index, 'isCurrent', e.target.checked)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`current-job-${index}`} className="ml-2 text-sm text-gray-700">
                          Current Job
                        </label>
                      </div>
                    </div>
                    <input
                      type="date"
                      value={experience.endDate || ''}
                      onChange={(e) => handleWorkExperienceChange(index, 'endDate', e.target.value)}
                      disabled={experience.isCurrent}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 disabled:bg-gray-100 disabled:text-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      value={experience.location || ''}
                      onChange={(e) => handleWorkExperienceChange(index, 'location', e.target.value)}
                      placeholder="City, State"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Job Description *
                    </label>
                    <textarea
                      value={experience.description}
                      onChange={(e) => handleWorkExperienceChange(index, 'description', e.target.value)}
                      rows={3}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                      required
                    />
                  </div>
                  
                  {/* <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Key Achievements
                    </label>
                    <p className="text-sm text-gray-500">Enter one achievement per line</p>
                    <textarea
                      value={experience.achievements.join('\n')}
                      onChange={(e) => {
                        const achievements = e.target.value.split('\n').filter(item => item.trim() !== '');
                        handleWorkExperienceChange(index, 'achievements', achievements.length ? achievements : ['']);
                      }}
                      rows={4}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                    />
                  </div> */}
                </div>
              </div>
            ))}
            
            <div>
              <Button
                type="button"
                variant="outline"
                onClick={addWorkExperience}
                className="mt-2"
              >
                Add Another Work Experience
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Education</h3>
            
            {formData.education.map((edu, index) => (
              <div key={edu.id} className="p-4 border border-gray-200 rounded-md bg-white">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-md font-medium">
                    Education #{index + 1}
                  </h4>
                  {formData.education.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="text-error-600 hover:text-error-800 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Institution *
                    </label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Degree *
                    </label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Field of Study
                    </label>
                    <input
                      type="text"
                      value={edu.fieldOfStudy || ''}
                      onChange={(e) => handleEducationChange(index, 'fieldOfStudy', e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={edu.startDate}
                      onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-gray-700">
                        End Date
                      </label>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`current-education-${index}`}
                          checked={edu.isCurrent}
                          onChange={(e) => handleEducationChange(index, 'isCurrent', e.target.checked)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`current-education-${index}`} className="ml-2 text-sm text-gray-700">
                          Current Student
                        </label>
                      </div>
                    </div>
                    <input
                      type="date"
                      value={edu.endDate || ''}
                      onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                      disabled={edu.isCurrent}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 disabled:bg-gray-100 disabled:text-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      value={edu.location || ''}
                      onChange={(e) => handleEducationChange(index, 'location', e.target.value)}
                      placeholder="City, State"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      GPA
                    </label>
                    <input
                      type="text"
                      value={edu.gpa || ''}
                      onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <div>
              <Button
                type="button"
                variant="outline"
                onClick={addEducation}
                className="mt-2"
              >
                Add Another Education
              </Button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Skills</h3>
              <p className="text-sm text-gray-500 mt-1">
                Enter your skills separated by commas (e.g., JavaScript, React, Node.js)
              </p>
              <textarea
                value={formData.skills.join(', ')}
                onChange={(e) => handleSkillsChange(e.target.value)}
                rows={4}
                className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">Certifications</h3>
              
              {formData.certifications.length > 0 ? (
                formData.certifications.map((cert, index) => (
                  <div key={cert.id} className="p-4 border border-gray-200 rounded-md bg-white mt-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-md font-medium">
                        Certification #{index + 1}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeCertification(index)}
                        className="text-error-600 hover:text-error-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Certification Name *
                        </label>
                        <input
                          type="text"
                          value={cert.name}
                          onChange={(e) => handleCertificationChange(index, 'name', e.target.value)}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Issuer *
                        </label>
                        <input
                          type="text"
                          value={cert.issuer}
                          onChange={(e) => handleCertificationChange(index, 'issuer', e.target.value)}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Issue Date
                        </label>
                        <input
                          type="date"
                          value={cert.issueDate || ''}
                          onChange={(e) => handleCertificationChange(index, 'issueDate', e.target.value)}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Expiry Date
                        </label>
                        <input
                          type="date"
                          value={cert.expiryDate || ''}
                          onChange={(e) => handleCertificationChange(index, 'expiryDate', e.target.value)}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Credential ID
                        </label>
                        <input
                          type="text"
                          value={cert.credentialId || ''}
                          onChange={(e) => handleCertificationChange(index, 'credentialId', e.target.value)}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic mt-2">No certifications added yet.</p>
              )}
              
              <Button
                type="button"
                variant="outline"
                onClick={addCertification}
                className="mt-4"
              >
                Add Certification
              </Button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Professional Summary</h3>
            <p className="text-sm text-gray-500">
              Write a brief summary of your professional background and career objectives,
              or let our AI generate one for you based on the information you've provided.
            </p>
            <textarea
              value={formData.summary}
              onChange={(e) => handleFormChange('summary', e.target.value)}
              rows={5}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
              placeholder="e.g., Experienced software engineer with 5+ years in full-stack development..."
            />
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">Job Description</h3>
              <p className="text-sm text-gray-500 mt-1">
                Paste the job description you're applying for to help our AI tailor your resume.
              </p>
              <textarea
                value={jobDescription}
                onChange={(e) =>setJobDescription(e.target.value)}
                rows={8}
                className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                placeholder="Paste the job description here..."
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Navigation buttons
  const renderNavigationButtons = () => {
    return (
      <div className="flex justify-between mt-8">
        <div>
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Previous
            </Button>
          )}
        </div>
        
        <div className="flex gap-3">
          {currentStep < 5 ? (
            <Button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Next
            </Button>
          ) : (
            <>
              <Button
                type="button"
                onClick={generateResume}
                isLoading={isGenerating}
                disabled={isGenerating}
                icon={<Wand2 className="h-4 w-4" />}
              >
                Generate with AI
              </Button>
            </>
          )}
        </div>
      </div>
    );
  };

  // Progress bar
  const renderProgressBar = () => {
    const totalSteps = 5;
    const progress = (currentStep / totalSteps) * 100;
    
    return (
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
          <span className="text-sm font-medium text-gray-900">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-600 transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white shadow rounded-lg p-6 md:p-8">
            <div className="flex items-center mb-6">
              <FileText className="h-8 w-8 text-primary-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Create New Resume</h1>
            </div>
            
            {renderProgressBar()}
            
            <form>
              {renderStep()}
              {renderNavigationButtons()}
            </form>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="lg:sticky lg:top-8 space-y-6">
              <div className="bg-white shadow rounded-lg overflow-auto max-h-[calc(100vh-8rem)]">
                <ResumePreview />
              </div>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleDownload('pdf')}
                  icon={<Download className="h-4 w-4" />}
                >
                  Download PDF
                </Button>
                <Button
                  onClick={handleSave}
                  icon={<Save className="h-4 w-4" />}
                >
                  Save Resume
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CreateResume;