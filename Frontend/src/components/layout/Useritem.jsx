import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../Redux/userSlice";
import { setMessages } from "../../Redux/messageSlice";

const UserItem = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);

  const selectedUserHandler = () => {
     dispatch(setMessages([]));
    dispatch(setSelectedUser(user));
  };

  const isSelected = selectedUser?._id === user?._id;
  const isOnline = onlineUsers?.includes(user?._id);

  return (
    <>
      <style>{`
        .lightning-box {
          position: relative;
          border-radius: 0.75rem;
          padding: 0.5rem 0.75rem;
          transition: all 0.3s ease;
          overflow: hidden;
          background-color: rgba(25, 25, 25, 0.25);
          box-shadow:
            0 0 5px rgba(255, 0, 0, 0.6),
            0 0 10px rgba(0, 255, 0, 0.6),
            0 0 15px rgba(0, 0, 255, 0.6),
            inset 0 0 8px rgba(255, 255, 255, 0.08);
          animation: rgbPulse 3s infinite alternate;
        }

        @keyframes rgbPulse {
          0% {
            box-shadow:
              0 0 6px rgba(255, 0, 0, 0.8),
              0 0 15px rgba(0, 255, 0, 0.6),
              0 0 20px rgba(0, 0, 255, 0.6),
              inset 0 0 10px rgba(255, 255, 255, 0.08);
          }
          50% {
            box-shadow:
              0 0 10px rgba(0, 255, 255, 0.8),
              0 0 20px rgba(255, 0, 255, 0.7),
              0 0 25px rgba(255, 255, 0, 0.7),
              inset 0 0 12px rgba(255, 255, 255, 0.12);
          }
          100% {
            box-shadow:
              0 0 7px rgba(255, 0, 255, 0.8),
              0 0 18px rgba(0, 255, 255, 0.6),
              0 0 25px rgba(255, 0, 0, 0.6),
              inset 0 0 8px rgba(255, 255, 255, 0.08);
          }
        }

        .neon-text {
          color: #fff;
          text-shadow:
            0 0 4px #fff,
            0 0 8px #0ff,
            0 0 12px #0ff,
            0 0 18px #0ff,
            0 0 25px #0ff;
          animation: lightningGlow 2.5s infinite alternate;
        }

        @keyframes lightningGlow {
          0% {
            text-shadow:
              0 0 3px #fff,
              0 0 8px #00ffff,
              0 0 15px #00ffff,
              0 0 20px #00ffff;
          }
          50% {
            text-shadow:
              0 0 5px #fff,
              0 0 10px #00ffff,
              0 0 25px #00ffff,
              0 0 35px #00ffff;
          }
          100% {
            text-shadow:
              0 0 3px #fff,
              0 0 7px #00ffff,
              0 0 20px #00ffff,
              0 0 28px #00ffff;
          }
        }

        .avatar-wrapper {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 9999px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.15);
          flex-shrink: 0;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.05);
        }

        .online-badge {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgb(0, 255, 128);
          border: 2px solid #fff;
          box-shadow: 0 0 8px rgba(0, 255, 128, 0.8);
        }

        .user-divider {
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.2);
          margin: 6px 0;
          border-radius: 1px;
          transition: all 0.3s ease;
        }

        .user-divider:hover {
          background: rgba(0, 255, 255, 0.6);
          box-shadow: 0 0 6px rgba(0, 255, 255, 0.6);
        }
      `}</style>

      <div>
        {/* USER BOX */}
        <div
          onClick={selectedUserHandler}
          className={`relative flex items-center gap-3 cursor-pointer rounded-xl transition-all duration-300 ${
            isSelected ? "bg-white/10 border border-purple-400/500" : "hover:bg-white/30"
          }`}
          style={{ padding: "0.5rem 0.75rem" }}
        >
          {isOnline ? (
            <div className="lightning-box flex items-center gap-3 w-full">
              <div className="avatar-wrapper relative">
                <img
                  src={user?.profilePic}
                  alt="avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <span className="online-badge"></span>
              </div>
              <div className="neon-text  text-base font-semibold tracking-wide">
                {user?.fullName}
              </div>
            </div>
          ) : (
            <>
              <div className="avatar-wrapper relative">
                <img
                  src={user?.profilePic}
                  alt="avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
              <div className="text-violet-300 font-[cursive] font-semibold text-bold tracking-wide">
                {user?.fullName}
              </div>
            </>
          )}
        </div>

        {/* DIVIDER LINE */}
        <div className="user-divider"></div>
      </div>
    </>
  );
};

export default UserItem;
