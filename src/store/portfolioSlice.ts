import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Skill, Project, Experience, Education } from '../types';

interface PortfolioState {
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  activeSection: string;
}

const initialState: PortfolioState = {
  skills: [
    {
      name: 'React.js',
      icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
      category: 'Frontend'
    },
    {
      name: 'Next.js',
      icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg',
      category: 'Frontend'
    },
    {
      name: 'TypeScript',
      icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
      category: 'Frontend'
    },
    {
      name: 'JavaScript',
      icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
      category: 'Frontend'
    },
    {
      name: 'Angular',
      icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg',
      category: 'Frontend'
    },
    {
      name: 'Node.js',
      icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
      category: 'Backend'
    },
    {
      name: '.NET Core',
      icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/dotnetcore/dotnetcore-original.svg',
      category: 'Backend'
    },
    {
      name: 'PHP',
      icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg',
      category: 'Backend'
    },
    {
      name: 'Laravel',
      icon: 'https://cdn.worldvectorlogo.com/logos/laravel-2.svg',
      category: 'Backend'
    },
    {
      name: 'PostgreSQL',
      icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg',
      category: 'Database'
    },
    {
      name: 'MySQL',
      icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg',
      category: 'Database'
    },
    {
      name: 'MS SQL',
      icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
      category: 'Database'
    },
    {
      name: 'Git',
      icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg',
      category: 'DevOps'
    },
    {
      name: 'AWS',
      icon: 'https://cdn.worldvectorlogo.com/logos/aws-2.svg',
      category: 'DevOps'
    }
  ],
  projects: [
    {
      name: 'Warehouse Management System (WMS)',
      client: 'NABARD',
      description: 'Farmers keep various types of agriculture goods in warehouses. Project is a solution to make warehouse management effective i.e. goods in-out and give correct live capacity of warehouse on dashboard to make it convenient for both farmers and to administrator of warehouse',
      responsibilities: [
        'Actively communication with clients to understand the software requirements',
        'Collaboration with UI-UX team to implement designs',
        'Developing the Web application from scratch to deployment',
        'API design and development',
        'Database schema design and implementation',
        'Bug fixing and production support',
        'Designed and implemented RESTful Web APIs using .NET Core',
        'Developed a responsive front-end with React.js and AJAX for real-time data updates',
        'Created a robust SQL Server database schema for efficient inventory data management',
        'Implemented role-based access control (RBAC) to ensure data security',
        'Collaborated with cross-functional teams to gather business requirements'
      ]
    },
    {
      name: 'Authentz AI Interview Portal',
      client: 'Adventus',
      domain: 'AI Interview & Student Verification',
      description: 'Authentz contains the AI interview process of students who are generally want to take the Admission into the global universities and through this portal we are validating the students as well as conduct their interview through our AI bot named as AUNA. Also in this project we validate the students, captures their fraudulent activity, also process the documents verification and check either he has provided the correct one or not',
      responsibilities: [
        'Developed a React.js-based interactive user interface for seamless student interactions',
        'Integrated Node.js & Laravel APIs for backend operations, ensuring secure & efficient data handling',
        'Implemented fraud detection algorithms to capture suspicious activities during the interview process',
        'Designed a document verification system to validate student credentials automatically',
        'Improved system performance & security, ensuring smooth AI-driven interviews'
      ]
    }
  ],
  experiences: [
    {
      designation: 'Software Engineer',
      organization: 'Xtensible Software Technologies Pvt. Ltd. Pune',
      duration: 'December 2020 to Present'
    },
    {
      designation: 'Software Engineer',
      organization: 'Conserve Infotech Pvt. Ltd. Jaipur',
      duration: 'March 2018 to November 2020'
    }
  ],
  education: [
    {
      degree: 'Bachelor of Computer Science and Engineering',
      institution: 'Shivaji University, Kolhapur',
      score: 'First Class'
    },
    {
      degree: 'Diploma in Computer Engineering',
      institution: 'Gaurishankar Polytechnic, Satara',
      score: '65.29%'
    },
    {
      degree: 'S.S.C.',
      institution: 'J.N.V., Satara',
      score: '62.80%'
    }
  ],
  activeSection: 'home'
};

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    }
  }
});

export const { setActiveSection } = portfolioSlice.actions;
export default portfolioSlice.reducer;