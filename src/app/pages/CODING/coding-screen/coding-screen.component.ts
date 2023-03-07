import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ClockComponent } from '../../../core/modules/components/clock/clock.component';
import { CodingScreenService } from './coding-screen.service';

@Component({
  selector: 'app-coding-screen',
  templateUrl: './coding-screen.component.html',
  styleUrls: ['./coding-screen.component.scss'],
})
export class CodingScreenComponent implements OnInit, OnDestroy, AfterViewInit {
  // hide some field of every testcase
  is_get_testcase_result = false;
  compile_error = {is_compile_error :false,detail: ''}
  testcase_hide_sum:number = 0

  //content loaded
  contentLoaded_question = false;
  contentLoaded_testcase = false;
  contentLoaded_scripts = false;
  //set time for app-clock
  time: number = 60;
  //question in current
  question_current: Question = new Question();
  question_current_subject$ = new BehaviorSubject<Question>(
    this.question_current
  );
  //list of testcase in current
  testcase_current_list: TestCase[] = [];

  all_questions_observable!: Observable<Question[]>;

  format = '.py';
  listfileType = {
    python: '.py',
    cpp: '.cpp',
    java: '.java',
    javascript: '.js',
  };
  background_color = '';
  text_color = '';
  editorOptions = {
    theme: 'vs-dark',
    language: 'python',
    automaticLayout: true,
  };
  code: string = '';

  LanguageSubject$ = new BehaviorSubject<string>(this.editorOptions.language);

  @ViewChild(ClockComponent) clock!: ClockComponent;

  constructor(
    public dialog: MatDialog,
    private elRef: ElementRef,
    private route: ActivatedRoute,
    private CodingService: CodingScreenService
  ) {}

  ngOnInit() {
    let id_ky_thi = this.route.snapshot.paramMap.get('id_ky_thi')!;
    this.time =
      Number(this.route.snapshot.queryParamMap.get('thoigianlambai')) * 60;

    this.all_questions_observable = this.getAllQuestion(id_ky_thi);

    //testcase subscribe to question current subject
    this.question_current_subject$.subscribe((question: Question) => {
      //this.question_current = question
      if (question.id != '') {
        this.getTestCaseList(question.id);
        this.getTemplateLanguage(question.id, this.editorOptions.language);
      }
    });
    //subcribe to editorOptions subject
    this.LanguageSubject$.subscribe((language: any) => {
      if (this.question_current.id != '' && language != null) {
        this.getTemplateLanguage(this.question_current.id, language);
      }
    });
  }
  //will is call after ngAfterView
  //will be used when I subscribe in view(like async subscribe way)

  ngAfterViewInit() {
    this.LanguageSubject$.next(this.editorOptions.language);
  }

  ngOnDestroy() {
    this.question_current_subject$.complete();
    this.LanguageSubject$.complete();
    this.clock.onTimesUp();
  }

  getAllQuestion(id_ky_thi: string): Observable<Question[]> {
    return this.CodingService.getAllCauHoi(id_ky_thi).pipe(
      map((question_list: Question[]) => {
        this.question_current = question_list[0];
        this.question_current_subject$.next(this.question_current);
        this.contentLoaded_question = true;
        return question_list;
      })
    );
  }

  getTestCaseList(cauhoiid: string): void {
    this.CodingService.getAllTestCase(cauhoiid)
      .pipe(first())
      .subscribe((data: { cau_hoi: Question; list_testcase_not_hide: TestCase[];testcase_hide_sum:number }) => {
        this.testcase_current_list = data.list_testcase_not_hide;
        this.testcase_hide_sum = data.testcase_hide_sum;
        this.contentLoaded_testcase = true;

      });
  }

  getTemplateLanguage(cauhoiid: string, language_name: string) {
    this.CodingService.getTemplateOfLanguage(cauhoiid, language_name)
      .pipe(first())
      .subscribe(
        (template: string) => {
          this.contentLoaded_scripts = true;
          this.code = template;
        },
        (err: HttpErrorResponse) => {
          console.error(err);
        }
      );
  }

  changeQuestion(question: Question) {
    this.contentLoaded_testcase = false;
    this.contentLoaded_scripts = false;
    this.question_current_subject$.next(question);
    this.is_get_testcase_result = false
  }
  onInit(editor: any) {
    let line = editor.getPosition();
  }

  back() {
    window.history.back();
  }

