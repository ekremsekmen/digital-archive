# Hak İhlali İzleme ve Yönetim Sistemi

## 1. Hak İhlali İzleme Mevcut Veri
Bu bölüm, sistemin hak ihlalleriyle ilgili farklı kaynaklardan veri toplama sürecini temsil eder.

### **Kaynaklar:**
#### **Medya Taraması**
- Olayların medya kaynaklarından (gazeteler, web siteleri vb.) izlenmesi.  
  Her olay için:
  - Tarama dönemi
  - Olay kategorisi
  - Olay özeti
  - Kaynak bilgisi (web sitesi, gazete)
  - Linkler (ilgili haberin bağlantıları)
  - Görsel linkler
  - Dosya yükleme (ör. haberin kopyası, görseller)

#### **STK Verileri**
- Sivil toplum kuruluşlarının (STK) sağladığı veriler.
  Benzer şekilde:
  - Tarama dönemi, olay kategorisi, olay özeti
  - Bildirim yapan kurum
  - Link ve dosya yükleme alanları

#### **Baro Komisyonları**
- Baroların oluşturduğu komisyonlardan gelen veriler.
  - Vakaların hangi komisyon tarafından ele alındığı bilgisi eklenir.

#### **Kamu Kurumları**
- Devlet kurumlarından gelen olay raporları.
  - İlgili kurumun adı ve olay detayları belirtilir.

**Amaç:** Hak ihlalleriyle ilgili mevcut verilerin farklı kaynaklardan toplanarak dijital arşivde kayıt altına alınması.

---

## 2. Dava Takip Modülü
Bu modül, davaların detaylarını takip etmek için kullanılır.

### **Liste:**
Sistemde kayıtlı olan tüm davaların listelendiği ekran.  
Her dava için şu bilgiler görüntülenir:
- Taraf adı soyadı
- Avukatı
- Başvuru numarası
- Dava konusu
- Davayı takip eden avukat
- Dosya numarası
- Mahkeme bilgisi

### **Yeni Kayıt:**
Yeni bir dava oluşturulması süreci.  
**Gerekli Bilgiler:**
- Taraf bilgileri
- Avukat
- Başvuru numarası
- Dava konusu
- Davayı takip eden avukat
- Dosya numarası, mahkeme bilgisi, iddianame
- Dava dosyaları (ör. duruşma izleme raporları, dilekçeler, duruşma tutanakları)

**Amaç:** Davaların detaylı bir şekilde yönetilmesi ve takibi.

---

## 3. Başvuru Modülü
Başvuruların yönetildiği modül.

### **Liste:**
Sistemde kayıtlı olan tüm başvuruların listelendiği ekran.  
Her başvuru için şu bilgiler yer alır:
- Başvuru numarası
- Başvuran adı soyadı
- Başvuru türü (ör. şikayet, dava açma talebi)
- Başvuru tarihi
- Başvuruyu alan kişi veya kurum
- Yakınma (ihlal) nedeni
- Takip eden avukat
- Mağdur bilgileri
- Başvurularla ilgili dilekçe ve yazışmalar

### **Yeni Kayıt:**
Yeni bir başvuru ekleme ekranı.  
**Gerekli Bilgiler:**
- Başvuru türü, başvuran bilgileri
- Mağdur bilgileri
- Başvuruyla ilgili dokümanlar (belgeler ve açıklamalar)
- Başvuruyla bağlantılı dava bilgileri (ör. mahkeme dosya numarası, sonucu açıklama ve aşama)

**Amaç:** Başvuru süreçlerinin düzenlenmesi ve başvuruların takip edilmesi.

---

## İş Akışı Mantığı
1. **Hak ihlali tespiti:**  
   - Medya, STK veya diğer kaynaklardan gelen veriler dijital arşive kaydedilir.
2. **Başvuru süreci:**  
   - Mağdur ya da temsilcisi bir başvuru yapar. Başvuru sürecinde mağdurun durumu incelenir.
