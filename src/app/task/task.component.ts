import { Component, OnInit } from '@angular/core';
import {POSTS} from '../mock-posts';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  posts = POSTS;
  constructor() { }

  ngOnInit() {
  }

}
