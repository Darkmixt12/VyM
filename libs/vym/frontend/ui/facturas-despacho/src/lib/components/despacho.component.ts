import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@vym/libs/frontend/shared/navbar';
import { FooterComponent } from '@vym/libs/frontend/shared/footer';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, NavbarComponent],
  selector: 'vym-despacho',
  templateUrl: './despacho.component.html',
  styleUrls: ['./despacho.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DespachoComponent {}

@NgModule({
  //imports: [CommonModule, RouterModule, FooterComponent, NavbarComponent],
  declarations: [],
  exports: [],
})
export class DespachoComponentModule {}
