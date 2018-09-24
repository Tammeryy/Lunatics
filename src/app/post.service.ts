import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Post } from './post';
import { POSTS } from './mock-posts';
import { HttpClient, HttpHeaders } from '@angular/common/http';


