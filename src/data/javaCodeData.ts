/**
 * Java KDV Programı Kod ve Açıklama Verileri
 * Geliştirici: Enes Öztürk
 */

export interface TestCase {
  id: string;
  label: string;
  amount: number;
  expectedRate: number;
  description: string;
}

export const TEST_CASES: TestCase[] = [
  {
    id: 'case-1',
    label: '10 TL (Prompt Örneği)',
    amount: 10,
    expectedRate: 0.18,
    description: 'Kullanıcı isteğindeki örnek: KDV\'siz: 10 TL, KDV\'li: 11.8 TL, KDV: 1.8 TL (%18)'
  },
  {
    id: 'case-2',
    label: '500 TL (0-1000 TL Arası)',
    amount: 500,
    expectedRate: 0.18,
    description: '1000 TL altı olduğu için %18 KDV uygulanır. KDV: 90 TL, Toplam: 590 TL'
  },
  {
    id: 'case-3',
    label: '1000 TL (Kritik Sınır Değeri)',
    amount: 1000,
    expectedRate: 0.18,
    description: 'Tam sınır değeri (<= 1000 TL). %18 KDV uygulanır. KDV: 180 TL, Toplam: 1180 TL'
  },
  {
    id: 'case-4',
    label: '1500 TL (1000 TL Üzeri)',
    amount: 1500,
    expectedRate: 0.08,
    description: '1000 TL üzerinde olduğu için %8 KDV uygulanır. KDV: 120 TL, Toplam: 1620 TL'
  },
  {
    id: 'case-5',
    label: '4250 TL (Yüksek Tutar)',
    amount: 4250,
    expectedRate: 0.08,
    description: '1000 TL üzeri ticari tutar. %8 KDV uygulanır. KDV: 340 TL, Toplam: 4590 TL'
  }
];

export const JAVA_HOMEWORK_CODE = `/**
 * ============================================================================
 * PROJE ADI    : KDV Tutarı Hesaplayan Program
 * GELİŞTİRİCİ  : Enes Öztürk
 * DERS / KONU  : Java 101 - Koşullu İfadeler (if-else) ve Scanner Kullanımı
 * AÇIKLAMA     : Kullanıcıdan alınan para değerinin KDV'li fiyatını ve
 *                KDV tutarını hesaplar.
 *
 * ÖDEV KURALI:
 * - Girilen tutar 0 ile 1000 TL arasında (dahil) ise KDV oranı: %18 (0.18)
 * - Girilen tutar 1000 TL'den büyük ise KDV oranı: %8 (0.08)
 * ============================================================================
 */

import java.util.Scanner;

public class KDVTutariHesaplayici {
    public static void main(String[] args) {
        // Değişkenlerin tanımlanması
        double tutar;       // Kullanıcıdan alınacak ham para miktarı
        double kdvOrani;    // Hesaplanacak KDV oranı (%18 veya %8)
        double kdvTutari;   // Tutar üzerinden hesaplanan KDV miktarı
        double kdvliTutar;  // KDV eklenmiş nihai toplam tutar

        // Kullanıcıdan veri almak için Scanner sınıfının nesnesi oluşturulur
        Scanner input = new Scanner(System.in);

        // Program başlığı ve geliştirici bilgisi
        System.out.println("=================================================");
        System.out.println("       KDV TUTARI HESAPLAMA PROGRAMI            ");
        System.out.println("          Geliştirici: Enes Öztürk               ");
        System.out.println("=================================================");

        // Kullanıcıdan para tutarının alınması
        System.out.print("Lütfen para tutarını (TL) giriniz: ");
        tutar = input.nextDouble();

        // Negatif tutar kontrolü (geçerlilik doğrulaması)
        if (tutar < 0) {
            System.out.println("\\nHATA: Girilen para tutarı 0'dan küçük olamaz!");
            input.close();
            return;
        }

        // ÖDEV KOŞULU:
        // Eğer tutar 0 ile 1000 TL arasında ise KDV %18,
        // Tutar 1000 TL'den büyük ise KDV %8 olarak belirlenir.
        if (tutar <= 1000) {
            kdvOrani = 0.18; // %18 KDV Oranı
        } else {
            kdvOrani = 0.08; // %8 KDV Oranı
        }

        // KDV tutarı ve KDV'li toplam tutarın hesaplanması
        kdvTutari = tutar * kdvOrani;
        kdvliTutar = tutar + kdvTutari;

        // Sonuçların ekrana detaylı ve düzenli olarak yazdırılması
        System.out.println("-------------------------------------------------");
        System.out.printf("KDV'siz Tutar : %.2f TL%n", tutar);
        System.out.println("KDV Oranı     : %" + (int)(kdvOrani * 100));
        System.out.printf("KDV Tutarı    : %.2f TL%n", kdvTutari);
        System.out.printf("KDV'li Fiyat  : %.2f TL%n", kdvliTutar);
        System.out.println("=================================================");
        System.out.println("İmza: Enes Öztürk - Başarıyla tamamlandı.");

        // Bellek sızıntısını önlemek için scanner kapatılır
        input.close();
    }
}
`;

