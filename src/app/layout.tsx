import type { Metadata } from "next";
import { Inter, Space_Grotesk, Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { RouteTransitionProvider } from "@/hooks/use-route-transition";
import { CanvasProvider } from "@/providers/canvas-provider";
import { PersistentCanvas } from "@/components/canvas/persistent-canvas";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/atoms/custom-cursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  weight: ["400", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: false,
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Sharik Hasan — CS Engineer",
  description: "Computer Science Engineer specializing in C++, Machine Learning, and Networking. Portfolio showcasing innovative projects and technical expertise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${firaCode.variable} antialiased film-grain`}
      >
        <ThemeProvider defaultTheme="dark">
          <RouteTransitionProvider>
            <CanvasProvider>
              <PersistentCanvas />
              <CustomCursor />
              <div className="relative z-10">
                <Navbar />
                {children}
                
    <script src="https://cdn.botpress.cloud/webchat/v3.5/inject.js"></script>
<script src="https://files.bpcontent.cloud/2025/12/14/06/20251214062226-FGO44ZJ6.js" defer></script>
    
                <Footer />
              </div>
            </CanvasProvider>
          </RouteTransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
