import { OpenAI } from "openai";
import axios from "axios";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const improveSummary = async (summary: String, description: String) => {

  const prompt = `
    I want to apply to this role:
    
    "${description}"
    
    Here is my current summary:
    
    "${summary}"

    Rewrite the summary to sound more tailored to this job, more confident, and professionally persuasive.
    `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that improves resume summaries."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 150, 
      temperature: 0.7
    });

    const content = response.choices[0].message.content;
    return content ? content.trim() : "";
  } catch (error) {
    console.error("Error improving summary:", error);
    throw error;
  }
}

export const addResume = async (resumeData: any, resumeTitle: String, description: String) => {
  // alert("add");
  const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/resume/new', {resumeData, resumeTitle, description});
  alert(response);
}