  openDialog() {
    const dialogRef = this.dialog.open(OptionCodingEditor, {
      data: this.editorOptions,
      autoFocus: false,
      restoreFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {

        this.editorOptions = {
          theme: result.theme,
          language: result.language,
          automaticLayout: true,
        };
        let lg = this.editorOptions.language;
        this.format = (this.listfileType as any)[lg];
        this.changeColor();
        this.updateCustomProperty();
        //load again template of code
        //use for mat-spiner
        this.contentLoaded_scripts = false;

        this.LanguageSubject$.next(this.editorOptions.language);

        //reload test case
        this.is_get_testcase_result = false
      }
    });
  }
  openDialogSub() {
    const dialogRefSub = this.dialog.open(DialogSubmit);
    dialogRefSub.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  updateCustomProperty() {
    this.elRef.nativeElement.style.setProperty(
      '--background_color',
      `${this.background_color}`
    );
    this.elRef.nativeElement.style.setProperty(
      '--text_color',
      `${this.text_color}`
    );
  }

  changeColor() {
    if (this.editorOptions.theme === 'vs-dark') {
      this.background_color = '#1e1e1e';
      this.text_color = 'white';
    }
    if (this.editorOptions.theme === 'vs-light') {
      this.background_color = 'white';
      this.text_color = 'black';
    }
  }

  runTest() {
    this.contentLoaded_testcase = false;
    this.CodingService.runTest(
      this.question_current.id,
      this.editorOptions.language,
      this.code
    )
      .pipe(first())
      .subscribe((result_testcase_list: any) => {
        console.log(result_testcase_list);
        this.contentLoaded_testcase = true;
        //if is error
        if(result_testcase_list.is_compile_error)
        {
          //now result_testcase_list is compile error
          // assign compile error
          this.compile_error = result_testcase_list
          return
        }
        this.compile_error.is_compile_error = false
        this.is_get_testcase_result = true
        for (let testcase of this.testcase_current_list) {
          for (var reresult_testcase of result_testcase_list) {
            if (reresult_testcase['id'] == testcase.id) {
              testcase.output = reresult_testcase.output;
              testcase.console_log = reresult_testcase.console_log;
              testcase.score = reresult_testcase.score;
              break;
            }
          }
        }

        //change address of testcase_current_list
        //the purpose: reload testcase list
        this.testcase_current_list = JSON.parse(
          JSON.stringify(this.testcase_current_list)
        );


      });
  }
}

@Component({
  selector: 'option-coding-editor',
  templateUrl: './option-coding-editor.html',
})
export class OptionCodingEditor {
  fg: any;
  list_language = ['python', 'cpp', 'java'];
  list_theme = ['vs-light', 'vs-dark'];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<OptionCodingEditor>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fg = fb.group({
      theme: new FormControl(data.theme, [Validators.required]),
      language: new FormControl(data.language, [Validators.required]),
    });
  }

  chooseOption() {
    let data = this.fg.value;
    this.dialogRef.close(data);
  }
}
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './dialog-submit.html',
})
export class DialogSubmit {
  constructor(
    public dialogRefSub: MatDialogRef<DialogSubmit>,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    console.log('This is init method');
  }
  alertWithSuccess() {
    Swal.fire(
      'Bạn đã hoàn thành bài thi!',
      'You submitted succesfully!',
      'success'
    );
  }
}

//interface for Question
export class Question {
  dau_vao: { ten_dau_vao: string; kieu_du_lieu: string }[] = [];
  gioi_han_thuc_thi: number = 0;
  id: string = '';
  kieu_du_lieu_dau_ra: string = '';
  ma_ky_thi: string = '';
  mo_ta: string = '';
  ngay_tao: number = 0;
  ten_cau_hoi: string = '';
  ten_ham: string = '';
  ten_ky_thi: string = '';

  constructor() {}
}

export class TestCase {
  chuoi_gia_tri_dau_vao: {
    ten_dau_vao: string;
    kieu_du_lieu: string;
    gia_tri: string;
  }[] = [];
  gia_tri_dau_ra: { kieu_du_lieu: string; gia_tri: string } = {
    kieu_du_lieu: '',
    gia_tri: '',
  };
  id: string = '';
  ma_cau_hoi: string = '';
  ten_cau_hoi: string = '';
  output: string = '';
  score: number = 0;
  console_log: string = '';

  constructor() {}
}
