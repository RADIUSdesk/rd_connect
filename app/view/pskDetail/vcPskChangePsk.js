// SPDX-FileCopyrightText: 2025 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later
/*
Ext.define('RdConnect.view.pskDetail.vcPskChangePsk', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcPskChangePsk',
    config : {
        urlAdd  : '/cake4/rd_cake/ap-profiles/add.json'
    },
    onSubmit : function(btn){   
    	var me 		= this;
    	console.log("Lekker");
    	if(btn.up('formpanel').validate()){    	
    		btn.up('formpanel').submit({
                clientValidation    : true,
                url                 : me.getUrlAdd(),
                waitMsg				: 'Add AP Profile',
                success: function(form, result) {
            	    form.close();
            	    store.reload();        
                },
                failure: function(form,result ) {
                	form.setErrors(result.errors);          
                }
            });    	
    	}else{
    		console.log("Form does not validate");
    	}
    }
});
*/

Ext.define('RdConnect.view.pskDetail.vcPskChangePsk', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcPskChangePsk',
    config : {
        urlAdd  : '/cake4/rd_cake/connect-psk/change-ppsk.json'
    },

    // Called from the field 'change' listener
    // field: Ext.field.Text, newValue: string
    onPskFieldChange: function(field, newValue) {
        const form = this.getView(); // formpanel
        const submitBtn = form.lookupReference('btnSubmit');

        // Validate the single field using its validator or fallback length test.
        // field.validate() returns boolean if validation method exists
        let isValid = false;
        if (typeof field.validate === 'function') {
            // validate() usually sets UI error and returns boolean
            isValid = field.validate();
        } else {
            isValid = !!newValue && newValue.length >= 8;
        }

        // enable/disable the submit button
        if (submitBtn) {
            submitBtn.setDisabled(!isValid);
        }
    },

    onSubmit : function(btn){
        const me = this;
        const form = btn.up('formpanel');

        // form.validate() runs the fields' validators and returns boolean
        if (!form.validate()) {
            Ext.toast('Fix form errors before submitting');
            return;
        }

        // If you need the raw value:
        const values = form.getValues();
        // optional: console.log(values.psk);

        form.submit({
            clientValidation: true,
            url: me.getUrlAdd(),
            waitMsg: 'Saving new PSK...',
            success: function(fp, result) {
                // close the floated form
                me.getView().calling_controller.reload();
                fp.close();
                Ext.toast('PSK changed');
            },
            failure: function(fp, result) {
                // set field-level errors if server returned them
                if (result && result.errors) {
                    fp.setErrors(result.errors);
                } else {
                    Ext.Msg.alert('Error', 'Failed to change PSK');
                }
            }
        });
    }
});

