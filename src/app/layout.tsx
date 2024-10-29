import PageLayout from "@/components/organisms/page-layout";
import "./globals.css";
import Store from "@/provider/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Store>
          <PageLayout>{children}</PageLayout>
        </Store>
      </body>
    </html>
  );
}
