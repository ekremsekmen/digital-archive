import { Router } from 'express';
import { createCase, getAllCases, getCaseById, updateCase, deleteCase } from '../controllers/cases.controller';

const router = Router();

router.post('/', createCase);
router.get('/', getAllCases);
router.get('/:id', getCaseById);
router.put('/:id', updateCase);
router.delete('/:id', deleteCase);

export default router;