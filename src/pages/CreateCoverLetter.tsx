import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';
import { FileText, Wand2 } from 'lucide-react';

const CreateCoverLetter: React.FC = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [formData, setFormData] = useState({
    recipientName: '',
    companyName: '',
    jobTitle: '',
    jobDescription: '',
    relevantExperience: '',
    customization: '',
    tone: 'professional', // professional, friendly, confident
    applicantName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      // In a real app, this would call an AI API endpoint
      // Example API call structure:
      // const response = await fetch('/api/generate-cover-letter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // const data = await response.json();
      // setGeneratedContent(data.content);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate generated content
      const mockGeneratedContent = `Dear ${formData.recipientName || 'Hiring Manager'},

I am writing to express my strong interest in the ${formData.jobTitle} position at ${formData.companyName}. With my background in ${formData.relevantExperience.split('.')[0]}, I am confident in my ability to contribute effectively to your team.

[AI-generated content would be inserted here based on job description and experience]

Thank you for considering my application. I look forward to discussing how I can contribute to ${formData.companyName}'s success.

Best regards,
${formData.applicantName}`;

      setGeneratedContent(mockGeneratedContent);
      toast.success('Cover letter generated successfully!');
    } catch (error) {
      toast.error('Failed to generate cover letter. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white shadow rounded-lg p-6 md:p-8">
          <div className="flex items-center mb-6">
            <FileText className="h-8 w-8 text-primary-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Create Cover Letter</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700">
                    Recipient's Name
                  </label>
                  <input
                    type="text"
                    id="recipientName"
                    value={formData.recipientName}
                    onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                    placeholder="e.g., Mr. John Smith"
                  />
                </div>

                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                    placeholder="e.g., Acme Corporation"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                    placeholder="e.g., Senior Software Engineer"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
                    Job Description
                  </label>
                  <p className="text-sm text-gray-500 mb-2">
                    Paste the job description to help our AI tailor your cover letter.
                  </p>
                  <textarea
                    id="jobDescription"
                    value={formData.jobDescription}
                    onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                    rows={6}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                    placeholder="Paste the job description here..."
                    required
                  />
                </div>

                <div>
                  <label htmlFor="relevantExperience" className="block text-sm font-medium text-gray-700">
                    Relevant Experience
                  </label>
                  <p className="text-sm text-gray-500 mb-2">
                    Describe your relevant experience and achievements for this role.
                  </p>
                  <textarea
                    id="relevantExperience"
                    value={formData.relevantExperience}
                    onChange={(e) => setFormData({ ...formData, relevantExperience: e.target.value })}
                    rows={4}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                    placeholder="e.g., 5 years of experience in software development, led team of 6 developers..."
                    required
                  />
                </div>

                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    Applicant Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                    placeholder="e.g., Acme Corporation"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="tone" className="block text-sm font-medium text-gray-700">
                    Writing Tone
                  </label>
                  <select
                    id="tone"
                    value={formData.tone}
                    onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                  >
                    <option value="professional">Professional</option>
                    <option value="friendly">Friendly</option>
                    <option value="confident">Confident</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="customization" className="block text-sm font-medium text-gray-700">
                    Additional Customization
                  </label>
                  <p className="text-sm text-gray-500 mb-2">
                    Any specific points you'd like to emphasize or include?
                  </p>
                  <textarea
                    id="customization"
                    value={formData.customization}
                    onChange={(e) => setFormData({ ...formData, customization: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                    placeholder="e.g., Emphasize leadership skills, mention specific project..."
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    isLoading={isGenerating}
                    disabled={isGenerating}
                    icon={<Wand2 className="h-4 w-4" />}
                  >
                    Generate with AI
                  </Button>
                </div>
              </form>
            </div>

            {/* Preview Section */}
            <div className="border-t pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Generated Cover Letter</h2>
              {generatedContent ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700">
                    {generatedContent}
                  </pre>
                  <div className="mt-4 flex justify-end space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        // In a real app, this would download as PDF
                        toast.success('Cover letter downloaded as PDF');
                      }}
                    >
                      Download PDF
                    </Button>
                    <Button
                      onClick={() => {
                        // In a real app, this would save to user's documents
                        toast.success('Cover letter saved to your documents');
                        navigate('/dashboard');
                      }}
                    >
                      Save & Continue
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Fill out the form and click "Generate with AI" to create your cover letter
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateCoverLetter;