
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@vym/libs/frontend/shared/footer';
import { NavbarComponent } from '@vym/libs/frontend/shared/navbar';

@Component({
  selector: 'vym-app',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
