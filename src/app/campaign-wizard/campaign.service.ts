import { Subject } from "rxjs";
import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable()
export class CampaignService implements OnInit {
  campaignPage = new Subject<number>();
  submitForm = new Subject<any>();

  stages = ["targeting", "segment", "summary"];
  currPage = 0;
  firebaseUrl = "https://campaign-management-system.firebaseio.com/";
  campaignData: {
    name: string;
    budget: number;
    bid: number;
    start: string;
    end: string;
    devices: string[]
  };
  originalName: string = null
  buildMode = false;
  editMode = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
      this.campaignData.name = '';
      this.campaignData.budget = 0;
      this.campaignData.bid = 0;
      this.campaignData.start = '';
      this.campaignData.end = '';
      this.campaignData.devices = [];
  }

  changePage(newPage: number) {
    this.currPage = newPage;
    this.campaignPage.next(this.currPage);
  }

  getCurrPage() {
    return this.currPage;
  }

  saveData(data) {
      this.campaignData = data;
      
      this.buildMode = true;
  }

  storeData() {
    return this.http.put(
      `https://campaign-management-system.firebaseio.com/campaigns/${this.campaignData.name}.json`,
      this.campaignData
    ).subscribe((response: HttpResponse<any>) => {
        console.log(response);
        if (this.campaignData.name !== this.originalName) {
            this.http.delete(
                `https://campaign-management-system.firebaseio.com/campaigns/${this.originalName}.json`,
            ).subscribe((response: HttpResponse<any>) => {console.log(response)})
        }
        setTimeout(() => {
            this.buildMode = false
            this.editMode = false
            this.originalName = null;
            this.router.navigate(['/campaign-list'])
        }, 1000)
      });
  }

  getData() {
      return {...this.campaignData}
}

getDataAsync() {
    return this.http.get('https://campaign-management-system.firebaseio.com/campaigns.json')
  }

  saveDevices(devices) {
    this.campaignData.devices = devices;
  }

  getDevices() {
    return [...this.campaignData.devices]
  }

  onSubmitForm(newPage: number) {
    console.log("navigating to page", this.stages[newPage]);
    this.router.navigate(["/" + this.stages[newPage]]);
    this.changePage(newPage);
    this.submitForm.next();
  }
}
