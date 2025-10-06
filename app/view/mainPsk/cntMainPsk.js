// SPDX-FileCopyrightText: 2025 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdConnect.view.mainPsk.cntMainPsk', {
    extend      : 'Ext.Container',
    xtype       : 'cntMainPsk',
    controller  : 'vcMainPsk',
    requires	: [
        'RdConnect.view.mainPsk.cntMainPskTiles',
        'RdConnect.view.mainPsk.vcMainPsk',
        'RdConnect.view.pskDetail.cntPskDetail',
        'RdConnect.view.pskTraffic.cntPskTraffic',
        'RdConnect.view.pskData.cntPskData'
    ],
    layout: {
		type        : 'card',
		pack        : 'start',
		align       : 'stretch',
		animation   : 'slide',
		deferredRender: false
	},
    items: [
        {
        	xtype	: 'container',
        	itemId  : 'cntPsk',
        	layout  : {
		        type	: 'vbox'
	        },
        	items	: [
                {
			        xtype	: 'label',
			        html	: 'PSK',
			        margin	: 10,
			        padding : 10,
			        cls		: 'detail-section'	
		        },
		        {
			        xtype	: 'cntMainPskTiles',
			        flex    : 1
		        }
        	]
        }
    ]
});
