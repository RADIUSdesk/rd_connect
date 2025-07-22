// SPDX-FileCopyrightText: 2025 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdConnect.view.viewport.vcViewport', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcViewport',
    config  : {
        urlCheckToken:          '/cake4/rd_cake/connect/check-token.json'
    },    
    control: {
        '#btnSettings': {
        	tap	: 'onBtnSettingsTap'
        },
        '#btnPassword': {
        	tap	: 'onBtnPasswordTap'
        },
        '#btnLogout' : {
        	tap	: 'onBtnLogoutTap'
        }
    },
    
    listen  : {
        //To listen to "login", "logout" and also any unmatchedroute events fired by any controller
        controller: {
            '*': {
                login           : 'onLogin',
                logout          : 'onLogout',
                info            : 'onInfo',
                mainSubmitOk    : 'onMainSubmitOk'
            }
        }
    },
        
    routes : {
        'user/:id' : {
            before  : 'onBeforeUser',
            action  : 'onUser'
        }
    },
    
    onLaunch: function() {
    	var me = this;
    	document.title = window.AppConfig.pageTitle;
    	me.restoreSession();           
    },
    showView: function(xtype) {
    	var me = this;
        var view = me.lookup(xtype),
        viewport = me.getView();
        if (!view) {
            viewport.removeAll(true);
            view = viewport.add({
                xtype: xtype,
                reference: xtype
            });
        }else{
        	viewport.removeAll(true);
        	viewport.add(view);
      	}
    }, 
    
    onLogin: function(session) {    	
        this.initiateSession(session);
    },
    onLogout: function(){
        this.showView('cntLogin'); 
    },
    onLogout: function() {
        var me  = this,
        view    = me.getView();
        me.terminateSession();
        view.setMasked({ xtype: 'loadmask' });
        view.setMasked(false);
        this.showView('cntLogin');
        return;
    },
    onInfo: function(){
        this.showView('cntInfo');
    }, 
    
    onMainSubmitOk: function(){
        this.showView('pnlMainComplete');
    },    
    initiateSession: function(session) {
    	me = this;
        if(session.token != undefined){
            Ext.Ajax.setExtraParams({});
            Ext.Ajax.setExtraParams({'token': session.token});
        }
        this.saveSession(session); 	
    	//Set the dashboard data
    	Ext.getApplication().setDashboardData(session); 	        
        this.showMain();
    },          
    restoreSession: function() {
        var me      = this;
        var session = RdConnect.util.State.get('session');
        if(session !== null && session.token !== undefined){
            me.checkToken(session.token).catch(function(error) {
				me.showAuth();
			}).then(function(authData) {
                if(authData != undefined){	
					me.onLogin(authData.data);
				}
				return;
			});  
        }else{
            me.showAuth();
        }
    },
    showAuth: function() {
    	var me = this;
        me.showView('cntLogin');
    },     
    showMain: function() {
        this.showView('pnlMain');
    },
    terminateSession: function() {
        this.saveSession(null);
    },
    saveSession: function(session) {
        RdConnect.util.State.set('session', session);
        this.session = session;
    }, 
    checkToken: function(token){
		var me = this;
        return new Ext.Promise(function (resolve, reject) {  
            //Check if the back-end likes our token
            Ext.Ajax.request({
                url     : me.getUrlCheckToken(),
                params  : {
                    token  : token
                },
                method  : 'GET',
                success : function(response){
                    var jsonData = Ext.JSON.decode(response.responseText);
                    //Set the phrases
                    if(jsonData.success){ //Token is ok, let us continiue
                        resolve(jsonData);
                    }else{
                        reject(response.status+':'+response.statusText);
                    }
                },
				failure: function(response, opts) {
					 reject(response.status+':'+response.statusText);
				}
            });
		});
	},
	onBtnSettingsTap: function(){
		var me = this;
		var p = Ext.Ajax.getExtraParams();		
		Ext.Viewport.hideMenu('left',false);
		var w  = Ext.widget('frmMainSettings',{api_key : p.token});
        w.show();
	
	},
	onBtnPasswordTap: function(){
		var me = this;
		Ext.Viewport.hideMenu('left',false);
		var w  = Ext.widget('frmMainPassword',{});
        w.show();	
	},
	onBtnLogoutTap: function(){
		var me = this;
		console.log("Logout Tapped");
		Ext.Viewport.hideMenu('left');
		me.onLogout();
	}
});

