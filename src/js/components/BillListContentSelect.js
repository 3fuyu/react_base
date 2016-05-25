/**
 * Created by 3fuyu on 16/05/19.
 */

"use strict"

var React = require('react');
var ZLT = require('../service/ZLToolService.js');


var config = React.createClass({
    onSelect: function () {
        this.props.callbackSelect(this.props.index);
    },
    onDetail: function () {
        this.props.callbackDetail(this.props.index);
    },
    render: function () {
        var t = this;

        return (
            <li className="zl-edit-list zl-box zl-box-horizontal zl-box-vertical-center zl-border zl-border-bottom zl-click-state">
                <div className="zl-t00L zl-ico-hook zl-mr20" onClick={t.onSelect}>
                    <span className={this.props.className}>
                        <i className="icon-checkbold" style={{dislplay: this.props.isSelect ? 'inline': 'none'}}></i>
                    </span>
                </div>

                <div
                    className="zl-flex zl-box zl-box-horizontal zl-box-vertical-center zl-edit-list-box zl-h100"
                    onClick={t.onDetail}>
                    <div className="zl-flex">
                        <div className="zl-edit-list-label zl-box zl-box-horizontal">
                            <span className="zl-block">{ZLT.moment.timestamp2Mh(this.props.list.billDateStr)}</span>
                        </div>
                    </div>
                </div>
                <div className="zl-yq" onClick={t.onDetail}>
                    <span className="zl-block">{this.props.list.monthlyReceivableAmount}元</span>
                </div>
                <span className="zl-edit-list-icon" onClick={t.onDetail}><i className="icon-next"></i></span>
            </li>
        );
    }
});

module.exports = config;