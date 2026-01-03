import Navbar from "@/components/layout/Navbar";
import "./globals.css";
import { Providers } from "./providers";
import Footer from "@/components/layout/Footer";
import Messenger from "@/components/shared/Messenger";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "Cherry Glow",
  description: "Beauty products store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <AuthProvider>
            <CartProvider>
              <Navbar />
              {children}
              <Messenger />
            </CartProvider>
            <Footer />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
