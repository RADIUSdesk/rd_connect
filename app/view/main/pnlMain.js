// SPDX-FileCopyrightText: 2025 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdConnect.view.main.pnlMain', {
    extend      : 'Ext.Panel',
    xtype       : 'pnlMain',
    fullscreen  : true,
    layout      : 'vbox',
    controller  : 'vcMain',
    requires	: [
        'RdConnect.view.mainPasspoint.cntMainPasspoint',
        'RdConnect.view.mainPsk.cntMainPsk',
        'Ext.tab.Panel'
    ],
    
    initialize: function () {
     	const me = this;
     			
     	me.setItems([
		    {
				xtype 	: 'toolbar',
				docked	: 'top',
				items	: [
					{
						xtype	: 'image',
						src		: 'resources/images/logo.png',
						height	: 32,
						width	: 32
					},
					{
		                xtype: 'spacer'
		            },
		            {
		            	xtype	: 'container',
		            	layout	: 'vbox',
		            	items	: [
		            		{
								xtype	: 'label',
								itemId	: 'lblMain',
								html    : '<span style="color:#005691;letter-spacing:5px;font-size:20px;">'+window.AppConfig.pageHeader+'</span>',
								style	: {
					   				'color'			: '#005691',
					   				'letter-spacing': '4px',
					   				'text-align'	: 'center'
								}	
							}	            	
		            	]		            
		            },					
					{
		                xtype: 'spacer'
		            },
					{ 
						ui		: 'normal',
						itemId	: 'btnMenu', 
						iconCls	: 'x-fa fa-align-justify' 
					},
				]
			},
		    {
		        xtype           : 'tabpanel',
		        tabBarPosition	: 'bottom',
		        itemId			: 'tpMain',
		      	items: [
		            {
		            	title	: 'Hotspot 2.0',
		            	xtype	: 'cntMainPasspoint',
		            	itemId	: 'mainPasspoint'              
		            },
		            {
		            	title	: 'PSK',
		            	xtype	: 'cntMainPsk',
		            	itemId	: 'mainPsk'              
		            }
		        ],
		        flex    : 1
		    }
		]);
     	     	
       	var menu = Ext.create({
		 xtype: 'actionsheet',
		 centered: false,
		 title: 'MENU',
			 items: [
				 {
					 text		: 'Password',
					 iconCls	: 'x-fa fa-lock',
					 textAlign  : 'left',
					 itemId		: 'btnPassword'
				 }, 		 
				{
					 text		: 'Logout',
					 iconCls	: 'x-fa fa-power-off',
					 textAlign  : 'left',
					 itemId		: 'btnLogout'
				 },
				 {
					xtype	: 'label',
					style	: {
		   				'border-bottom' : '5px solid #667078'
					}		
				 }
			 ]
	 	});
	 	Ext.Viewport.setMenu(menu, {
			 side: 'left',
			 // omitting the reveal config defaults the animation to 'cover'
			 reveal: true
		 });
        
 	}
});
