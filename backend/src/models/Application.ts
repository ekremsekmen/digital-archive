import { Schema } from 'mongoose';

const ApplicationSchema = new Schema({
    applicationNo: { type: String, required: true, unique: true }, // Başvuru No
    applicantName: { type: String, required: true }, // Başvuran Adı
    applicationType: { type: String, required: true }, // Başvuru Türü
    applicationDate: { type: Date, default: Date.now }, // Başvuru Tarihi
    assignedLawyer: { type: String }, // Takip Eden Avukat
    complaintReason: { type: String }, // Yakınma Nedeni
    victim: { 
      name: { type: String }, // Mağdur Adı
      gender: { type: String }, // Cinsiyet
      age: { type: Number }, // Yaş
    },
    relatedDocuments: [{ 
      documentPath: { type: String }, // Dosya Yolu 
      documentDescription: { type: String }, // Dosya Açıklaması
    }],
    relatedCase: { 
      caseNo: { type: Schema.Types.ObjectId, ref: 'Case' }, // İlgili dava ID'si
      resultDescription: { type: String }, // Sonuç Açıklama
      resultStage: { type: String }, // Sonuç Aşama
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  