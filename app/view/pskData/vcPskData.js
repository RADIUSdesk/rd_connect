// SPDX-FileCopyrightText: 2025 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdConnect.view.pskData.vcPskData', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcPskData',
    sel		: null,
    init    : function() { 
    	var me = this;   
    	var dd = Ext.getApplication().getDashboardData();
    	//Set root to use later in the app in order to set 'for_system' (root)
        me.root    = false;
        if(dd.isRootUser){
            me.root = true;   
        }
    },
    config: {
        containedIn			: 'cntMainRadius',
        appTitle			: 'RADIUSdesk',
        sortDesc			: true,
        backTo				: 0,
        type				: 'permanent', //can be voucher, device, permanent, realm, nas??
        span				: 'daily', //can be daily, weekly, monthly
        asMenu		        : false,
    },
    control: {
        'cntPskData' : {
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
      	}
    },
    initCnt	: function(){
    	var me = this;  	
    	me.setAsMenu(me.getView().down('#asDate'));
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
    	me.getView().down('#chrtUsage').getStore().reload();  
    },
    date	: function(tbn){
    	var me  = this;
    	me.getAsMenu().show();
    },
    updateGraph : function(upd_info){
    	var me = this;
    	me.setType(upd_info['type']);
    	me.setBackTo(upd_info['backTo']);  	
    	me.setParams();
    	me.reload();  	
    },
    asClose : function(){
    	var me = this
    	me.getAsMenu().hide();
    	return true;
    },
    setParams	: function(){
    	var me = this;
    	me.getView().down('#chrtUsage').getStore().getProxy().setExtraParam('span',me.getSpan());
    	me.getView().down('#chrtUsage').getStore().getProxy().setExtraParam('type',me.getType()); 	
    	var tz_id  = me.getView().down('cmbTimezones').getValue(); 
    	me.getView().down('#chrtUsage').getStore().getProxy().setExtraParam('timezone_id',tz_id);
    	me.updateInfo();    
    },
    dayChange	: function(a,value){
    	var me = this;
    	var d = me.getDayYmd();
    	me.getView().down('#chrtUsage').getStore().getProxy().setExtraParam('day',d);
    	me.updateInfo();
        me.reload();
    },
    spanChange	: function(a,value){
    	var me = this;
    	console.log("Span Changed");
    	me.setSpan(value);
    	me.getView().down('#chrtUsage').getStore().getProxy().setExtraParam('span',value);
    	me.updateInfo();
        me.reload(); 	
    },
    tzChange	: function(a,value){
    	var me = this;
    	me.getView().down('#chrtUsage').getStore().getProxy().setExtraParam('timezone_id',value);
    	me.updateInfo();
        me.reload();       
    },
    updateInfo	: function(){
    	var me        = this;
    	var d         = me.getAsMenu().down('#day').getValue();
    	var d_s       = d.toDateString();
    	var tz_id     = me.getAsMenu().down('cmbTimezones').getValue() 
    	var tz_record = me.getAsMenu().down('cmbTimezones').getStore().findRecord('id',tz_id);
    	var span 	  = me.getAsMenu().down('#rgrpSpan').getChecked().getValue();
    	me.getView().down('#lblInfo').setData({
    		day 		: d_s,
    		span		: span.toUpperCase(),
    		timezone 	: tz_record.get('name')
    	});   
    },
    
    getDayYmd: function () {
        var me = this;
        var d = me.getAsMenu().down('#day').getValue(); // Date object
        return d ? Ext.Date.format(d, 'd/m/Y') : null;  // '2025-10-03'
    },
});	
