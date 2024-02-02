import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'vym-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public imageLogo: string = 'https://res.cloudinary.com/dlsxaumhg/image/upload/v1706838307/locationsFolder/gqgdtefbbj1h9r4p2ibb.png'
  
  atributo() {
    const primaryNav = document.querySelector('.primary-navigation');
    const visibility = primaryNav?.getAttribute('data-visible');

    if (visibility === 'false') {
      primaryNav?.setAttribute('data-visible', 'true');
      console.log(primaryNav);
      console.log(visibility);
    } else if (visibility === 'true') {
      primaryNav?.setAttribute('data-visible', 'false');
      console.log(primaryNav);
      console.log(visibility);
    }
  }
}
