import type { Metadata } from "next";
import "./globals.css";
import EncodeFont from "@/fonts/encode";
import MainSideBar from "@/components/sidebar/MainSideBar";
import SupabaseProvider from "@/Providers/SupaBaseProvider";
import UserProvider from "@/Providers/UserProvider";
import ModalProvider from "@/Providers/ModalProvider";
import ToastProvider from "@/Providers/ToastProvider";
import CustomThemeProvider from "@/Providers/CustomThemeProvider";
import getSongsByUserID from "@/actions/getSongsByUserID";
import Player from "@/components/Player/Player";
import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";

export const metadata: Metadata = {
  title: "wellcome to your spotify",
  description: "begin a great musical adventure with us.",
};
export const revalidate = 0;
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const myLibrary = await getSongsByUserID();
  const products = await getActiveProductsWithPrices();
  return (
    <html lang="en">
      <body
        className={
          EncodeFont.className +
          " bg-background text-text  min-w-full max-w-full overflow-hidden"
        }
      >
        <ToastProvider />
        <SupabaseProvider>
          <UserProvider>
            <CustomThemeProvider>
              <ModalProvider products={products} />
              <Player>
                <MainSideBar songs={myLibrary}>{children}</MainSideBar>
              </Player>
            </CustomThemeProvider>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
