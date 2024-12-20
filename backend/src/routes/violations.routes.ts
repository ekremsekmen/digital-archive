import { Router } from 'express';
import {
    createViolation,
    getViolations,
    getViolationById,
    updateViolation,
    deleteViolation
} from '../controllers/violations.controller';

const router = Router();

router.post('/', createViolation); // Yeni bir violation oluştur
router.get('/', getViolations); // Tüm violation'ları al
router.get('/:id', getViolationById); // ID ile bir violation al
router.put('/:id', updateViolation); // ID ile bir violation güncelle
router.delete('/:id', deleteViolation); // ID ile bir violation sil

export default router;