import { ConditionalExpr } from '@angular/compiler';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-file-http',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
})
export class FileHTTPComponent implements OnInit {
  @Input('url') url: string = '';
  name = 'Set iframe source';
  urlSafe: any;
  //@ViewChild('iframe',{static:false}) iframe : any;
  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    //this.resizeIframe()
  }

  resizeIframe(iframe: any, container_iframe: any) {
    
    let iframe_height =
      iframe.contentWindow.document.documentElement.scrollHeight + 'px';
    alert(iframe_height);
    let iframe_ = iframe as HTMLInputElement;
    let container_iframe_ = container_iframe as HTMLInputElement;

    if (iframe_height !== null) {
      iframe_.style.height = iframe_height;
      container_iframe_.style.height = iframe_height;
    }
  }
}
