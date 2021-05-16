import React from 'react';
import ContentLoader from 'react-content-loader';

const SidebarLoader = (props) => {
    return (
        <ContentLoader viewBox="0 0 400 980" height="78vh " width="300px" {...props}>
            <rect x="30" y="40" rx="0" ry="0" width="340" height="50" />
            <rect x="30" y="100" rx="0" ry="0" width="340" height="50" />
            <rect x="30" y="160" rx="0" ry="0" width="340" height="50" />
            <rect x="30" y="220" rx="0" ry="0" width="340" height="50" />
            <rect x="30" y="280" rx="0" ry="0" width="340" height="50" />
            <rect x="30" y="340" rx="0" ry="0" width="340" height="50" />
        </ContentLoader>
    );
};

export default SidebarLoader;