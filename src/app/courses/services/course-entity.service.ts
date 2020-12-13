import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Course } from "../model/course";

@Injectable()
export class CourseEntityService extends EntityCollectionServiceBase<Course> {
  // EntityCollectionServiceElementsFactory creates some of the core elements that enable
  // us to build course entity
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    // first param: entity name
    // second: serviceElementsFactory
    // with this command, we defined course entity service
    super('Course', serviceElementsFactory);
  }
}
