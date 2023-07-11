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

export default  function App({ Component, pageProps: {session,...pageProps} }: AppProps) {
  const router = useRouter();
  const movieName = router.asPath.substring(1);
  return (
    <>
    <SessionProvider>
      <ToasterProvider />
      <SeatModal movieName={movieName as string}/>
      <LoginModal />
      <RegisterModal />
      <Navbar /> 
      <Component {...pageProps} />
      <Footer />
      </SessionProvider>
    </>
  );
}
