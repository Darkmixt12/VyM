import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'vym-notas-credito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notas-credito.component.html',
  styleUrls: ['./notas-credito.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotasCreditoComponent {}
