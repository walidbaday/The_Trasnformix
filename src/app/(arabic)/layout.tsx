import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ContactModalProvider } from "@/components/contact/ContactModal";
import "@/app/globals.css";

const notoKufiArabic = localFont({
  variable: "--font-kufi",
  src: "../fonts/NotoKufiArabic.woff2",
  weight: "400 700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Transformix | نبني حلولًا رقمية تساعد أعمالك على النمو",
  description:
    "نجمع بين البيانات والذكاء الاصطناعي، التصميم، تطوير التجارب الرقمية وأنظمة الأعمال لنحوّل تحدياتك إلى حلول عملية تساعدك على العمل بكفاءة أكبر والنمو بشكل أوضح.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1c4499",
};

/* The 1024–1440px range scales the artboard with `100vw`, which counts the
   classic scrollbar. Publishing its real width lets the scale use the content
   box instead, so nothing ever spills past the right edge. */
const SCROLLBAR_PROBE = `(function(){var d=document.documentElement;var s=function(){d.style.setProperty('--sbw',(window.innerWidth-d.clientWidth)+'px')};s();addEventListener('resize',s,{passive:true})})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={notoKufiArabic.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCROLLBAR_PROBE }} />
      </head>
      <body>
        <noscript>
          <style>{`[data-reveal]{opacity:1;transform:none}`}</style>
        </noscript>
        <ContactModalProvider>{children}</ContactModalProvider>
      </body>
    </html>
  );
}
