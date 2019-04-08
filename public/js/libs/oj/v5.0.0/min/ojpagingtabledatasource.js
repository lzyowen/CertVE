/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";define(["ojs/ojcore","jquery","ojs/ojdatasource-common"],function(e,t){e.PagingModel=function(){},e.PagingModel.EventType={BEFOREPAGE:"beforePage",PAGE:"page",PAGECOUNT:"pageCount"},e.PagingTableDataSource=function(t,a){if(a=a||{},!(t instanceof e.TableDataSource)){var n=e.TableDataSource._LOGGER_MSG._ERR_DATA_INVALID_TYPE_SUMMARY,r=e.TableDataSource._LOGGER_MSG._ERR_DATA_INVALID_TYPE_DETAIL;throw new Error(n+"\n"+r)}this.dataSource=t,this._startIndex=0,this._endIndex=-1,this._dataSourceWrappedEventHandlers=[],this.Init(),Object.defineProperty(this,"sortCriteria",{configurable:!1,enumerable:!0,get:function(){return this.dataSource.sortCriteria},set:function(e){this.dataSource.sortCriteria=e}})},e.Object.createSubclass(e.PagingTableDataSource,e.TableDataSource,"oj.PagingTableDataSource"),e.PagingTableDataSource.prototype.Init=function(){e.PagingTableDataSource.superclass.Init.call(this)},e.PagingTableDataSource.prototype.getWrappedDataSource=function(){return this.dataSource},e.PagingTableDataSource.prototype.getPage=function(){return"loadMore"==this._fetchType?0:this._getPageFromStartIndex()},e.PagingTableDataSource.prototype.setPage=function(t,a){a=a||{},t=parseInt(t,10);try{e.PagingTableDataSource.superclass.handleEvent.call(this,e.PagingModel.EventType.BEFOREPAGE,{page:t,previousPage:this._getPageFromStartIndex()})}catch(e){return Promise.reject(e)}var n=this._getPageFromStartIndex();this._pageSize=null!=a.pageSize?a.pageSize:this._pageSize,a.pageSize=this._pageSize,a.startIndex=t*this._pageSize,this._startIndex=null==a.startIndex?this._startIndex:a.startIndex,this._fetchType="page";var r=this;return new Promise(function(t,i){r._pageSize>0?r.dataSource.fetch(a).then(function(a){a.startIndex=0,a.data.length>0?r._updateEndIndex(r._startIndex+a.data.length-1,!0):r._updateEndIndex(-1,!0),e.PagingTableDataSource.superclass.handleEvent.call(r,e.PagingModel.EventType.PAGE,{page:r._getPageFromStartIndex(),previousPage:n}),t(null)},function(e){r._startIndex=n*r._pageSize,i(e)}):t(null)})},e.PagingTableDataSource.prototype.getStartItemIndex=function(){return"loadMore"==this._fetchType?0:this._startIndex},e.PagingTableDataSource.prototype.getEndItemIndex=function(){return this._endIndex},e.PagingTableDataSource.prototype.getPageCount=function(){var e=this.totalSize();return-1==e?-1:Math.ceil(e/this._pageSize)},e.PagingTableDataSource.prototype.at=function(e,t){return this.dataSource.at(e,t)},e.PagingTableDataSource.prototype.fetch=function(e){if(null==(e=e||{}).startIndex)return this.setPage(this.getPage());this._fetchType="loadMore",this._startIndex=null==e.startIndex?this._startIndex:e.startIndex;var t=null==e.pageSize?this._pageSize:e.pageSize;null==this._pageSize&&(this._pageSize=t),e.pageSize=t,e.startIndex=this._startIndex;var a=this;return new Promise(function(n,r){t>0?a.dataSource.fetch(e).then(function(e){e.data.length>0?a._updateEndIndex(a._startIndex+e.data.length-1,!0):a._updateEndIndex(-1,!0),n(e)},function(e){r(e)}):n(null)})},e.PagingTableDataSource.prototype.get=function(e,t){return this.dataSource.get(e,t)},e.PagingTableDataSource.prototype.getCapability=function(e){return this.dataSource.getCapability(e)},e.PagingTableDataSource.prototype.on=function(t,a){var n=this,r=this.dataSource;if(t==e.TableDataSource.EventType.SYNC){var i=function(e){n._handleSyncEvent(e,a)};this._dataSourceWrappedEventHandlers.push({eventType:t,eventHandler:a,wrappedEventHandler:i}),r.on(t,i)}else if(t==e.TableDataSource.EventType.ADD||t==e.TableDataSource.EventType.REMOVE||t==e.TableDataSource.EventType.CHANGE){i=function(e){n._handleRowEvent(e,a)};this._dataSourceWrappedEventHandlers.push({eventType:t,eventHandler:a,wrappedEventHandler:i}),r.on(t,i)}else if(t==e.TableDataSource.EventType.REFRESH||t==e.TableDataSource.EventType.RESET){i=function(e){n._startIndex=0,a(e)};this._dataSourceWrappedEventHandlers.push({eventType:t,eventHandler:a,wrappedEventHandler:i}),r.on(t,i)}else t==e.PagingModel.EventType.PAGE||t==e.PagingModel.EventType.BEFOREPAGE||t==e.PagingModel.EventType.PAGECOUNT?e.PagingTableDataSource.superclass.on.call(this,t,a):r.on(t,a)},e.PagingTableDataSource.prototype.off=function(t,a){t!=e.PagingModel.EventType.PAGE&&t!=e.PagingModel.EventType.PAGECOUNT||e.PagingTableDataSource.superclass.off.call(this,t,a);var n=this.dataSource;if(null!=this._dataSourceWrappedEventHandlers){var r,i=this._dataSourceWrappedEventHandlers.length;for(r=0;r<i;r++)if(this._dataSourceWrappedEventHandlers[r].eventType==t&&this._dataSourceWrappedEventHandlers[r].eventHandler==a){n.off(t,this._dataSourceWrappedEventHandlers[r].wrappedEventHandler),this._dataSourceWrappedEventHandlers.splice(r,1);break}}n.off(t,a)},e.PagingTableDataSource.prototype.sort=function(e){return this.dataSource.sort(e)},e.PagingTableDataSource.prototype.totalSize=function(){return this.dataSource.totalSize()},e.PagingTableDataSource.prototype.totalSizeConfidence=function(){return this.dataSource.totalSizeConfidence()},e.PagingTableDataSource.prototype._getPageFromStartIndex=function(){return this._pageSize>0?Math.floor(this._startIndex/this._pageSize):0},e.PagingTableDataSource.prototype._handleRowEvent=function(e,t){var a,n=[];for(a=0;a<e.indexes.length;a++){var r=e.indexes[a];void 0!==r&&("page"==this._fetchType&&(r-=this._startIndex),(r<0||r>=this._startIndex+this._pageSize)&&n.push(a))}if(n.length>0)for(n.sort(function(e,t){return e-t}),a=n.length-1;a>=0;a--)e.data.splice(n[a],1),e.indexes.splice(n[a],1),e.keys.splice(n[a],1);e.indexes.length>0&&this._updateEndIndex(e.indexes[e.indexes.length-1],!1),e.startIndex=this._startIndex,t(e)},e.PagingTableDataSource.prototype._handleSyncEvent=function(t,a){if(t.startIndex!=this._startIndex&&(this._startIndex=t.startIndex),t.data.length>0?this._updateEndIndex(t.startIndex+t.data.length-1,!0):this._updateEndIndex(-1,!0),"page"==this._fetchType){var n={};e.CollectionUtils.copyInto(n,t),n.startIndex=0,a(n)}else a(t)},e.PagingTableDataSource.prototype._updateEndIndex=function(e,t){this._endIndex=t?e:e>this._endIndex?e:this._endIndex;var a=this.totalSize();a>0&&(this._endIndex=this._endIndex>a-1?a-1:this._endIndex)},e.PagingTableDataSource.EventType={ADD:"add",REMOVE:"remove",RESET:"reset",SYNC:"sync",REFRESH:"refresh",SORT:"sort",CHANGE:"change",REQUEST:"request",ERROR:"error"}});