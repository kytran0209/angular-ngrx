import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Router } from "express";
import { Observable } from "rxjs";
import { finalize, first, tap } from "rxjs/operators";
import { AppState } from "../reducers";
import { CourseActions } from "./action-types";

@Injectable()
export class CoursesResolver implements Resolve<any>{

  loading = false;

  constructor(private store: Store<AppState>) {}

  // ActivatedRouteSnapshot - info about activated route like url
  // RouterStateSnapshot - info like params, query params
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store.pipe(
      tap(() => {
        if(!this.loading) {
          this.loading = true;
          this.store.dispatch(CourseActions.loadAllCourses());
        }
      }),
      first(),
      finalize(() => this.loading = false)
    );
  }
}
