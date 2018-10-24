import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL = 'http://localhost:2011';

  constructor(private http: HttpClient) { }

  getPosts() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let params = new HttpParams();

    return this.http.get(`${API_URL}/tasks`, { headers: headers, params: params });
  }

  getBids() {
      const url: string = `${API_URL}/bids/${post.id}'`;
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');

      return this.http.get(url, { headers: headers });
  }

  makeBid(bid: Bid) {
      const url: string = `${API_URL}/bids/${bid.post_id}'`;
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');

      let params = new HttpParams();
      params.append("bid", bid);

      return this.http.post(url, { headers: headers, params: params });
  }

  deleteBid(post_id, bidder_id) {

  }

  editTask(task) {
      const url: string = `${API_URL}/tasks/edit/${post.id}'`;
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');

      let params = new HttpParams();
      params.append("post", post);
      // params.append("cuisine", post.cuisine);
      // params.append("description", post.description);
      // params.append("title", post.title);
      // params.append("bid_close", post.bid_close);
      // params.append("budget", post.budget);
      // params.append("diet", post.diet);
      // params.append("poster_id", post.poster_id);
      // params.append("location", post.location);
      // params.append("event_date", post.event_date);
      // params.append("quality", post.quality);
      // params.append("num_ppl", post.num_ppl);

      return this.http.post(url, { headers: headers, params: params });
  }

  deleteTask(post_id) {
      const url: string = `${API_URL}/tasks/edit/${post_id}'`;
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');

      let params = new HttpParams();
      params.append("post_id", post_id);

      return this.http.get(url, { headers: headers, params: params });
  }


}
