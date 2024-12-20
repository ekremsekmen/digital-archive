import { Schema } from 'mongoose';

const ViolationSchema = new Schema({
    incidentDate: { type: Date, required: true }, // Vaka Tarihi
    person: { 
      name: { type: String, required: true }, // Mağdur Adı
      gender: { type: String }, // Cinsiyet
      age: { type: Number }, // Yaş
    },
    category: { type: String, required: true }, // Olay Kategorisi
    summary: { type: String }, // Olay Özeti
    source: { 
      type: { type: String, enum: ['Medya', 'STK', 'Kamu Kurumu', 'Baro Komisyonları'], required: true }, 
      detail: { type: String }, // Kaynak Detayı (ör. link veya kurum adı)
    },
    relatedLinks: [{ 
      link: { type: String }, // Medya/STK Linki
      visualLink: { type: String }, // Görsel Linki
      files: [{ type: String }], // Yüklenen Dosyalar
    }],
    scanPeriod: { 
      start: { type: Date, required: true }, // Tarama Başlangıç Tarihi
      end: { type: Date, required: true } // Tarama Bitiş Tarihi
    },
    
},{ timestamps: true });

export default ViolationSchema;
