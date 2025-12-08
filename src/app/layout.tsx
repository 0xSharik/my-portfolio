import type { Metadata } from "next";
import { Inter, Space_Grotesk, Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { LenisProvider } from "@/providers/lenis-provider";
import { RouteTransitionProvider } from "@/hooks/use-route-transition";
import { CanvasProvider } from "@/providers/canvas-provider";
import { PersistentCanvas } from "@/components/canvas/persistent-canvas";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/atoms/custom-cursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
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
          <LenisProvider>
            <RouteTransitionProvider>
              <CanvasProvider>
                <PersistentCanvas />
                <CustomCursor />
                <div className="relative z-10">
                  <Navbar />
                  {children}
                  <Footer />
                </div>
              </CanvasProvider>
            </RouteTransitionProvider>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
