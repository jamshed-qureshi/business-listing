import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BusinessService{
	constructor(private http: Http){

	}

	getBusinesses(){
		return this.http.get('/api/business/getall')
			.map(res => res.json());
	}

	saveBusiness(business) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post('/api/business/addbusiness', JSON.stringify(business), { headers: headers })
			.map(res => res.json());
	}

	updateBusiness(business) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.put('/api/business/editbusiness/' + business._id, JSON.stringify(business), { headers: headers });
	}

	deleteBusiness(id){
		return this.http.delete('/api/business/deletebusiness/' + id).map(res => res.json());
	}
}