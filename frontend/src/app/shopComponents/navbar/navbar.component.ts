import {Component, Input} from '@angular/core';
import {User} from "../../models/users/User";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() user: User|null ;
  @Input() cartNumber: number ;


}
