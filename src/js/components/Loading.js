/**
 * Created by 3fuyu on 16/03/29.
 */

"use strict"

var React = require('react');

var config = React.createClass({
    render: function () {
        return (
            <div id="loadingToast" style="display: none;">
                <div class="zl-toast">
                    <div class="zl-loading">
                        <div class="zl-loading-leaf zl-loading-leaf-0"></div>
                        <div class="zl-loading-leaf zl-loading-leaf-1"></div>
                        <div class="zl-loading-leaf zl-loading-leaf-2"></div>
                        <div class="zl-loading-leaf zl-loading-leaf-3"></div>
                        <div class="zl-loading-leaf zl-loading-leaf-4"></div>
                        <div class="zl-loading-leaf zl-loading-leaf-5"></div>
                        <div class="zl-loading-leaf zl-loading-leaf-6"></div>
                        <div class="zl-loading-leaf zl-loading-leaf-7"></div>
                        <div class="zl-loading-leaf zl-loading-leaf-8"></div>
                        <div class="zl-loading-leaf zl-loading-leaf-9"></div>
                        <div class="zl-loading-leaf zl-loading-leaf-10"></div>
                        <div class="zl-loading-leaf zl-loading-leaf-11"></div>
                    </div>
                    <p class="zl-loading-content">数据加载中</p>
                </div>
            </div>
        );
    }
});

module.exports = config;