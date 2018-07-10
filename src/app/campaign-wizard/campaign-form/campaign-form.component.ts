import { Component, OnInit, OnDestroy } from "@angular/core";
import { CampaignService } from "../campaign.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

import * as moment from 'moment';

@Component({
  selector: "app-campaign-form",
  templateUrl: "./campaign-form.component.html",
  styleUrls: ["./campaign-form.component.scss"]
})
export class CampaignFormComponent implements OnInit, OnDestroy {
  campaignForm: FormGroup;
  subscription: Subscription;
  campaignData = {
    name: "My Campaign",
    budget: 0,
    bid: 0,
    start: "",
    end: ""
  };
  editMode = false;
  day: any = (new Date).getDate()
  month: any = (new Date).getMonth() + 1
  year = (new Date).getFullYear()
  now: string;

  constructor(
    private campaignService: CampaignService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.campaignService.changePage(0);
    this.editMode = this.campaignService.editMode;
    
    // set current date
    if (this.day < 10) this.day = '0' + this.day;
    if (this.month < 10) this.month = '0' + this.month;
    this.now = `${this.year}-${this.month}-${this.day}`;
    this.campaignData.start = this.now
    this.campaignData.end = this.now
    
    if (this.campaignService.buildMode) {
        this.campaignData = this.campaignService.campaignData
        this.campaignData.start = moment(this.campaignData.start).format('YYYY-MM-DD')
        this.campaignData.end = moment(this.campaignData.end).format('YYYY-MM-DD')
    }
    this.campaignForm = new FormGroup({
        'name': new FormControl(this.campaignData.name, Validators.required),
        'budget': new FormControl(this.campaignData.budget, this.lowBudget.bind(this)),
        'bid': new FormControl(this.campaignData.bid, Validators.required),
        'start': new FormControl(this.campaignData.start, Validators.required),
        'end': new FormControl(this.campaignData.end, Validators.required),
    });
    this.subscription = this.campaignService.submitForm.subscribe(
        () => {
            this.onSubmit()
        }
    )
  }

  changePage(page) {
    this.campaignService.changePage(page);
  }

  onSubmit() {
    this.campaignData.name = this.campaignForm.get('name').value;
    this.campaignData.budget = this.campaignForm.get('budget').value;
    this.campaignData.bid = this.campaignForm.get('bid').value;
    this.campaignData.start = moment(this.campaignForm.get('start').value).format('MMM DD, YYYY');
    this.campaignData.end = moment(this.campaignForm.get('end').value).format('MMM DD, YYYY');
    this.campaignService.saveData(this.campaignData)
    // .subscribe((response: HttpResponse<any>) => {
    //   console.log(response);
    // });
  }

  lowBudget(control: FormControl): {[s: string]: boolean} {
      const isInvalid = this.campaignData.bid !== 0 && control.value < this.campaignData.bid * 10
      if (control.value === 0 && control.touched) return {'zero': true}
      if (isInvalid) return {'lowBudget': true};
      else return null;
  }

  updateBid(ev) {
      this.campaignData.bid = ev.target.value;   
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
