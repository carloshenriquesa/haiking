import type { Metadata } from "next";
import { Assistant, Croissant_One } from "next/font/google";
import "@/assets/globals.css";

const assistant = Assistant({
  variable: "--font-assistant-sans",
  subsets: ["latin"],
});

const croissant = Croissant_One({
  variable: "--font-croissant-one",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Trilhub",
  description: "Trilhub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
        <body
          className={`${assistant.variable} ${croissant.variable} font-sans antialiased`}
        >
          <main className="min-h-screen bg-white dark:bg-black">
            {children}
          </main>
        </body>
    </html>
  );
}