3. **Dava süreci:**  
   - Başvuru veya hak ihlali incelemesi sonucunda dava açılır.
4. **İlişkilerin kurulması:**  
   - Hak ihlali → Başvuru → Dava bağlantıları sistemde kurulur.  
     Örn: Bir hak ihlalinden kaynaklanan başvuru ve bu başvuruya dayanan dava birbirine bağlanır.

**Sonuç:**  
Tüm süreçler dijital arşivde kayıt altına alınır, takip edilir ve raporlanabilir.

---
---

# API İstek ve Yanıtları (Postman Testleri)

---

## **1. POST /violations**
**Amaç:** Yeni bir violation (ihlâl) oluşturmak.  
**URL:** `http://localhost:3000/violations`  
**Yöntem:** POST  

**Body:**
```json
{
    "incidentDate": "2024-12-20T00:00:00.000Z",
    "person": {
        "name": "Ali Veli",
        "gender": "Male",
        "age": 30
    },
    "category": "Hakaret",
    "summary": "Sosyal medyada hakaret içeren bir yorum.",
    "source": {
        "type": "Medya",
        "detail": "Haber sitesi linki"
    },
    "relatedLinks": [
        {
            "link": "http://example.com/article",
            "visualLink": "http://example.com/image.jpg",
            "files": [
                "file1.pdf",
                "file2.png"
            ]
        }
    ],
    "scanPeriod": {
        "start": "2024-12-01T00:00:00.000Z",
        "end": "2024-12-15T00:00:00.000Z"
    }
}
```

**Dönen Yanıt:**
```json
{
    "incidentDate": "2024-12-20T00:00:00.000Z",
    "person": {
        "name": "Ali Veli",
        "gender": "Male",
        "age": 30
    },
    "category": "Hakaret",
    "summary": "Sosyal medyada hakaret içeren bir yorum.",
    "source": {
        "type": "Medya",
        "detail": "Haber sitesi linki"
    },
    "relatedLinks": [
        {
            "link": "http://example.com/article",
            "visualLink": "http://example.com/image.jpg",
            "files": [
                "file1.pdf",
                "file2.png"
            ],
            "_id": "6764d8bf977bda8e5b1ff17e"
        }
    ],
    "scanPeriod": {
        "start": "2024-12-01T00:00:00.000Z",
        "end": "2024-12-15T00:00:00.000Z"
    },
    "_id": "6764d8bf977bda8e5b1ff17d",
    "createdAt": "2024-12-20T02:38:55.830Z",
    "updatedAt": "2024-12-20T02:38:55.830Z",
    "__v": 0
}
```

**Notlar:**
- Status code: **201 Created**
- `relatedLinks.files` alanı dosya URL'lerini içerir ve frontend tarafında uygun şekilde render edilmelidir.

---

## **2. GET /violations**
**Amaç:** Tüm violation (ihlâl) kayıtlarını listelemek.  
**URL:** `http://localhost:PORT/violations`  
**Yöntem:** GET  

**Dönen Yanıt:**
```json
[
    {
        "_id": "6764d8bf977bda8e5b1ff17d",
        "incidentDate": "2024-12-20T00:00:00.000Z",
        "person": {
            "name": "Ali Veli",
            "gender": "Male",
            "age": 30
        },
        "category": "Hakaret",
        "summary": "Sosyal medyada hakaret içeren bir yorum.",
        "source": {
            "type": "Medya",
            "detail": "Haber sitesi linki"
        },
        "relatedLinks": [
            {
                "link": "http://example.com/article",
                "visualLink": "http://example.com/image.jpg",
                "files": [
                    "file1.pdf",
                    "file2.png"
                ],
                "_id": "6764d8bf977bda8e5b1ff17e"
            }
        ],
        "scanPeriod": {
            "start": "2024-12-01T00:00:00.000Z",
            "end": "2024-12-15T00:00:00.000Z"
        },
        "createdAt": "2024-12-20T02:38:55.830Z",
        "updatedAt": "2024-12-20T02:38:55.830Z",
        "__v": 0
    }
]
```

