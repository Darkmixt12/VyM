import { NavBarComponent } from '@vym/libs/frontend/shared/navbar';

//import { FooterComponent } from '@vym/libs/frontend/shared/footer';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '@vym/libs/frontend/shared/footer';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'vym-app',
  standalone: true,
  imports: [CommonModule, FooterComponent, NavBarComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
