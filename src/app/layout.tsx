import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FiFeather, FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import Link from "next/link";
import AuthProvider from "@/components/auth/AuthProvider";
import UserButton from "../components/auth/UserButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI-Powered Blog Platform",
  description: "Generate insightful blog posts on any topic with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 w-full bg-white border-b border-gray-200 shadow-sm z-50">
              <div className="container mx-auto px-4 py-4">
                <nav className="flex items-center justify-between">
                  <Link href="/" className="flex items-center">
                    <FiFeather className="h-6 w-6 text-blue-600 mr-2" />
                    <span className="text-xl font-bold text-gray-900">BlogAI</span>
                  </Link>
                  <div className="flex items-center space-x-4">
                    <Link 
                      href="/"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      Home
                    </Link>
                    <UserButton />
                  </div>
                </nav>
              </div>
            </header>
            <main className="flex-grow">
              {children}
            </main>
            <footer className="bg-white border-t border-gray-200 py-6">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="flex items-center mb-4 md:mb-0">
                    <FiFeather className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-gray-900 font-medium">BlogAI</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
