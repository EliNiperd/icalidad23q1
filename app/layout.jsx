import { Nunito } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { IcalidadProvider } from "@/contexts/IcalidadContext";
import { Toaster } from "@/components/ui/toaster"
import "@/styles/globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "iCalidad",
  description: "Suite para la gestión de sistemas de calidad, ambiental y seguridad industrial.",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="es-MX" suppressHydrationWarning>
        <body className={nunito.className}>
          <SessionProvider>
            <IcalidadProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <main>{children}</main>
                <Toaster />
              </ThemeProvider>
            </IcalidadProvider>
          </SessionProvider>
        </body>
      </html>
    </>
  );
}
