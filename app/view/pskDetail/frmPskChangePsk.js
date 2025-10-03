// SPDX-FileCopyrightText: 2025 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdConnect.view.pskDetail.frmPskChangePsk', {
    extend  : 'Ext.form.Panel',
    xtype   : 'frmPskChangePsk',
    floated : true,
    modal   : true,
    centered: true,
    closable: true,
    fullscreen : true,
    padding : 6,
    iconCls : 'x-fa fa-key',
    title   : 'Change PSK',
    requires: [
        'RdConnect.view.pskDetail.vcPskChangePsk'
    ],
    controller  : 'vcPskChangePsk',

    // use an array so we can reference the button easily
    buttons: [
        {
            text: 'Submit',
            reference: 'btnSubmit',
            ui: 'confirm',
            handler: 'onSubmit',
            disabled: true // start disabled until PSK validates
        }
    ],

    initialize: function () {
        const me  = this;
        var items = [
            {
                xtype   : 'label',
                html    : '<i class="fas fa-info-circle"></i> Minimum of 8 characters',
                margin  : 0,
                padding : 5,
                cls     : 'form-section'
            },
            {
                xtype       : 'textfield',
                label       : 'New PSK',
                name        : 'ppsk',
                required    : true,
                errorTarget : 'under',
                validators  : function(value) {
                    if (!value || value.length === 0) {
                        return 'Required';
                    }
                    return (value.length >= 8) ? true : 'Must be at least 8 characters';
                },
		    	requiredMessage   : 'Must be at least 8 characters',
                // notify controller on each change so it can enable/disable the submit button
                listeners: {
                    change: 'onPskFieldChange'
                }
            }
        ];
        me.setItems(items);
        me.callParent();
    }
});

