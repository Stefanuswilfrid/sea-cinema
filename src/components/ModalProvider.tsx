
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import SeatModal from "./Modal/SeatModal";
import LoginModal from "./Modal/LoginModal";
import RegisterModal from "./Modal/RegisterModal";
import TopUpModal from "./Modal/TopUpModal";

const ModalProvider = () => {
 
    return (
        <>
        <TopUpModal/>
        <SeatModal />
      <LoginModal />
      <RegisterModal />
      </>
    )
}

export default ModalProvider;
