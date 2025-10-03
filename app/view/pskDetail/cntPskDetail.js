// SPDX-FileCopyrightText: 2025 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later
Ext.define('RdConnect.view.pskDetail.cntPskDetail', {
    extend      : 'Ext.Container',
    xtype       : 'cntPskDetail',
    controller  : 'vcPskDetail',
    layout      : {
        type    : 'vbox',
        pack    : 'start',
        align   : 'stretch'
    },

    requires	: [
        'RdConnect.view.pskDetail.vcPskDetail',
        'RdConnect.view.pskDetail.frmPskChangePsk',
        'Ext.field.Slider'
    ],
	items   : [
        {
		        xtype : 'toolbar',
		        docked: 'top',
		        items: [
					{ ui: 'normal', iconCls: 'x-fa fa-arrow-left', itemId : 'btnBack'  },
					{
						xtype: 'label',
						html: '|'
					},
					{ ui: 'confirm', iconCls: 'x-fa fa-redo',	    itemId : 'btnReload' }
		    ]
        },
       {
			xtype	: 'container',
			itemId	: 'cntDetail',
			tpl		: new Ext.XTemplate(
				'<div class="two-columns-grid">',
					'<div class="item-lbl" style="font-size: x-large;padding:10px;">PSK : </div>',
					'<div class="item-value" style="font-size: x-large;padding:10px;">{ppsk}</div>',
				'</div>',
				'<div class="two-columns-grid">',
					'<div class="item-lbl" style="font-size: x-large;padding:10px;">SSID : </div>',
					'<div class="item-value" style="font-size: x-large;padding:10px;">{ssid}</div>',
				'</div>',
				'<div class="two-columns-grid">',
					'<div class="item-lbl" style="font-size: x-large;padding:10px;">VLAN : </div>',
					'<div class="item-value" style="font-size: x-large;padding:10px;">{vlan}</div>',
				'</div>'
			),
			data	: {}
		},
		{
		    xtype       : 'button',
		    itemId      : 'btnChangePsk',
		    text        : 'Change PSK',
		    iconAlign   : 'left',
		    margin      : 10,
		    iconCls     : 'x-fa fa-key',
		    ui          : 'action'
		},
		{
            xtype       : 'sliderfield',
            label       : 'QR Code Size',
            value       : 220,
            minValue    : 120,
            maxValue    : 480,
            increment   : 10,
            margin      : 10,
            itemId      : 'sldrSize'
        },
		{            
            itemId      : 'cmpDetailQr',
            flex        : 1,
            scrollable  : true,
            xtype       : 'component',
            reference   : 'qrBox',
            //height      : 520,
            // Let the QR sit centered
            style       : 'display:flex; align-items:center; justify-content:center; min-height:240px;'
        }
   
    ],                   
    scrollable : true,
	initialize: function (){      
        var me      = this; 
	 	this.callParent(arguments);
  	}
});
