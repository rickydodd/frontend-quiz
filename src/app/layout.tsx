import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const rubik = localFont({
  src: [
    { path: "../../public/assets/fonts/Rubik-VariableFont_wght.ttf" },
    {
      path: "../../public/assets/fonts/Rubik-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "Frontend Quiz",
  description: "A variety of front-end quizzes to test your knowledge!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.variable} antialiased`}>{children}</body>
    </html>
  );
}
