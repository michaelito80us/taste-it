'use client';

import createEvent from '../../lib/createEvent';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateEventPage = () => {
  const [formData, setFormData] = useState({
    pictureUrl: '',
    eventName: '',
    description: '',
    startDate: '',
    startTime: '',
    startDateTime: new Date(),
    endDate: '',
    endTime: '',
    endDateTime: new Date(),
    venueName: '',
    venueAddress: '',
    maxAttendees: 0,
  });
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  function handleCheckboxChange() {
    setChecked((prev) => !prev);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
      };
    }
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [file]);

  async function handleSubmit(event) {
    event.preventDefault();
    // disable submit button
    // show loading spinner
    setLoading(true);

    // convert date and time to ISO string
    let startDateTime = new Date(`${formData.startDate} ${formData.startTime}`);
    let endDateTime = new Date(`${formData.endDate} ${formData.endTime}`);
    // submit photo to cloudinary
    async function uploadImage() {
      const imageForm = new FormData();
      imageForm.append('file', file);
      imageForm.append('upload_preset', 'iynvvsvv');

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dckqfwvh1/image/upload',
        {
          method: 'POST',
          body: imageForm,
        }
      );

      const cloudinaryUpload = await response.json();

      const newFormData = {
        ...formData,
        pictureUrl: cloudinaryUpload.secure_url,
        startDateTime: startDateTime.toISOString(),
        endDateTime: endDateTime.toISOString(),
      };

      setFormData(newFormData);

      const eventData = await createEvent(newFormData);

      setLoading(false);
      router.push(`/events/${eventData.slug}`);
    }

    await uploadImage();
  }

  return (
    <div>
      {loading && (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-10 w-screen h-screen bg-[rgba(65,58,85,0.8)]'>
          <div className='flex flex-col items-center justify-center w-full h-full'>
            <img
              src='/images/spinner.png'
              className='w-20 h-20'
            />
            <p className='mt-4 text-lg text-white'>Creating event...</p>
          </div>
        </div>
      )}
      <div className='flex justify-around py-4 text-lg'>
        <p>Create an event</p>
      </div>
      <div className='px-3 pb-20'>
        <form className='flex flex-col'>
          <input
            accept='image/*'
            type='file'
            id='image'
            placeholder='Image'
            onChange={handleFileInputChange}
            className='hidden w-full p-2 border-2 rounded-md h-52'
          />
          <label
            className='w-full'
            htmlFor='image'
          >
            {image ? (
              <img
                src={image}
                className='object-cover w-full mx-auto rounded-md h-52'
              />
            ) : (
              <div className='flex items-center justify-around border-2 rounded-md h-52'>
                <div className='px-4 py-2 text-white rounded-md bg-[#413A55] w-fit'>
                  UPLOAD POSTER
                </div>
              </div>
            )}
          </label>
          <label
            className='self-start pt-4'
            htmlFor='eventName'
          >
            Name
          </label>
          <input
            autoFocus
            type='text'
            name='eventName'
            id='eventName'
            onChange={handleInputChange}
            className='w-full p-2 border-2 rounded-md'
          />

          <label
            className='self-start pt-4'
            htmlFor='description'
          >
            Description
          </label>
          <textarea
            name='description'
            id='description'
            rows={5}
            onChange={handleInputChange}
            className='w-full p-2 border-2 rounded-md'
          />

          <div className='flex justify-between w-full pt-4'>
            <div className='flex flex-col'>
              <label htmlFor='startDate'>Start Date</label>
              <input
                type='date'
                name='startDate'
                id='starDate'
                min={new Date().toISOString().split('T')[0]}
                max={formData.endDate ? formData.endDate : ''}
                onChange={handleInputChange}
                className='w-40 h-10 p-2 bg-white border-2 rounded-md'
              />
            </div>

            <div className='flex flex-col'>
              <label htmlFor='startTime'>Start Time</label>
              <input
                type='time'
                name='startTime'
                id='startTime'
                onChange={handleInputChange}
                className='w-40 h-10 p-2 bg-white border-2 rounded-md'
              />
            </div>
          </div>

          <div className='flex justify-between w-full pt-4'>
            <div className='flex flex-col'>
              <label htmlFor='endDate'>End Date</label>
              <input
                type='date'
                name='endDate'
                id='endDate'
                placeholder='End Date'
                min={
                  formData.startDate
                    ? formData.startDate
                    : new Date().toISOString().split('T')[0]
                }
                onChange={handleInputChange}
                className='w-40 h-10 p-2 bg-white border-2 rounded-md'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='endTime'>End Time</label>
              <input
                type='time'
                name='endTime'
                id='endTime'
                placeholder='End Time'
                onChange={handleInputChange}
                className='w-40 h-10 p-2 bg-white border-2 rounded-md'
              />
            </div>
          </div>

          <label
            className='self-start pt-4'
            htmlFor='venueName'
          >
            Venue
          </label>
          <input
            type='text'
            name='venueName'
            id='venueName'
            onChange={handleInputChange}
            className='w-full p-2 border-2 rounded-md'
          />

          <label
            className='self-start pt-4'
            htmlFor='venueAddress'
          >
            Address
          </label>
          <input
            type='text'
            name='venueAddress'
            id='venueAddress'
            onChange={handleInputChange}
            className='w-full p-2 border-2 rounded-md'
          />
          <div className='flex items-center h-20 pt-4'>
            <div className='min-w-fit'>
              <label
                className='self-start mr-3'
                htmlFor='hasMaxAttendees'
              >
                Max Attendees?
              </label>
              <input
                type='checkbox'
                name='hasMaxAttendees'
                id='hasMaxAttendees'
                onChange={handleCheckboxChange}
                className='w-4 h-4 mr-3 border-2 rounded-md'
              />{' '}
            </div>
            {checked && (
              <>
                <label
                  className='pr-3 min-w-fit'
                  htmlFor='maxAttendees'
                >
                  How Many:
                </label>
                <input
                  type='number'
                  name='maxAttendees'
                  id='maxAttendees'
                  onChange={handleInputChange}
                  className='w-full p-2 border-2 rounded-md'
                />
              </>
            )}
          </div>
          <button
            onClick={handleSubmit}
            type='submit'
            disabled={loading}
            className='self-center w-40 py-2 mt-6 text-white rounded-md bg-[#413A55]'
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;
