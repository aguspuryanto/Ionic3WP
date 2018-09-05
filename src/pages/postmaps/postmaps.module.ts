import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostmapsPage } from './postmaps';

@NgModule({
  declarations: [
    PostmapsPage,
  ],
  imports: [
    IonicPageModule.forChild(PostmapsPage),
  ],
})
export class PostmapsPageModule {}
