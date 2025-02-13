import { toast } from "react-toastify";

export const handleSave = async ({ formData, updateUser }) => {
  try {
    await updateUser({
      name: formData.name,
      email: formData.email,
      number: formData.mobile,
    });
    toast.success("Profile updated successfully!");
  } catch (error) {
    console.error("Error saving user data:", error);
    toast.error("Failed to update profile.");
  }
};

export const handleDelete = async ({ deleteUser, logout, navigate, setDialogOpen }) => {
  try {
    await deleteUser();
    await logout();
    toast.success("Account deleted successfully.");
    navigate("/login");
  } catch (error) {
    console.error("Error deleting account:", error);
    toast.error("Failed to delete account.");
  } finally {
    setDialogOpen(false);
  }
};
