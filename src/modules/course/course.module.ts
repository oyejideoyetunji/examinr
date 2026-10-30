import { CreateCourseUseCase } from "./application/create-course.usecase";
import { OrmCourseRepository } from "./infrastructure/orm-course.repository";
import { CourseController } from "./presentation/course.controller";
import { courseRoutes } from "./presentation/course.routes";

export function createCourseModule() {
    const repo = new OrmCourseRepository();
    const usecases = {
        create: new CreateCourseUseCase(repo)
    }
    const controller = new CourseController(usecases)
    const router = courseRoutes(controller)

    return { router }
}
