/**
 * Created by 3fuyu on 16/05/19.
 */

"use strict"

var React = require('react');

var config = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            bill: [],
        };
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.billDetailContent) {
            this.setState({
                bill: nextProps.billDetailContent
            });
        }
    },
    render: function () {
        var t = this;

        if (t.state.bill && t.state.bill.length > 0) {
            var lists = t.state.bill.map(function (value, key) {

                return (
                    <li key={key}
                        className="zl-edit-list zl-box zl-box-horizontal zl-box-vertical-center zl-border zl-border-bottom zl-click-state">

                        <div
                            className="zl-flex zl-box zl-box-horizontal zl-box-vertical-center zl-edit-list-box zl-h100">
                            <div className="zl-flex">
                                <div className="zl-edit-list-label zl-box zl-box-horizontal">
                                    <span className="zl-block">{value.itemName}</span>
                                </div>
                            </div>
                        </div>
                        <div className="zl-yq">
                            <span className="zl-block">{value.receivableAmount}元</span>
                        </div>
                    </li>
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