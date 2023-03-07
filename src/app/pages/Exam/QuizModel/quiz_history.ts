import { Quiz } from "./quiz"

export class QuizHistory{
    quiz:Quiz = new Quiz()
    user_id:number = 0
    user_name:string ='user-name-exp'
    score:number=0
    question_correct:number=0
    question_total:number=0
    started_time:number=0
    submitted_time:number=0

    constructor(){}
}