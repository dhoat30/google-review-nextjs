'use client';
import { useEffect } from 'react';

export default function ReservationWidget() {
    useEffect(() => {
        // Create the script element
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://booking.resdiary.com/bundles/WidgetV2Loader.js';
        script.async = true;

        // Append the script to the body or a specific element
        document.body.appendChild(script);

        // Cleanup to remove script when component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <div
                id="rd-widget-frame"
                style={{
                    maxWidth: '600px',
                    margin: 'auto',
                    minHeight: '535px',
                    marginTop: '16px',
                }}
            ></div>
            <div id="rd-widget-frame" style={{ maxWidth: '600px', margin: 'auto' }}></div>
            <input
                id="rdwidgeturl"
                name="rdwidgeturl"
                value="https://booking.resdiary.com/widget/Standard/GreatSpicePapamoa/9171?includeJquery=false"
                type="hidden"
            />
        </div>
    );
}
