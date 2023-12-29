export interface Answer {
    id: number;
    userId: number;
    questionId: number;
    answerText: string;
  }
  

  export interface Question {
    id: number;
    text: string;
  }