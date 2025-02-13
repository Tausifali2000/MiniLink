import { useState, useEffect } from "react";
import styles from "./cssModules/Settings.module.css";
import { useAuthStore } from "../../store/auth.store";
import { useSettingsStore } from "../../store/settings.store";
import DeleteAccount from "../../components/DeleteAccount";
import { useNavigate } from "react-router-dom";


const Settings = () => {
  const { user, logout } = useAuthStore(); 
  const { updateUser, deleteUser, isUpdating } = useSettingsStore(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        mobile: user.number || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  

  const handleSave = async () => {
    try {
      await updateUser({
        name: formData.name,
        email: formData.email,
        number: formData.mobile,
      });
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(); 
      await logout(); 
      navigate("/login"); 
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account.");
    } finally {
      setDialogOpen(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          disabled={isUpdating}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Email id</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          disabled={isUpdating}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Mobile no.</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className={styles.input}
          disabled={isUpdating}
        />
      </div>
      <div className={styles.actions}>
        <button
          onClick={handleSave}
          className={styles.saveButton}
          disabled={isUpdating}
        >
          {isUpdating ? <span className={styles.spinner}></span> : "Save Changes"}
        </button>
        <button
          onClick={() => setDialogOpen(true)}
          className={styles.deleteButton}
          disabled={isUpdating}
        >
          Delete Account
        </button>
      </div>

      {isDialogOpen && (
        <DeleteAccount 
          onConfirm={handleDelete} 
          onCancel={() => setDialogOpen(false)} 
        />
      )}
    </div>
  );
};

export default Settings;
