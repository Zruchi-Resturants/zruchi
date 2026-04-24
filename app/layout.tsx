import "./globals.css";
import RouteNavbar from "@/components/route-navbar";

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
        <RouteNavbar />

        {children}
      </body>
    </html>
  );
}