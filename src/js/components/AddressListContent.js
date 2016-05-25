/**
 * Created by 3fuyu on 16/05/19.
 */

"use strict"

var React = require('react');

var config = React.createClass({
    onSelect: function () {
        this.props.callback(this.props.index);
    },
    render: function () {
        return (
            <li onClick={this.onSelect}
                className="zl-edit-list zl-box zl-box-horizontal zl-box-vertical-center zl-border zl-border-bottom zl-click-state">
                <div
                    className="zl-flex zl-box zl-box-horizontal zl-box-vertical-center zl-edit-list-box zl-h100">
                    <div className="zl-flex">
                        <div className="zl-edit-list-label zl-box zl-box-horizontal">
                            <span className="zl-block">{this.props.addressListContent.resourceName}</span>
                        </div>
                    </div>
                </div>
                <span className="zl-edit-list-icon"><i className="icon-next"></i></span>
            </li>
        );
    }
});

module.exports = config;