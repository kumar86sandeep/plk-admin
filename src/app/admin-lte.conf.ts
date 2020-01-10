export const adminLteConf = {
  skin: 'blue',
  // isSidebarLeftCollapsed: false,
  // isSidebarLeftExpandOnOver: false,
  // isSidebarLeftMouseOver: false,
  // isSidebarLeftMini: true,
  // sidebarRightSkin: 'dark',
  // isSidebarRightCollapsed: true,
  // isSidebarRightOverContent: true,
  // layout: 'normal',
  sidebarLeftMenu: [
    { label: 'MAIN NAVIGATION', separator: true },    
   

    {
      label: 'Drivers', iconClasses: 'fa fa-user', children: [       
        { label: 'Listing', route: 'admin/drivers' }    
           
      ]
    } 
    
  ]
};
