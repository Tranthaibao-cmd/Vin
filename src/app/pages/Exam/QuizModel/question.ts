import { Option } from './option';

export class Question {
    id: number = 0
    name: string = 'question-name'
    quiz_id:number = 0
    question_type:number = 0
    options:Option[] = []
    answered:boolean = false
    is_right:boolean = false

    constructor(){}
    // constructor(question?:any)
    // {
    //     this.id = question.id
    //     this.name = question.name
    //     this.quiz_id = question.quiz_id
    //     this.question_type = question.question_type
    //     this.options = question.options
    //     this.answered = question.answered
    // }
   
}


