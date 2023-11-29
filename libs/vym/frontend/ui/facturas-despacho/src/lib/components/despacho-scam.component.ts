import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'vym-despacho-scam',
  templateUrl: './despacho-scam.component.html',
  styleUrls: ['./despacho-scam.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DespachoScamComponent {}

@NgModule({
  imports: [CommonModule],
  declarations: [DespachoScamComponent],
  exports: [DespachoScamComponent],
})
export class DespachoScamComponentModule {}
