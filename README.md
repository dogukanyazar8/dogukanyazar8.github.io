# QA Blog - Firebase Tabanlı Modern Blog ve Proje Yönetim Sistemi

Senior QA Specialist için geliştirilmiş, Firebase destekli modern blog ve proje yönetim platformu.

## 🎯 Özellikler

### Public Blog Sayfası
- ✨ Modern, temiz blog tasarımı
- 📝 Blog yazılarının listesi (grid/card layout)
- 📖 Blog detay sayfası
- 🏷️ Kategori filtreleme
- 🔍 Arama fonksiyonu
- 📅 Tarih sıralama
- ⏱️ Okuma süresi göstergesi
- 👁️ Görüntülenme sayacı
- 🌓 Dark/Light mode
- 📱 Tam responsive tasarım

### Projeler Bölümü
- 🧪 QA test projelerini sergileme
- 🎨 Proje kartları (görsel, başlık, açıklama)
- 🛠️ Kullanılan teknolojiler/araçlar
- 🔗 GitHub repo ve demo linkleri
- ⭐ Öne çıkan projeler

### Admin Paneli
- 🔐 Firebase Authentication ile giriş sistemi
- ✍️ Markdown destekli blog editörü (SimpleMDE)
- 📝 Blog CRUD işlemleri
- 🗂️ Proje yönetimi
- 🖼️ Firebase Storage ile görsel yükleme
- 📊 Dashboard ile istatistikler
- 🏷️ Kategori ve etiket yönetimi

## 🚀 Kurulum

### 1. Firebase Projesi Oluşturma

