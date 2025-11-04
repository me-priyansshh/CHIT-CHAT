// GroupItem.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../Redux/userSlice";

const GroupItem = ({ group }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);

  const isSelected = selectedUser?._id === group?._id && selectedUser?.isGroup;

  const handleSelectGroup = () => {
    dispatch(setSelectedUser({ ...group, isGroup: true }));
  };

  const hasOnlineMember = group.members?.some((m) => onlineUsers?.includes(m._id));

  return (
    <>
      <style>{`
        .group-box {
          position: relative;
          border-radius: 0.75rem;
          padding: 0.5rem 0.75rem;
          transition: all 0.3s ease;
          overflow: hidden;
          background-color: rgba(25, 25, 25, 0.25);
          box-shadow:
            0 0 5px rgba(255, 0, 255, 0.4),
            0 0 10px rgba(0, 255, 255, 0.4),
            0 0 15px rgba(255, 255, 0, 0.4),
            inset 0 0 8px rgba(255, 255, 255, 0.08);
          animation: rgbPulse 3s infinite alternate;
          cursor: pointer;
        }

        @keyframes rgbPulse {
          0% {
            box-shadow:
              0 0 6px rgba(255, 0, 255, 0.6),
              0 0 15px rgba(0, 255, 255, 0.6),
              0 0 20px rgba(255, 255, 0, 0.6),
              inset 0 0 10px rgba(255, 255, 255, 0.08);
          }
          50% {
            box-shadow:
              0 0 10px rgba(255, 0, 255, 0.8),
              0 0 20px rgba(0, 255, 255, 0.7),
              0 0 25px rgba(255, 255, 0, 0.7),
              inset 0 0 12px rgba(255, 255, 255, 0.12);
          }
          100% {
            box-shadow:
              0 0 7px rgba(255, 0, 255, 0.7),
              0 0 18px rgba(0, 255, 255, 0.6),
              0 0 25px rgba(255, 255, 0, 0.6),
              inset 0 0 8px rgba(255, 255, 255, 0.08);
          }
        }

        .neon-text {
          color: #fff;
          text-shadow:
            0 0 4px #fff,
            0 0 8px #ff00ff,
            0 0 12px #ff00ff,
            0 0 18px #ff00ff,
            0 0 25px #ff00ff;
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

        .group-divider {
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.15);
          margin: 6px 0;
          border-radius: 1px;
          transition: all 0.3s ease;
        }

        .group-divider:hover {
          background: rgba(0, 255, 255, 0.6);
          box-shadow: 0 0 6px rgba(0, 255, 255, 0.6);
        }
      `}</style>

      <div
        onClick={handleSelectGroup}
        className={`group-box flex items-center gap-3 rounded-xl p-2 ${
          isSelected ? "border border-gray-100/200" : "hover:bg-white/10"
        }`}
      >
        {/* Group Avatar */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20">
          <img
            src={group.groupAdmin?.profilePic || "/default-group.png"}
            alt="group-avatar"
            className="w-full h-full object-cover"
          />
          {hasOnlineMember && <span className="online-badge"></span>}
        </div>

        <div className="flex-1">
          <div className="neon-text font-semibold">{group.name}</div>
          <div className="text-gray-400 text-sm">
            Admin: {group.groupAdmin?.fullName} | Members:{" "}
            {group.members?.map((m) => m.fullName).join(", ")}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="group-divider"></div>
    </>
  );
};

export default GroupItem;
