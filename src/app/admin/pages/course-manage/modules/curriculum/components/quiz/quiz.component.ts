import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from '../../models/answer';
import { Question } from '../../models/question';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  @Input('content-id') content_id: string;
  @Input('course-id') course_id: string;
  questions: Array<Question> = [];

  formAction = 'save';

  addNewQuestion: boolean = false;
  newQuestion: Question;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    //get all questions via content id
    this.questionService
      .getAllQuestionViaContent(this.content_id, 'preview')
      .subscribe((res: Array<Question>) => {
        this.questions = res;
      });
  }

  btnClickEventHandler(event: any) {
    if (event.status === 0) this.addNewQuestion = false;
  }

  createNewQuestion() {
    this.formAction = 'save';
    this.addNewQuestion = true;
    let answers: Array<Answer> = [1, 2, 3].map((order) => {
      return {
        id: String(Date.now() + order),
        name: '',
        description: '',
      };
    });
    this.newQuestion = {
      id: String(Date.now()) + Math.random().toString(16).slice(2),
      answers: answers,
      answers_right_id: [],
      question_type: 'radio',
      course_id: this.course_id,
      content_id: this.content_id,
    };
  }

  addAnswer() {
    this.newQuestion.answers.push(this.newAnswer());
  }

  newAnswer(): Answer {
    return {
      id: String(Date.now()),
      name: '',
      description: '',
    };
  }
  saveQuestion() {
    if (this.formAction == 'save') {
      //save to database
      this.questionService.addQuestion(this.newQuestion).subscribe();
      //update the screen
      this.questions.push(this.newQuestion);
    } else {
      //update

      let questionUpdate: Question = {
        name: this.newQuestion.name,
        description: this.newQuestion.description,
        answers: this.newQuestion.answers,
        answers_right_id: this.newQuestion.answers_right_id,
        question_type: this.newQuestion.question_type,
      };
      this.questionService
        .updateQuestion(this.newQuestion.id, questionUpdate)
        .subscribe((res) => {
          //update in FE
          let qsIndex = this.questions.findIndex(
            (qs) => qs.id === this.newQuestion.id
          );
          this.questions[qsIndex] = this.newQuestion;
        });
    }
    this.addNewQuestion = false;
  }

  editQuestion(question: Question) {
    this.formAction = 'edit';
    //assign question for edit
    //copy object
    this.newQuestion = JSON.parse(JSON.stringify(question));
    this.addNewQuestion = true;
  }

  deleteQuestion(question_id: string) {
    //delete from database
    this.questionService.removeQuestion(question_id).subscribe();
    this.questions = this.questions.filter((qs) => qs.id != question_id);
  }
}
