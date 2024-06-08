import React, { useState } from 'react';

const UploadForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('resume', file);
    
    try {
      const response = await fetch('/api/resumes/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Resume uploaded successfully!');
      } else {
        console.error('Failed to upload resume');
      }
    } catch (error) {
      console.error('Error uploading resume:', error);
    }
  };

  return (
    <div className="upload-form" style={styles.uploadForm}>
      <h2 style={styles.heading}>Upload Resume</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="file" onChange={handleFileChange} style={styles.fileInput} />
        <button type="submit" style={styles.uploadButton}>Upload</button>
      </form>
    </div>
  );
};

const styles = {
  uploadForm: {
    maxWidth: '400px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    border: '1px solid #cccccc',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  fileInput: {
    marginBottom: '10px',
  },
  uploadButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  uploadButtonHover: {
    backgroundColor: '#0056b3',
  },
};

export default UploadForm;
