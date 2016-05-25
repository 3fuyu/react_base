/**
 * Created by 3fuyu on 16/03/14.
 */

"use strict";

var React = require('react');
var Header = require('./Header.js');
var StorageService = require('../service/StorageService.js');
var DataService = require('../service/DataService.js');
var ZLT = require('../service/ZLToolService.js');
var CacheService = require('../service/CacheService.js');
var ZLOpenApiService = require('../service/ZLOpenApiService.js');

var config = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            listData: [],
        };
    },
    headerConfig: function () {

        return {
            title: '物业缴费',
            left: function () {
                ZLOpenApiService.closeWindow();
            }
        };
    },
    onSubmit: function () {
        var t = this,
            count = 0;

        if (!t.refs.userName.value) {
            ZLT.tips('请输入姓名');
            return;
        }

        if (!t.refs.userContact.value) {
            ZLT.tips('请输入手机号');
            return;
        }

        if (!ZLT.string.isPhoneNum(t.refs.userContact.value)) {
            ZLT.tips('手机号格式错误，请重输');
            return;
        }

        t.intervalSignature = setInterval(function () {
            if (StorageService.SIGNATURE.get()) {
                clearInterval(t.intervalSignature);
                DataService.getAddressList({
                        userName: t.refs.userName.value,
                        userContact: t.refs.userContact.value,
                    }, StorageService.SIGNATURE.get())
                    .then(function (data) {
                        if (data.length === 1) {
                            CacheService.SelectAddress.set(data[0]);

                            t.context.router.push('bill_list');
                        } else if (data.length > 1) {
                            CacheService.AllAddress.set(data);

                            t.context.router.push('address_list');
                        } else {
                            ZLT.tips('查询结果为空，请修改姓名和手机号后重试');
                        }
                    });
            }

            count++;

            if (count > 60) {
                clearInterval(t.intervalSignature);
            }
        }, 60);


        if (!StorageService.SIGNATURE.get()) {
            DataService.getAddressList({
                    userName: t.refs.userName.value,
                    userContact: t.refs.userContact.value,
                })
                .then(function (data) {
                    if (data.length === 1) {
                        CacheService.SelectAddress.set(data[0]);

                        t.context.router.push('bill_list');
                    } else if (data.length > 1) {
                        CacheService.AllAddress.set(data);

                        t.context.router.push('address_list');
                    } else {
                        ZLT.tips('查询结果为空，请修改姓名和手机号后重试');
                    }
                });
        }

    },
    render: function () {
        var headerConfig,
            t = this;

        headerConfig = t.headerConfig();

        return (
            <div>
                <Header headerConfig={headerConfig}/>
                <div className="zl-content zl-noFooter zl-hasScroll">
                    <div className="zl-pb10"></div>
                    <form>
                        <ul className="zl-edit zl-border">
                            <li className="zl-edit-list zl-box zl-box-horizontal zl-border">
                                <span className="zl-edit-list-label">姓&nbsp;&nbsp;&nbsp;&nbsp;名</span>
                                <input type="text" ref="userName" placeholder="" className="zl-flex zl-edit-list-text"/>
                            </li>
                            <li className="zl-edit-list zl-box zl-box-horizontal zl-border">
                                <span className="zl-edit-list-label">手机号</span>
                                <input type="text" ref="userContact" placeholder=""
                                       className="zl-flex zl-edit-list-text"/>
                            </li>
                        </ul>
                    </form>

                    <div className="zl-pb40"></div>

                    <div className="zl-pl15 zl-pr15 zl-mb10 zl-mt15 zl-tc" onClick={this.onSubmit}>
                        <a href="javascript:void(0)" className="zl-btn zl-yj zl-btn-primary">查询账单</a>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = config;