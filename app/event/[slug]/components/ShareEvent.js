'use client';
import baseUrl from '../../../../lib/baseUrl';
import { useState, useRef, useEffect } from 'react';
import { FaShare } from 'react-icons/fa';
import QRCode from 'qrcode.react';
import Poster from './Poster';

const ShareEvent = ({ event }) => {
  const [showShare, setShowShare] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showPoster, setShowPoster] = useState(false);
  const [qr, setQr] = useState(null);
  const ref = useRef(null);

  // useEffect(() => {
  //   // The DOM element is accessible here.
  //   console.log('ref current', ref.current);
  // }, []);

  function stopPropagation(e) {
    e.stopPropagation();
  }

  function downloadQR(e) {
    e.stopPropagation();
    const canvas = document.getElementById('eventQrCode');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    setQr(pngUrl);
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'eventQrCode.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  return (
    <>
      <button
        onClick={() => setShowShare(true)}
        className='absolute p-2 text-3xl text-ter right-1 top-1'
      >
        <FaShare />
      </button>

      {showShare && (
        <div
          className='fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.5)] z-50 flex items-end justify-center pb-20'
          onClick={() => setShowShare(false)}
        >
          <div
            className='flex w-4/6 py-5 rounded-md bg-tst-bg justify-evenly'
            onClick={stopPropagation}
          >
            <button
              onClick={() => {
                setShowPoster(true);
                setShowShare(false);
              }}
              className='flex flex-col items-center'
            >
              <img
                ref={ref}
                src={event.pictureUrl}
                className='w-12 h-12'
              />
              Poster
            </button>
            <button
              onClick={() => {
                setShowQR(true);
                setShowShare(false);
              }}
              className='flex flex-col items-center'
            >
              <img
                src='/images/QRcode.jpg'
                className='w-12 h-12'
              />
              QR
            </button>
          </div>
        </div>
      )}

      {showQR && (
        <div
          className='fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.5)] z-50 flex flex-col items-center justify-end pb-20'
          onClick={() => setShowQR(false)}
        >
          <div
            onClick={downloadQR}
            className='p-3 rounded-md bg-pri/80 '
          >
            <QRCode
              id='eventQrCode'
              value={baseUrl + '/event/' + event.slug}
              size={200}
              level={'H'}
            />
          </div>
          <div className='flex justify-center pt-1 text-white'>
            Press to download
          </div>
        </div>
      )}

      {showPoster && (
        <div
          className='fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.5)] z-50 flex flex-col items-center justify-end pb-20'
          onClick={() => setShowPoster(false)}
        >
          <div className='p-3 rounded-md bg-pri/80 '>
            <Poster event={event} />
          </div>
          <div className='flex justify-center pt-1 text-white'>
            Press to download
          </div>
        </div>
      )}
    </>
  );
};

export default ShareEvent;
