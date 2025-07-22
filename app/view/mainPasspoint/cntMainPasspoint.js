// SPDX-FileCopyrightText: 2025 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdConnect.view.mainPasspoint.cntMainPasspoint', {
    extend      : 'Ext.Container',
    xtype       : 'cntMainPasspoint',
    controller  : 'vcMainPasspoint',
    requires	: [
        'RdConnect.view.mainPasspoint.vcMainPasspoint',
        'RdConnect.view.mainPasspoint.gridMainPasspoint',
    ],
    layout		: {
		type	: 'vbox',
	//	align	: 'center',
	//	pack	: 'center'
	},
    items: [
		{
			xtype	: 'label',
			html	: 'HS2.0 / Passpoint Profiles',
			margin	: 10,
			padding : 10,
			cls		: 'detail-section'	
		},
		{
			xtype	: 'gridMainPasspoint',
			height	: 220	
		},
		{
		    xtype       : 'button',
		    reference   : 'btnPasspoint',
		    text        : 'Download',
		    iconAlign   : 'left',
		    margin     : 10,
		    iconCls     : 'x-fa fa-download',
		    handler     : 'onDownloadTap',
		    ui          : 'action'
		}
    ]
});
