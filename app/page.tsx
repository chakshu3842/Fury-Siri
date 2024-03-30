"use client"

import Image from "next/image";
import { SettingsIcon } from "lucide-react";
import Messages from "@/components/Messages";
import Recorder, { mimeType } from "@/components/Recorder";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import transcript from "@/action/transcript";
import VoiceSynthesizer from "@/components/VoiceSynthesizer";

const initialState = {
  sender: "",
  response: "",
  id: "",
};

export type Message = {
  sender: string;
  response: string;
  id: string;
};

export default function Home() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const [state , formAction] = useFormState(transcript, initialState);
  const [messages, setMessages] = useState<Message[]>([]);
  const [displaySettings, setDisplaySettings] = useState(false);

  useEffect(() => {
    if(state.response && state.sender) {
      setMessages(messages => [
        {
          sender: state.sender || "",
          response: state.response || "",
          id: state.id || "",
        },
        ...messages
      ]);
    }
  }, [state]);

  const uploadAudio = (blob : Blob) => {
    const file = new File([blob], 'audio.webm', {type: mimeType});

    //set the file as the value of the hidden file input field

    if(fileRef.current){
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileRef.current.files = dataTransfer.files;

      if(submitButtonRef.current){
        submitButtonRef.current.click();
      }
    }
  };


  return (
    <main className=" h-screen overflow-y-auto">
      {/* Header */}
      <header className="flex justify-between fixed top-0 text-white w-full p-5">
        <Image
        src="nick-fury.svg"
        alt="Fury"
        width={50}
        height={50}
        className="object-contain"
        />

        <SettingsIcon 
        size={40}
         className="p-2 m-2 rounded-full cursor-pointer bg-gray-600 text-black transition-all ease-in-out duration-150 hover:bg-gray-700 hover:text-white"
         onClick={() => setDisplaySettings(!displaySettings)}
        />

      </header>

      {/* Form */}

      <form action={formAction} className="flex flex-col bg-black">
        <div className="flex-1 bg-gradient-to-b from-gray-500 to-gray-900">
          {/* Messages */}
          <Messages messages={messages} />
          
        </div>

        {/* Hidden Fields */}

        <input type="file" name="audio" hidden ref={fileRef} />
        <button type="submit" hidden ref={submitButtonRef} />

        <div className="fixed bottom-0 w-full overflow-hidden bg-black rounded-t-3xl">
          {/* Recorder */}
          <Recorder uploadAudio={uploadAudio} />


          <div>
            {/* Voice Synthesizer --output of the assistant voice */}
            <VoiceSynthesizer 
            state={state}
            displaySettings={displaySettings}
            />
          </div>
        </div>


      </form>


    </main>
  );
}
