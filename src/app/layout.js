import '@/styles/globals.css';

import { Geist, Geist_Mono,Lexend_Deca,Inter,Manrope,Roboto, Poppins } from "next/font/google";

import Header from "../components/Header";
import Footer from "../components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});




const lexendDeca = Lexend_Deca({
  subsets: ['latin'],
  weight: ['400', '700'], // adjust if needed
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["100","300","400", "500",'600', "700"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", '600',"700"],
  variable: "--font-manrope",
});
const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export const metadata = {
  title: "TrueSofts | AI & Blockchain",
  description: "AI & Blockchain Solutions",
  keywords: "AI, Blockchain, Web Development, App Development, SaaS, TrueSofts", 
}


export default function RootLayout({ children }) {

  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} ${lexendDeca.variable} ${manrope.variable} ${roboto.variable}`}>
      <body className="font-sans">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

