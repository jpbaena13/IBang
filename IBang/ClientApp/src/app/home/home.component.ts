import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';

import { AuthenticationService } from '../_services/AuthenticationService';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  })
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  activities: any;
  description = new FormControl('');

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    if (!this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
    }

    this.activities = [];
  }

  ngOnInit() {
    var userid = this.authenticationService.currentUserValue.id;
    this.http.get(this.baseUrl + 'api/activities?userid=' + userid)
      .subscribe(activities => {
        this.activities = activities;
      });
  }

  createActivity() {
    if (this.description.value == '') return;

    this.http.post(this.baseUrl + 'api/activities', {
      title: this.description.value,
      userid: this.authenticationService.currentUserValue.id
    }, httpOptions)
      .subscribe(
        activity => {
          this.activities.push(activity);
        },
        error => console.error(error)
      );
  }

  public logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  public goTimes(event, activityid) {
    this.router.navigate(['/times/' + activityid]);
  }
}
