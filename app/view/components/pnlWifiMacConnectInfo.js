// SPDX-FileCopyrightText: 2025 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdConnect.view.components.pnlWifiMacConnectInfo', {
    extend  	: 'Ext.Panel',
    xtype   	: 'pnlWifiMacConnectInfo',
    floated		: true,
    modal		: true,
    centered	: true,
    closable	: true,
    fullscreen 	: true,
    padding		: 6,
    scrollable	: true,
    iconCls 	: 'x-fa fa-wifi',
    mac         : null,
    span        : 'hour',
    config	: {
        urlConnectionInfoMac : '/cake4/rd_cake/connect-psk/connect-info-mac.json',
    },
    requires	: [
        'RdConnect.view.components.rdCustomProgressBar'
    ], 
    tools: [
	    {
	        iconCls : 'x-fa fa-sync',
	        handler: function (panel) {
                panel.refresh();
            },
	        itemId	: 'toolTable'
        } 
	],
	listeners: {
        show: function(panel) {
            // Call your function here
            panel.refresh();
        }
    },
    masked  : {
	    xtype	: 'loadmask',
	    message	: 'Loading....'
    },
    initialize	: function (){
        const me = this;
        me.setTitle(me.mac);
     	var items = [
     	    {
              xtype : 'container',
              itemId: 'cntUsage',
              cls   : 'conn-info-card',

              tpl: new Ext.XTemplate(
                '<div class="detail-section">Data Usage (WiFi Network)</div>',

                // Optional stacked bar to visualize IN vs OUT share
                '<tpl if="(values.tx_bytes + values.rx_bytes) &gt; 0">',
                  '<div class="u-stacked">',
                    '<span class="u-in"  style="width:{[this.pct(values.tx_bytes, values.tx_bytes+values.rx_bytes)]}%"></span>',
                    '<span class="u-out" style="width:{[this.pct(values.rx_bytes, values.tx_bytes+values.rx_bytes)]}%"></span>',
                  '</div>',
                '</tpl>',

                // IN
                '<div class="u-row">',
                  '<i class="fa fa-arrow-down u-ico u-ico-in" aria-hidden="true"></i>',
                  '<div class="u-body">',
                    '<div class="u-label">IN</div>',
                    '<div class="u-value mono">{[Ext.ux.bytesToHuman(values.tx_bytes)]}</div>',
                  '</div>',
                '</div>',

                // OUT
                '<div class="u-row">',
                  '<i class="fa fa-arrow-up u-ico u-ico-out" aria-hidden="true"></i>',
                  '<div class="u-body">',
                    '<div class="u-label">OUT</div>',
                    '<div class="u-value mono">{[Ext.ux.bytesToHuman(values.rx_bytes)]}</div>',
                  '</div>',
                '</div>',

                // TOTAL
                '<div class="u-row u-total">',
                  '<i class="fa fa-sum u-ico" aria-hidden="true"></i>',
                  '<div class="u-body">',
                    '<div class="u-label">TOTAL</div>',
                    '<div class="u-value mono">{[Ext.ux.bytesToHuman(values.tx_bytes + values.rx_bytes)]}</div>',
                  '</div>',
                '</div>',
                {
                  pct: function(part, whole){
                    if (!whole) { return 0; }
                    var p = Math.round((part/whole)*100);
                    return isFinite(p) ? p : 0;
                  }
                }
              ),

              data: {}
            },

     	/*
     	
     		{	
		 		xtype	: 'container',
		 		itemId	: 'cntUsage',
		 		cls     : 'conn-info-card', 	
			 	tpl		: new Ext.XTemplate(
					'<div class="detail-section">',
					'Data Usage (WiFi Network)',
					'</div>',
					'<div class="two-columns-grid">',
						'<div class="item-lbl" style="font-size:larger;padding:5px;">IN : </div>',
						'<div class="item-value" style="font-size:larger;padding:5px;">{[Ext.ux.bytesToHuman(values.tx_bytes)]}</div>',
					'</div>',
					'<div class="two-columns-grid">',
						'<div class="item-lbl" style="font-size:larger;padding:5px;">OUT : </div>',
						'<div class="item-value" style="font-size:larger;padding:5px;">{[Ext.ux.bytesToHuman(values.rx_bytes)]}</div>',
					'</div>',
					'<div class="two-columns-grid">',
						'<div class="item-lbl" style="font-size:larger;padding:5px;">TOTAL : </div>',
						'<div class="item-value" style="font-size:larger;padding:5px;">{[Ext.ux.bytesToHuman(values.tx_bytes+values.rx_bytes)]}</div>',
					'</div>'
				),
				data : {}
			},*/
			{
              xtype : 'container',
              itemId: 'cntInfo',
              cls   : 'conn-info-card',

              tpl: new Ext.XTemplate(
                '<div class="detail-section">Connection Info</div>',

                '<div class="ci-row">',
                  '<i class="fa fa-tablet ci-ico"></i>',
                  '<div class="ci-body">',
                    '<div class="ci-primary mono">{mac}</div>',
                    '<tpl if="!Ext.isEmpty(vendor)">',
                      '<div class="ci-secondary">{vendor}</div>',
                    '</tpl>',
                  '</div>',
                '</div>',

                '<div class="ci-row">',
                  '<i class="fa fa-wifi ci-ico"></i>',
                  '<div class="ci-body">',
                    '<div class="ci-primary">{[this.safe(values.ssid, "(Unknown SSID)")]}</div>',
                    '<div class="ci-secondary">',
                      '<span class="chip {[this.bandCls(values.frequency_band)]}">',
                        '{[this.bandText(values.frequency_band)]}',
                      '</span>',
                    '</div>',
                  '</div>',
                '</div>',

                '<div class="ci-row">',
                  '<i class="fa fa-cube ci-ico"></i>',
                  '<div class="ci-body">',
                    '<div class="ci-primary">{ap}</div>',
                  '</div>',
                '</div>',

                '<div class="ci-row">',
                  '<i class="fa fa-clock ci-ico"></i>',
                  '<div class="ci-body">',
                    '<div class="ci-primary">Last Seen</div>',
                    '<div class="ci-secondary">{l_modified_human}</div>',
                  '</div>',
                '</div>',
                {
                  // helpers
                  safe: function(v, d){
                    return Ext.isEmpty(v) ? d : Ext.String.htmlEncode(v);
                  },
                  bandText: function(b){
                    switch (b) {
                      case 'two':         return '2.4 GHz';
                      case 'five_lower':  return '5 GHz (Lower)';
                      case 'five_upper':  return '5 GHz (Upper)';
                      default:            return '—';
                    }
                  },
                  bandCls: function(b){
                    switch (b) {
                      case 'two':         return 'chip-green';
                      case 'five_lower':  return 'chip-blue';
                      case 'five_upper':  return 'chip-purple';
                      default:            return 'chip-muted';
                    }
                  }
                }
              ),
              data: {}
            },

     		/*{	
		 		xtype	: 'container',
		 		itemId	: 'cntInfo',	
			 	tpl		: new Ext.XTemplate(
					'<div class="detail-section">',
					'Connection Info',
					'</div>',
					"<div>",   
                        '<ul class="fa-ul">',    
                            "<li style='color:#3c6cb7;'><i class='fa-li fa  fa-tablet'></i>{mac}",
                                "<tpl if='(!Ext.isEmpty(vendor))'>",
                                    "<br><span style='color:#353535;'>({vendor})</span>",
                                "</tpl>",
                            "</li>",
                            "<li style='color:#238080;'><i class='fa-li fa fa-wifi'></i> {ssid}",               
                                "<span style='color:#353535;'>  (",
                                "<tpl if='frequency_band == \"two\"'>",
                                    "2.4GHz",
                                "</tpl>",
                                "<tpl if='frequency_band == \"five_lower\"'>",
                                    "5GHz-Lower",
                                "</tpl>",
                                "<tpl if='frequency_band == \"five_upper\"'>",
                                    "5GHz-Upper",
                                "</tpl>",
                                ")</span>",
                            "</li>",
                            "<li><i class='fa-li fa  fa-cube'></i> {ap}</li>",  
                            "<li><i class='fa-li fa  fa-clock'></i><b>Last Seen</b> {l_modified_human}</li>",
                        '</ul>',
                    '</div>'
				),
				data : {}
			},*/
			
			{
              xtype : 'container',
              cls   : 'conn-info-card',
              tpl   : new Ext.XTemplate(
                '<div class="detail-section">Signal</div>'
                ),
              data : {} 
            },
			
     		{
            	xtype		: 'rdCustomProgressBar',
            	height      : 30,
            	itemId      : 'pbSignalNow',
            	cls         : 'rd-custom-progressbar',
				minGradient	: {red: 179, green: 0, blue: 3},
				midGradient	: {red: 179, green: 125, blue: 0},
				maxGradient	: {red: 2, green: 92, blue: 6},
				margin		: '20 0 20 0'
			},
			{
            	xtype		: 'rdCustomProgressBar',
            	height      : 30,
            	itemId      : 'pbSignalAvg',
            	cls         : 'rd-custom-progressbar',
				minGradient	: {red: 179, green: 0, blue: 3},
				midGradient	: {red: 179, green: 125, blue: 0},
				maxGradient	: {red: 2, green: 92, blue: 6},
				margin		: '20 0 20 0'
			}
		 	
		];    	
     	me.setItems(items); 
     //	me.down('#cntInfo').setData(me.bigData.device_info);
     //	me.down('#cntUsage').setData(me.bigData.totals);     	
  	},
  	refresh : function(){
  	    var me = this;
  	    me.setMasked(true);
  	    Ext.Ajax.request({
            url: me.getUrlConnectionInfoMac(),
            params: {
                mac     : me.mac,
                span    : me.span        
            },
            method: 'GET',
            success: function(response){
                me.setMasked(false);
                var jsonData = Ext.JSON.decode(response.responseText);                
                if(jsonData.success){    
                    me.down('#cntInfo').setData(jsonData.data);
                    me.down('#cntUsage').setData(jsonData.data);
                    
                    me.down('#pbSignalNow').setValue(jsonData.data.signal_bar);
                    me.down('#pbSignalNow').setText('Signal Now '+jsonData.data.signal+' dBm');
                    
                    me.down('#pbSignalAvg').setValue(jsonData.data.signal_avg_bar);      
                    me.down('#pbSignalAvg').setText('Signal Average '+jsonData.data.signal_avg+' dBm');             
                }else{
                                 
                }
            }
        }); 
  	}
});
