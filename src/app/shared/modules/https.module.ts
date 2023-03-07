import { NgModule } from '@angular/core';
import { HttpPipe } from '@shared/pipes/https.pipe';

@NgModule({
  imports: [],
  declarations: [HttpPipe],
  exports:[HttpPipe]

})
export class HttpsModule {}
