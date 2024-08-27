"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/firebaseConfig";

export default function () {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    setFile(e.target.files[0]);
  };

  const [details, setDetails] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };
  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    const storageRef = ref(storage, `images/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setUploadedUrl(url);
      console.log("file uploaded successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleUpload}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={details.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={details.description}
            onChange={handleChange}
            rows={10}
            cols={40}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            id="price"
            value={details.price}
            onChange={handleChange}
          />
        </div>
        <input type="file" onChange={handleFileChange} />
        <button type="button" onClick={() => {}} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
        <div>
          <button type="submit">Upload Image</button>

          <Image
            src={uploadedUrl || ""}
            alt="uploaded image"
            width={300}
            height={300}
            layout="responsive"
          />
        </div>
      </form>
    </div>
  );
}
