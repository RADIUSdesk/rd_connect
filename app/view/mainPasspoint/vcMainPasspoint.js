// SPDX-FileCopyrightText: 2025 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdConnect.view.mainPasspoint.vcMainPasspoint', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcMainPasspoint',
    config		: {
        osSelect    : false,
        urlAndroid  : '/cake4/rd_cake/connect/android',
        urlApple    : '/cake4/rd_cake/connect/apple',
        urlWindows  : '/cake4/rd_cake/connect/windows',
        urlLinux    : '/cake4/rd_cake/connect/linux',
    },
    control: {
    	'gridMainPasspoint': {
            cellselection: 'onGridChildTap'
        }
    },
    onGridChildTap : function(a,b,c){
    	var me 	= this;
    	var col = b[0][0]; 
    	var row = b[0][1];
    	var r   = a.getStore().findRecord('id',row);	
    	var c 	= r.get(col);	
    	me.setConfig('osSelect', c.os);  	
    },
    onDownloadTap: function() {
        var me      = this;
        var dd      = Ext.getApplication().getDashboardData();
        var token   = dd.token;
        var os      = me.getConfig('osSelect');
        if(os){
            if(os == 'android'){
                window.open(me.getUrlAndroid()+"?token="+token);
            }
            if(os == 'apple'){
                window.open(me.getUrlApple()+"?token="+token);
            }
            if(os == 'linux'){
                window.open(me.getUrlLinux()+"?token="+token);
            }
            if(os == 'windows'){
                window.open(me.getUrlWindows()+"?token="+token);
            }
        }else{
            Ext.Msg.alert('Error', 'Select an operating system first', Ext.emptyFn);            
        } 
    }
});
