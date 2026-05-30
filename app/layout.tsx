import type { Metadata } from "next";
import { Work_Sans } from "next/font/google"; 
import "./globals.css";
import 'easymde/dist/easymde.min.css';
import { Toaster } from "@/components/ui/sonner";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Venture-X",
  description: "Pitch, Vote, and Discover the Future of Startups with Venture-X - Your Ultimate Platform for Startup Innovation and Investment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={workSans.variable}
      >
        
        {children}

        <Toaster/>
      </body>
    </html>
  );
}
