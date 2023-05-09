import {Component} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../models/users/User";
import {UserService} from "../../services/users/user.service";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  private routeSub: Subscription;
  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params['id']);
      if (params['id']) {
        this.userService.getUserInfoFromId(params['id']).subscribe(
          user => this.user$.next(user)
        )
      } else {
        this.userService.getUserInfo().subscribe(
          user => this.user$.next(user)
        )
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
