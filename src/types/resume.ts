export interface LiveResumePreviewProps {
  dimensions: {
    width: string;
    height: string;
  };
}

export interface PersonalInfo {
  name: string;
  city: string;
  state: string;
  email: string;
  phone: string;
  linkedin: string;
}




export interface ResumeEntry {

  id: string;

  position: string;

  company: string;

  location: string;

  content: string;

  timestamps: {

      from: string;

      to: string;

  };

  prompt: string;

  response: string; // Added the missing 'response' property

  showPrompt: boolean;

}


export interface ResumeSection {
  id: string;
  heading: string;
  entries?: ResumeEntry[];
}