export const JAVA_TERNARY_CODE = `/**
 * PROJE: KDV Tutarı Hesaplayan Program (Ternary / Üçlü Operatör Yöntemi)
 * GELİŞTİRİCİ: Enes Öztürk
 *
 * Bu versiyon, aynı koşulu tek satırlık pratik 'ternary operator (?:)'
 * kullanarak çözer. Java'da kod okunabilirliği ve pratiklik sağlar.
 */

import java.util.Scanner;

public class KDVTutariHesaplayiciTernary {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Para tutarını giriniz (TL): ");
        double tutar = scanner.nextDouble();

        if (tutar < 0) {
            System.out.println("Geçersiz tutar girdiniz.");
            scanner.close();
            return;
        }

        // Tek satırda KDV oranını belirleyen Ternary Operatörü ( ? : )
        // Koşul doğruysa 0.18, yanlışsa (1000'den büyükse) 0.08 atanır.
        double kdvOrani = (tutar <= 1000) ? 0.18 : 0.08;

        double kdvTutari = tutar * kdvOrani;
        double kdvliTutar = tutar + kdvTutari;

        System.out.println("KDV'siz Tutar : " + tutar + " TL");
        System.out.println("Uygulanan KDV : %" + (int)(kdvOrani * 100));
        System.out.println("KDV Tutarı    : " + kdvTutari + " TL");
        System.out.println("KDV'li Fiyat  : " + kdvliTutar + " TL");
        System.out.println("Hazırlayan    : Enes Öztürk");

        scanner.close();
    }
}
`;

export const JAVA_BASIC_CODE = `/**
 * PROJE: KDV Tutarı Hesaplayan Program (Sabit %18 Başlangıç Versiyonu)
 * GELİŞTİRİCİ: Enes Öztürk
 *
 * Sabit %18 KDV Oranı ile hesaplama yapan temel sürüm.
 * Örnek: Tutar = 10 TL -> KDV = 1.8 TL -> KDV'li Fiyat = 11.8 TL
 */

import java.util.Scanner;

public class BasitKDVHesaplayici {
    public static void main(String[] args) {
        double tutar, kdvOran = 0.18, kdvTutar, kdvliTutar;

        Scanner input = new Scanner(System.in);

        System.out.print("Ücret Tutarını Giriniz: ");
        tutar = input.nextDouble();

        kdvTutar = tutar * kdvOran;
        kdvliTutar = tutar + kdvTutar;

        System.out.println("KDV'siz Fiyat = " + tutar);
        System.out.println("KDV'li Fiyat  = " + kdvliTutar);
        System.out.println("KDV Tutarı    = " + kdvTutar);
        System.out.println("Enes Öztürk - Java 101");

        input.close();
    }
}
`;

export const CODE_EXPLANATIONS = [
  {
    title: '1. Scanner Sınıfı ile Kullanıcıdan Veri Alma',
    desc: '`import java.util.Scanner;` kütüphanesi içe aktarılır. `Scanner input = new Scanner(System.in);` ile klavyeden veri okuyan nesne tanımlanır. `input.nextDouble();` fonksiyonu ile kullanıcının girdiği ondalıklı sayı alınır.'
  },
  {
    title: '2. Değişken Tipleri (Neden double?)',
    desc: 'Para ve vergi hesaplamalarında kuruşlu küsuratlar bulunduğu için tam sayı (`int`) yerine ondalıklı sayı tipi olan `double` tercih edilir.'
  },
  {
    title: '3. Ödev Koşul Mantığı (if - else)',
    desc: 'Ödev şartı: Tutar 0 ile 1000 TL arasında ise KDV oranı 0.18 (%18). Eğer tutar 1000 TL\'den büyük ise `else` bloğu devreye girer ve KDV oranı 0.08 (%8) olur.'
  },
  {
    title: '4. Formüller ve Matematiksel Mantık',
    desc: 'KDV Tutarı = Tutar × KDV Oranı. KDV\'li Nihai Fiyat = Tutar + KDV Tutarı. Son olarak `System.out.printf` veya `println` ile temiz biçimde ekrana yazdırılır.'
  }
];
