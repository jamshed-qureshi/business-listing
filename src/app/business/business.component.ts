import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BusinessService } from '../business.services';
import { Business } from '../business';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: [],
  providers: [BusinessService]
})
export class BusinessComponent implements OnInit {
	business: Business;
	editvarbusiness: Business;
	newBusiness: Business;
	businesses: Business[];
	appState: string = "default";

	editvar_id: string;
	editvar_company_name: string;
	editvar_location: string;
	editvar_turnover: string;
	editvar_estd: string;
	editvar_no_of_employee: string;
	editvar_category: string;

  	
  	constructor(private businessService: BusinessService) { 

  	}

  	ngOnInit() {
  		this.businesses = [];
  		this.businessService.getBusinesses()
  			.subscribe(data => {
  				this.businesses = data;
  				console.log(this.businesses);
  			})
  		console.log(this.editvarbusiness);	
	}

	setState(state, business) {
		this.appState = state;
		this.business = business;
	}

	addBusiness(business) {
		console.log(business);
		this.businessService.saveBusiness(business)
			.subscribe(
				data => {
					console.log(data);
					this.businesses.push(business);
				}
			);
	}

	editBusiness(state) {
		var editBusiness = {
			_id: this.editvar_id,
			company_name: this.editvar_company_name,
			turnover: this.editvar_turnover,
			estd: this.editvar_estd,
			location: this.editvar_location,
			no_of_employee: this.editvar_no_of_employee,
			category: this.editvar_category
		};
		this.appState = state;
		this.businessService.updateBusiness(editBusiness)
			.subscribe(
				data => {
					console.log(data);
					for(var i = 0; i < this.businesses.length; i++){
						if (this.businesses[i]._id == editBusiness._id){
							this.businesses[i] = editBusiness;
						}
					}
				}
			);
	}

	seteditBusiness(state, business) {
		this.editvar_id = business._id
		this.editvar_company_name = business.company_name;
		this.editvar_turnover = business.turnover;
		this.editvar_estd = business.estd;
		this.editvar_location = business.location;
		this.editvar_no_of_employee = business.no_of_employee;
		this.editvar_category = business.category;
		// console.log(this.editvar_company_name +" "+ this.editvar_location);
		this.appState = state;
	}

	deleteBusiness(value) {
		var businesses = this.businesses
		this.businessService.deleteBusiness(value)
			.subscribe(
				data => {
					console.log(data);
					if(data.n == 1){
			 			for(var i = 0; i < businesses.length; i++){
			 				if(businesses[i]._id == value){
			 					businesses.splice(i, 1);
			 				}
			 			}
			 		}
				}
			);
	}
}


