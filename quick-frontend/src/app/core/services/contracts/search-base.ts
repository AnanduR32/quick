import { Observable } from 'rxjs';

export interface BaseSearchApi {
  search(query: string): Observable<any>;
}