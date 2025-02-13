import { User } from "../models/user.model.js";

//Update User Details
export async function updateUser(req, res) {
  try {
    const userId = req.user?.id;
    const { name, email, number } = req.body;
    if (!name || !email || !number) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    // Validate number format
    const numberRegex = /^\d{10}$/;
    if (!numberRegex.test(number)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid number. It should be exactly 10 digits." });
    }

    // Find the user in the database
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if any fields have changed
    const updates = {};
    if (name !== existingUser.name) updates.name = name;
    if (email !== existingUser.email) {
      // Check if the email is already in use by another user
      const existingUserByEmail = await User.findOne({ email, _id: { $ne: userId } });
      if (existingUserByEmail) {
        return res
          .status(400)
          .json({ success: false, message: "Email already exists" });
      }
      updates.email = email;
    }
    if (number !== existingUser.number) {
      // Check if the number is already in use by another user
      const existingUserByNumber = await User.findOne({ number, _id: { $ne: userId } });
      if (existingUserByNumber) {
        return res
          .status(400)
          .json({ success: false, message: "Number already in use by another user" });
      }
      updates.number = number;
    }

    // If no fields were changed
    if (Object.keys(updates).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Please update the field(s) you want to change" });
    }

    // Update the user with the changed fields
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "User Updated",
      user: updatedUser,
      password: "",
    });
  } catch (error) {
    console.error("Error in updateUser controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

//Delete User Account
export async function deleteUser(req, res) {
  try {
    //Find and Delete
    const userId = req.user?.id;
    const user = await User.findByIdAndDelete(userId);
    res.status(200).json({
      success: true,
      message: "User account deleted successfully",
      user,
    });
  } catch (error) {
    console.log("Error in deleteUser controller", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}
