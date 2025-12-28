
export interface Project {
  title: string;
  description: string;
  tags: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
