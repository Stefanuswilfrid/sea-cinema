import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import RegisterModal from "@/components/Modal/RegisterModal";
import LoginModal from "@/components/Modal/LoginModal";
import SeatModal from "@/components/Modal/SeatModal";
import ToasterProvider from "@/components/ToasterProvider";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { CartProvider } from "@/libs/context";
import ModalProvider from "@/components/ModalProvider";
import { Analytics } from "@vercel/analytics/react"

export default  function App({ Component, pageProps: {session,...pageProps} }: AppProps) {
  const router = useRouter();
  const movieName = router.asPath.substring(1);
  return (
    <>
    <CartProvider>
    <SessionProvider>
      <Analytics/>
      <ModalProvider/>
      <ToasterProvider />
      <Navbar /> 
      <Component {...pageProps} />
      <Footer />
      </SessionProvider>
      </CartProvider>
    </>
  );
}
