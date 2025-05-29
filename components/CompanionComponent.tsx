"use client"
import { cn, configureAssistant, getSubjectColor } from '@/lib/utils'
import { vapi } from '@/lib/vapi.sdk';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import Image from 'next/image';
import soundwaves from "@/constants/soundwaves2.json"

import React, { useEffect, useRef, useState } from 'react'
import { addToSessionHistory } from '@/lib/actions/companion.action';

enum CallStatus {
    INACTIVE = "INACTIVE",
    ACTIVE = "ACTIVE",
    CONNECTING = "CONNECTING",
    FINISHED = "FINISHED"
}

const CompanionComponent = ({companionId,subject,topic,name,userName,userImage,style,voice}:CompanionComponentProps) => {
    const [callStatus, setCallStatus] = useState(CallStatus.INACTIVE);
    const [onSpeaking, setOnSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [messages, setMessages] = useState<SavedMessage []>()  

    console.log("key" , process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN);
    
    const lottieRef = useRef<LottieRefCurrentProps>(null);

    useEffect(()=>{
        if (lottieRef) {
            if(onSpeaking) lottieRef.current?.play()
                else lottieRef.current?.stop();
        }
    },[onSpeaking,lottieRef])

    useEffect(()=> {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

        const onCallEnd = () => { 
            setCallStatus(CallStatus.FINISHED); 
            addToSessionHistory(companionId)
        }

       const onMessage = (message: Message) => {
  if (message.type === "transcript" && message.transcript === 'final') {
    const newMessage = { role: message.role, content: message.transcript }
    setMessages((prev: any) => [newMessage, ...prev]);
  }
}


        const onSpeechStart = () => setOnSpeaking(true);
        const onSpeechEnd = () => setOnSpeaking(false)

        const onError = (error:Error) => console.log("Error" , error);

        vapi.on("call-start", onCallStart);
        vapi.on("call-end", onCallEnd);
        vapi.on("message", onMessage);
        vapi.on("error", onError);
        vapi.on("speech-start", onSpeechStart);
        vapi.on("speech-end", onSpeechEnd);

        return () => {
            vapi.off("call-start", onCallStart);
            vapi.off("call-end", onCallEnd);
            vapi.off("message", onMessage);
            vapi.off("error", onError);
            vapi.off("speech-start", onSpeechStart);
            vapi.off("speech-end", onSpeechEnd);
        }

    })

    const toggleMicrophone =()=> {
        const muted = vapi.isMuted();
        vapi.setMuted(!muted)
        setIsMuted(!isMuted)
        
    }

 const handleCall = async () => {
  try {
    setCallStatus(CallStatus.CONNECTING);

    const assistant = configureAssistant(voice, style, topic, subject);

    const assistantOverrides = {
      variableValues: { subject, topic, style },
      clientMessages: ['transcript'],
      serverMessages: [],
    };

    
    await vapi.start(assistant, assistantOverrides);
  } catch (err) {
    console.error("vapi.start() failed:", err);
    setCallStatus(CallStatus.INACTIVE);
  }
};


    const handleDisconnect = async () => {
        setCallStatus(CallStatus.FINISHED)
        vapi.stop();
    }

  return (
    <section className='h-[70vh] flex flex-col'>
        <div className="flex gap-8 max-sm:flex-col">
            <div className="companion-section">
                <div className="companion-avatar"
                 style={{backgroundColor: getSubjectColor(subject)}}
                >
                    <div className={cn("absolute transition-opacity duration-1000" , callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? "opacity-100" : "opacity-0", callStatus === CallStatus.CONNECTING && "animate-pulse opacity-100",   )}>
                         <Image src={`/icons/${subject}.svg`} alt={subject} width={100} height={100} className='max-sm:w-fit'/>
                    </div>

                    <div className={cn("absolute transition-opacity duration-1000", callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0")}>
                        <Lottie 
                          lottieRef={lottieRef}
                          animationData={soundwaves}
                          autoPlay={false}
                          className='companion-lottie'
                        />

                    </div>
                </div>

                <p className='text-[15px] font-semibold text-gray-700 py-4'>{name}</p>
            </div>

            <div className="user-section">
                <div className="user-avatar">
                    <Image src={userImage} alt='user Image' width={130} height={130} className='rounded-full' />
                 <p className='text-[15px] font-semibold text-gray-700 py-4'>{userName}</p>

                </div>

                <button className="btn-mic" onClick={toggleMicrophone}>
                    <Image src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"} alt={subject} width={100} height={100} className='max-sm:w-fit'/>

                    <p>{isMuted ? "Turn microphone on" : "Turn off microphone"}</p>
                </button>

                <button 
                className={cn("rounded-lg py-2 cursor-pointer transition-colors w-full text-white font-medium", callStatus === CallStatus.ACTIVE ? "bg-red-700" : "bg-primary", callStatus === CallStatus.ACTIVE && "animate-pulse")}
                onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
                >
                    {callStatus === CallStatus.ACTIVE ? "End session" : callStatus === CallStatus.CONNECTING ? "Connecting" : "Start session"}
                </button>
            </div>
        </div> 

        <div className="transcript">
            <div className="transcript-message no-scrollbar">
              {messages?.map((message) => {
  if (message.role === "assistant") {
    return (
      <p key={message.content} className='max-sm:text-sm'>
        {name.split("")[0].replace(/[.,]/g, "")} : {message.content}
      </p>
    );
  } else {
    return (
      <p key={message.content} className='text-primary max-sm:text-sm'> 
        {userName} : {message.content}
      </p>
    );
  }
})}

            </div>

            <div className="transcript-fade" />
        </div>

    </section>
  )
}

export default CompanionComponent