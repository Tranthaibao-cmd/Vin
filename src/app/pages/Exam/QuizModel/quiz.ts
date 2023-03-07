import { QuizConfig } from './quiz-config';
import { Question } from './question';

export class Quiz {
    id: number = 0;
    is_finished:boolean = false
    name: string = 'quiz-name';
    description: string = 'quiz-description';
    time_open:number = 0;
    time_close:number = 0;
    time_limit:number= 0;
    // config: QuizConfig;
    questions: Question[] = [];

    
    constructor(){};
    // constructor(quiz?:any)
    // {
    //     this.id = quiz.id
    //     this.is_finished = quiz.is_finished
    //     this.name = quiz.name
    //     this.description = quiz.description
    //     this.time_open = quiz.time_open
    //     this.time_close = quiz.time_close
    //     this.time_limit = quiz.time_limit
    //     this.questions = quiz.questions
    // }


}
