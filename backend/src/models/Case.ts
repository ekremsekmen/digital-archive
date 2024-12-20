import { Schema } from 'mongoose';

const CaseSchema = new Schema({
    caseDate: { type: Date, required: true }, // Dava Tarihi
    parties: [{ 
      name: { type: String, required: true }, // Taraf Adı
      role: { type: String }, // Rol (Davacı/Davalı)
      gender: { type: String }, // Cinsiyet
      age: { type: Number }, // Yaş
    }],
    institution: { type: String }, // İlgili Kurum
    subject: { type: String, required: true }, // Dava Konusu
    summary: { type: String }, // Dava Özeti
    lawyer: { type: String, required: true }, // Takip Eden Avukat
    relatedFiles: [{ 
      documentPath: { type: String }, // Dosya Yolu 
      documentType: { type: String, enum: ['Duruşma Raporu', 'Dilekçe', 'Ek Dosya'] }, // Dosya Türü
    }],
    associatedViolation: { type: Schema.Types.ObjectId, ref: 'Violation' }, // İlişkili Hak İhlali
    caseNo: { type: String, required: true }, // Dava No
    court: { type: String }, // Mahkeme Bilgisi
    indictment: { type: String }, // İddianame
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  