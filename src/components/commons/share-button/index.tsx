'use client';
import React, { useEffect, useState } from 'react';
import ReplyIcon from '@mui/icons-material/Reply';
import { sendDataLayerEvent } from '@/utils/general.util';
// import { sendDataLayerEvent } from '@/utils/general.util';

interface ShareButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconProps?: any;
  url: string;
  text: string;
  title: string;
  sectionName?: string;
  contentType?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ iconProps, title, text, url, sectionName, contentType, ...props }) => {

  const [buttonAvailable, setButtonAvailable] = useState(false);

  const openShareBox = () => {
    sendDataLayerEvent({
      'event': 'select_content',
      'section_name': sectionName,
      'content_type': contentType,
      'content_text': text,
    });

    navigator.share({
      title,
      text,
      url: url || window.location.href,
    })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
  }

  useEffect(() => {
    setButtonAvailable(typeof navigator.share !== 'undefined');
  }, []);

  return (
    <>
      {buttonAvailable ? 
        <button
          {...props}
          className={`${props.className} bg-black/30 rounded-[100%] p-2 backdrop-blur-sm rotate-x-90`}
          aria-label={'Compartilhar'}
          onClick={openShareBox}
        >
          <ReplyIcon
            {...iconProps}
            style={{
              transform: 'scaleX(-1)',
              width: "25px",
              height: "25px",
              fill: "#FFFFFF",
              color: "#FFFFFF"
            }}
          />
        </button>
        : ''
      }
    </>
  );
};

export default ShareButton;