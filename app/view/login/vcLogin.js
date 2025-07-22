// SPDX-FileCopyrightText: 2025 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdConnect.view.login.vcLogin', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcLogin',
    init    : function() {
        this.callParent(arguments);
    },
    listen  : {
         component: {
             'cntLogin textfield': {
                 change: 'testForm'
             }
         }
    },
    
    testForm: function(field,newValue, oldValue, eOpts){
        var me      = this;
        var form    = me.lookup('form');
        var button  = me.lookup('btnLogin');
        
        if(form.isValid()){
            button.setDisabled(false);    
        }else{
            button.setDisabled(true); 
        }
    },

    onLoginTap: function() {
        var me      = this;
        var form    = me.lookup('form');
        var values  = form.getValues();    
        form.clearErrors();
        Ext.Viewport.setMasked({ xtype: 'loadmask' });

        RdConnect.model.mSession.login(values.username, values.password)
            .then(function(session) {
                me.fireEvent('login', session.data);
            })
            .catch(function(obj) {
            	console.log(obj);
                form.setErrors(obj.errors);
                Ext.toast(obj.message, 2000);
                //Ext.Msg.alert('Error', obj.message, Ext.emptyFn);
            })
            .then(function(session) {
                Ext.Viewport.setMasked(false);
            });       
    },

    onRegisterTap : function() {
        var me      = this;
        var w       = Ext.widget('frmRegister',{});
        w.show();
    }
});
