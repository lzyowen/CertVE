/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";define(["ojs/ojcore","jquery","knockout","ojs/ojkoshared","customElements"],function(e,t,n){e.__KO_CUSTOM_BINDING_PROVIDER_INSTANCE.addPostprocessor({nodeHasBindings:function(e,t){return t||1===e.nodeType&&"oj-defer"===e.nodeName.toLowerCase()},getBindingAccessors:function(e,t,n){return 1===e.nodeType&&"oj-defer"===e.nodeName.toLowerCase()&&((n=n||{})._ojDefer_=function(){}),n}}),n.bindingHandlers._ojDefer_={init:function(e,t,o,i,s){if(e._shown)n.applyBindingsToDescendants(s,e);else{if(!e._savedChildNodes){for(var d=document.createDocumentFragment(),r=e.childNodes;r.length>0;)d.appendChild(r[0]);e._savedChildNodes=d}Object.defineProperty(e,"_activateDescedantBindings",{value:function(){n.applyBindingsToDescendants(s,e),delete e._activateDescedantBindings},configurable:!0})}return{controlsDescendantBindings:!0}}},e.DeferElement={},e.DeferElement.register=function(){var e=Object.create(HTMLElement.prototype);Object.defineProperty(e,"_activate",{value:function(){this._activateDescedantBindings?(this._savedChildNodes&&(this.appendChild(this._savedChildNodes),delete this._savedChildNodes),this._activateDescedantBindings()):Object.defineProperty(this,"_shown",{configurable:!1,value:!0})},writable:!1});var t=function(){var e=window.Reflect;return void 0!==e?e.construct(HTMLElement,[],this.constructor):HTMLElement.call(this)};Object.defineProperty(e,"constructor",{value:t,writable:!0,configurable:!0}),t.prototype=e,Object.setPrototypeOf(t,HTMLElement),customElements.define("oj-defer",t)},e.DeferElement.register()});