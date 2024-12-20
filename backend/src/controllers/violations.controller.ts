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

export const getStatistics = async (req: Request, res: Response): Promise<void> => {
    try {
        // Toplam vaka sayısını ayrı bir sorgu ile al
        const total = await Violation.countDocuments();

        // Diğer istatistikler için aggregate kullan
        const statistics = await Violation.aggregate([
            {
                $facet: {
                    genderDistribution: [
                        { $group: { _id: { $ifNull: ["$person.gender", "Unknown"] }, count: { $sum: 1 } } },
                        { $sort: { count: -1 } },
                    ],
                    categoryDistribution: [
                        { $group: { _id: "$category", count: { $sum: 1 } } },
                        { $sort: { count: -1 } },
                    ],
                    ageDistribution: [
                        {
                            $bucket: {
                                groupBy: { $ifNull: ["$person.age", 0] },
                                boundaries: [0, 18, 30, 50, 65, 100],
                                default: "Unknown",
                                output: { count: { $sum: 1 } },
                            },
                        },
                        {
                            $addFields: {
                                label: {
                                    $switch: {
                                        branches: [
                                            { case: { $eq: ["$_id", 0] }, then: "0-18" },
                                            { case: { $eq: ["$_id", 18] }, then: "18-30" },
                                            { case: { $eq: ["$_id", 30] }, then: "30-50" },
                                            { case: { $eq: ["$_id", 50] }, then: "50-65" },
                                            { case: { $eq: ["$_id", 65] }, then: "65+" },
                                        ],
                                        default: "Unknown",
                                    },
                                },
                            },
                        },
                    ],
                },
            },
        ]);

        const formattedStatistics = {
            genderDistribution: statistics[0]?.genderDistribution || [],
            categoryDistribution: statistics[0]?.categoryDistribution || [],
            ageDistribution: statistics[0]?.ageDistribution.map((group: any) => ({
                range: group.label,
                count: group.count,
            })),
            total, // Toplam vaka sayısını ekle
        };

        res.status(200).json(formattedStatistics);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};
