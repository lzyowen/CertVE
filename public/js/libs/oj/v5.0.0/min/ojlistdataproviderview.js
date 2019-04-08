/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";define(["ojs/ojcore","jquery","ojs/ojcomponentcore","ojs/ojeventtarget","ojs/ojdataprovider"],function(t,e){var i=function(){function e(t,e){this.dataProvider=t,this.options=e,this._KEY="key",this._KEYS="keys",this._DATA="data",this._STARTINDEX="startIndex",this._SORT="sort",this._SORTCRITERIA="sortCriteria",this._FILTERCRITERION="filterCriterion",this._METADATA="metadata",this._FROM="from",this._OFFSET="offset",this._REFRESH="refresh",this._MUTATE="mutate",this._SIZE="size",this._FETCHPARAMETERS="fetchParameters",this._VALUE="value",this._DONE="done",this._DATAMAPPING="dataMapping",this._MAPFIELDS="mapFields",this._MAPSORTCRITERIA="mapSortCriteria",this._MAPFILTERCRITERION="mapFilterCriterion",this._UNMAPSORTCRITERIA="mapSortCriteria",this._RESULTS="results",this._CONTAINSPARAMETERS="containsParameters",this._DEFAULT_SIZE=25,this._CONTAINSKEYS="containsKeys",this._FETCHBYKEYS="fetchByKeys",this._FETCHBYOFFSET="fetchByOffset",this._FETCHFIRST="fetchFirst",this._ADDEVENTLISTENER="addEventListener",this.AsyncIterable=function(){return function(t,e){this._parent=t,this._asyncIterator=e,this[Symbol.asyncIterator]=function(){return this._asyncIterator}}}(),this.AsyncIterator=function(){function t(t,e,i){this._parent=t,this._nextFunc=e,this._params=i}return t.prototype.next=function(){var t=this._nextFunc(this._params);return Promise.resolve(t)},t}(),this.AsyncIteratorResult=function(){return function(t,e,i){this._parent=t,this.value=e,this.done=i,this[t._VALUE]=e,this[t._DONE]=i}}(),this.FetchListResult=function(){return function(t,e,i,n){this._parent=t,this.fetchParameters=e,this.data=i,this.metadata=n,this[t._FETCHPARAMETERS]=e,this[t._DATA]=i,this[t._METADATA]=n}}(),this.Item=function(){return function(t,e,i){this._parent=t,this.metadata=e,this.data=i,this[t._METADATA]=e,this[t._DATA]=i}}(),this.ItemMetadata=function(){return function(t,e){this._parent=t,this.key=e,this[t._KEY]=e}}(),this.FetchListParameters=function(){return function(t,e,i,n){this._parent=t,this.size=e,this.sortCriteria=i,this.filterCriterion=n,this[t._SIZE]=e,this[t._SORTCRITERIA]=i,this[t._FILTERCRITERION]=n}}(),this.FetchByOffsetParameters=function(){return function(t,e,i,n,s){this._parent=t,this.offset=e,this.size=i,this.sortCriteria=n,this.filterCriterion=s,this[t._SIZE]=i,this[t._SORTCRITERIA]=n,this[t._OFFSET]=e,this[t._FILTERCRITERION]=s}}(),this.FetchByKeysResults=function(){return function(t,e,i){this._parent=t,this.fetchParameters=e,this.results=i,this[t._FETCHPARAMETERS]=e,this[t._RESULTS]=i}}(),this.ContainsKeysResults=function(){return function(t,e,i){this._parent=t,this.containsParameters=e,this.results=i,this[t._CONTAINSPARAMETERS]=e,this[t._RESULTS]=i}}(),this[this._FROM]=null==this.options?null:this.options[this._FROM],this[this._OFFSET]=null==this.options?0:this.options[this._OFFSET]>0?this.options[this._OFFSET]:0,this[this._SORTCRITERIA]=null==this.options?null:this.options[this._SORTCRITERIA],this[this._DATAMAPPING]=null==this.options?null:this.options[this._DATAMAPPING],this._addEventListeners(t)}return e.prototype.containsKeys=function(t){var e=this;return this.dataProvider[e._CONTAINSKEYS]?this.dataProvider[e._CONTAINSKEYS](t):this.fetchByKeys(t).then(function(i){var n=new Set;return t[e._KEYS].forEach(function(t){null!=i[e._RESULTS].get(t)&&n.add(t)}),Promise.resolve(new e.ContainsKeysResults(e,t,n))})},e.prototype.fetchByKeys=function(t){var e=this;if(this.dataProvider[e._FETCHBYKEYS])return this.dataProvider[e._FETCHBYKEYS](t).then(function(i){var n=i[e._RESULTS],s=new Map;return n.forEach(function(t,i){var n=e._getMappedItems([t]);s.set(i,n[0])}),new e.FetchByKeysResults(e,t,s)});var i={};i[this._SIZE]=this._DEFAULT_SIZE;var n=new Map,s=this.dataProvider[e._FETCHFIRST](i)[Symbol.asyncIterator]();return this._fetchNextSet(t,s,n).then(function(i){var n=new Map;return i.forEach(function(t,i){var s=e._getMappedItems([t]);n.set(i,s[0])}),new e.FetchByKeysResults(e,t,n)})},e.prototype.fetchFirst=function(e){var i={};i[this._DATA]=[],i[this._KEYS]=[],i[this._DONE]=!1,i[this._STARTINDEX]=0;var n=null!=e?e[this._SIZE]:null,s=null!=e?e[this._SORTCRITERIA]:null;null==s&&(s=this[this._SORTCRITERIA]);var r=this._getMappedSortCriteria(s),h=null!=e?e[this._FILTERCRITERION]:null,a=this._getMappedFilterCriterion(h),_=this;if(null==_[this._FROM]&&_[this._OFFSET]>0&&t.DataProviderFeatureChecker.isFetchByOffset(_.dataProvider)){var o=_[this._OFFSET];return new this.AsyncIterable(this,new this.AsyncIterator(this,function(t){return function(){var e=new _.FetchByOffsetParameters(_,o,n,r,a);return _.dataProvider[_._FETCHBYOFFSET](e).then(function(e){var i=e.results,s=i.map(function(t){return t[_._DATA]}),r=(i.map(function(t){return t[_._METADATA]}),i.map(function(t){return t[_._METADATA][_._KEY]}));o+=r.length;var h=_._getMappedDataAndKeys(r,s);_._cacheResult(t,h[_._DATA],h[_._KEYS]),t[_._DONE]=e[_._DONE];var a=e[_._FETCHPARAMETERS],u=null!=a?a[_._SORTCRITERIA]:null,A=_._getUnmappedSortCriteria(u),E=new _.FetchByOffsetParameters(_,_[_._OFFSET],n,A);return Promise.resolve(new _.AsyncIteratorResult(_,new _.FetchListResult(_,E,h[_._DATA],h[_._METADATA]),t[_._DONE]))})}}(i),e))}var u=new this.FetchListParameters(this,n,r,a),A=this.dataProvider[_._FETCHFIRST](u)[Symbol.asyncIterator]();return new this.AsyncIterable(this,new this.AsyncIterator(this,function(t,i){return function(){return i.next().then(function(n){var s=n[_._VALUE][_._DATA],r=n[_._VALUE][_._METADATA],h=r.map(function(t){return t[_._KEY]}),a=(s.map(function(t,e){return new _.Item(_,r[e],s[e])}),_._getMappedDataAndKeys(h,s));_._cacheResult(t,a[_._DATA],a[_._KEYS]),t[_._DONE]=n[_._DONE];var o=null!=e?e[_._SIZE]:null,u=(null!=e&&e[_._OFFSET],n[_._VALUE][_._FETCHPARAMETERS]),A=null!=u?u[_._SORTCRITERIA]:null,E=_._getUnmappedSortCriteria(A),T=new _.FetchListParameters(_,o,E);return _._fetchUntilKey(T,_[_._FROM],t,i).then(function(){return _._fetchUntilOffset(T,_[_._OFFSET]+t[_._STARTINDEX],s.length,t,i)})})}}(i,A),e))},e.prototype.getCapability=function(t){return this.dataProvider.getCapability(t)},e.prototype.getTotalSize=function(){return this.dataProvider.getTotalSize()},e.prototype.isEmpty=function(){return this.dataProvider.isEmpty()},e.prototype._fetchNextSet=function(e,i,n){var s=this;return i.next().then(function(r){var h=r[s._VALUE],a=h[s._DATA],_=h[s._METADATA],o=_.map(function(t){return t[s._KEY]}),u=!0;return e[s._KEYS].forEach(function(e){n.has(e)||o.map(function(i,r){t.Object.compareValues(i,e)&&n.set(e,new s.Item(s,_[r],a[r]))}),n.has(e)||(u=!1)}),u||r[s._DONE]?n:s._fetchNextSet(e,i,n)})},e.prototype._fetchUntilKey=function(t,e,i,n){var s=this;if(null!=e){var r=i[this._KEYS].filter(function(t){if(e==t)return!0});if(r.length>0){var h=i[this._KEYS].indexOf(r[0]);i[this._KEYS]=i[this._KEYS].slice(h,i[this._KEYS].length),i[this._DATA]=i[this._DATA].slice(h,i[this._DATA].length)}else{if(!i[s._DONE])return n.next().then(function(t){var e=t[s._VALUE][s._DATA],r=t[s._VALUE][s._METADATA].map(function(t){return t[s._KEY]}),h=s._getMappedDataAndKeys(r,e);return s._cacheResult(i,h[s._DATA],h[s._KEYS]),i[s._DONE]=t[s._DONE],s._fetchUntilKey(t[s._FETCHPARAMETERS],h[s._KEYS],i,n)});i[this._DATA]=[],i[this._KEYS]=[]}}return Promise.resolve(null)},e.prototype._fetchUntilOffset=function(t,e,i,n,s){var r=this,h=null!=t&&t[this._SIZE]>0?t[this._SIZE]:i;e=e>0?e:0;var a=n[this._KEYS].slice(e,e+h),_=n[this._DATA].slice(e,e+h),o=a.map(function(t){return new r.ItemMetadata(r,t)});return _.length<h?n[r._DONE]?(n[this._STARTINDEX]=n[this._STARTINDEX]+_.length,Promise.resolve(new r.AsyncIteratorResult(r,new r.FetchListResult(r,t,_,o),!0))):s.next().then(function(t){var i=t[r._VALUE][r._DATA],h=t[r._VALUE][r._METADATA].map(function(t){return t[r._KEY]}),a=r._getMappedDataAndKeys(h,i);return r._cacheResult(n,a[r._DATA],a[r._KEYS]),n[r._DONE]=t[r._DONE],r._fetchUntilOffset(t[r._VALUE][r._FETCHPARAMETERS],e,i.length,n,s)}):(n[this._STARTINDEX]=n[this._STARTINDEX]+_.length,Promise.resolve(new r.AsyncIteratorResult(r,new r.FetchListResult(r,t,_,o),n[r._DONE])))},e.prototype._cacheResult=function(t,e,i){var n=this;e.map(function(e){t[n._DATA].push(e)}),i.map(function(e){t[n._KEYS].push(e)})},e.prototype._getMappedItems=function(t){var e=this;if(null!=this[this._DATAMAPPING]){var i=this[this._DATAMAPPING][this._MAPFIELDS];if(null!=i&&null!=t&&t.length>0){new Array;return t.map(function(t){return i.bind(e)(t)})}}return t},e.prototype._getMappedDataAndKeys=function(t,e){var i=this,n=e.map(function(n,s){return new i.Item(i,new i.ItemMetadata(i,t[s]),e[s])}),s=this._getMappedItems(n),r=s.map(function(t){return t[i._DATA]}),h=s.map(function(t){return t[i._METADATA][i._KEY]}),a=s.map(function(t){return t[i._METADATA]}),_={};return _[this._DATA]=r,_[this._KEYS]=h,_[this._METADATA]=a,_},e.prototype._getMappedFilterCriterion=function(t){if(null!=this[this._DATAMAPPING]){var e=this[this._DATAMAPPING][this._MAPFILTERCRITERION];if(null!=e&&null!=t)return e(t)}return t},e.prototype._getMappedSortCriteria=function(t){if(null!=this[this._DATAMAPPING]){var e=this[this._DATAMAPPING][this._MAPSORTCRITERIA];if(null!=e&&null!=t&&t.length>0)return e(t)}return t},e.prototype._getUnmappedSortCriteria=function(t){if(null!=this[this._DATAMAPPING]){var e=this[this._DATAMAPPING][this._UNMAPSORTCRITERIA];if(null!=e&&null!=t&&t.length>0)return e(t)}return t},e.prototype._addEventListeners=function(t){var e=this;t[e._ADDEVENTLISTENER](this._REFRESH,function(t){e.dispatchEvent(t)}),t[e._ADDEVENTLISTENER](this._MUTATE,function(t){e.dispatchEvent(t)})},e}();t.ListDataProviderView=i,t.ListDataProviderView=i,t.EventTargetMixin.applyMixin(i),t.FetchByOffsetMixin.applyMixin(i)});