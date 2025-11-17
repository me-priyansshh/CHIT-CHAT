import Group from "../models/groupModel.js";

export const createGroupController = async (req, res) => {
  try {

    const { name, members } = req.body;
    const groupAdmin = req.userId;

    if (!name || members.length === 0) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!groupAdmin) {
      return res.status(400).json({
        message: "You must be logged in to create a group",
      });
    }

    const group = await Group.create({
      name,
      members: [groupAdmin, ...members],
      groupAdmin,
    });

    return res.status(201).json({
      message: "Group created successfully",
      group,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//Remove Member from Group
export const removeMemberController = async (req, res) => {
  try {
    const { groupId, memberId } = req.body;

    if (!groupId || !memberId) {
      return res.status(400).json({
        message: "Group ID and Member ID are required",
      });
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    if (group.groupAdmin.toString() !== req.userId) {
      return res.status(403).json({
        message: "Only group admin can remove members",
      });
    }

    // Check if member exists
    const exists = group.members.some(
      (m) => m.toString() === memberId.toString()
    );

    if (!exists) {
      return res.status(404).json({
        message: "Member not found in group",
      });
    }

    // Remove member
    group.members = group.members.filter(
      (m) => m.toString() !== memberId.toString()
    );

    await group.save();

    const updatedGroup = await Group.findById(groupId)
      .populate("members", "fullName userName profilePic gender _id")
      .populate("groupAdmin", "fullName userName profilePic gender");

    return res.status(200).json({
      message: "Member removed successfully",
      updatedGroup,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


//Add members to Group
export const addMemberController = async (req, res) => {
  try {
    const { groupId, memberId } = req.body;

    // Validate inputs
    if (!groupId || !memberId) {
      return res.status(400).json({
        message: "Group ID and Member ID are required",
      });
    }

    // Find group
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    // Only admin can remove members
    if (group.groupAdmin.toString() !== req.userId) {
      return res.status(403).json({
        message: "Only group admin can Add members",
      });
    }

    // Check if member already exists in the group
    if (group.members.some((m) => m.toString() === memberId)) {
      return res.status(400).json({
        message: "Member already in group",
      });
    }

    // Remove the member
    group.members.push(memberId);

    await group.save();

    // Populate user details for better response
    const updatedGroup = await Group.findById(groupId)
      .populate("members", "fullName userName profilePic gender _id")
      .populate("groupAdmin", "fullName userName profilePic gender _id");

    return res.status(200).json({
      message: "Member Added successfully",
      updatedGroup,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//Delete Group
export const deleteGroupController = async (req, res) => {
  try {
    const { groupId } = req.body;
    const userId = req.userId;

    if (!groupId) {
      return res.status(400).json({ message: "Group ID is required" });
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Only group admin can delete
    if (group.groupAdmin.toString() !== userId) {
      return res.status(403).json({ message: "Only Admin can delete group" });
    }

    await group.deleteOne(); // deletes the group

    return res.status(200).json({
      message: "Group deleted successfully",
      group,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//Get Groups of User
export const getUserGroupsController = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    const groups = await Group.find({ members: userId })
      .populate("members", "fullName userName profilePic gender _id")
      .populate("groupAdmin", "fullName userName profilePic gender");

    return res.status(200).json({
      message: "User groups fetched successfully",
      groups,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
