import { Quiz } from "@user_pages/Exam/QuizModel/quiz";

export interface Exam
{
  theoretical_part:{quiz:Quiz;total_questions:number}
  practice_part:{link:string;host: string}
  end_time:number
  limit_time:number
}
