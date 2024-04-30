import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, db } from '../firebase';
import './Delete.css';

const DeleteMeditation = () => {
  const [meditations, setMeditations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMeditations = async () => {
      try {
        const meditationsCollection = collection(db, 'meditations');
        const meditationsSnapshot = await getDocs(meditationsCollection);
        const data = meditationsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setMeditations(data);
      } catch (error) {
        console.error('Error fetching meditations:', error);
      }
    };

    fetchMeditations();
  }, []);

  const handleDelete = async (id) => {
    try {
      const meditationRef = doc(db, 'meditations', id);
      await deleteDoc(meditationRef);
      setMeditations((prevMeditations) => prevMeditations.filter((meditation) => meditation.id !== id));
    } catch (error) {
      console.error('Error deleting meditation:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMeditations = meditations.filter((meditation) =>
    meditation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='delete'>
      <h2>Delete Meditations</h2>
      <input
        type='text'
        placeholder='Search meditations...'
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredMeditations.map((meditation) => (
          <li key={meditation.id}>
            {meditation.name}
            <button onClick={() => handleDelete(meditation.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteMeditation;
