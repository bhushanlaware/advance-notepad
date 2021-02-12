import React from 'react';
import AdSense from 'react-adsense';

const TodoAds = (props) => {
    return (<AdSense.Google
        client='ca-pub-7292810486004926'
        slot='7806394673'
        // style={{ width: 500, height: 300, }}
    />);
}

export default TodoAds;