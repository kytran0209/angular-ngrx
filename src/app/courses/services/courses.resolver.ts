import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { filter, first, map, tap } from "rxjs/operators";
import { CourseEntityService } from "./course-entity.service";

@Injectable()
export class CourseResolver implements Resolve<boolean> {
  constructor(private coursesService: CourseEntityService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // by default, ngrx data entity guesses the api : localhost:4200/api/courses
    return this.coursesService.loaded$
      .pipe(
        tap(loaded => {
          if(!loaded) {
            this.coursesService.getAll();
          }
        }),
        filter(loaded => !!loaded),
        first()
      );
  }
}
