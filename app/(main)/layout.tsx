import NavigationHeader from '@/components/navigation/navigation-headerbar';
import React from 'react';

const MainLayout = (
    {children}: {children: React.ReactNode}
) => {
    return <div className="h-full">
        <NavigationHeader />
        <main>{children}</main>
    </div>
}
 
export default MainLayout;