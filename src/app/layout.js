import "./globals.css";
import Navbar from "@/components/Navbar";
import { Poppins } from "next/font/google";
import { getAuthSession } from "@/utils/auth";
import { Toaster } from "sonner";

export const metadata = {
  title: "Homora : Your Intelligent Home & Lifestyle Hub",
  description:
    "Smartly manage your home, tasks, and lifestyle — all in one place.",
};

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default async function RootLayout({ children }) {
  const session = await getAuthSession();
  return (
    <html lang="en">
      <body className={` ${poppins.className} antialiased`}>
        <Navbar user={session?.user} />
        {children}
        <Toaster position="top-center" richColors duration={3000} closeButton />
      </body>
    </html>
  );
}
