// SPDX-FileCopyrightText: 2025 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdConnect.view.pskData.cntPskData', {
    extend      : 'Ext.Container',
    xtype       : 'cntPskData',
    controller  : 'vcPskData',
    layout      : {
        type    : 'vbox',
        pack    : 'start',
        align   : 'stretch'
    },   
    requires	: [
        'RdConnect.view.pskData.vcPskData',
        'RdConnect.view.components.cmbTimezones'
    ],
	initialize: function (){
        var me 	    = this;      
        var dd 		= Ext.getApplication().getDashboardData();         
        var tz_id 	= dd.user.timezone_id;       
        var store   = Ext.create(Ext.data.Store,{
            model: 'RdConnect.model.mUserStat',
            proxy: {
                type        : 'ajax',
                format      : 'json',
               // extraParams : { 'username' : me.username, 'type' : me.type, 'span' : me.span, 'timezone_id' : me.timezone_id },
                url         : '/cake4/rd_cake/connect-data/index.json',
                reader      : {
                    type            : 'json',
                    rootProperty    : 'items',
                    messageProperty : 'message'
                }
            },
            listeners   : {
                beforeload  : function(s){
                    me.down('#chrtUsage').setMasked(true); //show the mask
                },
                load        : function(s){
                    me.down('#chrtUsage').setMasked(false);
                },
                metachange : function(store,meta,options) {
                
                	var totalIn     = Ext.ux.bytesToHuman(meta.totalIn);
                    var totalOut    = Ext.ux.bytesToHuman(meta.totalOut);
                    var totalInOut  = Ext.ux.bytesToHuman(meta.totalInOut);
                
                	me.down('#lblMeta').setData({
                		in 		: totalIn,
                		out		: totalOut,
                		total	: totalInOut
                	});
                },
            },
            autoLoad: false   
        });
               
        me.setItems([
        	{
				    xtype : 'toolbar',
				    docked: 'top',
				    items: [
						{ ui: 'normal', iconCls: 'x-fa fa-arrow-left', itemId : 'btnBack'  },
						{
							xtype: 'label',
							html: '|'
						},
						{ ui: 'confirm', iconCls: 'x-fa fa-redo',			itemId : 'btnReload' },
						{ ui: 'normal',  iconCls: 'x-fa fa-calendar', 	itemId : 'btnDate' },
						{
							xtype	: 'label',
							itemId	: 'lblInfo',
							tpl	    : '<div style="color:#3e3f40;text-align: center;font-size:small">{day}<div style="font-size: xx-small;">{span}</div><div style="font-size: xx-small;">{timezone}</div></div>',
							data	: {}
						},
						{ xtype: 'spacer'},
						{
							xtype	: 'label',
							itemId	: 'lblMeta',
							tpl		: new Ext.XTemplate(
								'<div class="two-columns-grid">',
									'<div class="item-lbl" style="font-size: x-small;padding:0px;">IN :</div>',
									'<div class="item-value" style="font-size: x-small;padding:0px;">{in}</div>',
								'</div>',
								'<div class="two-columns-grid">',
									'<div class="item-lbl" style="font-size: x-small;padding:0px;">OUT :</div>',
									'<div class="item-value" style="font-size: x-small;padding:0px;">{out}</div>',
								'</div>',
								'<div class="two-columns-grid">',
									'<div class="item-lbl" style="font-size: x-small;padding:0px;">TOTAL :</div>',
									'<div class="item-value" style="font-size: x-small;padding:0px;">{total}</div>',
								'</div>'
							),
							data	: {}
						}
				]
		    },
        	{
				itemId	: 'chrtUsage',
				xtype	: 'cartesian',
				store	: store,
				flex    : 1,
				axes	: [
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
			        }, 
			        {
			            type        : 'category',
			            position    : 'bottom',
			            grid        : false,
			            fields      : ['time_unit']
			        }
			   ],
			   series: {
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
			}        
        ]);
        
        var asDate = Ext.create({
          xtype         : 'actionsheet',
          itemId        : 'asDate',
          floated       : true,              // explicit (ActionSheet is an overlay)
          hideOnMaskTap : true,
          title         : 'DATE',
          // tool "handler" strings don't resolve to the VC by default; give it the VC scope:
          tools   : [{
            type   : 'close',
            scope  : this.getController(),   // <— important
            handler: 'asClose'
          }],
          items: [{
              xtype    : 'radiogroup',
              itemId   : 'rgrpSpan',
              vertical : false,
              height   : 100,
              // radios in Modern are radiofield by default; these are fine
              items: [
                { label: 'Daily',   name: 'span', value: 'daily',   checked: true },
                { label: 'Weekly',  name: 'span', value: 'weekly' },
                { label: 'Monthly', name: 'span', value: 'monthly' }
              ],
              listeners: {
                change: 'spanChange',   // <— routes to your VC method,
                scope  : this.getController(),   // <— important
              }
          },{
              xtype    : 'datefield',
              itemId   : 'day',
              label    : 'Day',
              format   : 'Y-m-d',
              value    : new Date(),
              listeners: {
                change: 'dayChange',
                scope  : this.getController(),   // <— important
              }
          },{
              xtype    : 'cmbTimezones',
              itemId   : 'tz',
              value    : tz_id,
              listeners: {
                change : 'tzChange',
                scope  : this.getController(),   // <— important
              }
          }]
        });
	 	me.add(asDate);	 	
	 	this.callParent(arguments);
  	}
});
