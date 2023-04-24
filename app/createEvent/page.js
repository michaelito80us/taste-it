'use client';

import createOrUpdateEvent from '../../lib/createOrUpdateEvent';
import { useContext, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Spinner from '../components/Spinner';
import getEvent from '../../lib/getEvent';
import { dateToString, timeToString } from '../../util/formatDateTime';
import { UserContext } from '../context/userContext';

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
  const { authenticatedUser, setAuthenticatedUser } = useContext(UserContext);
  const router = useRouter();

  const searchParams = useSearchParams();
  const editSlug = searchParams.get('edit');

  useEffect(() => {
    if (!authenticatedUser.id) {
      router.push('/');
    } else if (editSlug) {
      console.log('editSlug: ', editSlug);
      // get event details from db

      const getEventData = async () => {
        const eventData = await getEvent(editSlug);
        console.log('eventData: ', eventData);

        // setFormData(eventData.event);
        setFormData({
          ...eventData.event,
          oldMaxAttendees: eventData.event.maxAttendees,
        });

        setImage(eventData.event.pictureUrl);
        setChecked(eventData.event.maxAttendees > 0);
        setLoading(false);
      };

      getEventData();
    }
  }, []);

  // set form data

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

      const eventData = await createOrUpdateEvent(newFormData);

      setLoading(false);
      router.replace(`/event/${eventData.slug}`);
    }

    await uploadImage();
  }

  return (
    <div>
      {loading && <Spinner img='true' />}
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
            value={formData.eventName}
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
            value={formData.description}
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
                value={formData.startDate}
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
                value={formData.startTime}
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
                value={formData.endDate}
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
                value={formData.endTime}
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
            value={formData.venueName}
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
            value={formData.venueAddress}
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
                checked={checked}
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
                  value={formData.maxAttendees}
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
            {event ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;
