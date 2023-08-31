import React, { useEffect, useState } from 'react'
import { TextField, Button } from '@fluentui/react';
import { Link } from "react-router-dom";


const Main = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const link = 'http://localhost:3001/tasks';

  // Call first 6 data
  const loadInitialData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${link}?page=1`);
      const initialData = await response.json();
      setItems(initialData);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  // Load initial data when the component mounts
  useEffect(() => {
    loadInitialData();
  }, []);

  // Infinite scrolling start
  const handleScroll = () => {
    if (
      !loading &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight
    ) {
      loadMoreData();
    }
  };


  const loadMoreData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${link}?page=${page}`);
      const newData = await response.json();
      setItems(prevItems => [...prevItems, ...newData]);
      setPage(page + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items]); // Listen for scroll events, updating when items change

  // infinite scrolling end

  // submit add data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append('title', title);
    formData.append('description', description);

    try {
      const response = await fetch(`${link}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (response.status === 201) {
        // Fetch updated data after a successful POST
        try {
          const updatedResponse = await fetch(`${link}?page=1`); // You may need to adjust the page value based on your pagination logic
          const updatedData = await updatedResponse.json();
          setItems(updatedData); // Update the items state with the newly added item
          setTitle('');
          setDescription('');
        } catch (error) {
          console.error('Error fetching updated data:', error);
        }
      } else {
        console.error('Failed to add item');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };


  // edit function start

  // open edit form
  const handleEdit = (taskId, title, description, q) => {
    setTitle(title);
    setDescription(description);

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === taskId && q === "edit" ? { ...item, editable: true } : { ...item, editable: false }
      )
    );
  };

  // submit edit form

  const handleSubmitEdit = async (e, id) => {
    e.preventDefault();
    const formData = new URLSearchParams();
    formData.append('title', title);
    formData.append('description', description);

    try {
      const response = await fetch(`${link}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (response.status === 200) {
        // Fetch updated data after a successful POST
        try {
          const updatedResponse = await fetch(`${link}?page=1`); // You may need to adjust the page value based on your pagination logic
          const updatedData = await updatedResponse.json();
          setItems(updatedData); // Update the items state with the newly added item
        } catch (error) {
          console.error('Error fetching updated data:', error);
        }
      } else {
        console.error('Failed to add item');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }


  // edit function end

  // submit delete data
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${link}/${id}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        // Fetch updated data after a successful POST
        try {
          const updatedResponse = await fetch(`${link}?page=1`); // You may need to adjust the page value based on your pagination logic
          const updatedData = await updatedResponse.json();
          setItems(updatedData); // Update the items state with the newly added item
        } catch (error) {
          console.error('Error fetching updated data:', error);
        }
      } else {
        console.error('Failed to add item');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }

  return (
    <div className='p-6'>
      <div className='absolute top-0 right-0 bg-blue-500 text-white'>
        <Link to='/setting'>Open Form Setting</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <TextField
          label='title'
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title} />
        <TextField
          label='description'
          onChange={(e) => setDescription(e.target.value)}
          value={description} />
        <Button type='submit' className='mt-2' text='Submit' allowDisabledFocus />
      </form>
      <div className='grid grid-cols-3 gap-2 mt-4'>
        {items.map((item) => (
          <div className='h-64 bg-slate-200 ' key={item.id}>
            <div className='flex justify-end gap-2'>
              <a onClick={() => handleEdit(item.id, item.title, item.description, 'edit')} className='text-blue-500 cursor-pointer'>edit</a>
              <a onClick={() => handleDelete(item.id)} className='text-red-500 cursor-pointer'>delete</a>
            </div>
            {item.editable ? (
              <form className='p-4' onSubmit={(e) => handleSubmitEdit(e, item.id)}>
                <TextField
                  value={title}
                  label='title'
                  required
                  onChange={(e) => setTitle(e.target.value)} />
                <TextField
                  label='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className='mb-2' />
                <Button className='mr-2' >
                  Save
                </Button>
                <Button onClick={() => handleEdit(item.id, '', '', 'cancel')}>
                  Cancel
                </Button>
              </form>
            ) : (
              <div className='p-4'>
                <div className='font-semibold'>
                  title
                </div>
                <div className='p-2'>
                  {item.title}
                </div>
                <div className='mt-2 font-semibold'>
                  description
                </div>
                <div className='p-2'>
                  {item.description.length > 0 ? item.description : 'Description is empty'}
                </div>
              </div>
            )}
          </div>
        ))}

        {loading && <div className='mb-5'>Loading...</div>}
      </div>
    </div>
  );
};



export default Main