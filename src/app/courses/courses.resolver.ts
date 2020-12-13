import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Router } from "express";
import { Observable } from "rxjs";
import { filter, finalize, first, tap } from "rxjs/operators";
import { AppState } from "../reducers";
import { CourseActions } from "./action-types";
import { areCoursesLoaded } from "./courses.selector";

@Injectable()
export class CoursesResolver implements Resolve<any>{

  constructor(private store: Store<AppState>) {}

  // ActivatedRouteSnapshot - info about activated route like url
  // RouterStateSnapshot - info like params, query params
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store.pipe(
      select(areCoursesLoaded),
      tap((coursesLoaded) => {
        if(!coursesLoaded) {
          this.store.dispatch(CourseActions.loadAllCourses());
        }
      }),
      filter(coursesLoaded => coursesLoaded),
      first(),
    );
  }
}
