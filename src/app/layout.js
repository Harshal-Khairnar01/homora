import "./globals.css";
import Navbar from "@/components/Navbar";
import { Poppins } from "next/font/google";
import { getAuthSession } from "@/utils/auth";
import { Toaster } from "sonner";

export const metadata = {
  title: "Homora : Home for Holidays",
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
        <div className=" w-full fixed top-0 left-0 z-50">
          <Navbar user={session?.user} />
        </div>
        <div className=" w-full mt-20 pt-1">{children}</div>
        <Toaster position="top-center" richColors duration={3000} closeButton />
      </body>
    </html>
  );
}
