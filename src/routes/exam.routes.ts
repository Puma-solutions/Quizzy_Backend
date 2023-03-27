import { Router } from "express";
export const examRoutes = Router();

import {ExamController} from "../controllers/exam.controller"

examRoutes.post('/create',ExamController.createExam)
examRoutes.post('/:idExam/createQuestion',ExamController.createQuestion)
examRoutes.put('/:idExam/updateQuestion/:idQuestion',ExamController.updateQuestion)
examRoutes.delete('/:idExam/deleteQuestion/:idQuestion',ExamController.deleteQuestion)