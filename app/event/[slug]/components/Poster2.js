'use client';
import { useEffect, useRef } from 'react';

const Poster = ({ event }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const backgroundImgPromise = new Promise((resolve, reject) => {
      const backgroundImg = new Image();
      backgroundImg.src = event.pictureUrl;
      backgroundImg.setAttribute('crossorigin', 'anonymous');
      backgroundImg.onload = () => resolve(backgroundImg);
      backgroundImg.onerror = reject;
    });

    const getQrCode = async () => {
      const res = await fetch(
        ` https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://go-taste.it/event/${event.slug}`
      );
      const response = await res.blob();
      return URL.createObjectURL(response);
    };

    // const qrCodeUrl = getQrCode();

    const qrCodePromise = new Promise((resolve, reject) => {
      let qrCodeUrl;
      getQrCode().then((res) => (qrCodeUrl = res));

      const qrCodeImg = new Image();
      qrCodeImg.src = qrCodeUrl;
      qrCodeImg.setAttribute('crossorigin', 'anonymous');
      qrCodeImg.onload = () => resolve(qrCodeImg);
      qrCodeImg.onerror = reject;
    });

    // let backgroundImg;
    // let qrCodeImg;

    Promise.all([backgroundImgPromise, qrCodePromise]).then((images) => {
      console.log(images);
      const backgroundImg = images[0];
      const qrCodeImg = images[1];
      console.log('I AM INSIDE PROMISE.ALL');
      let hRatio = canvas.width / backgroundImg.width;
      let vRatio = canvas.height / backgroundImg.height;
      const ratio = Math.min(hRatio, vRatio);
      populatePoster(backgroundImg, qrCodeImg, ratio, 290);
    });

    function populatePoster(backgroundImg, qrCodeImg, ratio, height) {
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
        height
        // backgroundImg.height * ratio
      );

      // overlay on the poster
      ctx.fillStyle = '#f5f5f5';
      ctx.fillRect(
        0,
        height - 100,
        // backgroundImg.height * ratio - 100,
        backgroundImg.width * ratio,
        1000
      );
      ctx.fillStyle = '#000';
      ctx.font = '16px Raleway';
      printAtWordWrap(
        ctx,
        `${event.eventName}`,
        10,
        height - 70,
        // backgroundImg.height * ratio - 70,
        15,
        backgroundImg.width * ratio
      );
      ctx.font = '12px Raleway';
      printAtWordWrap(
        ctx,
        `${event.dateString}`,
        10,
        height - 20,
        // backgroundImg.height * ratio - 20,
        15,
        backgroundImg.width * ratio
      );

      printAtWordWrap(
        ctx,
        `${event.timeString}`,
        10,
        height,
        // backgroundImg.height * ratio,
        15,
        backgroundImg.width * ratio
      );

      printAtWordWrap(
        ctx,
        `${event.venueName}`,
        10,
        height + 30,
        // backgroundImg.height * ratio + 30,
        15,
        backgroundImg.width * ratio
      );

      printAtWordWrap(
        ctx,
        `${event.venueAddress ? event.venueAddress : ''}`,
        10,
        height + 50,
        // backgroundImg.height * ratio + 50,
        15,
        backgroundImg.width * ratio
      );
      ctx.font = '10px Raleway';

      printAtWordWrap(
        ctx,
        `www.go-taste.it`,
        10,
        height + 125,
        // backgroundImg.height * ratio + 120,
        backgroundImg.width * ratio
      );
      printAtWordWrap(
        ctx,
        `for all your tasting events`,
        10,
        height + 140,
        // backgroundImg.height * ratio + 135,
        15,
        backgroundImg.width * ratio
      );

      ctx.drawImage(
        qrCodeImg,
        0,
        0,
        qrImg.width,
        qrImg.height,
        210,
        355,
        75,
        75
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
