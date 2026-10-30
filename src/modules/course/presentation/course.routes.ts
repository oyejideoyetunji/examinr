import { Router } from "express";
import { z } from "zod";
import { validateRequestData } from "../../../shared/middlewares";
import type { CourseController } from "./course.controller";

export function courseRoutes(controller: CourseController) {
    const router: Router = Router();

    router.post("", validateRequestData(createCourseSchema), controller.create);

    return router;
}

const createCourseSchema = z.object({
    body: z.object({
        title: z.string().min(5),
        description: z.string().min(20),
        createdBy: z.uuid(),
        teacherId: z.uuid().optional()
    })
});
