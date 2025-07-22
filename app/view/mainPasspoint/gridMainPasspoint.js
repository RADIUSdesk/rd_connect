// SPDX-FileCopyrightText: 2025 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdConnect.view.mainPasspoint.gridMainPasspoint', {
    extend  : 'Ext.grid.Grid',
    xtype   : 'gridMainPasspoint',
    emptyText: 'Create Some Passpoint Profiles',
    config  : {
        compdata: undefined,
    },
    hideHeaders: true,
    rowLines: true,
    trackMouseOver: false,
    viewConfig: {
        stripeRows: false
    },
    rowLines: false,
    disableSelection: true,
    selectable: {
		mode  : 'single',
		cells : 'true' 
	},
    initialize: function () {
        const me = this;
        me.setStore( Ext.create('Ext.data.Store', {
            storeId : "mainNetworksStore",
            fields  : ['id', 'col_0_name', 'col_0_fa','col_1_name','col_1_fa'],
            data    : [
		       {
		        	id  : 0,
		            0	: {'name':'Android',		'os' : 'android',   'fa': 'android'},
		            1	: {'name':'Apple IOS',	    'os' : 'apple',     'fa': 'apple'}
		        },
		        {
		        	id	: 1,
		            0	: {'name':'Linux',  		'os' 	: 'linux',		'fa': 'linux'},
		            1	: {'name':'Windows', 	    'os' 	: 'windows',	'fa': 'windows'}
		        }
            ]
        }));
      
        me.setColumns( [
            {
                text: 'Col1',
                xtype: 'templatecolumn',                
                tpl : new Ext.XTemplate(
                    '<div style="border-radius: 5px;border: 1px solid #7c7d80;padding-top: 10px; margin: 2px;text-align: center; color:#0677c7">',
                    '<tpl for="0">',
                    	'<i class="fab fa-{fa} fa-2x"></i>',
                    	'<div style="margin-top: 0.25em;padding: 2px; margin: 2px;">{name}</div>',
                    '</tpl>',
                    '</div>',
                ),
                cell: {
					encodeHtml: false
				},
                flex: 1
            },
            {
                text: 'Col2',
                xtype: 'templatecolumn',                
                tpl : new Ext.XTemplate(
                    '<div style="border-radius: 5px;border: 1px solid #7c7d80;padding-top: 10px; margin: 2px;text-align: center; color:#0677c7">',
                    '<tpl for="1">',
                    	'<i class="fab fa-{fa} fa-2x"></i>',
                    	//'<i class="fab fa-windows"></i>',
                    	'<div style="margin-top: 0.25em;padding: 2px; margin: 2px;">{name}</div>',
                    '</tpl>',
                    '</div>',
                ),
                cell: {
					encodeHtml: false
				},
                flex: 1
            }
        ]);
        me.getStore().reload()		
		this.callParent();     
    }
 });
