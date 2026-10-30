import type { CourseRepository } from "../domain";

export class GetAllCoursesUseCase {
    constructor(
        private readonly courses: CourseRepository
    ){}

    execute = async () => {
        const courses = await this.courses.getAll();

        return courses;
    }
}
