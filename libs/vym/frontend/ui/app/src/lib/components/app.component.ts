//import { FooterComponent } from '@vym/libs/frontend/shared/footer';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '@vym/libs/frontend/shared/footer';

@Component({
  selector: 'vym-app',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
