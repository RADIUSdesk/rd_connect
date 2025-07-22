// SPDX-FileCopyrightText: 2025 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdConnect.view.register.vcRegister', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcRegister',
    config: {
        urlAdd  : '/cake4/rd_cake/register-users/new-permanent-user.json'
    },
    onSubmit : function(btn){   
    	var me = this;
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlAdd(),
                waitMsg				: 'Register Please Wait',
                success: function(form, result) {
            	    form.close();       
                },
                failure: function (form, result) {
                    // Generic fallback message
                    let message = 'Submission failed. Please try again.';
                    console.log(result);
                    me.getView().setErrors(result.errors);
                    //Ext.Msg.alert('Error', message, Ext.emptyFn);
                    Ext.toast(message, 2000);
                }
            });    	
    	}
    }
});
