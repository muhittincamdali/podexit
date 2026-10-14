<!-- i18n-source: README.md@7ceb4474cd77c1aee9f660b00e3bfcb024123574 status=reviewed -->
<!-- brand:start -->

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/banner-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/banner-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/banner-light.svg" alt="podexit: Which of your pods stop getting updates when CocoaPods trunk goes read-only, and which already ship a Swift package."></picture></p>

<!-- lang-selector:start -->
<p align="center"><a href="README.md">English</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a> · <a href="README.es.md">Español</a> · <a href="README.de.md">Deutsch</a> · <a href="README.fr.md">Français</a> · <a href="README.pt-BR.md">Português (Brasil)</a> · <a href="README.ru.md">Русский</a></p>
<!-- lang-selector:end -->

<p align="center">
<a href="https://github.com/muhittincamdali/podexit/actions/workflows/ci.yml"><img src="https://github.com/muhittincamdali/podexit/actions/workflows/ci.yml/badge.svg" alt="CI durumu"></a>
<a href="https://github.com/muhittincamdali/podexit/releases"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-version-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-version-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-version-light.svg" alt="Son sürüm: v0.1.0"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/blob/main/package.json"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-language-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-language-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-language-light.svg" alt="Dil sürümü: Node.js 22.12+"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/blob/main/LICENSE"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-license-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-license-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-license-light.svg" alt="Lisans: MIT"></picture></a>
</p>

<p align="center">
<a href="#hızlı-başlangıç"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-start-tr-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-start-tr-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-start-tr-light.svg" alt="Başlayın"></picture></a>
<a href="https://muhittincamdali.github.io/podexit/"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-docs-tr-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-docs-tr-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-docs-tr-light.svg" alt="Dokümantasyon"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/tree/main/docs/guides"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-guides-tr-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-guides-tr-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-guides-tr-light.svg" alt="Rehberler"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/tree/main/examples"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-examples-tr-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-examples-tr-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-examples-tr-light.svg" alt="Örnekler"></picture></a>
</p>

> Bu belge İngilizce README'nin çevirisidir. İkisi arasında fark varsa güncel olan İngilizce sürümdür.

<!-- brand:end -->

CocoaPods trunk 2 Aralık 2026'da salt okunur olacak. Derlemeleriniz çalışmaya devam eder, ancak orada yayımlanmış pod'lar bir daha güncelleme almaz. podexit, bağımlılıklarınızdan hangilerinin donduğunu, hangilerinin zaten Swift paketi sunduğunu ve yerel iOS, Flutter ile React Native/Expo için geçiş yolunu gösterir. Zaten elinizde olan `Podfile.lock` dosyasını okur; projenize hiçbir şey kurulmaz.

<picture><source media="(prefers-color-scheme: dark)" srcset="docs/media/demo-native-dark.svg"><source media="(prefers-color-scheme: light)" srcset="docs/media/demo-native-light.svg"><img src="docs/media/demo-native-light.svg" alt="Yerel bir iOS uygulamasında çalışan podexit: 12.x ile sınırlanmış Firebase pod'ları; 2 Aralık'tan sonra donacak Alamofire, Kingfisher, SnapKit ve diğerleri, her birinin Swift paketiyle birlikte"></picture>

<sub>Gerçek CLI ile <a href="fixtures/native-app/Podfile">native-app fixture</a> üzerinde kaydedildi; trunk ve GitHub yanıtları 14 Ekim 2026'da kaydedilmiştir (<code>npm run demo</code>).</sub>

## Öne çıkanlar

