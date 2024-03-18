import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
// import { signInWithPopup } from "firebase/auth";
// import { auth, providerGoogle, providerGithub } from "@/firebase/firebase";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FillMode from "@/pages/fillMode/fillMode";

const Social = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  // const google = () => {
  //   signInWithPopup(auth, providerGoogle)
  //     .then((data) => {
  //       setEmail(data.user.email);
  //       localStorage.setItem("email", data.user.email);
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const github = () => {
  //   signInWithPopup(auth, providerGithub)
  //     .then((data) => {
  //       setEmail(data.user.email);
  //       localStorage.setItem("email", data.user.email);
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const google = () => {
    const googleProvider = new GoogleAuthProvider();
    setIsLoading(true);

    signInWithPopup(auth, googleProvider)
      .then(() => {
        navigate("/");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const github = () => {
    const githubProvider = new GithubAuthProvider();
    setIsLoading(true);

    signInWithPopup(auth, githubProvider)
      .then(() => {
        navigate("/");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 mt-3">
        {isLoading && <FillMode />}
        <Button className="flex items-center gap-2" onClick={google}>
          <FaGoogle className="size-5" />
          <span>Google</span>
        </Button>
        <Button className="flex items-center gap-2" onClick={github}>
          <BsGithub className="size-5" />
          <span>GitHub</span>
        </Button>
      </div>
    </div>
  );
};

export default Social;
