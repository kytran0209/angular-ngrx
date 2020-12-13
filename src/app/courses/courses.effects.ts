import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { CourseActions } from "./action-types";
import { CoursesHttpService } from "./services/courses-http.service";

@Injectable()
export class CoursesEffects {
  loadCourses$ = createEffect(
    () => this.action$
      .pipe(
        ofType(CourseActions.loadAllCourses),
        // concatMap ensure we only send 1 request at a time
        // mergeMap send multiple requests at the same time
        concatMap(action => this.coursesHttpService.findAllCourses()),
        map(courses => CourseActions.allCoursesLoaded({courses}))
      )
  )

  saveCourse$ = createEffect(
    () => this.action$
      .pipe(
        ofType(CourseActions.courseUpdated),
        // great for save because it runs the api consequently, the new call is fetched when the previous one is done
        concatMap(action => this.coursesHttpService.saveCourse(
          action.update.id,
          action.update.changes
        ))
      ),
      { dispatch: false }
  )

  constructor(private action$: Actions, private coursesHttpService: CoursesHttpService) {}
}
