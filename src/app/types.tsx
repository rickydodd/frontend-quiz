export type Questions = {
  question: string;
  options: string[];
  answer: string;
}[];

export type Quiz = {
  title: string;
  icon: string;
  color: string;
  questions: Questions;
};
