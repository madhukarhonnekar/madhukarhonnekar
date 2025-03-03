export interface Skill {
  name: string;
  icon: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps';
}

export interface Project {
  name: string;
  client: string;
  domain?: string;
  description: string;
  responsibilities: string[];
}

export interface Experience {
  designation: string;
  organization: string;
  duration: string;
}

export interface Education {
  degree: string;
  institution: string;
  score: string;
}