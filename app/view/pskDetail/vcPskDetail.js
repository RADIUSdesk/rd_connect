// SPDX-FileCopyrightText: 2025 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdConnect.view.pskDetail.vcPskDetail', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcPskDetail',
    config	: {
        urlToDisplay    : '/cake4/rd_cake/connect-psk/detail.json',
        qrValue         : ''
    },
    control: {
    	'cntPskDetail' : {
    		show	    : 'show',
    		initialize  : 'initCnt' 
    	},
        'cntPskDetail #btnBack' : {
      		tap		: 'back'
      	},
      	'cntPskDetail #btnReload' : {
      		tap		: 'reload'
      	},
      	'cntPskDetail #sldrSize'  : {
      	    change  : 'updateQrCode'
      	},
      	'cntPskDetail #btnChangePsk' : {
      		tap		: 'changePsk'
      	}
    },
    initCnt	: function(){
    	const me = this;  	
    	
    },
    show	: function(){
    	const me = this;   	
    	setTimeout(function(){ //FIXME We add a small delay in order to set everything up
    		me.reload();	
    	}, 1000);	
    },
    back : function(btn){
        const me  = this;
        const c   = me.getView().up('cntMainPsk');
        const m   = c.down('#cntPsk');       
         c.setActiveItem(m);
         me.getView().up('pnlMain').down('#lblMain').setHtml('PSK');
    },
    reload	: function(btn){
    	const me = this;   
        Ext.Ajax.request({
            url     : me.getUrlToDisplay(),
            params  : {
                
            },
            method  : 'GET',
            success : function(response){
                var jsonData = Ext.JSON.decode(response.responseText);                
                if(jsonData.success){    
                    me.paintScreen(jsonData.data);                
                }else{
                                 
                }
            }
        });
    },
    paintScreen : function(data){
        const me = this;
        me.getView().down('#cntDetail').setData(data);
        if(data.qr_available){
            me.setQrValue(data.qr_value);
            me.updateQrCode(); 
        }        
    },
    updateQrCode : function(data){
        const me    = this;
        const text  = me.getQrValue();
        const size  = me.getView().down('#sldrSize').getValue();
        const node  = me.getView().down('#cmpDetailQr').element.dom;
        // Clear current drawing
        while (node.firstChild) node.removeChild(node.firstChild);
        // Recreate with new options (library supports makeCode, but recreating keeps it simple)
        me.getView().qr = new QRCode(node, {
            text,
            width: size,
            height: size,
            correctLevel: QRCode.CorrectLevel.M
        });    
    },
    changePsk : function(){
        const me = this;
        console.log("Change PSK NOW!");
    	var w = Ext.widget('frmPskChangePsk',{calling_controller : me });
        w.show(); 
    }
});
