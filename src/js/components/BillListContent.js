/**
 * Created by 3fuyu on 16/05/19.
 */

"use strict"

var React = require('react');
var _ = require('lodash');
var ZLT = require('../service/ZLToolService.js');
var BillListContentSelect = require('./BillListContentSelect.js');
var CacheService = require('../service/CacheService.js');

var config = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            billList: [],
        };
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.billListContent) {
            this.setState({
                billList: nextProps.billListContent.requests
            });
        }
    },
    onSelect: function (index) {
        var totalAmount = 0;

        this.state.billList[index].isSelect = this.state.billList[index].isSelect ? false : true;

        _.each(this.state.billList, function (value, key) {
            if (value.isSelect) {
                totalAmount = totalAmount + value.monthlyReceivableAmount;
            }
        });

        // 将总价格传给父组件
        this.props.callback(ZLT.string.round(totalAmount, 2));

        this.setState({
            billList: this.state.billList
        });
    },
    onDetail: function (index) {
        var billList = {};
        _.merge(billList, this.state.billList[index]);
        billList.customerId = this.props.billListContent.customerId;
        billList.projectId = this.props.billListContent.projectId;
        billList.resourceId = this.props.billListContent.resourceId;

        CacheService.SelectBill.set(billList);
        this.context.router.push('bill_detail');
    },
    render: function () {
        var t = this;

        if (t.state.billList) {
            var lists = t.state.billList.map(function (value, key) {
                var className = value.isSelect ? 'zl-active zl-select zl-select-1' : 'zl-select zl-select-1';

                return (
                    <BillListContentSelect className={className} isSelect={value.isSelect} index={key} key={key}
                                           callbackSelect={t.onSelect} callbackDetail={t.onDetail} list={value} />
                );
            });
        }

        return (
            <ul className="zl-edit zl-border">
                {lists}
            </ul>
        );
    }
});

module.exports = config;