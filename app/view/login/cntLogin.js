// SPDX-FileCopyrightText: 2025 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdConnect.view.login.cntLogin', {
    extend      : 'Ext.Container',
    xtype       : 'cntLogin',
    controller  : 'vcLogin',
    requires: [
        'Ext.field.Password'
    ],
    layout	: 'vbox',
    items       : [
    	{
	        xtype   : 'toolbar',
	        height	: 70,
	        dock    : 'top',
	        shadow	: false,
	        items   : [{
				    xtype: 'image',
				    src: 'resources/images/logo.png',
				    height: 32,
    				width: 32
				},
				{
                    xtype: 'spacer'
                },			    
			    {
					xtype: 'label',
					html: '<span style="color:#005691;letter-spacing:5px;font-size:20px;">'+window.AppConfig.pageHeader+'</span>'
				},
				{
                    xtype: 'spacer'
                }			    
				]
	    },
	    {
	    	xtype		: 'container',
	    	cls		    : 'auth-login',
	    	layout		: {
				type	: 'vbox',
				align	: 'center',
				pack	: 'center'
			},
	    	flex		: 1,
	    	items		: [   		
			   	{
					xtype       : 'formpanel',
            		reference   : 'form',
            		//title       : 'Connect Login',
            		border		: true,
            		padding		: 30,
					layout		: 'vbox',
					//ui			: 'auth',
					items: [
						{
						    xtype       : 'textfield',
						    name        : 'username',
						    placeholder : 'Username',
						    required    : true,
                            errorTip    : {
		                        anchor: true,
		                        align: 'l-r?'
		                    },
		                    errorTarget: 'under'
						}, 
                        {
						    xtype       : 'passwordfield',
						    name        : 'password',
						    placeholder : 'Password',
						    required    : true,
                            errorTip    : {
		                        anchor: true,
		                        align: 'l-r?'
		                    },
		                    errorTarget: 'under'
						},
						{
						    xtype       : 'button',
						    reference   : 'btnLogin',
						    text        : 'LOG IN',
						    iconAlign   : 'right',
						    iconCls     : 'x-fa fa-angle-right',
						    handler     : 'onLoginTap',
						    ui          : 'action',
						    disabled    : true
						},
                        {
						    xtype       : 'button',
						    reference   : 'btnRegister',
						    text        : 'REGISTER',
						    iconAlign   : 'left',
						    iconCls     : 'x-fa fa-user-edit',
						    handler     : 'onRegisterTap',
						    ui          : 'action',
						    disabled    : false
						}					
					]
				}
		]
    },
    {
        xtype   : 'toolbar',
        height	: 40,
        dock    : 'bottom',
        shadow	: false,
        items   : [{
        		xtype: 'spacer'
        	},
        	{
            xtype   : 'label',
            tpl     : new Ext.XTemplate(
            '<div style="margin-bottom:5px;padding-bottom:5px;">',
                '<span style="color:#005691;letter-spacing:5px;">'+window.AppConfig.pageFooter+'</span>',
            '</div>'
            ),
            data    : {}
        }]
    }
    ]
});
