import type { CourseRepository } from "../domain";

export class GetCourseUseCase {
    constructor(
        private readonly courses: CourseRepository
    ){}

    execute = async (id: string) => {
        return await this.courses.findById(id);
    }
}
