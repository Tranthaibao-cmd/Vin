import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CropperImageComponent } from '@shared/components/cropper-image/cropper-image.component';
import { ImageCropperModule } from 'ngx-image-cropper';



@NgModule({
  imports: [CommonModule, FormsModule,ImageCropperModule],
  declarations: [CropperImageComponent],
  exports:[CropperImageComponent]
})
export class CropperImageModule {}