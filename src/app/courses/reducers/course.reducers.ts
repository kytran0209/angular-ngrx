import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../action-types";
import { compareCourses, Course } from "../model/course";

export interface CourseState extends EntityState<Course> {
  // this is a way to create an entity type
  // entity is key value map - key is entity id, and value is entity itself
  // { ids, entities }
  allCoursesLoaded: boolean
}

export const adapter = createEntityAdapter<Course>({
  // pass in function to sort courses based on seqNo
  sortComparer: compareCourses,
  // In case we don't want to use id prop, we can use selectId and point it to desired prop
  // selectId: course => course.courseId
});

export const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded: false
});

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.allCoursesLoaded, (state, action) => adapter.addAll(action.courses, {...state, allCoursesLoaded: true})),
  on(CourseActions.courseUpdated, (state, action) => adapter.updateOne(action.update, state))
);

export const { selectAll } = adapter.getSelectors();
