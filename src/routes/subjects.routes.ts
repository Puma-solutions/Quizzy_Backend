import { Router } from "express";
export const subjectsRoutes = Router();

import {SubjectController} from "../controllers/subjects.controller"

subjectsRoutes.get('/getAll',SubjectController.getAll)
subjectsRoutes.get('/getById/:idSubject',SubjectController.getByID)
subjectsRoutes.post('/create',SubjectController.create)