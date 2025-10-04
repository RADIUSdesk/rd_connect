// SPDX-FileCopyrightText: 2025 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdConnect.view.pskTraffic.vcPskTraffic', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcPskTraffic',
    config	: {
        urlToDisplay    : '/cake4/rd_cake/connect-psk/traffic.json',
        asMenu		    : false,
        span            : 'hour', //can be hour, day , week
        display         : 'traffic', //traffic or protocol
    },
    control: {
    	'cntPskTraffic' : {
    		show	    : 'show',
    		initialize  : 'initCnt' 
    	},
        '#btnBack' : {
      		tap		: 'back'
      	},
      	'#btnReload' : {
      		tap		: 'reload'
      	},
      	'#btnDate' : {
      		tap		: 'date'
      	},
      	'#rgrpSpan' : {
      		change 	: 'spanChange'
      	},
      	'#rgrpTrafficProtocol' : {
      	    change  : 'trfPrtChange'
      	},
        '#gridTraffic': {
            select: 'onGridChildTap'
        }
    },
    initCnt	: function(){
    	var me = this;  	
    	me.setAsMenu(me.getView().down('#asMenu'));
    	//FIXME NOTE We have to manually add the event bindings for items in the ActionSheet when we add the parent container on the fly (//**)
    	me.getAsMenu().down('#btnAlias' ).on('tap', this.doAlias, this);//**
    	me.getAsMenu().down('#btnInfo' ).on('tap',  this.doInfo, this);//**
    	me.getAsMenu().down('#btnFilter' ).on('tap',  this.doFilter, this);//**
    },
    show	: function(){
    	var me = this;   	
    	setTimeout(function(){ //FIXME We add a small delay in order to set everything up
    		me.reload();	
    	}, 500);	
    },
    back : function(btn){
        var me  = this;
        var c   = me.getView().up('cntMainPsk');
        var m   = c.down('#cntPsk');       
         c.setActiveItem(m);
         me.getView().up('pnlMain').down('#lblMain').setHtml('PSK');
    },
    reload	: function(btn){
    	var me = this;
    	//var dd      = Ext.getApplication().getDashboardData();
        //var tz_id   = dd.user.timezone_id;      
        me.getView().down('#pnlTraffic').setMasked(true);
        Ext.Ajax.request({
            url: me.getUrlToDisplay(),
            params: {
                span        : me.getSpan(),
                dev_mode    : 'ap',
                dev_id      : 143,
                timezone_id : 24,
                exit_id     : 243,
                mac         : false,
                mac_address_id  : false,
                mac_protocol    : false,
                protocol        : false,
                protocol_mac_id : false,
                cloud_id        : 60
            },
            method: 'GET',
            success: function(response){
            	me.getView().down('#pnlTraffic').setMasked(false);
                var jsonData = Ext.JSON.decode(response.responseText);                
                if(jsonData.success){    
                    me.paintDataUsage(jsonData.data);              
                }else{
                                 
                }
            }
        });
             
        /*
        
        span        : me.getSpan(),
        dev_mode    : 'ap',
        dev_id      : 143,
        timezone_id : 24,
        exit_id     : 243,
        mac         : false,
        mac_address_id  : false,
        mac_protocol    : false,
        protocol        : false,
        protocol_mac_id : false,
        cloud_id        : 60
                
        */
               
    },
    
    showTable : function(){
        const me = this;
        if(me.getDisplay() == 'traffic'){
            me.showTrafficTable();
        }
        if(me.getDisplay() == 'protocol'){
            me.showProtocolTable();
        }
    },    
    showPie : function(){
        const me = this;
        if(me.getDisplay() == 'traffic'){
            me.showTrafficPie();
        }
        if(me.getDisplay() == 'protocol'){
            me.showProtocolPie();
        }
    },   
    showBar : function(){
        const me = this;
        var a = me.getView().down('#crtTraffic');
    	me.getView().down('#pnlTraffic').setActiveItem(a);
    },
   
    showTrafficTable : function(){
    	var me = this;
    	var a = me.getView().down('#gridTraffic');
    	me.getView().down('#pnlTraffic').setActiveItem(a); 
    	me.getView().down('#pnlTraffic').setTitle('Client Info');
    	me.setDisplay('traffic');
    },   
    showTrafficPie	: function(btn){
    	var me = this;
    	var a = me.getView().down('#plrTraffic');
    	me.getView().down('#pnlTraffic').setActiveItem(a);
    },    
    showProtocolTable : function(btn){
    	var me = this;
    	var a = me.getView().down('#gridProtocol');
    	me.getView().down('#pnlTraffic').setActiveItem(a);
    	me.getView().down('#pnlTraffic').setTitle('Protocol Info');
    	me.setDisplay('protocol');
    },   
    showProtocolPie	: function(btn){
    	var me = this;
    	var a = me.getView().down('#plrProtocol');
    	me.getView().down('#pnlTraffic').setActiveItem(a);
    },
   
    
    paintDataUsage: function(data){
    
        var me					= this;
        me.getView().down('#gridTraffic').getStore().setData(data.top_traffic); 
        me.getView().down('#crtTraffic').getStore().setData(data.graph.items); 
        
        me.getView().down('#gridProtocol').getStore().setData(data.top_protocol); 
        
        var total    			 = me.getView().down('#lblMeta');      
        data.summary.data_in     = Ext.ux.bytesToHuman(data.summary.data_in);
        data.summary.data_out    = Ext.ux.bytesToHuman(data.summary.data_out);
        data.summary.data_total  = Ext.ux.bytesToHuman(data.summary.data_total);
        
        total.setData(data.summary);     
  
        //me.updateInfo();
        
        me.getView().down('#lblInfo').setData(data.summary);
               
    },
    date	: function(tbn){
    	var me  = this;
    	me.getView().down('#asDate').show();
    },
    spanChange	: function(a,value){
    	var me = this;
    	me.setSpan(value);
    	console.log(me.getSpan());
        me.reload(); 	
    },
    trfPrtChange : function(a,value){
        var me = this;
        if(value == 'protocol'){
            me.showProtocolTable()
        }
        if(value == 'traffic'){
            me.showTrafficTable()
        }
        me.reload(); 
    },
   	updateInfo	: function(){
    	var me 		= this;
    	var span  	= me.getSpan();
    	var ssid_id	= me.getView().down('cmbMeshViewSsids').getValue();		
    	var ssid_record = me.getView().down('cmbMeshViewSsids').getStore().findRecord('id',ssid_id); 
    	if(ssid_record == null){
    		return;
    	}
    	var ssid	= ssid_record.get('name');
   	
    	  	
    	me.getView().down('#lblInfo').setData({
    		mesh_name   : me.getMeshName(),
    		span		: span.toUpperCase(),
    		ssid		: ssid
    	});   
    },
    asClose : function(){
    	var me = this
    	me.getView().down('#asDate').hide();
    },
    
    onGridChildTap : function(a,sel){
    	var me 	= this;
    	console.log(sel);
   		me.sel = sel;			
    	me.getAsMenu().show();   	   	  	 
    },
    
    doAlias : function(){
    	var me = this;
    	me.getAsMenu().hide();
    	var w = Ext.widget('frmMacAction',{mac : me.sel.get('mac'), r: me.sel, ctrl : me });
    	w.show();
    },
    
    doInfo : function(){
        const me = this;
        console.log("Do Info");
        var w = Ext.widget('pnlWifiMacConnectInfo',{mac : me.sel.get('mac'), span : me.getSpan()  }); 
        w.show();    
    },
    
    doFilter : function(){
        const me = this;
        console.log("Do Filter");   
    },
        
    
    info	: function(){
    	var me = this;
    	me.getAsMenu().hide();
    	me.reloadMac('info');
    	//var w = Ext.widget('pnlWifiMacConnectInfo',{mac : me.sel.get('mac'), r: me.sel, ctrl : me, mesh_id : me.getMeshId() });    
    },
    usage	: function(){
    	var me = this;
    	me.getAsMenu().hide();
    	me.reloadMac('usage');   
    },
    reloadMac	: function(item_to_show){
    	var me 		= this;  	
    	var dd      = Ext.getApplication().getDashboardData();
        var tz_id   = dd.user.timezone_id;      
		var	t 		= 'mesh_entries';
		var ssid_id = me.getView().down('cmbMeshViewSsids').getValue();
        var node_id = false;
        var mac		= me.sel.get('mac');
        Ext.Ajax.request({
            url: me.getUrlUsageForSsid(),
            params: {
                type        : t,
                span        : me.getSpan(),
                mesh_id     : me.getMeshId(),
                timezone_id : tz_id,
                mesh_entry_id : ssid_id,
                node_id     : node_id,
                mac         : mac
            },
            method: 'GET',
            success: function(response){
                var jsonData = Ext.JSON.decode(response.responseText);                
                if(jsonData.success){
                	var data = jsonData.data 
                	data.totals.data_in     = Ext.ux.bytesToHuman(data.totals.data_in);
        			data.totals.data_out    = Ext.ux.bytesToHuman(data.totals.data_out);
        			data.totals.data_total  = Ext.ux.bytesToHuman(data.totals.data_total);
        			var mac = me.sel.get('mac');
        			if(me.sel.get('alias') !== ''){
        				mac = me.sel.get('alias');
        			}
                    
                   	if(item_to_show == 'info'){
                 		var w = Ext.widget('pnlWifiMacConnectInfo',{mac : mac, bigData : data }); 
                 		w.show(); 
                   	}
                   
                   if(item_to_show == 'usage'){
                   		var w = Ext.widget('pnlWifiMacUsageGraph',{mac : mac, bigData : data }); 
                 		w.show();                
                   }
                   
                }else{

                  
                }
            }
        }); 
    }    
});
