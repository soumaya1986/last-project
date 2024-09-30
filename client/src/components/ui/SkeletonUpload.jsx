import React from 'react';

function SkeletonUpload() {
  return (
    <div>
      <style>
        {`
          #loading-indicator {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: white;
            z-index: 9999;
          }

          .lds-hourglass {
            display: inline-block;
            position: relative;
            width: 80px;
            height: 80px;
          }

          .lds-hourglass:after {
            content: " ";
            display: block;
            border-radius: 50%;
            width: 0;
            height: 0;
            margin: 6px;
            box-sizing: border-box;
            border: 26px solid #333;
            border-color: orange transparent orange transparent; 
            animation: lds-hourglass 1.2s infinite;
          }

          @keyframes lds-hourglass {
            0% {
              transform: rotate(0);
              animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
            }
            50% {
              transform: rotate(900deg);
              animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            }
            100% {
              transform: rotate(1800deg);
            }
          }
        `}
      </style>
      <div id="loading-indicator">
        <div className="lds-hourglass"></div>
      </div>
    </div>
  );
}

export default SkeletonUpload;
