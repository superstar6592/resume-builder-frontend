import axios from "axios";

export const improveSummary = async (summary: String, description: String) => {

  const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/improveSummary', {
    summary,
    description
  });

  console.log("Response from improveSummary:", response.data);
  return response.data;

}

export const addResume = async (resumeData: any, resumeTitle: String, description: String) => {
  // alert("add");
  const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/resume/new', {resumeData, resumeTitle, description});
  alert(response);
}