import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import ChatbotWidget from '@/components/public/ChatbotWidget';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        {children}
      </main>
      <Footer />
      <ChatbotWidget />
    </>
  );
}
