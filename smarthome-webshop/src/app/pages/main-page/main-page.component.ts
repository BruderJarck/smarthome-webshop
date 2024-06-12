import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginFailedComponent } from 'src/app/components/login-failed/login-failed.component';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  durationInSeconds = 5;

  constructor(
    public sharedService: SharedService,
    private snackBar: MatSnackBar,
  ) { }


  ngOnInit(): void {
    this.sharedService.calcTotalAmmount();
    this.sharedService.loginFailed.subscribe(
      failState => {
        if (failState == true) {
          this.openLoginFailedSnackBar()
          this.sharedService.loginFailed.next(false)
        }
      }
    )
  }

  openLoginFailedSnackBar() {
    this.snackBar.openFromComponent(LoginFailedComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
