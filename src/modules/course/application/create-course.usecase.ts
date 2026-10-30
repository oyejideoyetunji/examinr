import type { NewCoursePayload } from "../../../shared/types";
import type { CourseRepository } from "../domain";

export class CreateCourseUseCase {
    constructor(
        private readonly courses: CourseRepository
    ){}

    execute = async (payload: NewCoursePayload) => {
        const course = await this.courses.create(payload);

        if (!course) {
            throw new Error(`Failed to create course with title "${payload.title}" An unexpected error occured`)
        }

        return course;
    }
}
