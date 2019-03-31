import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';

import { AuthenticationService } from '../_services/AuthenticationService';

interface TimeResponse {
  activityDate: string,
  value: string,
  error: any
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  })
};

@Component({
  selector: 'app-times',
  templateUrl: './times.component.html',
  styleUrls: ['./times.component.css']
})
export class TimesComponent implements OnInit {

  times: any;
  error: any;
  activityDate = new FormControl('');
  value = new FormControl('');

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    if(!this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }

    this.times = [];
    this.error = -1;
  }

  ngOnInit() {
    var activityid = this.route.snapshot.params['activityid'];
    this.http.get(this.baseUrl + 'api/times?activityid=' + activityid)
      .subscribe(times => {
        this.times = times
      });
  }

  createTime() {
    this.error = -1;
    if (this.activityDate.value == '' || this.value.value == '') return;

    var activityid = this.route.snapshot.params['activityid'];

    this.http.post <TimeResponse>(this.baseUrl + 'api/times', {
      activityid: activityid,
      activitydate: this.activityDate.value,
      value: this.value.value
    }, httpOptions)
      .subscribe(
      time => {
          if (time.error !== undefined) {
            return this.error = time.error;
          }

          this.times.push(time);
        },
        error => console.error(error)
      );
  }

  public logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  public goBack() {
    this.router.navigate(['/home']);
  }

}
