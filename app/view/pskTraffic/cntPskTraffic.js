// SPDX-FileCopyrightText: 2025 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later
Ext.define('RdConnect.view.pskTraffic.cntPskTraffic', {
    extend      : 'Ext.Container',
    xtype       : 'cntPskTraffic',
    controller  : 'vcPskTraffic',
    layout      : {
        type    : 'vbox',
        pack    : 'start',
        align   : 'stretch'
    },   
    requires	: [
        'RdConnect.view.pskTraffic.vcPskTraffic',
        'RdConnect.view.components.frmMacAction',
        'RdConnect.view.components.pnlWifiMacConnectInfo'
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
					{ ui: 'confirm', iconCls: 'x-fa fa-redo',	    itemId : 'btnReload' },
					{ ui: 'normal',  iconCls: 'x-fa fa-calendar', 	itemId : 'btnDate' },					
					{
						xtype	: 'label',
						itemId	: 'lblInfo',
						padding	: 5,
						tpl	    : new Ext.XTemplate(
							'<div style="color:#3e3f40;text-align: left;font-size:small">{timespan}',
								'<div style="text-align: left;font-size: x-small;">{client_count} Clients</div>',
								'<div style="text-align: left;font-size: x-small;">{proto_count} Protocols</div>',
							'</div>'
						),
						data	: {}
					},
					{ xtype: 'spacer'},
					{
						xtype	: 'label',
						itemId	: 'lblMeta',
						tpl		: new Ext.XTemplate(
							'<div class="two-columns-grid">',
								'<div class="item-lbl" style="font-size: x-small;padding:0px;">IN : </div>',
								'<div class="item-value" style="font-size: x-small;padding:0px;">{data_in}</div>',
							'</div>',
							'<div class="two-columns-grid">',
								'<div class="item-lbl" style="font-size: x-small;padding:0px;">OUT : </div>',
								'<div class="item-value" style="font-size: x-small;padding:0px;">{data_out}</div>',
							'</div>',
							'<div class="two-columns-grid">',
								'<div class="item-lbl" style="font-size: x-small;padding:0px;">TOTAL : </div>',
								'<div class="item-value" style="font-size: x-small;padding:0px;">{data_total}</div>',
							'</div>'
						),
						data	: {}
					}
		    ]
        }    
    ],                   
    scrollable : true,
	initialize: function (){      
        var me      = this;
         
        //-- Traffic ---    
        Ext.create('Ext.data.Store', {
            storeId : 'strBandwidthTrafficPie',
            fields  :[ 
          //      {name: 'id',            type: 'int'},
                {name: 'mac',           type: 'string'},
                {name: 'data_in',       type: 'int'},
                {name: 'data_out',      type: 'int'},
                {name: 'data_total',    type: 'int'}
            ]
        });
                 
        var gridTraffic = {
            xtype   : 'grid',
            itemId  : 'gridTraffic',
            border  : true,       
            store   : Ext.data.StoreManager.lookup('strBandwidthTrafficPie'),
            emptyText: 'No Clients For This Timespan',
            selectable: {
			    mode: 'single'
		    },   
            columns: [
                {
                    text     : 'Client',
                    dataIndex: 'mac',
                    flex     : 2,
                    cell     : { encodeHtml: false }, // allow our HTML
                    renderer : function (mac, record) {
                        var alias = record.get('alias');
                        var macHtml   = '<div class="cli-mac"><code>' + Ext.htmlEncode(mac) + '</code></div>';
                        if (alias && String(alias).trim().length) {
                            var aliasHtml = '<div class="cli-alias">' + Ext.htmlEncode(alias) + '</div>';
                            return macHtml + aliasHtml;
                        }
                        return macHtml;
                    }
                },
                { text: 'Data In',   dataIndex: 'data_in',  hidden: true, renderer: function(value){
                        return Ext.ux.bytesToHuman(value)              
                    } 
                },
                { text: 'Data Out',  dataIndex: 'data_out', hidden: true,renderer: function(value){
                        return Ext.ux.bytesToHuman(value)              
                    } 
                },
                { text: 'Data Total',dataIndex: 'data_total',tdCls: 'gridMain',renderer: function(value){
                        return Ext.ux.bytesToHuman(value)              
                    } 
                }
            ],
            flex: 1
        };
        
        //-- Protocol --       
        Ext.create('Ext.data.Store', {
            storeId : 'strBandwidthProtocolPie',
            fields  :[ 
                {name: 'id',            type: 'int'},
                {name: 'layer7',        type: 'string'},
                {name: 'data_in',       type: 'int'},
                {name: 'data_out',      type: 'int'},
                {name: 'data_total',    type: 'int'}
            ]
        });
                
        var gridProtocol = {
            xtype   : 'grid',
            itemId  : 'gridProtocol',
            border  : true,       
            store   : Ext.data.StoreManager.lookup('strBandwidthProtocolPie'),
            emptyText: 'No Protocols For This Timespan',
            columns: [
                { text: 'Layer7',  dataIndex: 'layer7', flex: 1},
                { text: 'Data In',   dataIndex: 'data_in',  hidden: true, renderer: function(value){
                        return Ext.ux.bytesToHuman(value)              
                    } 
                },
                { text: 'Data Out',  dataIndex: 'data_out', hidden: true,renderer: function(value){
                        return Ext.ux.bytesToHuman(value)              
                    } 
                },
                { text: 'Data Total',dataIndex: 'data_total',tdCls: 'gridMain',renderer: function(value){
                        return Ext.ux.bytesToHuman(value)              
                    } 
                }
            ],
            flex: 1
        };
        
        var store_bar    = Ext.create(Ext.data.Store,{model: 'RdConnect.model.mUserStat'});
          
 	    me.setItems(      
	        { 
	        	xtype	: 'panel',
	        	title   : 'Client Info',
	        	itemId	: 'pnlTraffic',
	        	ui		: 'panel-blue',
	        	flex    : 1,
	        	scrollable : true,
	        	masked  : {
				    xtype	: 'loadmask',
				    message	: 'Loading....'
			    },
	        	layout: {
				    type        : 'card',
				    pack        : 'start',
				    align       : 'stretch',
				    animation   : 'slide',
				    deferredRender: true
			    },
	        	items	: [
	        		gridTraffic,
	        		{
				       xtype	: 'polar',
				       itemId	: 'plrTraffic',
				       layout 	: 'fit',		
				       interactions: ['rotate', 'itemhighlight'],
				       store	: Ext.data.StoreManager.lookup('strBandwidthTrafficPie'),
				       series	: {
                           type         : 'pie',                       
                           highlight    : true,
                           angleField   : 'data_total',
                           label        : {
                               field    : 'name',
                               display  : 'rotate'
                           },
                           donut        : 10,
                           tooltip : {
                                trackMouse: true,
                                renderer: function (tooltip, record, item) {
                                    tooltip.setHtml(
                                        "<h2>"+record.get('name')+"</h2><h3>"+Ext.ux.bytesToHuman(record.get('data_total'))+"</h3>"                           
                                    );
                                }
                            } 
                        }
		     		},
		     		{
		     			xtype	: 'cartesian',
		     			itemId	: 'crtTraffic',
		     			store	: store_bar,
		     			axes: [
				            {
				                type        : 'numeric',
				                position    : 'left',
				                adjustByMajorUnit: true,
				                grid        : true,
				                fields      : ['data_in', 'data_out'],
				                renderer    : function(axis, label, layoutContext) {
				                    return Ext.ux.bytesToHuman(label);
				                },
				                minimum: 0
				            }, {
				                type        : 'category',
				                position    : 'bottom',
				                grid        : false,
				                fields      : ['time_unit']
				            }
				        ],
				       	series: [
				            {
				                type    : 'bar',
				                title   : [ 'Data In', 'Data out' ],
				                xField  : 'time_unit',
				                yField  : ['data_in', 'data_out'],
				                stacked : true,
				                style   : {
				                    opacity: 0.80
				                },
				                highlight: {
				                    fillStyle: 'yellow'
				                }
				            }
				        ]		 		
		     		},
	        		gridProtocol,
	        		{
				       xtype	: 'polar',
				       itemId	: 'plrProtocol',
				       layout 	: 'fit',		
				       interactions: ['rotate', 'itemhighlight'],
				       store    : Ext.data.StoreManager.lookup('strBandwidthProtocolPie'),
				       series: {
                           type         : 'pie',                     
                           highlight    : true,
                           angleField   : 'data_total',
                           label        : {
                               field    : 'layer7',
                               display  : 'rotate'
                           },
                           donut        : 10,    
                           tooltip : {
                                trackMouse: true,
                                renderer: function (tooltip, record, item) {
                                    tooltip.setHtml(
                                        "<h2>"+record.get('layer7')+"</h2><h3>"+Ext.ux.bytesToHuman(record.get('data_total'))+"</h3>"                                                                           
                                    );
                                }
                            }    
                        },
                        data    : {
                        }
		     		}			
	        	],
	        	tools: [
	        	{
				    iconCls : 'x-fa fa-table',
				    handler	: 'showTable',
				    itemId	: 'toolTable' 
			    }, 
	        	{
				    iconCls : 'x-fa fa-chart-pie',
				    handler	: 'showPie',
				    itemId	: 'toolPie'
			    }, 
			    {
				    iconCls : 'x-fa fa-chart-bar',
				    handler	: 'showBar',
				    itemId	: 'toolBar'
			    }]
		    });	
				
		var asDate 	= Ext.create({
			xtype	: 'actionsheet',
			itemId	: 'asDate',
			centered: false,
			title: 'DATE AND TYPE',
			tools: [
			{
				type: 'close',
				handler: 'asClose'
			}],
			items: [
				 	{
						xtype: 'radiogroup',
						vertical: false,
						itemId	: 'rgrpSpan',
						items: [
							{ label: 'Now', 	name: 's_e', value: 'hour', checked: true },
							{ label: '24 Hours',name: 's_e', value: 'day'},
							{ label: '7 Days', 	name: 's_e', value: 'week' }
						]
					},
					{
						xtype   : 'radiogroup',
						vertical: false,
						itemId	: 'rgrpTrafficProtocol',
						items: [
							{ label: 'Traffic',   name: 't_p', value: 'traffic', checked: true },
							{ label: 'Protocols', name: 't_p', value: 'protocol'}
						]
					}				     
				 ]
		 	});	 	
		me.add(asDate);
		      
   		var menu = Ext.create({
			xtype	: 'actionsheet',
			itemId	: 'asMenu',
			centered: false,
			title: 'MENU',
			 items: [
				 {
					 text		: 'Manage Alias',
					 iconCls	: 'x-fa fa-pen',
					 textAlign  : 'left',
					 itemId		: 'btnAlias'
				 },
				 {
					xtype	: 'label',
					style	: {
		   				'border-bottom' : '1px solid #667078'
					}		
				},
				{
					 text		: 'Connection Info',
					 iconCls	: 'x-fa fa-wifi',
					 textAlign  : 'left',
					 itemId		: 'btnInfo'
				 }/*,
				 {
					 text		: 'Just This Client',
					 iconCls	: 'x-fa fa-filter',
					 textAlign  : 'left',
					 itemId		: 'btnFilter'
				 }*/	
			 ]
		});     	
	 	me.add(menu);	
	 		
	 	this.callParent(arguments);
  	}
});
