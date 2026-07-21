import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FAQ } from "@/components/landing/FAQ";

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main>
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
