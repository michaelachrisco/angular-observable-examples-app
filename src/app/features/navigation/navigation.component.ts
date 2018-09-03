import { Component }  from '@angular/core';

import { RoutedLink } from '../../core/models/routed-link';

@Component({
  selector    : 'app-navigation',
  templateUrl : './navigation.component.html',
  styleUrls   : ['./navigation.component.scss'],
})
export class NavigationComponent {
  public linkList: RoutedLink[] = [
    {
      name  : 'Home',
      route : '',
    },
    {
      name  : 'About',
      route : '/about',
    },
    {
      name  : 'Resources',
      route : '/resources',
    },
    {
      name  : 'Contact',
      route : '/contact',
    },
  ];

  constructor() { }
}
