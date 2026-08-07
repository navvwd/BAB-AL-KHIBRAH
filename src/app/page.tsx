import Header from "@/components/navigation/Header";
import Hero from "@/components/sections/Hero";
import WhyUs from "@/components/sections/WhyUs";
import IndustryMatrix from "@/components/sections/IndustryMatrix";
import ProcurementProcess from "@/components/sections/ProcurementProcess";
import FacilityEquipment from "@/components/sections/FacilityEquipment";
import HomeRFQ from "@/components/sections/HomeRFQ";
import Footer from "@/components/navigation/Footer";

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MetalSupplier",
    "name": "Bab Al Khibrah Trading LLC",
    "alternateName": "Bab Al Khibrah Steel Specialist",
    "image": "http://babalkhibrah.com/BAK%20LOGO_ENGLISH%20_ARABIC.jpg.jpeg",
    "description": "Premium industrial engineering steel and alloy stockist, supplier, and cut-to-size processor in Sharjah, UAE.",
    "telephone": "+971 50 575 1347",
    "email": "kaleel@babalkhibrah.com",
    "url": "http://babalkhibrah.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Office #1, Al Saja'a Industrial Area",
      "addressLocality": "Sharjah",
      "addressRegion": "Sharjah",
      "postalCode": "24891",
      "addressCountry": "AE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "25.2975", 
      "longitude": "55.6267"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://maps.app.goo.gl/e6r8qU6VLgimDKrr5"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Header />
      <main className="flex-1">
        <Hero />
        <WhyUs />
        <IndustryMatrix />
        <ProcurementProcess />
        <FacilityEquipment />
        <HomeRFQ />
      </main>
      <Footer />
    </>
  );
}
