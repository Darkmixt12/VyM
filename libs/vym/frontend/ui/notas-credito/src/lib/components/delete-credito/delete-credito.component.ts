import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'vym-delete-credito',
  templateUrl: './delete-credito.component.html',
  styleUrl: './delete-credito.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteCreditoComponent {}

@NgModule({
  imports: [CommonModule],
  declarations: [DeleteCreditoComponent],
  exports: [DeleteCreditoComponent],
})
export class DeleteCreditoComponentModule {}
