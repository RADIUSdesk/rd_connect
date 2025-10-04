// SPDX-FileCopyrightText: 2025 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

Ext.define('RdConnect.model.mUserStat', {
    extend: 'Ext.data.Model',
    fields: [
            {name: 'id',           type: 'int'      },
            {name: 'time_unit',    type: 'string'   },
            {name: 'data_in',      type: 'int'      },
            {name: 'data_out',     type: 'int'      }
        ]
});
