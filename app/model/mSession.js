// SPDX-FileCopyrightText: 2025 Dirk van der Walt <dirkvanderwalt@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

//https://www.freecodecamp.org/news/javascript-es6-promises-for-beginners-resolve-reject-and-chaining-explained/
Ext.define('RdConnect.model.mSession', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'token', type: 'string' },
        { name: 'expires', type: 'date' }
    ],
    statics: {
        login: function(username, password,login_page_id) {
            var url             = '/cake4/rd_cake/connect/authenticate.json';
            var login_page_id   = window.AppConfig.loginPageId;
             return new Ext.Promise(function (resolve, reject) {
                 Ext.Ajax.request({
                     url        : url,
                     method     : 'POST',
                     jsonData   : {username:username,password:password,login_page_id: login_page_id},
                     success: function (response) {
                         // Use the provided "resolve" method to deliver the result.
                        var obj = Ext.decode(response.responseText);
                        if(obj.success){
                            resolve(obj);
                        }else{

                            reject(obj);
                        }  
                     },
                     failure: function (response) {
                         reject(response.status);
                     }
                 });
             });
        }
    },

    isValid: function() {
       /* return !Ext.isEmpty(this.get('token'))
            && this.get('expires') > new Date()
            && this.getUser() !== null;*/
    },

    logout: function() {
        return new Ext.Promise(function (resolve, reject) {
            //Server.auth.logout({}, resolve);
        });
    }
});
