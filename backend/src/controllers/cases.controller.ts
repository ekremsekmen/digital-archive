import { Request, Response } from 'express';
import Case from '../models/Case';

// Helper function to extract error message
const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return 'An unknown error occurred';
};

// Create a new case
export const createCase = async (req: Request, res: Response): Promise<void> => {
    try {
        const newCase = new Case(req.body);
        const savedCase = await newCase.save();
        res.status(201).json(savedCase);
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
};

// Get all cases
export const getAllCases = async (req: Request, res: Response): Promise<void> => {
    try {
        const cases = await Case.find();
        res.status(200).json(cases);
    } catch (error) {
        res.status(500).json({ message: getErrorMessage(error) });
    }
};

// Get a single case by ID
export const getCaseById = async (req: Request, res: Response): Promise<void> => {
    try {
        const caseData = await Case.findById(req.params.id);
        if (!caseData) {
            res.status(404).json({ message: 'Case not found' });
            return;
        }
        res.status(200).json(caseData);
    } catch (error) {
        res.status(500).json({ message: getErrorMessage(error) });
    }
};

// Update a case by ID
export const updateCase = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedCase = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedCase) {
            res.status(404).json({ message: 'Case not found' });
            return;
        }
        res.status(200).json(updatedCase);
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
};

// Delete a case by ID
export const deleteCase = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedCase = await Case.findByIdAndDelete(req.params.id);
        if (!deletedCase) {
            res.status(404).json({ message: 'Case not found' });
            return;
        }
        res.status(200).json({ message: 'Case deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: getErrorMessage(error) });
    }
};
