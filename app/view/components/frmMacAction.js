// SPDX-FileCopyrightText: 2025 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdConnect.view.components.frmMacAction', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmMacAction',
    floated	: true,
    modal	: true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding	: 6,
    iconCls : 'x-fa fa-pen',
    title	: 'Manage MAC Alias',
    root 	: false,
    requires	: [
        'RdConnect.view.components.vcMacAction',
    ],
    controller  : 'vcMacAction',
    action		: 'alias', // can be alias, firewall, limit or block (various forms with same controller)
    buttons: {
        submit: {
            handler: 'onSubmit'
        }
    },
    initialize: function () {
        const me  	= this;      
        var d 		= me.r.getData();          	          
        var items = [
			{
				xtype	: 'label',
				tpl		: new Ext.XTemplate(
					'<div class="item-main" >',
	            		'{alias}',
	            	'</div>',
					'<div class="item-main clr-grey-dark" >',
	            		'{mac}',
	            	'</div>',            	
	            	'<div class="item-main clr-grey" >',
	            		'{vendor}',
	            	'</div>',
				),
				data	: d,
				margin	: 0,
				padding : 5
			},
			{
            	xtype       : 'textfield',
                name        : 'mac',
                hidden		: true,
                value       : d.mac,
            },         
            {
            	xtype       : 'textfield',
                name        : 'alias',
                label  		: 'Alias',
                value       : d.alias,
                required	: true,
				errorTarget : 'under'
            },
            {
                xtype       : 'checkbox',      
                label       : 'Remove Alias',
                name        : 'remove_alias',
                checked     : false
            }
                     
		];	
		me.setItems(items);
		     
 	}
});
