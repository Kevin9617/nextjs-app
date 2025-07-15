'use client'

import { useState } from "react";
import selectedFiles from "../../../utils/selectedFiles";
import Image from "next/image";

const PropertyMediaUploader = ({ form, setForm, maxImages = 5 }) => {
  const [propertySelectedImgs, setPropertySelectedImgs] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Upload file to /api/upload and return filename
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    return data.filename;
  };

  // multiple image select
  const multipleImage = async (e) => {
    const files = selectedFiles(e).slice(0, maxImages - propertySelectedImgs.length);
    const isExist = propertySelectedImgs?.some((file1) =>
      files?.some((file2) => file1.name === file2.name)
    );
    if (!isExist) {
      setUploading(true);
      const uploaded = [];
      for (let file of files) {
        const filename = await uploadFile(file);
        uploaded.push({ file, filename });
      }
      const newImgs = [...propertySelectedImgs, ...uploaded].slice(0, maxImages);
      setPropertySelectedImgs(newImgs);
      // Set up to 5 images in form state
      setForm((prev) => {
        const updates = {};
        for (let i = 0; i < maxImages; i++) {
          updates[`media_image${i + 1}`] = newImgs[i] ? newImgs[i].filename : '';
        }
        return { ...prev, ...updates };
      });
      setUploading(false);
    } else {
      alert("You have selected one image already!");
    }
  };

  // delete image
  const deleteImage = (name) => {
    const deleted = propertySelectedImgs?.filter((item) => item.filename !== name);
    setPropertySelectedImgs(deleted);
    setForm((prev) => {
      const updates = {};
      for (let i = 0; i < maxImages; i++) {
        updates[`media_image${i + 1}`] = deleted[i] ? deleted[i].filename : '';
      }
      return { ...prev, ...updates };
    });
  };

  // handle attachment
  const handleAttachment = async (e) => {
    const files = selectedFiles(e);
    setUploading(true);
    const uploaded = [];
    for (let file of files) {
      const filename = await uploadFile(file);
      uploaded.push({ file, filename });
    }
    const newAttachments = [...attachments, ...uploaded];
    setAttachments(newAttachments);
    setForm((prev) => ({
      ...prev,
      attachment1: newAttachments[0] ? newAttachments[0].filename : '',
      attachment2: newAttachments[1] ? newAttachments[1].filename : '',
    }));
    setUploading(false);
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        <ul className="mb-0">
          {propertySelectedImgs.length > 0
            ? propertySelectedImgs?.map((item, index) => (
                <li key={index} className="list-inline-item">
                  <div className="portfolio_item">
                    <Image
                      width={200}
                      height={200}
                      className="img-fluid cover"
                      src={item.filename ? `/api/image?filename=${item.filename}` : URL.createObjectURL(item.file)}
                      alt="fp1.jpg"
                    />
                    <div
                      className="edu_stats_list"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Delete"
                      data-original-title="Delete"
                    >
                      <a onClick={() => deleteImage(item.filename)}>
                        <span className="flaticon-garbage"></span>
                      </a>
                    </div>
                  </div>
                </li>
              ))
            : undefined}
        </ul>
      </div>
      {/* End .col */}
      <div className="col-lg-12">
        <div className="portfolio_upload">
          <input
            type="file"
            onChange={multipleImage}
            multiple
            accept="image/png, image/gif, image/jpeg"
          />
          <div className="icon">
            <span className="flaticon-download"></span>
          </div>
          <p>Drag and drop images here</p>
          {uploading && <div style={{ color: '#ff5a5f', marginTop: 8 }}>Uploading...</div>}
        </div>
      </div>
      {/* End .col */}
      <div className="col-xl-6">
        <div className="resume_uploader mb30">
          <h3>Attachments</h3>
          <form className="form-inline d-flex flex-wrap wrap">
            <input className="upload-path" />
            <label className="upload">
              <input type="file" onChange={handleAttachment} multiple />
              Select Attachment
            </label>
          </form>
          <ul className="mb-0 mt-2">
            {attachments.length > 0 && attachments.map((item, idx) => (
              <li key={idx}>{item.filename}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default PropertyMediaUploader;
