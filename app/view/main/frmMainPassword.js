// SPDX-FileCopyrightText: 2025 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdConnect.view.main.frmMainPassword', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmMainPassword',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    title	: 'Change Password',
    root 	: false,
    requires	: [
        'RdConnect.view.main.vcMainPassword',
    ],
    controller  : 'vcMainPassword',
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    initialize: function () {
        const me  = this;      
        var items = [
			{
                xtype	: 'passwordfield',
                label	: 'Password',
                name	: 'password',
                itemId	: 'password',
                errorTarget: 'under',
                required: true
            },
            {
                xtype	: 'passwordfield',
                label	: 'Confirm',
                name	: 'confirm',
                errorTarget: 'under',
                required: true,
                validators : {
					type	: 'controller',
					fn		: 'controllerValidatorFn'
				}
            }
		];	
		me.setItems(items);        
 	}
});
