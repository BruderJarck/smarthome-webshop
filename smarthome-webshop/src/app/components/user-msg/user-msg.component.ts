import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-user-msg',
  templateUrl: './user-msg.component.html',
  styleUrls: ['./user-msg.component.scss']
})
export class UserMsgComponent implements OnInit {
  errorMessage: string = ""
  progressValue: number = 100
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }

  ngOnInit(): void {
    this.errorMessage = this.data
    this.startCountdown(4)
  }

  startCountdown(seconds: number): void {
    const countdown$ = interval(10).pipe(
      take(seconds * 100), 
      map((tick) => seconds *100 - tick) 
    );

    countdown$.subscribe({
      next: (remainingTime) => {
        this.progressValue = Math.ceil(remainingTime / seconds)
      },
    });
  }

}
