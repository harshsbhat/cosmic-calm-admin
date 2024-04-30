import React, { useState } from 'react';
import axios from 'axios';
import { addDoc, collection, db } from '../firebase'; // Adjust the path to your firebase.js file
import './AddMeditation.css'; 
import '../cms.css'; 

const AddMeditation = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleAudioFileUpload = async (event) => {
    setAudioFile(event.target.files[0]);

    try {
      const audioFormData = new FormData();
      audioFormData.append('audio', event.target.files[0]);

      const response = await axios.post('http://localhost:8000/api/upload-audio', audioFormData);
      setAudioUrl(response.data);
    } catch (error) {
      console.error('Error uploading audio file:', error);
    }
  };

  const handleImageFileUpload = async (event) => {
    setImageFile(event.target.files[0]);

    try {
      const imageFormData = new FormData();
      imageFormData.append('image', event.target.files[0]);

      const response = await axios.post('http://localhost:8000/api/upload-image', imageFormData);
      setImageUrl(response.data);
    } catch (error) {
      console.error('Error uploading image file:', error);
    }
  };

  const handleMetadataSubmit = async (event) => {
    event.preventDefault();

    const metadata = {
      audioUrl,
      imageUrl,
      name: event.target.elements.name.value,
      description: event.target.elements.description.value,
      duration: event.target.elements.duration.value,
      tag: event.target.elements.tag.value,
      totalViws: 0,
      views: [],
    };

    try {
      const meditationsCollection = collection(db, 'meditations');
      await addDoc(meditationsCollection, metadata);

      console.log('Metadata submitted successfully!');
      // Reset the form after successful submission
      event.target.reset();
    } catch (error) {
      console.error('Error uploading metadata to Firebase:', error);
    }
  };

  return (
    <div className='add-meditation'>
      <h2>Add New Meditation</h2>
      <div>
        <label>
          Audio File:
          <input type="file" accept="audio/*" onChange={handleAudioFileUpload} />
        </label>
        {audioUrl && <p>Audio URL: {audioUrl}</p>}
        <label>
          Image File:
          <input type="file" accept="image/*" onChange={handleImageFileUpload} />
        </label>
        {imageUrl && <p>Image URL: {imageUrl}</p>}
      </div>
      <form className="meditation-form" onSubmit={handleMetadataSubmit}>
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Description:
          <input type="text" name="description" required />
        </label>
        <label>
          Duration:
          <input type="text" name="duration" required />
        </label>
        <label>
          Tag:
          <input type="text" name="tag" required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddMeditation;