**Notlar:**
- Bu endpoint tüm kayıtları JSON formatında döner.
- Frontend tarafında listeleme işlemleri için uygun bir grid/tabloda kullanılabilir.

---

## **3. GET /violations/:id**
**Amaç:** Belirli bir violation (ihlâl) kaydını detaylı olarak getirmek.  
**URL:** `http://localhost:PORT/violations/6764d8bf977bda8e5b1ff17d`  
**Yöntem:** GET  

**Dönen Yanıt:**
```json
{
    "_id": "6764d8bf977bda8e5b1ff17d",
    "incidentDate": "2024-12-20T00:00:00.000Z",
    "person": {
        "name": "Ali Veli",
        "gender": "Male",
        "age": 30
    },
    "category": "Hakaret",
    "summary": "Sosyal medyada hakaret içeren bir yorum.",
    "source": {
        "type": "Medya",
        "detail": "Haber sitesi linki"
    },
    "relatedLinks": [
        {
            "link": "http://example.com/article",
            "visualLink": "http://example.com/image.jpg",
            "files": [
                "file1.pdf",
                "file2.png"
            ],
            "_id": "6764d8bf977bda8e5b1ff17e"
        }
    ],
    "scanPeriod": {
        "start": "2024-12-01T00:00:00.000Z",
        "end": "2024-12-15T00:00:00.000Z"
    },
    "createdAt": "2024-12-20T02:38:55.830Z",
    "updatedAt": "2024-12-20T02:38:55.830Z",
    "__v": 0
}
```

**Notlar:**
- `id` parametresi ile spesifik bir kaydı alabilirsiniz.
- Frontend'de detay sayfası gibi bir yapıda kullanılabilir.

---

## **4. PUT /violations/:id**
**Amaç:** Mevcut bir violation kaydını güncellemek.  
**URL:** `http://localhost:PORT/violations/6764d8
## 3. Violation Güncelleme (PUT /violations/:id)

Bu violation'ın `category` veya `summary` alanını güncellemek istersen, bir PUT isteği yapabilirsin.

**URL**:  
`http://localhost:3000/violations/6764d8bf977bda8e5b1ff17d`

**Body (örneğin)**:

```json
{
    "category": "Tehdit",
    "summary": "Görsel bir tehdit içeren yorum."
}
```
Beklenen Yanıt:

```json
{
    "incidentDate": "2024-12-20T00:00:00.000Z",
    "person": {
        "name": "Ali Veli",
        "gender": "Male",
        "age": 30
    },
    "category": "Tehdit",
    "summary": "Görsel bir tehdit içeren yorum.",
    "source": {
        "type": "Medya",
        "detail": "Haber sitesi linki"
    },
    "relatedLinks": [
        {
            "link": "http://example.com/article",
            "visualLink": "http://example.com/image.jpg",
            "files": [
                "file1.pdf",
                "file2.png"
            ],
            "_id": "6764d8bf977bda8e5b1ff17e"
        }
    ],
    "scanPeriod": {
        "start": "2024-12-01T00:00:00.000Z",
        "end": "2024-12-15T00:00:00.000Z"
    },
    "_id": "6764d8bf977bda8e5b1ff17d",
    "createdAt": "2024-12-20T02:38:55.830Z",
    "updatedAt": "2024-12-20T02:42:00.000Z",
    "__v": 0
}
```


5. Violation Silme (DELETE /violations/:id)

Az önce oluşturduğun violation'ı silmek istersen, DELETE isteği yapabilirsin.

URL:
http://localhost:3000/violations/6764d8bf977bda8e5b1ff17d

Beklenen Yanıt:

{
    "message": "Violation deleted successfully"
}
