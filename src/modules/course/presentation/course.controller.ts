import type { CreateCourseUseCase } from "../application/create-course.usecase";
import type { Request, Response } from "express";

interface CourseUseCases {
    create: CreateCourseUseCase;
}

export class CourseController {
    constructor(
        private readonly useCases: CourseUseCases
    ){}

    create = async (req: Request, res: Response) => {
        const course = await this.useCases.create.execute(req.body);

        res.status(200).send(course);
    }
}
