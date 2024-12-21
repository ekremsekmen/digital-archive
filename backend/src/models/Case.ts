import { Schema, model, Document } from 'mongoose';

interface ICase extends Document {
    fileNo: string;
    applicationNo: string;
    court: string;
    caseSubject: string;
    applicant: {
        name: string;
        lawyer?: string;
    };
    indictment?: string;
    relatedDocuments?: {
        documentPath: string;
        documentDescription?: string;
    }[];
    hearingReports?: {
        documentPath: string;
    }[];
    petitions?: {
        documentPath: string;
    }[];
    minutes?: {
        documentPath: string;
    }[];
    createdAt?: Date;
    updatedAt?: Date;
}

const CaseSchema = new Schema<ICase>({
    fileNo: { type: String, required: true, unique: true },
    applicationNo: { type: String, required: true, unique: true },
    court: { type: String, required: true },
    caseSubject: { type: String, required: true },
    applicant: { 
        name: { type: String, required: true },
        lawyer: { type: String },
    },
    indictment: { type: String },
    relatedDocuments: [{ 
        documentPath: { type: String },
        documentDescription: { type: String },
    }],
    hearingReports: [{ 
        documentPath: { type: String, required: true },
    }],
    petitions: [{ 
        documentPath: { type: String, required: true },
    }],
    minutes: [{ 
        documentPath: { type: String, required: true },
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Case = model<ICase>('Case', CaseSchema);

export default Case;