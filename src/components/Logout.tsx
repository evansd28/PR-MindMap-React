import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Logout = () => {
  return (
    <button onClick={() => signOut(auth)}>Logout</button>
  );
};

export default Logout;
