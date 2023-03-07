import { Answer } from "./answer";

export interface Question {
  id?: string
  name?: string
  description?: string
  answers?: Array<Answer>
  answers_of_student?:Array<string>
  answers_right_id?: Array<string>
  question_type?: string
  content_id?: string
  course_id?: string
  created_at_seconds?: number
  is_deleted?: boolean
}

export interface QuestionPostOfUser{
  id?: string
  answers_of_student?:Array<string>
}
