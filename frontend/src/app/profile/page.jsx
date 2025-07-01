"use client";
import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/navigation";
import { Camera, Trash, Check, X } from "lucide-react";
import PopupModal from "../../components/PopupModal";
import ProblemSelect from "../../components/ProblemSelect";
import axios from "axios";

export default function ProfilePage() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(user?.name || "");
  const [popup, setPopup] = useState(null);
  const [volunteerInfo, setVolunteerInfo] = useState(null);
  const [description, setDescription] = useState("");
  const [problems, setProblems] = useState([]);

  // Fetch volunteer info on load
  useEffect(() => {
    const fetchVolunteerInfo = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/volunteer/me");
        const data = await res.json();
        if (data?.volunteer) {
          setVolunteerInfo(data.volunteer);
          setDescription(data.volunteer.description || "");
          setProblems(data.volunteer?.problem || []);
        }
      } catch (error) {
        console.error("Failed to fetch volunteer info:", error);
      }
    };

    if (user) fetchVolunteerInfo();
  }, [user]);

  // Image Upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.imageUrl) {
        await handleSaveChanges(nameInput, data.imageUrl);
      }
    } catch (err) {
      console.error("Image upload error:", err);
      setPopup({ type: "error", message: "Image upload failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async () => {
    try {
      await handleSaveChanges(nameInput, "/images/default.jpg");
    } catch (err) {
      setPopup({ type: "error", message: "Failed to delete image." });
    }
  };

  // Save changes to user profile (name/image)
  const handleSaveChanges = async (updatedName = user.name, updatedImage = user.image) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: updatedName, image: updatedImage }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.updatedUser));
        setUser(data.updatedUser);
        setEditingName(false);
        setPopup({ type: "success", message: "Profile updated successfully" });
      } else {
        setPopup({ type: "error", message: "Failed to update profile" });
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleCancelEdit = () => {
    setNameInput(user?.name);
    setEditingName(false);
  };

  // Logout
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/users/logout");
      localStorage.removeItem("user");
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      setPopup({ type: "error", message: "Logout failed. Please try again." });
    }
  };

  // Auto-save volunteer description/problems
  useEffect(() => {
    if (!volunteerInfo) return;

    const updateVolunteerInfo = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/volunteer/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description, problem: problems }),
        });
        const data = await res.json();
        if (data.success) {
          setVolunteerInfo(data.updatedVolunteer);
        } else {
          setPopup({ type: "error", message: "Failed to update volunteer info" });
        }
      } catch (error) {
        console.error("Volunteer update failed:", error);
      }
    };

    updateVolunteerInfo();
  }, [description, problems]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cream px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl">
        <div>Hello {user?.name}</div>

        <div className="relative w-28 h-28 mx-auto mb-4">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-70 rounded-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-600" />
            </div>
          )}

          <img
            src={user.image}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border"
          />

          <button
            className="absolute bottom-0 right-0 bg-white border rounded-full p-1 hover:bg-gray-100 z-20"
            onClick={() => fileInputRef.current.click()}
          >
            <Camera size={18} />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          {user.image !== "/images/default.jpg" && (
            <button
              onClick={handleDeleteImage}
              className="absolute -top-0 -right-0 bg-white border rounded-full p-1 hover:bg-red-100 z-20"
              title="Delete Image"
            >
              <Trash size={16} className="text-red-500" />
            </button>
          )}
        </div>

        <div className="mb-4 text-center flex items-center justify-center">
          {!editingName ? (
            <p
              className="w-1/2 text-center text-xl cursor-pointer border-b border-gray-300 focus:outline-none h-9"
              onClick={() => setEditingName(true)}
            >
              {user?.name}
            </p>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <input
                type="text"
                className="text-xl font-semibold text-center border-b border-gray-300 focus:outline-none bg-transparent"
                value={nameInput}
                placeholder={user?.name}
                onChange={(e) => setNameInput(e.target.value)}
              />
              <button
                onClick={() => handleSaveChanges(nameInput, user.image)}
                className="text-green-600 hover:text-green-800"
              >
                <Check size={20} />
              </button>
              <button
                onClick={handleCancelEdit}
                className="text-red-500 hover:text-red-700"
              >
                <X size={20} />
              </button>
            </div>
          )}
        </div>

        <div className="mb-4 text-center">
          <p className="text-gray-500">{user.email}</p>
        </div>

        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="text-blue-600 hover:underline font-medium">My Calls</a>
          <a href="#" className="text-blue-600 hover:underline font-medium">My Chats</a>
        </div>

        {volunteerInfo && (
          <>
            <div className="mt-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Problems You Support
              </label>
              <ProblemSelect volunteer={user}  />
            </div>

            <div>
              <span className="font-medium text-gray-700">Problems:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {volunteerInfo.problem.map((prob, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {prob}
                    <button
                      onClick={() => {
                        const updated = volunteerData.problem.filter((_, i) => i !== index);
                        handleProblemChange(updated);
                      }}
                      className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-6 gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition"
              >
                Logout
              </button>
            </div>

          </>
        )}
      </div>

      {popup && (
        <PopupModal
          type={popup.type}
          message={popup.message}
          onClose={() => setPopup(null)}
        />
      )}
    </div>
  );
}
