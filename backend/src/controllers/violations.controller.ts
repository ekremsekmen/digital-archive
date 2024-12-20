import { Request, Response } from 'express';
import mongoose from 'mongoose';
import ViolationSchema from '../models/Violation';

// Create the model
const Violation = mongoose.model('Violation', ViolationSchema);

// Create a new violation
export const createViolation = async (req: Request, res: Response): Promise<void> => {
    try {
        const violation = new Violation(req.body);
        await violation.save();
        res.status(201).json(violation);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};

// Get all violations
export const getViolations = async (req: Request, res: Response): Promise<void> => {
    try {
        const violations = await Violation.find();
        res.status(200).json(violations);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Get a single violation by ID
export const getViolationById = async (req: Request, res: Response): Promise<void> => {
    try {
        const violation = await Violation.findById(req.params.id);
        if (!violation) {
            res.status(404).json({ message: 'Violation not found' });
        } else {
            res.status(200).json(violation);
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Update a violation
export const updateViolation = async (req: Request, res: Response): Promise<void> => {
    try {
        const violation = await Violation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!violation) {
            res.status(404).json({ message: 'Violation not found' });
        } else {
            res.status(200).json(violation);
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};

// Delete a violation
export const deleteViolation = async (req: Request, res: Response): Promise<void> => {
    try {
        const violation = await Violation.findByIdAndDelete(req.params.id);
        if (!violation) {
            res.status(404).json({ message: 'Violation not found' });
        } else {
            res.status(200).json({ message: 'Violation deleted successfully' });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};