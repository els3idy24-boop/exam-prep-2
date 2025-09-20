
export enum QuestionType {
  Map = 'map',
  MultipleChoice = 'multiple-choice',
  Essay = 'essay',
}

export interface Question {
  id: number;
  type: QuestionType;
  category: string;
  question: string;
  options?: string[];
  answer: string;
}
