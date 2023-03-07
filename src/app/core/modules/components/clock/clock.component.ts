import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
})
export class ClockComponent implements OnInit {
  // specify format for all time in this component is seconds
  @Input("end-time") END_TIME:any;
  @Input("limit-time") LIMIT_TIME:any;
  @Input('height') height_of_cicle = '100px'
  @Input('width') width_of_cicle = '100px'

  FULL_DASH_ARRAY = 283 ;
  WARNING_THRESHOLD = 15 * 60;
  ALERT_THRESHOLD = 10 *60;

  COLOR_CODES = {
    info: {
      color: 'green',

    },
    warning: {
      color: 'orange',
      threshold: this.WARNING_THRESHOLD,
    },
    alert: {
      color: 'red',
      threshold: this.ALERT_THRESHOLD,
    },
  };


  //@Input('time-passed') timePassed = 0;
  LEFT_TIME:any
  PASSED_TIME:any
  timerInterval: any;
  remainingPathColor = this.COLOR_CODES.info.color;

  constructor(private elRef:ElementRef) {

  }
  ngOnInit(): void {
    this.startTimer();
    this.updateCustomProperty()
  }
  updateCustomProperty()
  {
    this.elRef.nativeElement.style.setProperty('--height',`${this.height_of_cicle}`)
    this.elRef.nativeElement.style.setProperty('--width',`${this.width_of_cicle}`)

  }
  onTimesUp() {
    clearInterval(this.timerInterval);
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      var end_time = new Date(this.END_TIME).getTime();
      var now = new Date().getTime();
      var milisec_diff = end_time - now;
      this.LEFT_TIME = Math.floor(milisec_diff /1000);
      this.PASSED_TIME = Math.floor(this.LIMIT_TIME - this.LEFT_TIME) ;

      (document.getElementById(
        'base-timer-label'
      ) as HTMLInputElement).innerHTML = this.formatTime(this.LEFT_TIME);

      this.setCircleDasharray();
      this.setRemainingPathColor(this.LEFT_TIME);

      if (this.LEFT_TIME === 0) {
        this.onTimesUp();
      }
    }, 1000);
  }

  formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    let seconds;

    if (time % 60 < 10) {
      seconds = `0${time % 60}`;
    }
    else
    {
      seconds = time % 60;
    }

    return `${minutes}:${seconds}`;
  }

  setRemainingPathColor(timeLeft: any) {
    const { alert, warning, info } = this.COLOR_CODES;
    if (timeLeft <= alert.threshold) {
      (document.getElementById(
        'base-timer-path-remaining'
      ) as HTMLInputElement).classList.remove(warning.color);
      (document.getElementById(
        'base-timer-path-remaining'
      ) as HTMLInputElement).classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
      (document.getElementById(
        'base-timer-path-remaining'
      ) as HTMLInputElement).classList.remove(info.color);
      (document.getElementById(
        'base-timer-path-remaining'
      ) as HTMLInputElement).classList.add(warning.color);
    }
  }

  calculateTimeFraction() {
    const rawTimeFraction = this.LEFT_TIME / this.LIMIT_TIME;
    return rawTimeFraction - (1 / this.LIMIT_TIME) * (1 - rawTimeFraction);
  }

  setCircleDasharray() {
    const circleDasharray = `${(
      this.calculateTimeFraction() * this.FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    (document.getElementById(
      'base-timer-path-remaining'
    ) as HTMLInputElement).setAttribute('stroke-dasharray', circleDasharray);
  }
}
