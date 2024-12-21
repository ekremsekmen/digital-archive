import { Schema, model, Document } from 'mongoose';

// TypeScript Interface for Violation Document
interface IViolation extends Document {
    incidentDate: Date;
    person: {
        name: string;
        gender?: string;
        age?: number;
    };
    category: string;
    summary?: string;
    source: {
        type: 'Medya' | 'STK' | 'Kamu Kurumu' | 'Baro Komisyonları';
        detail?: string;
    };
    relatedLinks?: {
        link?: string;
        visualLink?: string;
        files?: string[];
    }[];
    scanPeriod: {
        start: Date;
        end: Date;
    };
    createdAt?: Date;
    updatedAt?: Date;
}

// Schema Definition
const ViolationSchema = new Schema<IViolation>({
    incidentDate: { type: Date, required: true },
    person: {
        name: { type: String, required: true },
        gender: { type: String },
        age: { type: Number },
    },
    category: { type: String, required: true },
    summary: { type: String },
    source: {
        type: { type: String, enum: ['Medya', 'STK', 'Kamu Kurumu', 'Baro Komisyonları'], required: true },
        detail: { type: String },
    },
    relatedLinks: [{
        link: { type: String },
        visualLink: { type: String },
        files: [{ type: String }],
    }],
    scanPeriod: {
        start: { type: Date, required: true },
        end: { type: Date, required: true },
    },
}, { timestamps: true });

// Model Creation
const Violation = model<IViolation>('Violation', ViolationSchema);

export default Violation;
