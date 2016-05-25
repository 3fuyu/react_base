/**
 * Created by 3fuyu on 16/03/14.
 */

"use strict";

var React = require('react');
var Header = require('./Header.js');
var DataService = require('../service/DataService.js');
var CacheService = require('../service/CacheService.js');
var BillDetailContent = require('./BillDetailContent.js');
var AddressListContent = require('./AddressListContent.js');

var config = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            addressList: CacheService.AllAddress.get()
        };
    },
    headerConfig: function () {
        return {
            title: '账单详情'
        };
    },
    onSelect: function (index) {
        CacheService.SelectAddress.set(this.state.addressList[index]);

        this.context.router.push('bill_list');
    },
    render: function () {
        var t = this,
            headerConfig = t.headerConfig(),
            lists = null;

        if (t.state.addressList && t.state.addressList.length > 0) {
            lists = t.state.addressList.map(function (value, key) {
                return (
                    <AddressListContent addressListContent={value} index={key} callback={t.onSelect} key={key}/>
                );
            });
        }

        return (
            <div>
                <Header headerConfig={headerConfig}/>
                <div className="zl-content zl-noFooter zl-hasScroll">
                    <form>
                        <ul className="zl-edit zl-border">
                            {lists}
                        </ul>
                    </form>

                    <div className="zl-pb20"></div>
                </div>
            </div>
        );
    }
});

module.exports = config;