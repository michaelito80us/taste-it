import { useEffect, useRef } from 'react';

const Poster = ({ event }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const backgroundImg = new Image();
    backgroundImg.src = event.pictureUrl;

    backgroundImg.onload = () => {
      let hRatio = canvas.width / backgroundImg.width;
      let vRatio = canvas.height / backgroundImg.height;
      let ratio = Math.min(hRatio, vRatio);
      populatePoster(ratio);
    };

    function populatePoster(ratio) {
      // poster
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
      ctx.fillRect(0, 420, canvas.width, 682);

      // background of profile picture
      ctx.beginPath();
      ctx.arc(133, 452, 85, 0, 2 * Math.PI);
      ctx.fillStyle = '#d9d9d9';
      ctx.fill();
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={735 / 2.5}
      height={1102 / 2.5}
    />
  );
};

export default Poster;
