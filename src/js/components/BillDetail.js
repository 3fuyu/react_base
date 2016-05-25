/**
 * Created by 3fuyu on 16/03/14.
 */

"use strict";

var React = require('react');
var Header = require('./Header.js');
var DataService = require('../service/DataService.js');
var ZLT = require('../service/ZLToolService.js');
var CacheService = require('../service/CacheService.js');
var BillDetailContent = require('./BillDetailContent.js');

var config = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            billFromParent: CacheService.SelectBill.get(),
            bill: {
                monthCount: 0,
                totalAmount: 0
            }
        };
    },
    componentDidMount: function () {
        var t = this;

        t.getData(t.state.billFromParent.billDateStr, function (data) {
            t.setState({
                bill: data
            });
        });
    },
    headerConfig: function () {
        return {
            title: '账单详情'
        };
    },
    onSelectDate: function (e) {
        var t = this;
        var changeDateTime;

        changeDateTime = new Date(t.refs.selectDate.value).getTime() - 28800000;

        t.getData(changeDateTime, function (data) {

            t.setState({
                bill: data
            });

            t.refs.selectDate.value = ZLT.moment.timestamp2M(changeDateTime);
        });
    },
    onAddDate: function () {
        var t = this;

        // 增加本月天数时间戳  坑货，后台只支持当月1号0点时间
        var thatDate = new Date(t.state.bill.billDateStr),
            dates,
            changeDateTime,
            now = +new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1)),
            selectDate = t.state.bill.billDateStr;

        if (now > selectDate) {
            // 取当前月天数
            dates = new Date(thatDate.getFullYear(), thatDate.getMonth() + 1, 0).getDate();

            changeDateTime = new Date(this.refs.selectDate.value).getTime() + dates * 24 * 60 * 60 * 1000 - 28800000;

            t.getData(changeDateTime, function (data) {

                t.setState({
                    bill: data
                });

                t.refs.selectDate.value = ZLT.moment.timestamp2M(changeDateTime);
            });
        }
    },
    onReduceDate: function () {
        var t = this;

        // 减少上月天数时间戳  坑货，后台只支持当月1号0点时间
        var thatDate = new Date(t.state.bill.billDateStr),
            dates,
            changeDateTime;

        // 取上月天数
        dates = new Date(thatDate.getFullYear(), thatDate.getMonth(), 0).getDate();

        changeDateTime = new Date(this.refs.selectDate.value).getTime() - dates * 24 * 60 * 60 * 1000 - 28800000;

        t.getData(changeDateTime, function (data) {
            t.setState({
                bill: data
            });

            t.refs.selectDate.value = ZLT.moment.timestamp2M(changeDateTime);
        });


    },
    getData: function (billDateStr, callback) {
        var t = this;

        DataService.getBillByDate({
                customerId: t.state.billFromParent.customerId,
                projectId: t.state.billFromParent.projectId,
                resourceId: t.state.billFromParent.resourceId,
                billDateStr: billDateStr
            })
            .then(function (data) {
                callback && callback(data);
            });
    },
    render: function () {
        var headerConfig,
            t = this,
            now = +new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1)),
            selectDate = t.state.bill.billDateStr,
            maxMonth = ZLT.moment.timestamp2M(+new Date());

        headerConfig = t.headerConfig();

        return (
            <div>
                <Header headerConfig={headerConfig}/>
                <div className="zl-content zl-noFooter zl-hasScroll">

                    <div className="zl-pb10"></div>

                    <div className="zl-edit-list zl-box zl-box-horizontal">
                        <span className="zl-t00A zl-click-state zl-block" onClick={t.onReduceDate}>
                            <i className="icon-back"></i>
                        </span>
                        <input type="month" className="zl-flex zl-edit-list-text zl-tc zl-w100 zl-pl20" ref="selectDate"
                               value={ZLT.moment.timestamp2M(t.state.bill.billDateStr)} onChange={t.onSelectDate}
                               max={maxMonth}/>
                        <span className="zl-edit-list-iwcon zl-click-state zl-block" onClick={t.onAddDate}
                              style={{opacity: now <= selectDate ? '0' : '1'}}>
                            <i className="icon-next"></i>
                        </span>
                    </div>

                    <div className="zl-pb10"></div>

                    <div className="zl-box zl-box-horizontal zl-box-vertical-center zl-pt20 zl-pb20 zl-bg007">
                        <div className="zl-tc zl-addPapers-list-box">
                            <p className="zl-t002 zl-t00B zl-pb15">总计应收（元）</p>
                            <p className="zl-t001 zl-t00B">{t.state.bill.monthlyReceivableAmount}</p>
                        </div>
                        <div className="zl-tc zl-addPapers-list-box">
                            <p className="zl-t002 zl-t00B zl-pb15">代缴金额（元）</p>
                            <p className="zl-t001 zl-t00B">{t.state.bill.monthlyDebtAmount}</p>
                        </div>
                    </div>
                    <form>
                        <BillDetailContent billDetailContent={t.state.bill.requests}/>
                    </form>

                    <div className="zl-pb40"></div>
                </div>
            </div>
        );
    }
});

module.exports = config;