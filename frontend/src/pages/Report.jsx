import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const ReportPage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [kotor, setKotor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !description) {
      alert("Foto dan deskripsi harus diisi!");
      return;
    }

    setLoading(true);
    setSuccessMsg("");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);
    formData.append("kotor", kotor);

    try {
      await axios.post("http://localhost:8000/report", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccessMsg("Laporan berhasil dikirim!");
      setImage(null);
      setPreview(null);
      setDescription("");
      setKotor(false);
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim laporan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full min-h-screen bg-center bg-cover"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      id="home"
      style={{ backgroundImage: "url('/BgHome.png')" }}
    >
      <motion.div
        className="w-full py-10"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Navbar />
      </motion.div>
      <div className="w-full justify-center items-center mx-auto text-center">
        <h1 className="text-3xl font-bold text-white mb-6">
          Laporkan Tempat
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-[90%] max-w-xl mx-auto bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-md flex flex-col gap-4"
        >
          {/* Upload Foto */}
          <label className="font-medium text-sm text-gray-700">
            Upload Foto Tempat
          </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-xl display mx-auto translate-x-14"
            />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg"
            />
          )}

          {/* Deskripsi */}
          <label className="font-medium text-sm text-gray-700">
            Deskripsi Laporan
          </label>
          <textarea
          spellCheck="false "
            className="p-2 mx-32 font-raleway font-medium border text-center resize-none no-underline justify-center items-center rounded-lg text-sm"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ceritakan kondisi tempat yang dilaporkan..."
          />

          {/* Checkbox */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={kotor}
              onChange={(e) => setKotor(e.target.checked)}
            />
            <span className="text-xl font-raleway font-bold text-white">
              Tempat ini terlihat kotor
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#204E51] text-white py-2 rounded-lg font-semibold hover:bg-[#183c3e]"
          >
            {loading ? "Mengirim..." : "Kirim Laporan"}
          </button>

          {/* Success message */}
          {successMsg && (
            <p className="text-green-600 text-sm font-medium">{successMsg}</p>
          )}
        </form>
      </div>
    </motion.div>
  );
};
export default ReportPage;