- **Her pod için iki yanıt**: güncelleme almayı bırakıp bırakmayacağı (trunk'ta donmuş, yayıncısı tarafından erkenden sınırlanmış ya da etkilenmiyor) ve upstream deposunda `Package.swift` olup olmadığı.
- **Sürüm duyarlı**: kilitlediğiniz etiketteki `Package.swift` dosyasına da bakar ve Swift paketinin yalnızca daha yeni sürümlerde bulunduğu durumu belirtir.
- **Firebase sınırı yerleşik**: Firebase'in listelenen 20 pod'u ve alt bağımlılıkları 12.x ile sınırlanır; bu bilgi, Firebase sayfasını kaynak gösteren bir veri dosyasından gelir.
- **Yerel, Flutter, React Native ve Expo**: `Podfile.lock`, `ios/Podfile.lock` veya `example/ios/Podfile.lock` dosyasını bulur, proje türünü tanır ve ilgili rehbere bağlantı verir.
- **Terminal, Markdown veya JSON**: sizin için bir tablo, pull request için Markdown, betikler için JSON.
- **Çevrimdışı çalışır**: yanıtlar `~/.cache/podexit` içinde 24 saat önbellekte tutulur; `--offline` yalnızca önbelleği kullanır.

## Hızlı başlangıç

[Node.js](https://nodejs.org/) 22.12 veya üstü gerekir (`node --version` sürümü gösterir; Mac'te `brew install node` ile kurulur). Başka hiçbir şey gerekmez.

**1. Uygulamanızın klasöründe bir terminal açın**; yani `Podfile`, `ios/` klasörü veya (Flutter eklentisi için) `example/` klasörü bulunan klasörde:

```sh
cd path/to/YourApp
```

**2. podexit'i çalıştırın:**

```sh
npx podexit
```

**3. Tabloyu okuyun.** **capped** işaretli satırlar ilk önce durur (Firebase, CocoaPods'a yayımlamayı Ekim 2026'da bırakıyor); **frozen after Dec 2** işaretli satırlar 2 Aralık'tan sonra yeni sürüm almaz. Swift package sütununda **yes** yazıyorsa pod şimdiden taşınabilir. Son satır, proje türünüze uygun rehbere bağlantı verir.

## 2 Aralık'ta neler değişiyor (ve neler değişmiyor)

[CocoaPods duyurusuna](https://blog.cocoapods.org/CocoaPods-Specs-Repo/) ve [Firebase geçiş sayfasına](https://firebase.google.com/docs/ios/cocoapods-deprecation) göre:

1. **Derlemeler çalışmaya devam eder.** Specs deposu ve CDN çevrimiçi kalır; `pod install` yayımlanmış tüm sürümleri çözmeye devam eder. Salt okunur modun deneme çalıştırması 1–7 Kasım 2026'da yapılacak.
2. **Trunk'taki pod'lar**, başka bir yolla (genellikle Swift paketi olarak) yayımlanmadıkça 2 Aralık 2026'dan sonra güvenlik düzeltmeleri dahil yeni sürüm almaz.
3. **Firebase 12, CocoaPods'taki son ana sürümdür** ve Firebase orada yayımlamayı Ekim 2026'da bırakır. 12 ve öncesi sürümler kurulabilir kalır.

Ayrıntılar için [2 Aralık'ta neler değişiyor](docs/guides/what-changes.md) rehberine bakın.

## Kurulum

Kurulum gerekmez: `npx podexit` en son sürümü indirip çalıştırır. Bir projede veya CI'da sürümü sabitlemek için:

```sh
npm install --save-dev podexit
npx podexit
```

ya da `npm install --global podexit` ile genel olarak kurun. `muhittincamdali/tap` için bir Homebrew formülü sürüm iş akışı tarafından hazırlanır (tap'in ilk sürümüyle birlikte planlanıyor).

## Kullanım

```text
podexit [paths...] [options]
```

| Seçenek                 | Ne yapar                                                                        |
| ----------------------- | ------------------------------------------------------------------------------- |
| `paths`                 | `Podfile.lock` dosyaları veya proje klasörleri; varsayılan geçerli klasördür    |
| `-f, --format <format>` | `tty` (varsayılan), `markdown` veya `json`                                      |
| `-o, --output <file>`   | Raporu terminal yerine bir dosyaya yazar                                        |
| `-a, --all`             | Yerel yol, git ve özel spec kaynaklı pod'ları da tabloda listeler               |
| `--offline`             | Yalnızca önbellekteki yanıtları kullanır; ağa hiç dokunmaz                      |
| `--refresh`             | Önbelleği yok sayar ve ağa yeniden sorar                                        |
| `--cache-dir <dir>`     | Önbellek klasörü (varsayılan `$XDG_CACHE_HOME/podexit` veya `~/.cache/podexit`) |
| `--no-color`            | Terminalde bile düz metin (`NO_COLOR` ve `FORCE_COLOR` dikkate alınır)          |
| `--concurrency <n>`     | Paralel pod sorguları, 1 ile 64 arası (varsayılan 8)                            |

Çıkış kodları: `0` rapor yazıldı, `2` hatalı argüman, `Podfile.lock` bulunamadı veya dosya `Podfile.lock` değil, `1` beklenmeyen her durum. podexit rapor verir; bulduklarından dolayı bir derlemeyi başarısız kılmaz.

### Markdown raporunu kodla birlikte saklayın

```sh
npx podexit --format markdown --output podexit.md
```

Markdown sürümünde aynı tablolar, yayın tarihleri ve her Swift paketi deposuna bağlantılar bulunur; yerel yol ve git kaynaklı pod'lar bir `<details>` bloğunda toplanır.

### JSON raporunu betiklerde kullanın

```sh
npx podexit --format json > podexit.json
```

Her pod; `updates.status`, `swiftPackage.status`, trunk'taki son sürümü ve tarihini, ayrıca her yanıtı açıklayan bir cümle taşır. Şema `schemaVersion` 0'dır ve 1.0'dan önce değişebilir. [examples/shell/frozen-pods.sh](examples/shell/frozen-pods.sh) bunu `jq` ile süzer.

### CI'da çalıştırın

[examples/github-actions/podexit.yml](examples/github-actions/podexit.yml), `Podfile.lock` dosyasını değiştiren her pull request'in iş özetine raporu ekler.

### Hız sınırları ve özel depolar

podexit, `Package.swift` dosyasını GitHub API kotasını kullanmayan raw.githubusercontent.com üzerinden okur. Özel upstream depolarına bakmak için `GITHUB_TOKEN` (veya `GH_TOKEN`) tanımlayın; belirteç yalnızca GitHub sunucularına gönderilir.

### JavaScript'ten

```js
import {
  analyzeLockfile,
  buildReport,
  CachedFetcher,
  HttpFetcher,
  loadPublisherPolicy,
  render,
} from 'podexit';

const policy = loadPublisherPolicy();
const fetcher = new CachedFetcher(new HttpFetcher({ userAgent: 'my-tool' }), {
  directory: '.cache',
});
const lockfile = await analyzeLockfile(text, 'ios/Podfile.lock', { fetcher, policy });
console.log(render(buildReport([lockfile], { policy, offline: false }), 'markdown'));
```

Çalıştırılabilir sürümü [examples/api/summary.mjs](examples/api/summary.mjs) dosyasındadır.

## Demo

Üç kayıt [fixtures](fixtures/README.md) klasöründen gelir: her biri kendi araç zinciriyle oluşturulmuş ve CocoaPods 1.16.2 ile çözümlenmiş gerçek projeler; 14 Ekim 2026'da kaydedilen yanıtlarla yeniden oynatılır.

| Proje                                                      | Kayıt                                                                                |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Yerel iOS uygulaması (Firebase, Alamofire, Google Sign-In) | bu sayfanın üstünde                                                                  |
| Flutter uygulaması (FlutterFire, google_sign_in, …)        | [açık](docs/media/demo-flutter-light.svg) · [koyu](docs/media/demo-flutter-dark.svg) |
| Expo SDK 57 uygulaması (Sentry, RevenueCat, Lottie)        | [açık](docs/media/demo-expo-light.svg) · [koyu](docs/media/demo-expo-dark.svg)       |

14 Ekim 2026'da Node.js 25.9 ile bir Mac'te (Apple silicon, M5 Max) ölçüldü: yerel fixture'da (28 pod) ilk çalıştırma 112 istek yaptı ve 6.6 ile 7.1 saniye sürdü; ikinci çalıştırma yanıtları önbellekten 0.3 saniyede verdi. İlk sürenin çoğunu ağ hızı belirler.

Kayıtları yeniden oluşturmak için: `npm run demo`.

## Durum

| Özellik                                                                            | Durum           |
| ---------------------------------------------------------------------------------- | --------------- |
| `Podfile.lock` okuma: pod'lar, subspec'ler, bağımlılık grafiği, her pod'un kaynağı | çalışıyor       |
| CocoaPods trunk'tan son sürüm ve yayın tarihleri                                   | çalışıyor       |
| Varsayılan dalda ve kilitli etiketteki `Package.swift`                             | çalışıyor       |
| Yayıncı sınırları (Firebase 12.x) ve alt bağımlılıkları                            | çalışıyor       |
| Yerel, Flutter uygulaması, Flutter eklentisi, React Native ve Expo tespiti         | çalışıyor       |
| Terminal, Markdown ve JSON raporları; `--offline` önbellek tekrar oynatma          | çalışıyor       |
| Her pod'u getiren npm veya pub.dev paketini adlandırma                             | planlandı (0.3) |
| Pod başına Swift paketi ürün adları ve sürümleri, `plan` → MIGRATION.md            | planlandı (0.5) |
| SARIF çıktısı, `--fail-on`, GitHub Action                                          | planlandı (0.5) |
| Yazar modu: podspec → `Package.swift` başlangıç noktası                            | planlandı (0.8) |
| Flutter `--fix`, statik web sayfası, kararlı JSON şeması                           | planlandı (1.0) |

## Dokümantasyon

API başvuru belgeleri ve rehberler: [muhittincamdali.github.io/podexit](https://muhittincamdali.github.io/podexit/).

## Rehberler

- [2 Aralık'ta neler değişiyor (ve neler değişmiyor)](docs/guides/what-changes.md)
- [Yerel iOS: CocoaPods'tan Swift Package Manager'a](docs/guides/native-ios.md)
- [Flutter uygulamaları ve eklentileri](docs/guides/flutter.md)
- [React Native ve Expo](docs/guides/react-native-expo.md)
- [Firebase 12 sonrası](docs/guides/firebase.md)
- [Pod yazarları: `pod trunk push` yerine ne kullanmalı](docs/guides/pod-authors.md)

## Gereksinimler

| Araç zinciri | En düşük sürüm |
| ------------ | -------------- |
| Node.js      | 22.12          |

CI, testleri Node.js 22 ve 24'te (Linux) çalıştırır. Yerelde testler bir Mac'te (Apple silicon) Node.js 22.23, 24.22 ve 25.9 ile geçer.

## Mimari

```text
Podfile.lock ─► parseLockfile          pods, subspecs, dependency graph, source per pod
             ─► classifyLockfile       frozen-on-trunk | capped | not-affected | unknown
                  data/publisher-policy.json (sourced; Firebase 12.x)
             ─► analyzeLockfile        per trunk pod, through a Fetcher:
                  cdn.cocoapods.org    versions and podspec (GitHub repository and tag)
                  trunk.cocoapods.org  release dates
                  raw.githubusercontent.com  Package.swift at HEAD and at the locked tag
             ─► buildReport ─► render  tty | markdown | json
```

- `src/core/` saftır: ayrıştırma, sürüm karşılaştırma, sınıflandırma. G/Ç yoktur.
- Ağdan gelen her şey bir `Fetcher` üzerinden geçer. `CachedFetcher` her istek için bir JSON dosyası saklar; aynı dosyalar, testlerin ve `--offline` modunun yeniden oynattığı kayıtlı yanıtlardır.
- Eksik bir yanıt hata olarak değil, nedeniyle birlikte `unknown` olarak raporlanır.
- CLI (`src/cli/`) yalnızca argümanları ayrıştırır, kilit dosyalarını bulur ve çıktıyı yazar.

## Yol haritası

[Durum](#durum) tablosuna bakın: 0.3 her pod'un arkasındaki npm ve pub.dev paketini, 0.5 geçiş planını, SARIF'i ve bir GitHub Action'ı, 0.8 yazar modunu, 1.0 kararlı bir JSON şemasını getirir. Her sürümün neleri değiştirdiği [CHANGELOG.md](CHANGELOG.md) dosyasında listelenir.

## SSS

**Uygulamam 2 Aralık'ta derlenmeyi bırakacak mı?** Hayır. Hem CocoaPods hem Firebase mevcut sürümlerin kurulabilir kalacağını söylüyor. podexit, alamayacağınız güncellemelerle ilgilidir; durup kalan derlemelerle değil.

**Bir pod neden "unknown"?** Podspec'i GitHub dışında bir sunucuya (örneğin dl.google.com üzerindeki bir ikili dosyaya) işaret ediyordur ya da ağ kullanılamamıştır. JSON ve Markdown raporları nedeni pod başına verir.

**Flutter eklentileri ve React Native modülleri neden "not affected"?** Bunlar `.symlinks/plugins` veya `node_modules` altındaki yerel yol pod'larıdır; pub veya npm ile güncellenirler. Bağlı oldukları SDK'lar ayrıca listelenir ve onlar donmuş olabilir.

**podexit projemi değiştirir mi?** Hayır. `Podfile.lock` dosyasını okur; yalnızca önbelleğini ve istediğiniz raporu yazar.

## Katkıda bulunma

Katkılarınızı bekliyoruz. Pull request açmadan önce [CONTRIBUTING.md](CONTRIBUTING.md) dosyasını ve [davranış kurallarını](https://github.com/muhittincamdali/.github/blob/main/CODE_OF_CONDUCT.md) okuyun. Güvenlik açıklarını [SECURITY.md](SECURITY.md) dosyasında anlatıldığı gibi bildirin.

## Lisans

MIT lisansıyla yayımlanmıştır. Ayrıntılar için [LICENSE](LICENSE) dosyasına bakın.
