// pages/contact.js
import ProposalForm from "@/components/RequestProposal";
import { Inter, Manrope } from 'next/font/google';

const inter = Inter({
  subsets: ["latin"],
  weight: ["100","300","400", "500", "600", "700"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-manrope",
});

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto mt-20 border border-blue-500 px-6 py-6 rounded-3xl bg-white">
      <ProposalForm
        mainHeading="Connect with our experts"       // string now
        highlightText="experts"                     // separate highlight
        subHeading={
          <span className={inter.className}>
            Launch Your Next Successful Business - Reach Out to Us!
          </span>
        }
        formTitle="Request a proposal"
        showEffect={false} // Optional: true or false
        align="left"       // Optional: 'left' or 'center'
        mainHeadingClassName={`${manrope.className} font-bold text-[36px] leading-[56px]`}
      />
    </div>
  );
}
