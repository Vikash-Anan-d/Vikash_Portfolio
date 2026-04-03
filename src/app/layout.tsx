import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { StarryBackground } from "@/components/ui/StarryBackground";
import { WeatherBackground } from "@/components/ui/WeatherBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vikash Anand | AI/ML & Full Stack Developer",
  description: "Portfolio of Vikash Anand, showcasing AI/ML projects, Full Stack web development, and professional experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen antialiased bg-background text-foreground relative transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SmoothScrollProvider>
            <CustomCursor />
            <StarryBackground />
            <WeatherBackground />
            <Navbar />
            <main className="flex min-h-screen flex-col items-center justify-between w-full">
              {children}
            </main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
