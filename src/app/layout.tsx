import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TechNova | IT Solutions & Software Development",
  description: "Transform your business with cutting-edge IT solutions. We provide software development, cloud services, and digital transformation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-outfit antialiased">
        {children}
      </body>
    </html>
  );
}

