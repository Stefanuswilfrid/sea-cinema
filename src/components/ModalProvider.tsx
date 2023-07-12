
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import SeatModal from "./Modal/SeatModal";
import LoginModal from "./Modal/LoginModal";
import RegisterModal from "./Modal/RegisterModal";

const ModalProvider = () => {
    const router = useRouter();
    const movieName = router.asPath.substring(1);
    return (
        <>
        <SeatModal movieName={movieName as string}/>
      <LoginModal />
      <RegisterModal />
      </>
    )
}

export default ModalProvider;
