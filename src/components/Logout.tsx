import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Logout = () => {
  return (
    <p className="hover:underline cursor-pointer" onClick={() => signOut(auth)}>
        Logout
    </p>
  );
};

export default Logout;