1. [Firebase Console](https://console.firebase.google.com/)'a gidin
2. "Add project" butonuna tıklayın
3. Proje adını girin (örn: "qa-blog")
4. Google Analytics'i isteğe bağlı olarak etkinleştirin
5. "Create project" butonuna tıklayın

### 2. Web App Ekleme

1. Firebase Console'da projenizi açın
2. Proje ayarlarına gidin (⚙️ ikonu)
3. "Your apps" bölümünde web ikonu (</>)'ne tıklayın
4. App nickname girin (örn: "QA Blog Web")
5. "Register app" butonuna tıklayın
6. Firebase SDK yapılandırma bilgilerini kopyalayın

### 3. Firestore Database Aktif Etme

1. Firebase Console'da "Firestore Database" menüsüne gidin
2. "Create database" butonuna tıklayın
3. Test mode veya production mode seçin
   - **Test Mode** (Geliştirme için): Herkes okuyabilir, sadece authenticated kullanıcılar yazabilir
   - **Production Mode**: Güvenlik kuralları ile korunur
4. Location seçin (örn: europe-west)
5. "Enable" butonuna tıklayın

### 4. Authentication Aktif Etme

1. Firebase Console'da "Authentication" menüsüne gidin
2. "Get started" butonuna tıklayın
3. "Sign-in method" sekmesine gidin
4. "Email/Password" seçeneğini etkinleştirin
5. "Save" butonuna tıklayın

### 5. Storage Aktif Etme

1. Firebase Console'da "Storage" menüsüne gidin
2. "Get started" butonuna tıklayın
3. Güvenlik kurallarını seçin (test mode veya production)
4. Location seçin
5. "Done" butonuna tıklayın

### 6. Firebase Config Bilgilerini Ekleme

`js/firebase-config.js` dosyasını açın ve Firebase SDK yapılandırma bilgilerinizi ekleyin:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### 7. İlk Admin Kullanıcısı Oluşturma

Firebase Console'da Authentication > Users sekmesine gidin ve "Add user" butonuna tıklayın:
- Email: admin@example.com (veya kendi email'iniz)
- Password: Güçlü bir şifre belirleyin

### 8. Firestore Güvenlik Kuralları

Firebase Console'da Firestore Database > Rules sekmesine gidin ve aşağıdaki kuralları ekleyin:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Blog posts - herkes okuyabilir, sadece authenticated kullanıcılar yazabilir
    match /posts/{postId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    // Projects - herkes okuyabilir, sadece authenticated kullanıcılar yazabilir
    match /projects/{projectId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    // Categories - herkes okuyabilir, sadece authenticated kullanıcılar yazabilir
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Tags - herkes okuyabilir, sadece authenticated kullanıcılar yazabilir
    match /tags/{tagId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 9. Storage Güvenlik Kuralları

Firebase Console'da Storage > Rules sekmesine gidin:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Blog images
    match /blog-images/{fileName} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Project images
    match /project-images/{fileName} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 10. GitHub Pages için Deploy

1. Repository'yi GitHub'a push edin
2. Repository Settings > Pages'e gidin
3. Source olarak "main" branch'i seçin
4. Save butonuna tıklayın
5. Siteniz `https://dogukanyazar8.github.io` adresinde yayınlanacak

## 📁 Proje Yapısı

```
/
├── index.html              # Ana sayfa (Blog listesi)
├── blog-detail.html        # Blog detay sayfası
├── projects.html           # Projeler sayfası
├── about.html              # Hakkımda sayfası
├── admin/
│   ├── login.html         # Admin giriş
│   ├── dashboard.html     # Admin ana panel
│   ├── blog-editor.html   # Blog yazı editörü
│   └── project-editor.html # Proje editörü
├── css/
│   ├── main.css           # Ana stil dosyası
│   ├── blog.css           # Blog stilleri
│   ├── admin.css          # Admin panel stilleri
│   └── markdown.css       # Markdown görünümü
├── js/
│   ├── firebase-config.js # Firebase yapılandırma
│   ├── auth.js            # Authentication
│   ├── blog.js            # Blog işlemleri
│   ├── projects.js        # Proje işlemleri
│   └── utils.js           # Yardımcı fonksiyonlar
└── README.md
```

## 🎨 Renk Paleti (QA Temalı)

- **Primary** (#2563eb): Professional Blue
- **Secondary** (#10b981): Success Green (Test Passed)
- **Accent** (#f59e0b): Warning Orange
- **Error** (#ef4444): Failed Red
- **Dark** (#1e293b): Dark Background
- **Light** (#f8fafc): Light Background

## 🛠️ Kullanılan Teknolojiler

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Editor**: SimpleMDE (Markdown editor)
- **Markdown**: Marked.js
- **Syntax Highlighting**: Prism.js
- **Icons**: Font Awesome
- **Fonts**: Inter, Fira Code
- **Hosting**: GitHub Pages

## 📖 Kullanım

### Admin Paneline Giriş

1. `https://dogukanyazar8.github.io/admin/login.html` adresine gidin
2. Email ve şifrenizi girin
3. Dashboard'a yönlendirileceksiniz

### Blog Yazısı Ekleme

1. Admin dashboard'dan "Yeni Blog" butonuna tıklayın
2. Başlık, kategori, etiketler vb. bilgileri girin
3. Markdown editörde içerik yazın
4. Görsel yükleyin (opsiyonel)
5. "Yayınla" kutusunu işaretleyin (opsiyonel)
6. "Kaydet" butonuna tıklayın

### Proje Ekleme

1. Admin dashboard'dan "Yeni Proje" butonuna tıklayın
2. Proje bilgilerini girin
3. Teknolojileri ekleyin
4. GitHub ve demo linklerini ekleyin
5. Proje görselini yükleyin
6. "Kaydet" butonuna tıklayın

## 🔒 Güvenlik

- Firebase config bilgileri public olarak görünebilir (bu normaldir)
- Güvenlik Firestore ve Storage rules ile sağlanır
- Admin işlemleri sadece authenticated kullanıcılar için
- XSS koruması için HTML escape kullanılır

## 📱 Responsive Tasarım

- Mobile-first yaklaşım
- Tablet ve desktop uyumlu
- Tüm ekran boyutlarında test edilmiş

## 🌐 Tarayıcı Desteği

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👤 Yazar

**Doğukan Yazar** - Senior QA Specialist

- GitHub: [@dogukanyazar8](https://github.com/dogukanyazar8)

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'e push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📞 İletişim

Sorularınız için issue açabilir veya email gönderebilirsiniz.