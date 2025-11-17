import React from "react";
import { Toaster } from "react-hot-toast";

const MyToaster = () => {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,

          style: {
            background: "rgba(20,20,30,0.6)",
            color: "#fff",
            backdropFilter: "blur(12px) saturate(180%)",
            WebkitBackdropFilter: "blur(12px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow:
              "0 8px 25px rgba(0,255,255,0.15), inset 0 0 20px rgba(255,255,255,0.05)",
            borderRadius: "14px",
            padding: "14px 18px",
            fontSize: "16px",
            fontWeight: "500",
            animation: "toast-pop 0.35s ease-out",
          },

          success: {
            iconTheme: {
              primary: "#00ffc6",
              secondary: "#0a0a12",
            },
            style: {
              border: "1px solid rgba(0,255,200,0.4)",
              boxShadow: "0 12px 35px rgba(0,255,180,0.25)",
            },
          },

          error: {
            iconTheme: {
              primary: "#ff1e68",
              secondary: "#0a0a12",
            },
            style: {
              border: "1px solid rgba(255,50,120,0.4)",
              boxShadow: "0 12px 35px rgba(255,0,80,0.25)",
            },
          },
        }}
      />

      <style>
        {`
            @keyframes toast-pop {
              0% { 
                transform: translateY(-15px) scale(0.9);
                opacity: 0;
              }
              100% {
                transform: translateY(0px) scale(1);
                opacity: 1;
              }
            }
          `}
      </style>
    </>
  );
};

export default MyToaster;
