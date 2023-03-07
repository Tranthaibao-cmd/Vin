import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  base64ToFile,
  Dimensions,
  ImageCroppedEvent,
  ImageTransform,
} from 'ngx-image-cropper';

@Component({
  selector: 'app-cropper-image',
  templateUrl: './cropper-image.component.html',
  styleUrls: ['./cropper-image.component.scss'],
})
export class CropperImageComponent implements OnInit, OnChanges {
  @Input('src-img') srcImg: string =
    '../../../../assets/create-course/placeholder (1).jpg';
  @Output('img-cropped') imgCropped = new EventEmitter();
  @Input('filename') filename: string = 'Chưa có file được chọn';
  actionName: string = 'Chọn ảnh';
  fileReturn: File = null;
  imageChangedEvent: any = '';
  croppedImage: any = null;
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  fileChangeEvent(event: any): void {
    this.filename = event.target.files[0].name;
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  base64ToFile(data: any, filename: any) {
    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  saveImg() {
    if (this.croppedImage) {
      //change to file to updaload to database
      this.fileReturn = this.base64ToFile(this.croppedImage, this.filename);
      this.imgCropped.emit({ file: this.fileReturn, imgName: this.filename });
    }
  }
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.srcImg = this.srcImg
      ? this.srcImg
      : '../../../../assets/create-course/placeholder (1).jpg';
    if(this.filename){
      this.actionName ='Thay đổi ảnh'
    }
    else{
      this.filename = 'Chưa có file được chọn'
    }

  }
}
