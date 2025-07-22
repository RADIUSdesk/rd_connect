// SPDX-FileCopyrightText: 2025 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdConnect.view.register.frmRegister', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmRegister',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    title	: 'Register',
    requires	: [
        'RdConnect.view.register.vcRegister',
    ],
    controller  : 'vcRegister',
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    items: [
    	{
			xtype	: 'label',
			html	: 'Basic Info',
			margin	: 0,
			padding : 5,
			cls		: 'form-section'	
		},
		{
		    xtype       : 'textfield',
		    name        : 'login_page_id',
		    value       : window.AppConfig.loginPageId,
		    hidden      : true		
		},
        {
            xtype       : 'textfield',
            label  		: 'Email (username)',
            name        : 'username',
            required	: true,
            errorTip: {
		        anchor: true,
		        align: 'l-r?'
		    },
		    errorTarget: 'under'
        },
        {
            xtype       : 'textfield',
            label  		: 'Password',
            name        : 'password',
            required	: true,
            errorTip: {
		        anchor: true,
		        align: 'l-r?'
		    },
		    errorTarget: 'under'
        },
    	{
			xtype	: 'label',
			html	: 'Personal Info',
			margin	: 0,
			padding : 5,
			cls		: 'form-section'		
		},
		{
            xtype	: 'textfield',
            label	: 'Name',
            name 	: "name",
            value	: ''
        },
        {
            xtype	: 'textfield',
            label	: 'Surname',
            name 	: "surname",
            value	: ''
        },
        {
            xtype	: 'textfield',
            label	: 'Phone',
            name 	: "phone",
            value	: ''
        }
    ]
});
