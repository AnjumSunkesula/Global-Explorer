import React from 'react';
import Lottie from 'lottie-react';
import globeAnimation from '../animations/Animation - globe.json'; // Adjust the path if necessary

function LottieGlobe() {
  return (
    <div style={{ width: '150px', height: '150px' }}>
      <Lottie animationData={globeAnimation} loop={true} />
    </div>
  );
}
export default LottieGlobe;