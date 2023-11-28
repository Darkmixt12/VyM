import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'vym-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.scss'],
})
export class NavBarComponent {
  atributo() {
    const primaryNav = document.querySelector('.primary-navigation');
    const visibility = primaryNav?.getAttribute('data-visible');

    if (visibility === 'false') {
      primaryNav?.setAttribute('data-visible', 'true');
      console.log(primaryNav);
      console.log(visibility)
    } else if (visibility === 'true') {
      primaryNav?.setAttribute('data-visible', 'false');
      console.log(primaryNav);
      console.log(visibility)
    }
  }
}
