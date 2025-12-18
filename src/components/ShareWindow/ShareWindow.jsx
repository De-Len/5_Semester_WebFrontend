import React from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import './ShareWindow.css';

const ShareWindow = () => {
    const { showShareWindow, closeShareWindow } = useTaskStore();

    const handleShare = (platform) => {
        const currentUrl = window.location.href;
        const text = 'Check out my tasks!';

        switch(platform) {
            case 'copy':
                navigator.clipboard.writeText(currentUrl);
                alert('Link copied to clipboard!');
                break;
            case 'vk':
                window.open(`https://vk.com/share.php?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(text)}`, '_blank');
                break;
            case 'telegram':
                window.open(`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(text)}`, '_blank');
                break;
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + currentUrl)}`, '_blank');
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
                break;
        }

        closeShareWindow();
    };

    if (!showShareWindow) return null;

    return (
        <>
            <div className="overlay active" onClick={closeShareWindow}></div>
            <div className="share-window active">
                <button onClick={() => handleShare('copy')} title="Copy link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                    </svg>
                </button>
                <button onClick={() => handleShare('vk')} title="Share to VK">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2m-2.29 14.93c-1.09 0-1.65-.63-2.27-1.29-.79.79-1.08 1.29-1.79 1.29-.6 0-.96-.58-.96-1.11 0-.84.61-1.24 1.23-1.86.44-.44.81-.93.81-1.5 0-.5-.34-.84-.93-.84-.76 0-1.18.61-1.18 1.18 0 .34-.27.61-.61.61-.45 0-.71-.47-.71-.96 0-.97.87-1.73 2.11-1.73 1.33 0 2.08.66 2.08 1.8 0 .89-.39 1.5-1.08 2.11.5.53.93 1.03 1.41 1.56.32.36.63.71 1.03.71.45 0 .66-.24.66-.68v-2.61c0-.92-.08-1.5.5-1.5.26 0 .55.18.55.61 0 .34.26.61.61.61.45 0 .71-.5.71-1.03 0-.92-.79-1.53-1.86-1.53-1.29 0-1.89.79-1.89 1.89v.92c0 .71-.5 1.08-1.08 1.08-.45 0-.71-.37-.71-.84v-1.5c0-1.58 1.18-2.74 2.79-2.74 1.5 0 2.53.84 2.53 2.21 0 .84-.34 1.58-1.03 1.97.21.26.34.5.34.92 0 .63-.47 1.08-1.08 1.08-.37 0-.71-.18-.92-.5-.24-.34-.47-.71-.76-1.03-.18-.21-.37-.42-.58-.63-.18-.18-.34-.37-.5-.55-.13-.16-.21-.26-.21-.5 0-.29.21-.5.5-.5.21 0 .39.13.5.34.16.29.34.58.55.84l.63.79c.21.26.42.53.66.79.24.26.5.5.79.71.29.21.58.37.89.5.45.21.84.34 1.29.34 1.5 0 2.27-.76 2.27-2.21 0-1.18-.66-1.97-1.63-2.37.21-.29.34-.63.34-1.08 0-.89-.66-1.5-1.5-1.5-.71 0-1.18.39-1.5.84-.21.29-.34.63-.34.97 0 .34.26.61.61.61.29 0 .5-.21.5-.5 0-.26-.13-.45-.34-.58-.13-.08-.29-.13-.45-.13-.34 0-.58.24-.58.58 0 .34.13.63.34.92.21.29.5.58.79.89.29.29.58.58.89.84.24.21.47.42.71.63.18.16.34.34.5.5.13.13.21.26.21.45 0 .29-.21.5-.5.5-.24 0-.42-.13-.55-.34-.16-.24-.34-.47-.55-.71l-.63-.79c-.21-.26-.42-.53-.66-.79-.21-.26-.45-.5-.71-.71-.24-.21-.5-.37-.76-.5-.37-.18-.76-.29-1.18-.29-1.08 0-1.97.71-1.97 1.97v.92c0 .89-.5 1.34-1.18 1.34-.34 0-.66-.13-.89-.34-.24-.21-.37-.5-.37-.84v-1.5c0-1.29.84-2.21 2.11-2.21 1.18 0 2.03.66 2.03 1.89 0 .76-.34 1.34-1.03 1.71.21.26.34.5.34.92 0 .63-.47 1.08-1.08 1.08z"/>
                    </svg>
                </button>
                <button onClick={() => handleShare('telegram')} title="Share to Telegram">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42l.3-4.17 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
                    </svg>
                </button>
                <button onClick={() => handleShare('whatsapp')} title="Share to WhatsApp">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.96 9.96 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z"/>
                    </svg>
                </button>
                <button onClick={() => handleShare('facebook')} title="Share to Facebook">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                    </svg>
                </button>
            </div>
        </>
    );
};

export default ShareWindow;