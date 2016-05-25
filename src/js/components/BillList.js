/**
 * Created by 3fuyu on 16/03/14.
 */

"use strict";

var React = require('react');
var Header = require('./Header.js');
var StorageService = require('../service/StorageService.js');
var DataService = require('../service/DataService.js');
var CacheService = require('../service/CacheService.js');
var BillListContent = require('./BillListContent.js');
var ZLT = require('../service/ZLToolService.js');
var _ = require('lodash');

var config = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            address: CacheService.SelectAddress.get(),
            billListObj: {
                monthCount: 0,
                totalAmount: 0
            },
            totalAmount: 0
        };
    },
    componentDidMount: function () {
        var t = this;

        ZLT.loading('start');

        DataService.getBillList({
                customerId: t.state.address.customerId,
                projectId: t.state.address.projectId,
                resourceId: t.state.address.resourceId,
                payerId: t.state.address.payerId,
                billType: 'UNPAID'
            })
            .then(function (data) {
                ZLT.loading('end');

                _.each(data.requests, function (value, key) {
                    value.isSelect = true;
                });

                t.setState({
                    billListObj: data,
                    totalAmount: data.totalAmount
                });
            });
    },
    headerConfig: function () {
        var t = this;
        var now = new Date();

        return {
            title: '物业账单',
            right: {
                title: '账单详情',
                action: function () {
                    var billList = {};
                    billList.customerId = t.state.address.customerId;
                    billList.projectId = t.state.address.projectId;
                    billList.resourceId = t.state.address.resourceId;
                    billList.billDateStr = +new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);

                    CacheService.SelectBill.set(billList);
                    t.context.router.push('bill_detail');
                }
            }
        };
    },
    onSelect: function (totalAmount) {
        this.setState({
            totalAmount: totalAmount
        });
    },
    render: function () {
        var headerConfig,
            t = this;

        var footerClassName = t.state.totalAmount == '0' ? 'zl-footer-3 zl-box zl-box-horizontal zl-disabled' : 'zl-footer-3 zl-box zl-box-horizontal';

        headerConfig = t.headerConfig();

        return (
            <div>
                <Header headerConfig={headerConfig}/>
                <div className="zl-content zl-noFooter zl-hasScroll">

                    <div className="zl-pb10"></div>
                    <p className="zl-tc zl-t001">{t.state.address.resourceName}</p>
                    <div className="zl-pb10"></div>

                    <div className="zl-box zl-box-horizontal zl-box-vertical-center zl-pt20 zl-pb20 zl-bg007">
                        <div className="zl-tc zl-addPapers-list-box">
                            <p className="zl-t002 zl-t00B zl-pb15">代缴费月数（月）</p>
                            <p className="zl-t001 zl-t00B">{t.state.billListObj.monthCount}</p>
                        </div>
                        <div className="zl-tc zl-addPapers-list-box">
                            <p className="zl-t002 zl-t00B zl-pb15">代缴费金额（元）</p>
                            <p className="zl-t001 zl-t00B">{t.state.billListObj.totalAmount}</p>
                        </div>
                    </div>
                    <form>
                        <BillListContent billListContent={t.state.billListObj} callback={t.onSelect}/>
                    </form>

                    <div className="zl-pb40"></div>
                </div>

                <footer className="zl-footer zl-bg002">
                    <div className={footerClassName}>
                        <div
                            className="zl-footer-3-info zl-flex zl-box zl-box-horizontal zl-box-vertical-center zl-border zl-border-top zl-bg001">
                            <div className="zl-t002 zl-t00B zl-pl10 zl-t00S">总计：{t.state.totalAmount}</div>
                        </div>
                        <div className="zl-footer-3-btn zl-box zl-box-align-center">
                            <span className="zl-footer-btn-text">缴费</span>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
});

module.exports = config;