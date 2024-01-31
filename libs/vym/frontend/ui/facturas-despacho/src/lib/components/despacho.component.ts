import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'vym-despacho',
  templateUrl: './despacho.component.html',
  styleUrls: ['./despacho.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DespachoComponent {}

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [],
  exports: [],
})
export class DespachoComponentModule {}
