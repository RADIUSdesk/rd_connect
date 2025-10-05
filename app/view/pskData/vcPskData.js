// SPDX-FileCopyrightText: 2025 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdConnect.view.pskData.vcPskData', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcPskData',
    config	: {
        urlToDisplay    : '/cake4/rd_cake/connect-psk/data.json',
        asMenu		    : false,
        span            : 'hour', //can be hour, day , week
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
      	/*'#btnDate' : {
      		tap		: 'date'
      	},
      	'#rgrpSpan' : {
      		change 	: 'spanChange'
      	}*/
    },
    initCnt	: function(){
    	var me = this;  	
    	//me.setAsMenu(me.getView().down('#asMenu'));
    	//FIXME NOTE We have to manually add the event bindings for items in the ActionSheet when we add the parent container on the fly (//**)
    	//me.getAsMenu().down('#btnAlias' ).on('tap', this.doAlias, this);//**
    	//me.getAsMenu().down('#btnInfo' ).on('tap',  this.doInfo, this);//**
    	//me.getAsMenu().down('#btnFilter' ).on('tap',  this.doFilter, this);//**
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
         me.getView().up('pnlMain').down('#lblMain').setHtml('RADIUS Data');
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
                 //   me.paintDataUsage(jsonData.data);              
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
               
    }

});
