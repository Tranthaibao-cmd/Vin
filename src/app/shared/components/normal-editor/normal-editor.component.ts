import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-normal-editor',
  templateUrl: './normal-editor.component.html',
  styleUrls: ['./normal-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NormalEditorComponent),
      multi: true,
    },
  ],
})
export class NormalEditorComponent implements OnInit, ControlValueAccessor {

  @Input('placeholder') placeholder: string  ="Nhập mô tả "
  content: string;
  propagateChange = (_: any) => {};

  writeValue(obj: any): void {
    if (obj !== undefined) {
      this.content = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}
  constructor() {}

  ngOnInit() {}

  @Input('config') config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '5rem',
    maxHeight: 'auto',
    placeholder: 'Nhập mô tả ... ',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      [
        // 'undo',
        // 'redo',
        // 'bold',
        // 'italic',
        // 'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
      ],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        // 'link',
        // 'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode',
      ],
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  propagateFn(event: any) {
    this.content = event;
    this.propagateChange(event);
  }
}
