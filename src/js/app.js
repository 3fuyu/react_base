/**
 * Created by 3fuyu on 16/03/10.
 */
"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var DataService = require('./service/DataService.js');
var CacheService = require('./service/CacheService.js');
var ReactRouter = require('react-router');
var BillQuery = require('./components/BillQuery.js');
var BillList = require('./components/BillList.js');
var BillDetail = require('./components/BillDetail.js');
var AddressList = require('./components/AddressList.js');
var StorageService = require('./service/StorageService.js');
var attachFastClick = require('fastclick');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var IndexLink = ReactRouter.IndexLink;
var hashHistory = ReactRouter.hashHistory;

attachFastClick.attach(document.body);  // fastclick

var intervalSignature,
    count = 0;

intervalSignature = setInterval(function () {
    var pathname = window.location.pathname,
        hash = window.location.hash;


    if (hash.indexOf('signature') > -1 && (hash.indexOf('appKey') > -1 || hash.indexOf('appkey')) > -1 && (hash.indexOf('timeStamp') > -1 || hash.indexOf('timestamp')) > -1 && (hash.indexOf('randomNum') > -1 || hash.indexOf('randomnum') > -1)) {

        clearInterval(intervalSignature);

        // 截取签名并且去掉路由后缀
        var signature = window.location.hash.split('bill_query')[1].split('?')[0];

        // 改成合法规则存到storage
        StorageService.SIGNATURE.set(signature.replace(/&/, '?'));

        hashHistory.replace('/bill_query');
    }

    count++;

    // 轮询保护，超出3s未授权则取消轮询
    if (count > 60) {
        clearInterval(intervalSignature);
    }
}, 50);

var Main = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    componentWillMount: function () {

    },
    onLogon: function () {
        DataService.logon({
            userIdentifier: '13824464512',
            password: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92'
        });

        this.context.router.push('bill_query');
    },
    render: function () {
        return (
            <div>
                <div>this is main page</div>
                <button type="button" onClick={this.onLogon}>登陆</button>
            </div>
        )
    }
});

ReactDOM.render(
    <Router history={hashHistory}>
        <Router path="/" components={Main}></Router>
        <Router path="bill_query" components={BillQuery}></Router>
        <Router path="bill_list" components={BillList}></Router>
        <Router path="bill_detail" components={BillDetail}></Router>
        <Router path="address_list" components={AddressList}></Router>
    </Router>,
    document.getElementById('app')
);