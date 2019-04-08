/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";define(["ojs/ojcore","jquery","ojs/ojcomponentcore"],function(t,e){!function(){t.__registerWidget("oj.ojToolbar",e.oj.baseComponent,{widgetEventPrefix:"oj",options:{chroming:"half"},_InitOptions:function(e,n){this._super(e,n),"disabled"in n&&t.Logger.warn("Caller attempted to set the 'disabled' option on Toolbar, but Toolbar does not support the 'disabled' option.  See API doc.")},_ComponentCreate:function(){this._super(),this.element.attr(t.Components._OJ_CONTAINER_ATTR,this.widgetName).addClass("oj-toolbar oj-component").attr("role","toolbar"),this._setup()},_NotifyContextMenuGesture:function(t,e,n){var o=this.element.find(":oj-button[tabindex=0]");this._OpenContextMenu(e,n,{launcher:o,position:{of:"keyboard"===n?o.ojButton("widget"):e}})},_setOption:function(e,n){"disabled"!==e?(this._superApply(arguments),"chroming"===e&&this._refreshChildren()):t.Logger.warn("Caller attempted to set the 'disabled' option on Toolbar, but Toolbar does not support the 'disabled' option.  See API doc.  Ignoring the call.")},refresh:function(){this._super(),this._setup()},_setup:function(){var t=this;this.isRtl="rtl"===this._GetReadingDirection(),this.$enabledButtons=e(),this._IsCustomElement()?(this._focusinListener=function(e){t._handleInitialFocus()},this.element[0].addEventListener("focusin",this._focusinListener,!0),this.$topLevelChildren=this.element.find("oj-button").add(this.element.find("oj-menu-button")).add(this.element.find("oj-buttonset-one")).add(this.element.find("oj-buttonset-many")),this._refreshChildren()):(this.$buttons=this.element.find(":oj-button").unbind("keydown"+this.eventNamespace).bind("keydown"+this.eventNamespace,function(n){t._handleKeyDown(n,e(this))}).unbind("click"+this.eventNamespace).bind("click"+this.eventNamespace,function(n){e(this).ojButton("option","disabled")||t._setTabStop(e(this))}).unbind("focus"+this.eventNamespace).bind("focus"+this.eventNamespace,function(n){t._handleFocus(e(this))}),this.$buttonsets=this.element.find(":oj-buttonset").ojButtonset("refresh"),this.$topLevelButtons=this.$buttons.not(this.$buttonsets.find(":oj-button")).ojButton("refresh"))},_handleFocus:function(t){this._IsCustomElement()||0!=this.$enabledButtons.length?this._setTabStop(t):(this.$enabledButtons=this.$buttons.filter(function(t){return!e(this).ojButton("option","disabled")}),this._initTabindexes(null==this._lastTabStop),this.$enabledButtons[0].focus())},_handleInitialFocus:function(){var t=this;this.element[0].removeEventListener("focusin",this._focusinListener,!0);var n=this.element.find("oj-button").add(this.element.find("oj-menu-button")),o=this.element.find("oj-buttonset-one").add(this.element.find("oj-buttonset-many"));this.$topLevelChildren=n.add(o),this.$buttons=n.add(o.find(".oj-button")).unbind("keydown"+this.eventNamespace).bind("keydown"+this.eventNamespace,function(n){var o=e(this);t._handleKeyDown(n,o)}).unbind("click"+this.eventNamespace).bind("click"+this.eventNamespace,function(n){var o=e(this);o.hasClass("oj-disabled")||t._setTabStop(o)}).unbind("focusin"+this.eventNamespace).bind("focusin"+this.eventNamespace,function(n){var o=e(this);t._handleFocus(o)}),this.$enabledButtons=this.$buttons.filter(function(t){return!e(this).hasClass("oj-disabled")}),this._initTabindexes(null==this._lastTabStop),this._getButtonFocusElem(this.$enabledButtons[0]).focus()},_getButtonFocusElem:function(t){if(this._IsCustomElement()){var n=e(t);return n.hasClass("oj-button-toggle")?n.children("input")[0]:n.children("button")[0]}return t},_initTabindexes:function(t){var n,o=e(this._lastTabStop);if(this._lastTabStop=void 0,this._IsCustomElement())for(var s=0;s<this.$buttons.length;s++)this._getButtonFocusElem(this.$buttons[s]).setAttribute("tabindex","-1");else this.$buttons.attr("tabindex","-1");n=t||!o.is(this.$enabledButtons)?this.$enabledButtons.first():o,this._setTabStop(n)},_mapToTabbable:function(t){for(var o=[],s=0;s<this.$enabledButtons.length;s++)o.push(this._getButtonFocusElem(this.$enabledButtons[s]));var i=e(o);return t.map(function(t,e){if("radio"!=e.type||e.checked||""==e.name)return e;var o=n(e,i).filter(":checked");return o.length?o[0]:e})},_setTabStop:function(t){var n=(t=this._IsCustomElement()?this._mapToTabbable(e(this._getButtonFocusElem(t[0]))):this._mapToTabbable(t))[0],o=this._lastTabStop;n!==o&&(e(o).attr("tabindex","-1"),t.attr("tabindex","0"),this._lastTabStop=n)},_handleKeyDown:function(t,n){switch(t.which){case e.ui.keyCode.UP:case e.ui.keyCode.DOWN:if("radio"!=n.attr("type"))break;case e.ui.keyCode.LEFT:case e.ui.keyCode.RIGHT:t.preventDefault();var o=this.$enabledButtons,s=o.length;if(s<2)break;var i=(o.index(n)+(t.which==e.ui.keyCode.DOWN||t.which==e.ui.keyCode.RIGHT^this.isRtl?1:-1)+s)%s;this._getButtonFocusElem(o.eq(i)[0]).focus()}},_destroy:function(){this.element.removeClass("oj-toolbar oj-component").removeAttr(t.Components._OJ_CONTAINER_ATTR).removeAttr("role"),this.$buttons.attr("tabindex","0"),this._refreshChildren()},_refreshChildren:function(){if(this._IsCustomElement())for(var e=0;e<this.$topLevelChildren.length;e++){var n=this.$topLevelChildren[e];"OJ-BUTTON"==n.tagName||"OJ-MENU-BUTTON"==n.tagName?t.Components.__GetWidgetConstructor(this._getButtonFocusElem(n),"ojButton")&&n.refresh():"OJ-BUTTONSET-ONE"!=n.tagName&&"OJ-BUTTONSET-MANY"!=n.tagName||t.Components.__GetWidgetConstructor(n,"ojButtonset")&&n.refresh()}else this.$buttonsets.ojButtonset("refresh"),this.$topLevelButtons.ojButton("refresh")}});var n=function(t,e){var n,o=t.name;if(o){var s=":radio[name='"+(o=o.replace(/'/g,"\\'"))+"']:oj-button";n=e.filter(s)}else n=e.filter(t).filter(":oj-button");return n}}(),t.Components.setDefaultOptions({ojToolbar:{chroming:t.Components.createDynamicPropertyGetter(function(e){return(t.ThemeUtils.parseJSONFromFontFamily("oj-toolbar-option-defaults")||{}).chroming})}}),t.CustomElementBridge.registerMetadata("oj-toolbar","baseComponent",{properties:{chroming:{type:"string",enumValues:["half","full","outlined"]}},extension:{_WIDGET_NAME:"ojToolbar"}}),t.CustomElementBridge.register("oj-toolbar",{metadata:t.CustomElementBridge.getMetadata("oj-toolbar")})});