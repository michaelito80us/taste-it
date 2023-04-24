'use client';
import { useEffect, useRef, useState } from 'react';
import baseUrl from '../../../../lib/baseUrl';

const Poster = ({ event }) => {
  const canvasRef = useRef(null);
  const [qr, setQr] = useState(null);

  useEffect(() => {
    const qrImg = new Image();
    async function getQrCode(qrImg) {
      const res = await fetch(
        ` https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://go-taste.it/event/${event.slug}`
      );

      const response = await res.blob();
      setQr(URL.createObjectURL(response));
      // qrImg.src = qr;
      qrImg.src = URL.createObjectURL(response);
      qrImg.setAttribute('crossorigin', 'anonymous');
    }

    getQrCode(qrImg);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const backgroundImg = new Image();
    backgroundImg.src = event.pictureUrl;
    backgroundImg.setAttribute('crossorigin', 'anonymous');

    let ratio;

    backgroundImg.onload = () => {
      let hRatio = canvas.width / backgroundImg.width;
      let vRatio = canvas.height / backgroundImg.height;
      ratio = Math.min(hRatio, vRatio);
      populatePoster(ratio);
    };

    function populatePoster(ratio) {
      // poster;
      ctx.drawImage(
        backgroundImg,
        0,
        0,
        backgroundImg.width,
        backgroundImg.height,
        0,
        0,
        backgroundImg.width * ratio,
        backgroundImg.height * ratio
      );

      // overlay on the poster
      ctx.fillStyle = '#f5f5f5';
      ctx.fillRect(
        0,
        backgroundImg.height * ratio - 100,
        backgroundImg.width * ratio,
        1000
      );
      ctx.fillStyle = '#000';
      ctx.font = '16px Raleway';
      printAtWordWrap(
        ctx,
        `${event.eventName}`,
        10,
        backgroundImg.height * ratio - 70,
        15,
        backgroundImg.width * ratio
      );
      ctx.font = '12px Raleway';
      printAtWordWrap(
        ctx,
        `${event.dateString}`,
        10,
        backgroundImg.height * ratio - 20,
        15,
        backgroundImg.width * ratio
      );

      printAtWordWrap(
        ctx,
        `${event.timeString}`,
        10,
        backgroundImg.height * ratio,
        15,
        backgroundImg.width * ratio
      );

      printAtWordWrap(
        ctx,
        `${event.venueName}`,
        10,
        backgroundImg.height * ratio + 30,
        15,
        backgroundImg.width * ratio
      );

      printAtWordWrap(
        ctx,
        `${event.venueAddress ? event.venueAddress : ''}`,
        10,
        backgroundImg.height * ratio + 50,
        15,
        backgroundImg.width * ratio
      );
      ctx.font = '10px Raleway';

      printAtWordWrap(
        ctx,
        `www.go-taste.it`,
        10,
        backgroundImg.height * ratio + 120,
        15,
        backgroundImg.width * ratio
      );
      printAtWordWrap(
        ctx,
        `for all your tasting events`,
        10,
        backgroundImg.height * ratio + 135,
        15,
        backgroundImg.width * ratio
      );

      ctx.drawImage(
        qrImg,
        0,
        0,
        backgroundImg.width,
        backgroundImg.height,
        215,
        360,
        backgroundImg.width * ratio,
        backgroundImg.height * ratio
      );

      function printAtWordWrap(context, text, x, y, lineHeight, fitWidth) {
        fitWidth = fitWidth || 0;

        if (fitWidth <= 0) {
          context.fillText(text, x, y);
          return;
        }
        var words = text.split(' ');
        var currentLine = 0;
        var idx = 1;
        while (words.length > 0 && idx <= words.length) {
          var str = words.slice(0, idx).join(' ');
          var w = context.measureText(str).width;
          if (w > fitWidth) {
            if (idx == 1) {
              idx = 2;
            }
            context.fillText(
              words.slice(0, idx - 1).join(' '),
              x,
              y + lineHeight * currentLine
            );
            currentLine++;
            words = words.splice(idx - 1);
            idx = 1;
          } else {
            idx++;
          }
        }
        if (idx > 0)
          context.fillText(words.join(' '), x, y + lineHeight * currentLine);
      }
    }
  }, []);

  function downloadPoster(e) {
    e.stopPropagation();
    const canvas = document.getElementById('eventPoster');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'eventPoster.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  return (
    <canvas
      onClick={downloadPoster}
      id='eventPoster'
      ref={canvasRef}
      width={735 / 2.5}
      height={1102 / 2.5}
    />
  );
};

export default Poster;
