/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";define(["ojs/ojcore","jquery","ojs/ojdatasource-common","ojs/ojmodel"],function(t,e){t.CollectionCellSet=function(e,o,l,n,i){t.Assert.assertArrayOrNull(i),this.m_startRow=e,this.m_endRow=o,this.m_startColumn=l,this.m_endColumn=n,this.m_columns=i},t.CollectionCellSet.prototype.setModels=function(e){t.Assert.assertArray(e),null!=e&&e.length===this.getCount("row")&&(this.m_models=e)},t.CollectionCellSet.prototype.getData=function(t){var e,o,l;return null==(o=this._getModel(t))?null:(e=this.m_columns[t.column],this,l={},Object.defineProperty(l,"data",{enumerable:!0,get:function(){return o.get(e)},set:function(t){o.set(e,t,{silent:!0})}}),l)},t.CollectionCellSet.prototype.getMetadata=function(e){var o,l;return null==(l=this._getModel(e))?null:(o=e.column,{keys:{row:t.CollectionDataGridUtils._getModelKey(l),column:this.m_columns[o]}})},t.CollectionCellSet.prototype._getModel=function(e){var o,l;return null==this.m_models?null:(t.Assert.assertObject(e),o=e.row,l=e.column,t.Assert.assert(o>=this.m_startRow&&o<=this.m_endRow&&l>=this.m_startColumn&&l<=this.m_endColumn),this.m_models[o-this.m_startRow])},t.CollectionCellSet.prototype.getCount=function(t){return"row"===t?Math.max(0,this.m_endRow-this.m_startRow):"column"===t?Math.max(0,this.m_endColumn-this.m_startColumn):0},t.CollectionCellSet.prototype.getExtent=function(t){return{row:{extent:1,more:{before:!1,after:!1}},column:{extent:1,more:{before:!1,after:!1}}}},t.CollectionCellSet.prototype.getStartRow=function(){return this.m_startRow},t.CollectionCellSet.prototype.getEndRow=function(){return this.m_endRow},t.CollectionCellSet.prototype.getStartColumn=function(){return this.m_startColumn},t.CollectionCellSet.prototype.getEndColumn=function(){return this.m_endColumn},t.CollectionCellSet.prototype.getColumns=function(){return this.m_columns},t.CollectionDataGridDataSource=function(e,o){this.collection=e,null!=o&&(this.rowHeader=o.rowHeader,this.columns=o.columns),this._setSortInfo(),t.CollectionDataGridDataSource.superclass.constructor.call(this)},t.Object.createSubclass(t.CollectionDataGridDataSource,t.DataGridDataSource,"oj.CollectionDataGridDataSource"),t.CollectionDataGridDataSource.prototype.Init=function(){t.CollectionDataGridDataSource.superclass.Init.call(this),this.pendingHeaderCallback={},this._registerEventListeners()},t.CollectionDataGridDataSource.prototype._registerEventListeners=function(){this.collection.on("add",this._handleModelAdded.bind(this)),this.collection.on("remove",this._handleModelDeleted.bind(this)),this.collection.on("change",this._handleModelChanged.bind(this)),this.collection.on("refresh",this._handleCollectionRefresh.bind(this)),this.collection.on("reset",this._handleCollectionReset.bind(this))},t.CollectionDataGridDataSource.prototype._isDataAvailable=function(){return null!=this.data},t.CollectionDataGridDataSource.prototype.getCount=function(t){var e;return null==this.precision&&(this.precision={}),"row"==t?-1===(e=this._totalSize())||0===e&&(!this._isDataAvailable()||this._size()>0)?(this.precision[t]="estimate",-1):(this.precision[t]="exact",this._size()):"column"==t?null!=this.columns?(this.precision[t]="exact",this.columns.length):(this.precision[t]="estimate",-1):0},t.CollectionDataGridDataSource.prototype.getCountPrecision=function(t){return null!=this.precision&&null!=this.precision[t]||this.getCount(t),this.precision[t]},t.CollectionDataGridDataSource.prototype.fetchHeaders=function(t,e,o){var l,n;null!=e&&(l=t.axis,(n={}).headerRange=t,n.callbacks=e,n.callbackObjects=o,this.pendingHeaderCallback[l]=n)},t.CollectionDataGridDataSource.prototype._handleHeaderFetchSuccess=function(e,o,l,n){var i,r,s,a,c;if(i=e.axis,r=e.start,s=e.count,"column"===i)null!=this.columns&&(a=Math.min(this.columns.length,r+s),c=new t.CollectionHeaderSet(r,a,this.columns,void 0,this._sortInfo));else if("row"===i&&null!=this.rowHeader)return null!=n&&(s=n.count),a=Math.min(this._size(),r+s),c=new t.CollectionHeaderSet(r,a,this.columns,this.rowHeader),void this._resolveModels(r,a,c,e,o,l);null!=o&&o.success&&o.success.call(l.success,c,e,null)},t.CollectionDataGridDataSource.prototype._getRanges=function(t){var e,o,l,n,i,r;for(e=0;e<t.length;e+=1)"row"===(o=t[e]).axis?(l=o.start,n=o.count):"column"===o.axis&&(i=o.start,r=o.count);return{rowStart:l,rowCount:n,colStart:i,colCount:r}},t.CollectionDataGridDataSource.prototype._handleCellFetchSuccess=function(e,o,l,n){var i,r,s,a,c,u;r=(i=this._getRanges(e)).rowStart,s=null!=n?Math.min(this._size(),r+n.count):Math.min(this._size(),r+i.rowCount),a=i.colStart,c=Math.min(null==this.columns?0:this.columns.length,a+i.colCount),u=new t.CollectionCellSet(r,s,a,c,this.columns),this._resolveModels(r,s,u,e,o,l)},t.CollectionDataGridDataSource.prototype._resolveModels=function(t,e,o,l,n,i){var r,s;for(r=[],s=t;s<e;s++)r.push(this.collection.at(s,{deferred:!0}));Promise.all(r).then(function(t){o.setModels(t),n.success.call(i.success,o,l)})},t.CollectionDataGridDataSource.prototype.fetchCells=function(t,e,o){null!=e&&(this.pendingCellCallback={},this.pendingCellCallback.cellRanges=t,this.pendingCellCallback.callbacks=e,this.pendingCellCallback.callbackObjects=o),this._fetchCells(t)},t.CollectionDataGridDataSource.prototype._processPendingHeaderCallbacks=function(t){var e,o,l,n,i;null!=(e=this.pendingHeaderCallback[t])&&(o=e.headerRange,l=e.callbacks,n=e.callbackObjects,"row"===t&&(i=e.actualRange),this._handleHeaderFetchSuccess(o,l,n,i),this.pendingHeaderCallback[t]=null)},t.CollectionDataGridDataSource.prototype._processPendingCellCallbacks=function(){var t,e,o,l;t=this.pendingCellCallback.cellRanges,e=this.pendingCellCallback.callbacks,o=this.pendingCellCallback.callbackObjects,l=this.pendingCellCallback.actualRange,this._handleCellFetchSuccess(t,e,o,l),this.pendingCellCallback=null},t.CollectionDataGridDataSource.prototype._fetchCells=function(t){var e,o,l;e=this._getRanges(t),o=e.rowStart,l=e.rowCount,this.collection.setRangeLocal(o,l).then(function(e){this.data=!0,this._setActualCallbackRanges(e.start,e.count),void 0!==this.columns?this._fetchCellsComplete(t):this.collection.at(o,{deferred:!0}).then(function(e){null!=e&&this._setupColumns(e),this._fetchCellsComplete(t)}.bind(this))}.bind(this),function(t){this._fetchCellsError(t)}.bind(this))},t.CollectionDataGridDataSource.prototype._fetchCellsError=function(e){t.Logger.error(e),null!=this.pendingHeaderCallback&&(this._processPendingHeaderErrorCallbacks("column",e),this._processPendingHeaderErrorCallbacks("row",e)),null!=this.pendingCellCallback&&this._processPendingCellErrorCallbacks(e)},t.CollectionDataGridDataSource.prototype._processPendingHeaderErrorCallbacks=function(t,e){var o,l,n,i;null!=(o=this.pendingHeaderCallback[t])&&(l=o.callbacks,n=o.callbackObjects,i=o.headerRange,l.error&&l.error.call(n.error,e,i),this.pendingHeaderCallback[t]=null)},t.CollectionDataGridDataSource.prototype._processPendingCellErrorCallbacks=function(t){var e,o,l;e=this.pendingCellCallback.callbacks,o=this.pendingCellCallback.callbackObjects,l=this.pendingCellCallback.cellRanges,e.error&&e.error.call(o.error,t,l),this.pendingCellCallback=null},t.CollectionDataGridDataSource.prototype._fetchCellsComplete=function(t){this.pendingCellCallback.cellRanges==t&&(null!=this.pendingHeaderCallback&&(this._processPendingHeaderCallbacks("column"),this._processPendingHeaderCallbacks("row")),null!=this.pendingCellCallback&&this._processPendingCellCallbacks())},t.CollectionDataGridDataSource.prototype._setActualCallbackRanges=function(t,e){var o={start:t,count:e};null!=this.pendingHeaderCallback.row&&(this.pendingHeaderCallback.row.actualRange=o),null!=this.pendingCellCallback&&(this.pendingCellCallback.actualRange=o)},t.CollectionDataGridDataSource.prototype._setupColumns=function(t){this.columns=t.keys(),-1!=this.columns.indexOf(this.rowHeader)&&this.columns.splice(this.columns.indexOf(this.rowHeader),1)},t.CollectionDataGridDataSource.prototype.keys=function(e){var o,l,n,i,r;return o=e.row,l=e.column,r=this,new Promise(function(e,s){r.collection.at(o,{deferred:!0}).then(function(o){null==o?e({row:null,column:null}):(n=t.CollectionDataGridUtils._getModelKey(o),null==r.columns&&r._setupColumns(o),i=r.columns[l],e({row:n,column:i}))}.bind(r))})},t.CollectionDataGridDataSource.prototype.indexes=function(t){var e,o,l,n;return e=t.row,o=t.column,n=this,new Promise(function(t,i){n.collection.indexOf(e,{deferred:!0}).then(function(e){-1!=e&&null==n.columns?n.collection.at(e,{deferred:!0}).then(function(i){n._setupColumns(i),l=n.columns.indexOf(o),t({row:e,column:l})}.bind(n)):(l=n.columns.indexOf(o),t({row:e,column:l}))}.bind(n))})},t.CollectionDataGridDataSource.prototype.getCapability=function(t){return"sort"===t?"column":"move"===t?"row":null},t.CollectionDataGridDataSource.prototype.sort=function(t,e,o){var l,n,i;null==o&&(o={}),null!=t?(n=t.direction,i=t.key,"column"===t.axis?(this.collection.IsVirtual()?(this.collection.comparator=i,this.collection.sortDirection="ascending"===n?1:-1):("ascending"===n&&(l=function(t,e){var o,l;return t=t.get(i),e=e.get(i),o=isNaN(t),l=isNaN(e),t instanceof Date&&(t=t.toISOString(),o=!0),e instanceof Date&&(e=e.toISOString(),l=!0),o&&l?t<e?-1:t===e?0:1:o?1:l?-1:t-e}),"descending"===n&&(l=function(t,e){var o,l;return t=t.get(i),e=e.get(i),o=isNaN(t),l=isNaN(e),t instanceof Date&&(t=t.toISOString()),e instanceof Date&&(e=e.toISOString()),o&&l?t>e?-1:t===e?0:1:o?-1:l?1:e-t}),this.collection.comparator=l),this.collection.sort(),this._setSortInfo(i),null!=e&&null!=e.success&&e.success.call(o.success)):null!=e&&null!=e.error&&e.error.call(o.error,"Axis value not supported")):this._resetSortOrder(e,o)},t.CollectionDataGridDataSource.prototype._resetSortOrder=function(t,e){this.collection.comparator=null,this.collection.reset(),null!=t&&null!=t.success&&t.success.call(e.success)},t.CollectionDataGridDataSource.prototype._setSortInfo=function(t){var e,o;e=this.collection.comparator,o=-1===this.collection.sortDirection?"descending":"ascending",null!=t||"function"!=typeof e?(this._sortInfo={},this._sortInfo.axis="column",this._sortInfo.direction=o,this._sortInfo.key=null==t?e:null):this._sortInfo={}},t.CollectionDataGridDataSource.prototype.move=function(t,e,o,l,n){var i;this.collection.get(t,{deferred:!0}).then(function(o){null==e?(this.collection.remove(o),this.collection.add(o),null!=l&&null!=l.success&&l.success.call(n.success)):(t===e?(i=this.collection.indexOf(e,{deferred:!0}),this.collection.remove(o)):(this.collection.remove(o),i=this.collection.indexOf(e,{deferred:!0})),i.then(function(t){this.collection.add(o,{at:t,force:!0}),null!=l&&null!=l.success&&l.success.call(n.success)}.bind(this)))}.bind(this))},t.CollectionDataGridDataSource.prototype.moveOK=function(t,e,o){return"valid"},t.CollectionDataGridDataSource.prototype._getModelEvent=function(t,e,o,l,n){var i={};return i.source=this,i.operation=t,i.keys={row:e,column:o},i.indexes={row:l,column:n},i},t.CollectionDataGridDataSource.prototype._handleModelAdded=function(e,o,l){var n,i;i=t.CollectionDataGridUtils._getModelKey(e),n=this._getModelEvent("insert",i,null,e.index,-1),this.handleEvent("change",n)},t.CollectionDataGridDataSource.prototype._handleModelDeleted=function(e,o,l){var n,i;i=t.CollectionDataGridUtils._getModelKey(e),n=this._getModelEvent("delete",i,null,l.index,-1),this.handleEvent("change",n)},t.CollectionDataGridDataSource.prototype._handleModelChanged=function(e,o,l){var n,i;i=t.CollectionDataGridUtils._getModelKey(e),n=this._getModelEvent("update",i,null,e.index,-1),this.handleEvent("change",n)},t.CollectionDataGridDataSource.prototype._handleCollectionRefresh=function(){var t;this.data=null,t=this._getModelEvent("refresh",null,null),this.handleEvent("change",t)},t.CollectionDataGridDataSource.prototype._handleCollectionReset=function(){var t;this.data=null,t=this._getModelEvent("reset",null,null),this.handleEvent("change",t)},t.CollectionDataGridDataSource.prototype._size=function(){return this.collection.size()},t.CollectionDataGridDataSource.prototype._totalSize=function(){return void 0===this.collection.totalResults?-1:this.collection.totalResults},t.CollectionDataGridDataSource.prototype.getCollection=function(){return this.collection},t.CollectionDataGridDataSource.prototype.getColumns=function(){return this.columns},t.CollectionDataGridDataSource.prototype.getRowHeader=function(){return this.rowHeader},t.CollectionDataGridDataSource.prototype.getData=function(){return this.data},t.CollectionDataGridUtils=function(){},t.CollectionDataGridUtils._getModelKey=function(t){var e;return null==(e=t.GetId())&&(e=t.GetCid()),e},t.CollectionHeaderSet=function(e,o,l,n,i){t.Assert.assertArrayOrNull(l),this.m_start=e,this.m_end=o,this.m_headers=l,this.m_rowHeader=n,this.m_sortInfo=i},t.CollectionHeaderSet.prototype.setModels=function(e){t.Assert.assertArray(e),null!=e&&e.length===this.getCount()&&(this.m_models=e)},t.CollectionHeaderSet.prototype.getData=function(e,o){return t.Assert.assert(e<=this.m_end&&e>=this.m_start,"index out of bounds"),t.Assert.assert(null==o||0==o,"level out of bounds"),null!=this.m_rowHeader?null==this.m_models?null:this.m_models[e-this.m_start].get(this.m_rowHeader):this.m_headers[e]},t.CollectionHeaderSet.prototype.getMetadata=function(e,o){var l,n;return t.Assert.assert(e<=this.m_end&&e>=this.m_start,"index out of bounds"),t.Assert.assert(null==o||0==o,"level out of bounds"),null!=this.m_rowHeader?null==this.m_models?null:(n=this.m_models[e-this.m_start],{key:t.CollectionDataGridUtils._getModelKey(n)}):(l=this.getData(e,o),this.m_sortInfo.key===l?{key:l,sortDirection:this.m_sortInfo.direction}:{key:l})},t.CollectionHeaderSet.prototype.getLevelCount=function(){return this.getCount()>0?1:0},t.CollectionHeaderSet.prototype.getExtent=function(e,o){return t.Assert.assert(e<=this.m_end&&e>=this.m_start,"index out of bounds"),t.Assert.assert(null==o||0==o,"level out of bounds"),{extent:1,more:{before:!1,after:!1}}},t.CollectionHeaderSet.prototype.getDepth=function(e,o){return t.Assert.assert(e<=this.m_end&&e>=this.m_start,"index out of bounds"),t.Assert.assert(null==o||0==o,"level out of bounds"),1},t.CollectionHeaderSet.prototype.getCount=function(){return Math.max(0,this.m_end-this.m_start)},t.CollectionHeaderSet.prototype.getStart=function(){return this.m_start},t.CollectionHeaderSet.prototype.getEnd=function(){return this.m_end},t.CollectionHeaderSet.prototype.getHeaders=function(){return this.m_headers},t.CollectionHeaderSet.prototype.getRowHeader=function(){return this.m_rowHeader}});