"use client"

import { useFormStatus } from "react-dom";
import { BeatLoader } from "react-spinners";

function LoadingMessage() {
    const {pending} = useFormStatus();
  return (
    pending && (
        <div className="max-w-3xl mx-auto">

        <p className="message ml-auto text-white">
            <BeatLoader color="white" />
        </p>
        </div>
    )
  )
}

export default LoadingMessage;
