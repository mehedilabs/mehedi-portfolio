import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mehedi Hasan — Senior Full-Stack Architect & Engineer",
  description:
    "Production-minded personal portfolio, engineering projects, case studies, and technical blog by Mehedi Hasan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0a0d14] text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-300">
        {children}
      </body>
    </html>
  );
}
