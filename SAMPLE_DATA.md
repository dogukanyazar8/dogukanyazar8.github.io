# Sample Data for Firestore

This document contains sample blog posts and projects to help you get started with your QA Blog.

## How to Add Sample Data

### Option 1: Using Firebase Console (Recommended for Beginners)

1. Go to Firebase Console > Firestore Database
2. Click "Start collection"
3. Collection ID: `posts`
4. Add documents with the data below

### Option 2: Using Firebase CLI

You can use the Firebase Admin SDK to batch import data programmatically.

## Sample Blog Posts

### Blog Post 1: Selenium ile Web Otomasyon Testlerine Başlarken

```json
{
  "title": "Selenium ile Web Otomasyon Testlerine Başlarken",
  "slug": "selenium-ile-web-otomasyon-testlerine-baslarken",
  "excerpt": "Selenium WebDriver kullanarak web otomasyon testlerine nasıl başlayacağınızı, temel kavramları ve best practice'leri öğrenin.",
  "content": "# Selenium ile Web Otomasyon Testlerine Başlarken\n\nSelenium, web uygulamalarını test etmek için kullanılan en popüler otomasyon araçlarından biridir. Bu yazıda, Selenium WebDriver ile test otomasyonuna nasıl başlayacağınızı öğreneceksiniz.\n\n## Selenium Nedir?\n\nSelenium, web tarayıcılarını programatik olarak kontrol etmenizi sağlayan açık kaynaklı bir test otomasyon framework'üdür. Birden fazla programlama dilini (Java, Python, C#, JavaScript) destekler.\n\n## Temel Bileşenler\n\n### WebDriver\nWebDriver, tarayıcıyla iletişim kuran ana bileşendir. Her tarayıcı için özel bir driver bulunur:\n- ChromeDriver (Chrome için)\n- GeckoDriver (Firefox için)\n- EdgeDriver (Microsoft Edge için)\n\n### Locators\nWeb elementlerini bulmak için kullanılan stratejiler:\n- ID\n- Name\n- Class Name\n- CSS Selector\n- XPath\n\n## İlk Testinizi Yazma\n\nPython ile basit bir örnek:\n\n```python\nfrom selenium import webdriver\nfrom selenium.webdriver.common.by import By\n\n# WebDriver'ı başlat\ndriver = webdriver.Chrome()\n\n# Bir web sitesine git\ndriver.get('https://example.com')\n\n# Element bul ve etkileşim kur\nelement = driver.find_element(By.ID, 'username')\nelement.send_keys('testuser')\n\n# Tarayıcıyı kapat\ndriver.quit()\n```\n\n## Best Practices\n\n1. **Explicit Waits Kullanın**: Elementlerin yüklenmesini beklemek için explicit wait'ler kullanın\n2. **Page Object Model**: Test kodunu organize etmek için POM pattern kullanın\n3. **Unique Locators**: Mümkün olduğunca ID veya unique attribute'ler kullanın\n4. **Try-Finally**: Her zaman driver.quit() çağrısını yapın\n5. **Assertions**: Test sonuçlarını doğrulamak için assertion'lar ekleyin\n\n## Yaygın Hatalar\n\n- **NoSuchElementException**: Element bulunamadı - wait kullanmayı deneyin\n- **StaleElementReferenceException**: Element artık DOM'da yok\n- **TimeoutException**: Element beklenen sürede bulunamadı\n\n## Sonuç\n\nSelenium ile web otomasyon testleri yazmak başlangıçta zorlayıcı görünebilir, ancak temel kavramları öğrendikten sonra güçlü test suite'leri oluşturabilirsiniz. Sürekli pratik yapın ve best practice'leri takip edin!",
  "category": "Test Automation",
  "tags": ["selenium", "webdriver", "automation", "testing", "python"],
  "coverImage": "https://via.placeholder.com/1200x600/2563eb/ffffff?text=Selenium+Web+Automation",
  "author": "Your Name",
  "published": true,
  "views": 0,
  "readingTime": "5 dakika",
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z"
}
```

### Blog Post 2: API Testing Best Practices

```json
{
  "title": "API Testing Best Practices: Postman vs REST Assured",
  "slug": "api-testing-best-practices-postman-vs-rest-assured",
  "excerpt": "API testleri için en popüler iki araç olan Postman ve REST Assured'ı karşılaştırıyoruz. Hangisi sizin için daha uygun?",
  "content": "# API Testing Best Practices: Postman vs REST Assured\n\nAPI testing, modern yazılım geliştirmenin kritik bir parçasıdır. Bu yazıda, en popüler iki API test aracını karşılaştıracağız.\n\n## Postman\n\n### Avantajları\n- ✅ Kullanıcı dostu GUI\n- ✅ Hızlı test oluşturma\n- ✅ Collaboration özellikleri\n- ✅ Mock server desteği\n- ✅ CI/CD entegrasyonu (Newman)\n\n### Örnek Test\n\n```javascript\npm.test(\"Status code is 200\", function () {\n    pm.response.to.have.status(200);\n});\n\npm.test(\"Response time is less than 200ms\", function () {\n    pm.expect(pm.response.responseTime).to.be.below(200);\n});\n\npm.test(\"Response has required fields\", function () {\n    var jsonData = pm.response.json();\n    pm.expect(jsonData).to.have.property('id');\n    pm.expect(jsonData).to.have.property('name');\n});\n```\n\n## REST Assured\n\n### Avantajları\n- ✅ Java tabanlı\n- ✅ BDD (Given-When-Then) syntax\n- ✅ Güçlü assertion kütüphanesi\n- ✅ JSON/XML path desteği\n- ✅ Maven/Gradle entegrasyonu\n\n### Örnek Test\n\n```java\nimport static io.restassured.RestAssured.*;\nimport static org.hamcrest.Matchers.*;\n\npublic class ApiTest {\n    @Test\n    public void getUserTest() {\n        given()\n            .baseUri(\"https://api.example.com\")\n            .header(\"Authorization\", \"Bearer token\")\n        .when()\n            .get(\"/users/1\")\n        .then()\n            .statusCode(200)\n            .body(\"name\", equalTo(\"John Doe\"))\n            .body(\"email\", notNullValue())\n            .time(lessThan(2000L));\n    }\n}\n```\n\n## Karşılaştırma\n\n| Özellik | Postman | REST Assured |\n|---------|---------|-------------|\n| Learning Curve | Kolay | Orta |\n| Programlama Bilgisi | Minimal | Java gerekli |\n| CI/CD | Newman ile | Native |\n| Collaboration | Mükemmel | İyi |\n| Automation | İyi | Mükemmel |\n| Reporting | İyi | Mükemmel |\n\n## Hangisini Seçmeli?\n\n**Postman** tercih edin:\n- Hızlı manuel testler için\n- Teknik olmayan ekip üyeleri varsa\n- Collaboration önemliyse\n- API dokümantasyonu da gerekiyorsa\n\n**REST Assured** tercih edin:\n- Java/Maven kullanıyorsanız\n- Kompleks test senaryoları için\n- Existing Java test framework'üne entegre etmek için\n- Daha fazla programatik kontrol gerekiyorsa\n\n## Best Practices\n\n1. **Environment Variables**: Farklı ortamlar için environment variables kullanın\n2. **Assertions**: Her response için kapsamlı assertion'lar yazın\n3. **Data-Driven Testing**: Test data'yı harici dosyalardan okuyun\n4. **Authentication**: Token'ları güvenli şekilde saklayın\n5. **Error Handling**: Negative test case'leri de ekleyin\n6. **Response Time**: Performance testleri de dahil edin\n\n## Sonuç\n\nHer iki araç da güçlü API test çözümleri sunar. Seçim, ekibinizin becerileri ve proje gereksinimlerine bağlıdır.",
  "category": "API Testing",
  "tags": ["api", "postman", "rest-assured", "testing", "automation"],
  "coverImage": "https://via.placeholder.com/1200x600/10b981/ffffff?text=API+Testing",
  "author": "Your Name",
  "published": true,
  "views": 0,
  "readingTime": "7 dakika",
  "createdAt": "2024-01-20T14:30:00Z",
  "updatedAt": "2024-01-20T14:30:00Z"
}
```

### Blog Post 3: Performance Testing with JMeter

```json
{
  "title": "Performance Testing: JMeter ile Yük Testi Nasıl Yapılır?",
  "slug": "performance-testing-jmeter-ile-yuk-testi-nasil-yapilir",
  "excerpt": "Apache JMeter kullanarak web uygulamalarınızın performansını test etmeyi öğrenin. Adım adım yük testi oluşturma rehberi.",
  "content": "# Performance Testing: JMeter ile Yük Testi Nasıl Yapılır?\n\nPerformance testing, uygulamanızın yük altında nasıl davrandığını anlamanın kritik bir yoludur. Bu yazıda Apache JMeter ile yük testi yapmayı öğreneceksiniz.\n\n## JMeter Nedir?\n\nApache JMeter, web uygulamalarının performansını test etmek için kullanılan açık kaynaklı bir load testing aracıdır.\n\n### Temel Özellikler\n- 🚀 HTTP, HTTPS, FTP, JDBC destekler\n- 📊 Gerçek zamanlı grafikler\n- 🎯 Distributed testing\n- 📝 Recording capability\n- 🔄 Reusable test scripts\n\n## İlk Test Planınız\n\n### 1. Thread Group Oluşturma\n\nThread Group, virtual user'ları temsil eder:\n\n- **Number of Threads**: 100 (100 eşzamanlı kullanıcı)\n- **Ramp-up Period**: 10 saniye (10 saniyede 100 kullanıcıya ulaş)\n- **Loop Count**: 5 (her kullanıcı 5 kez çalışsın)\n\n### 2. HTTP Request Ekle\n\n```xml\n<HTTPSamplerProxy>\n  <stringProp name=\"HTTPSampler.domain\">example.com</stringProp>\n  <stringProp name=\"HTTPSampler.port\">443</stringProp>\n  <stringProp name=\"HTTPSampler.protocol\">https</stringProp>\n  <stringProp name=\"HTTPSampler.path\">/api/users</stringProp>\n  <stringProp name=\"HTTPSampler.method\">GET</stringProp>\n</HTTPSamplerProxy>\n```\n\n### 3. Listener'lar Ekle\n\n- **View Results Tree**: Detaylı request/response\n- **Summary Report**: Özet istatistikler\n- **Graph Results**: Grafik görünüm\n- **Aggregate Report**: Detaylı metrikleri\n\n## Önemli Metrikler\n\n### Response Time\n- **Average**: Ortalama yanıt süresi\n- **Median**: Ortanca değer\n- **90th Percentile**: Kullanıcıların %90'ının aldığı süre\n- **95th Percentile**: Kullanıcıların %95'inin aldığı süre\n\n### Throughput\n- Saniyedeki request sayısı\n- Dakikadaki işlem sayısı\n\n### Error Rate\n- Başarısız request yüzdesi\n- HTTP error kodları\n\n## Best Practices\n\n### 1. Realistic Test Scenarios\n```\n- Homepage: %40\n- Product List: %25\n- Product Detail: %20\n- Checkout: %15\n```\n\n### 2. Ramp-up Period\nAniden tüm kullanıcıları başlatmayın. Gerçekçi bir ramp-up süresi kullanın.\n\n### 3. Think Time\nKullanıcıların sayfa arası geçiş süresini simüle edin:\n\n```xml\n<ConstantTimer>\n  <stringProp name=\"ConstantTimer.delay\">3000</stringProp>\n</ConstantTimer>\n```\n\n### 4. Assertions\nResponse doğrulamaları ekleyin:\n- Response Code: 200\n- Response Time: < 2000ms\n- Response Size: > 0\n\n### 5. Parameterization\nCSV dosyasından test data okuyun:\n\n```csv\nusername,password\nuser1,pass1\nuser2,pass2\nuser3,pass3\n```\n\n## Distributed Testing\n\nBüyük yük testleri için distributed setup:\n\n1. Master machine (controller)\n2. Slave machines (load generators)\n3. Network configuration\n4. Remote test execution\n\n## Sonuç Analizi\n\n### Başarılı Test\n- ✅ Error rate < %1\n- ✅ 95th percentile < 3 saniye\n- ✅ Throughput hedefi karşılandı\n- ✅ Server CPU/Memory normal\n\n### Sorunlu Test\n- ❌ Error rate > %5\n- ❌ Response time sürekli artıyor\n- ❌ Memory leak var\n- ❌ Database connection pool doldu\n\n## CI/CD Entegrasyonu\n\nJenkins pipeline örneği:\n\n```groovy\nstage('Performance Test') {\n    steps {\n        sh 'jmeter -n -t test.jmx -l results.jtl'\n        perfReport 'results.jtl'\n    }\n}\n```\n\n## Sonuç\n\nPerformance testing, production'a geçmeden önce kritiktir. JMeter ile düzenli yük testleri yaparak uygulamanızın performansını garanti altına alabilirsiniz.",
  "category": "Performance Testing",
  "tags": ["jmeter", "performance", "load-testing", "qa", "testing"],
  "coverImage": "https://via.placeholder.com/1200x600/f59e0b/ffffff?text=Performance+Testing",
  "author": "Your Name",
  "published": true,
  "views": 0,
  "readingTime": "8 dakika",
  "createdAt": "2024-01-25T09:00:00Z",
  "updatedAt": "2024-01-25T09:00:00Z"
}
```

## Sample Projects

### Project 1: E-Commerce Test Automation

```json
{
  "title": "E-Commerce Test Automation Framework",
  "description": "Selenium WebDriver ve Python kullanılarak geliştirilmiş kapsamlı e-ticaret test otomasyon framework'ü. Page Object Model, Data-Driven Testing ve CI/CD entegrasyonu içerir.",
  "category": "Automation",
  "technologies": ["Selenium", "Python", "Pytest", "Jenkins", "Allure"],
  "githubUrl": "https://github.com/yourusername/ecommerce-automation",
  "demoUrl": "https://github.com/yourusername/ecommerce-automation#readme",
  "image": "https://via.placeholder.com/600x400/2563eb/ffffff?text=E-Commerce+Automation",
  "featured": true,
  "createdAt": "2024-01-10T00:00:00Z"
}
```

### Project 2: API Test Suite

```json
{
  "title": "RESTful API Test Suite",
  "description": "REST Assured ve Java ile geliştirilmiş API test suite. CRUD operasyonları, authentication, data validation ve performance testlerini içerir.",
  "category": "API Testing",
  "technologies": ["REST Assured", "Java", "Maven", "TestNG", "CI/CD"],
  "githubUrl": "https://github.com/yourusername/api-test-suite",
  "demoUrl": "",
  "image": "https://via.placeholder.com/600x400/10b981/ffffff?text=API+Testing",
  "featured": true,
  "createdAt": "2024-01-12T00:00:00Z"
}
```

### Project 3: Mobile App Testing

```json
{
  "title": "Mobile App Test Automation",
  "description": "Appium kullanılarak iOS ve Android platformları için geliştirilmiş mobil uygulama test otomasyon projesi. Hybrid app testing desteği.",
  "category": "Mobile Testing",
  "technologies": ["Appium", "JavaScript", "WebdriverIO", "Mocha", "Docker"],
  "githubUrl": "https://github.com/yourusername/mobile-automation",
  "demoUrl": "",
  "image": "https://via.placeholder.com/600x400/f59e0b/ffffff?text=Mobile+Testing",
  "featured": false,
  "createdAt": "2024-01-18T00:00:00Z"
}
```

## Important Notes

- **Replace all placeholder values** with your actual information:
  - Change "Your Name" to your actual name in the author field
  - Update GitHub URLs from "yourusername" to your actual GitHub username
  - Customize content to match your expertise and writing style
- Replace timestamps with actual Firebase Timestamp objects when adding to Firestore
- Adjust image URLs to your actual images or use the placeholders
- Add more sample data as needed

## Firebase Timestamp Format

When adding via Firebase Console, use the "timestamp" type and set to current time, or use this format in code:

```javascript
firebase.firestore.FieldValue.serverTimestamp()
```
