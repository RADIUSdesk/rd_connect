// SPDX-FileCopyrightText: 2025 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdConnect.view.mainPsk.vcMainPsk', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcMainPsk',
     control: {
    	'#dvMainPskTiles' : {
    		itemtap	    : 'onTileTap'
    	}
    },
    onTileTap: function(view, index, target, record, e) {   
        const me    = this;   
        const cmp   = record.get('cmp');
        const fa    = record.get('fa');
        const name  = record.get('name');      
		var cnt     = me.getView().down(cmp);
		if(!cnt){
			var cn = Ext.create({
				xtype	: cmp
			});
			cnt = me.getView().add(cn);
		}
		me.getView().setActiveItem(cnt);
		me.getView().up('pnlMain').down('#lblMain').setHtml('<i class="fa fa-'+ fa +' fa-1x"></i> '+ name);
    }
});
