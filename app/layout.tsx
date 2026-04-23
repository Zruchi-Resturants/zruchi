import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Zruchi",
  description: "Food discovery app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* NAVBAR */}
        <Navbar />

        {/* CONTENT (push below navbar) */}
        <div className="pt-14">
          {children}
        </div>
      </body>
    </html>
  );
}