// SPDX-FileCopyrightText: 2025 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdConnect.view.mainPsk.cntMainPskTiles', {
    extend  : 'Ext.Container',
    xtype   : 'cntMainPskTiles',
    items   : [{
        xtype       : 'dataview',
        itemId      : 'dvMainPskTiles',
        scrollable  : true, //Does not work with two / 3 columns
        // flex-wrap grid styling applied to the list container
        cls         : 'psk-dataview',
        itemCls     : 'psk-tile-item',
        store       : {
            fields: ['id','name','fa','cmp'],
            data: (function(){
                return [
                    { id: 0, name: 'PSK Details',      fa: 'list',          cmp: 'cntPskDetail' },
                    { id: 1, name: 'Traffic Stats',    fa: 'traffic-light', cmp: 'cntPskTraffic' },
                    { id: 2, name: 'Data Stats',       fa: 'database',      cmp: 'cntPskData' }                  
                ];
            })()
        },
        itemTpl: [
            '<div class="psk-card">',
              '<i class="fa fa-regular fa-{fa} fa-2x" aria-hidden="true"></i>',
              '<div class="psk-title">{name}</div>',
            '</div>'
        ].join(''),
        listeners: {
            painted: function(view) {
                // Find the internal list/container element — be tolerant of class names
                const root = view.element.dom;
                const container = root.querySelector('.x-list-container') || root.querySelector('.x-dataview-items') || root.firstElementChild;
                if (container) {
                    container.style.display     = 'flex';
                    container.style.flexWrap    = 'wrap';
                    container.style.gap         = '8px';
                    container.style.padding     = '8px';
                }
            }
        }
    }]
});
