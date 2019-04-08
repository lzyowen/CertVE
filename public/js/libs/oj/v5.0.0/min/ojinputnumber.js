/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";define(["ojs/ojcore","jquery","ojs/ojeditablevalue","ojs/ojvalidation-number","ojs/ojbutton"],function(t,e){t.__registerWidget("oj.ojInputNumber",e.oj.editableValue,{version:"1.0.0",defaultElement:"<input>",widgetEventPrefix:"oj",_ALLOWED_TYPES:["number","text"],options:{autocomplete:void 0,autofocus:!1,converter:t.Validation.converterFactory(t.ConverterFactory.CONVERTER_TYPE_NUMBER).createConverter(),max:null,min:null,name:"",placeholder:"",rawValue:void 0,readOnly:!1,required:!1,step:1,validators:void 0,value:null,virtualKeyboard:"auto"},getNodeBySubId:function(t){var e,n=this._superApply(arguments);return n||("oj-inputnumber-up"===(e=t.subId)&&(n=this.widget().find(".oj-inputnumber-up")[0]),"oj-inputnumber-down"===e&&(n=this.widget().find(".oj-inputnumber-down")[0]),"oj-inputnumber-input"===e&&(n=this.widget().find(".oj-inputnumber-input")[0])),n||null},getSubIdByNode:function(t){var e=null;return null!=t&&(t===this.widget().find(".oj-inputnumber-up")[0]?e={subId:"oj-inputnumber-up"}:t===this.widget().find(".oj-inputnumber-down")[0]?e={subId:"oj-inputnumber-down"}:t===this.widget().find(".oj-inputnumber-input")[0]&&(e={subId:"oj-inputnumber-input"})),e||this._superApply(arguments)},refresh:function(){this._super(),this._setup()},stepDown:function(t){this._step(t,!1)},stepUp:function(t){this._step(t,!0)},widget:function(){return this.uiInputNumber},_InitOptions:function(e,n){var i=this.options,r=this;if(this._superApply(arguments),this._IsCustomElement()||t.EditableValueUtils.initializeOptionsFromDom([{attribute:"disabled",validateOption:!0},{attribute:"placeholder"},{attribute:"value"},{attribute:"readonly",option:"readOnly",validateOption:!0},{attribute:"required",coerceDomValue:!0,validateOption:!0},{attribute:"title"},{attribute:"min"},{attribute:"max"},{attribute:"step"}],n,this,function(t){for(var e=["value","step","min","max"],n=0;n<e.length;n++){var a=e[n],s=a in t?t[a]:i[a];null!=s&&(t[a]="step"===a?r._parseStep(s):r._parse(a,s))}}),this._IsCustomElement()){var a=i.step;null!=a&&r._parseStep(a)}if(void 0===i.value)throw new Error("ojInputNumber has no value");if(this.initialValue=i.value,null!=i.min&&null!=i.max&&i.max<i.min)throw new Error("ojInputNumber's max must not be less than min")},_ComponentCreate:function(){this._super(),this._draw(),this._inputNumberDefaultValidators={},this._setup(),this._on(this._events),this._focusable(this.uiInputNumber)},_AfterSetOption:function(e,n,i){switch(this._superApply(arguments),e){case"min":case"max":this._Refresh(e,this.options[e]);break;case"readOnly":this._AfterSetOptionDisabledReadOnly(e,t.EditableValueUtils.readOnlyOptionOptions);break;case"required":this._AfterSetOptionRequired(e);break;case"validators":this._AfterSetOptionValidators(e);break;case"converter":this._AfterSetOptionConverter(e);break;case"virtualKeyboard":this._SetInputType(this._ALLOWED_TYPES)}},_CanSetValue:function(){return!!this._super()&&!this.options.readOnly},_AfterSetOptionValue:function(t,e){this._superApply(arguments);var n,i,r=e?e._context:null;r&&(n=!!r.originalEvent,i=r.doNotClearMessages||!1),n||i||(this.initialValue=this.options.value)},_IsRequired:function(){return this.options.required},_AfterSetOptionRequired:t.EditableValueUtils._AfterSetOptionRequired,_AfterSetOptionValidators:t.EditableValueUtils._AfterSetOptionValidators,_AfterSetOptionConverter:t.EditableValueUtils._AfterSetOptionConverter,_ResetConverter:t.EditableValueUtils._ResetConverter,_GetConverter:function(){return this.options.converter?this._getConverter():e.oj.ojInputNumber.prototype.options.converter},_GetNormalizedValidatorsFromOption:t.EditableValueUtils._GetNormalizedValidatorsFromOption,_AriaRequiredUnsupported:function(){return!1},_setOption:function(t,e,n){var i;i=this._IsCustomElement()||"value"!==t&&"max"!==t&&"min"!==t?"step"===t?this._parseStep(e):e:this._parse(t,e),this._super(t,i,n),"max"!==t&&"min"!==t||(this._createRangeValidator(),this._AfterSetOptionValidators()),"disabled"===t&&this.element.prop("disabled",!!e),"readOnly"===t&&(this.element.prop("readonly",!!e),this._refreshStateTheming("readOnly",this.options.readOnly),this._refreshRoleSpinbutton("readOnly",this.options.readOnly))},_destroy:function(){var e=this._super();return this.buttonSet.ojButtonset("destroy"),this.buttonSet.remove(),this.upButton=null,this.downButton=null,this.buttonSet=null,this.initialValue=null,t.DomUtils.unwrap(this.element,this.uiInputNumber),clearTimeout(this.timer),e},validate:t.EditableValueUtils.validate,_Refresh:function(t,e,n){var i;switch(this._superApply(arguments),t){case"disabled":case"max":case"min":case"value":i=this._getConvertedDisplayValue(),this._updateButtons(i);case"max":case"min":case"value":this._refreshAriaMinMaxValue(i);break;case"converter":i=this._getConvertedDisplayValue(),this._refreshAriaText(i);break;case"required":this._refreshRequired(e)}},_refreshRequired:t.EditableValueUtils._refreshRequired,_GetImplicitValidators:function(){var t=this._superApply(arguments);return null==this.options.min&&null==this.options.max||this._createRangeValidator(),e.extend(this._inputNumberDefaultValidators,t)},_GetDefaultStyleClass:function(){return"oj-inputnumber"},_events:{input:function(t){this._SetRawValue(this.element.val(),t)},keydown:function(t){var n=e.ui.keyCode;t.keyCode===n.ENTER?(this._blurEnterSetValue(t),t.preventDefault()):this._start()&&this._keydown(t)&&t.preventDefault()},keyup:function(t){this._stop(t)},blur:function(t){this._blurEnterSetValue(t)},"touchstart .oj-inputnumber-button.oj-enabled":function(t){this._start(),this._repeat(null,e(t.currentTarget).hasClass("oj-inputnumber-up")?1:-1,t)},"touchend .oj-inputnumber-button":function(t){this._stop(t)},"touchcancel .oj-inputnumber-button":function(t){this._stop(t)},"mousedown .oj-inputnumber-button.oj-enabled":function(t){this._isRealMouseEvent(t)&&(this._start(),this._repeat(null,e(t.currentTarget).hasClass("oj-inputnumber-up")?1:-1,t))},"mouseup .oj-inputnumber-button":function(t){this._isRealMouseEvent(t)&&this._stop(t)},"mouseenter .oj-inputnumber-button.oj-enabled":function(t){e(t.currentTarget).hasClass("oj-active")&&this._isRealMouseEvent(t)&&(this._start(),this._repeat(null,e(t.currentTarget).hasClass("oj-inputnumber-up")?1:-1,t))},"mouseleave .oj-inputnumber-button":function(t){this._isRealMouseEvent(t)&&this._stop(t)}},_BUNDLE_KEY:{_TOOLTIP_DECREMENT:"tooltipDecrement",_TOOLTIP_INCREMENT:"tooltipIncrement"},_OPTION_TO_CSS_MAPPING:{readOnly:"oj-read-only"},_setup:function(){var t=this.getTranslatedString(this._BUNDLE_KEY._TOOLTIP_INCREMENT),e=this.getTranslatedString(this._BUNDLE_KEY._TOOLTIP_DECREMENT),n=this._getConvertedDisplayValue();this.upButton.ojButton({label:t}),this.downButton.ojButton({label:e}),this._refreshAriaMinMaxValue(n),this._updateButtons(n),"boolean"==typeof this.options.readOnly&&this.element.prop("readonly",this.options.readOnly),this._refreshStateTheming("readOnly",this.options.readOnly),this._refreshRoleSpinbutton("readOnly",this.options.readOnly),this._refreshRequired(this.options.required)},_markInternalComponents:function(){this.upButton.attr("data-oj-internal",""),this.downButton.attr("data-oj-internal",""),this.buttonSet.attr("data-oj-internal","")},_createOjButtonset:function(){var t=this.uiInputNumber.find(".oj-inputnumber-up"),n=this.uiInputNumber.find(".oj-inputnumber-down"),i=t[0].parentNode;this.upButton=t.ojButton({display:"icons",icons:{start:"oj-component-icon oj-inputnumber-up-icon"}}),this.downButton=n.ojButton({display:"icons",icons:{start:"oj-component-icon oj-inputnumber-down-icon"}}),this.buttonSet=e(i).ojButtonset({focusManagement:"none"}),this._markInternalComponents()},_draw:function(){var n,i=this.element;this.uiInputNumber=i.addClass("oj-inputnumber-input").wrap(this._uiInputNumberHtml()).parent().append(this._buttonHtml()),this.OuterWrapper?(this.uiInputNumber=e(this.OuterWrapper).append(this.uiInputNumber),this.uiInputNumber.addClass("oj-inputnumber oj-component")):this.uiInputNumber=this.uiInputNumber.wrap("<div class='oj-inputnumber oj-component'></div>").parent(),this._IsCustomElement()&&(n=this.widget().attr("id"))&&t.EditableValueUtils.setSubIdForCustomLabelFor(this._GetContentElement()[0],n),this.saveType=i.prop("type"),this._SetInputType(this._ALLOWED_TYPES),this.uiInputNumber.find(".oj-inputnumber-button").attr("tabIndex","-1"),this._createOjButtonset()},_keydown:function(t){var n=e.ui.keyCode;switch(t.keyCode){case n.UP:return this._repeat(null,1,t),!0;case n.DOWN:return this._repeat(null,-1,t),!0}return!1},_uiInputNumberHtml:function(){return"<span class='oj-inputnumber-wrapper'></span>"},_buttonHtml:function(){return"<div class='oj-buttonset-width-auto'><button type='button' class='oj-inputnumber-button oj-inputnumber-down'></button><button type='button' class='oj-inputnumber-button oj-inputnumber-up'></button></div>"},_start:function(){return this.spinning=!0,!0},_repeat:function(t,e,n){var i=!1;e>0?this.upButton.hasClass("oj-disabled")&&(i=!0):this.downButton.hasClass("oj-disabled")&&(i=!0),t=t||500,clearTimeout(this.timer),this.timer=this._delay(function(){i||this._repeat(40,e,n)},t),this._spin(e*this.options.step,n)},_spin:function(t,e){var n=this._getConvertedDisplayValue(),i=this.options,r=i.min,a=i.max,s=i.step,u=this.initialValue,o=this._precision(r,s,u);n=this._adjustValue(n,t,r,a,s,o,u),this._CanSetValue()&&(this.element.val(n),this._refreshAriaMinMaxValue(n),this._updateButtons(n),this._SetRawValue(this.element.val(),e)),this._SetValue(n,e,{validationMode:this._VALIDATION_MODE.VALIDATORS_ONLY})},_precision:function(t,e,n){var i=this._precisionOf(e);return null!=t&&(i=Math.max(i,this._precisionOf(t))),null!=n&&(i=Math.max(i,this._precisionOf(n))),i},_precisionOf:function(t){var e=t.toString(),n=e.indexOf(".");return-1===n?0:e.length-n-1},_adjustValue:function(e,n,i,r,a,s,u){var o,l,p;if(s>0)return this._adjustValueForFractions(e,n,i,r,a,s,u);null==(l=null!=i?i:u)&&(l=0);try{e=parseFloat(e.toFixed(s))}catch(n){n instanceof TypeError&&(t.Logger.warn("inputNumber's value after conversion is not a number. \n                      The converter must convert the value to a Number. coercing using +"),e=+e)}p=e-l;var h=Math.round(p/a)*a;if(o=(h=parseFloat(h.toFixed(s)))===p?e+n:l+(p=n<0?Math.ceil(p/a)*a:Math.floor(p/a)*a)+n,o=parseFloat(o.toFixed(s)),null!=i&&o<i)return i;if(null!=r&&o>r){var d=Math.floor((r-l)/a)*a+l;return d=parseFloat(d.toFixed(s))}return o},_adjustValueForFractions:function(e,n,i,r,a,s,u){t.Assert.assert(s>0);var o=Math.pow(10,s),l=null!=i?Math.round(i*o):i,p=null!=r?Math.round(r*o):r,h=null!=a?Math.round(a*o):a;return this._adjustValue(Math.round(e*o),Math.round(n*o),l,p,h,0,Math.round(u*o))/o},_stop:function(t){this.spinning&&(clearTimeout(this.timer),this.spinning=!1)},_isRealMouseEvent:function(e){return!t.DomUtils.recentTouchEnd()},_updateButtons:function(t){var e,n,i=this.options,r=i.max,a=i.min,s=this.downButton,u=this.upButton,o=null!=r,l=null!=a;this.uiInputNumber&&(s||u)&&(e=s.hasClass("oj-disabled"),n=u.hasClass("oj-disabled"),i.disabled||void 0===t||o&&l&&r===a&&t===r?(e||s.ojButton("disable"),n||u.ojButton("disable")):o&&t>=r?(e&&s.ojButton("enable"),n||u.ojButton("disable")):l&&t<=a?(e||s.ojButton("disable"),n&&u.ojButton("enable")):(e&&s.ojButton("enable"),n&&u.ojButton("enable")))},_getConverter:t.EditableValueUtils._GetConverter,_getConvertedDisplayValue:function(){var t,e;try{e=this._GetDisplayValue()||0,t=this._parseValue(e)}catch(e){t=void 0}return t},_blurEnterSetValue:function(t){var e,n=this.element.val();this._stop(),e=this._getConvertedDisplayValue(),this._refreshAriaMinMaxValue(e),this._updateButtons(e),this._SetValue(n,t)},_createRangeValidator:function(){var e,n,i,r,a,s,u,o,l,p,h=this.options,d=h.min,_=h.max,m=null!=d?d:void 0,b=null!=_?_:void 0,c=h.translations,f=c&&c.numberRange||{},v=f.hint||{},y=f.messageDetail||{},j=f.messageSummary||{};null!==v&&(e=v.min||null,n=v.max||null,i=v.inRange||null,r=v.exact||null),null!==y&&(a=y.rangeOverflow||null,s=y.rangeUnderflow||null,u=y.exact||null),null!==j&&(o=j.rangeOverflow||null,l=j.rangeUnderflow||null),p={min:m,max:b,hint:{min:e||null,max:n||null,inRange:i||null,exact:r||null},messageDetail:{rangeOverflow:a||null,rangeUnderflow:s||null,exact:u||null},messageSummary:{rangeOverflow:o||null,rangeUnderflow:l||null},converter:this._GetConverter()},this._inputNumberDefaultValidators[t.ValidatorFactory.VALIDATOR_TYPE_NUMBERRANGE]=t.Validation.validatorFactory(t.ValidatorFactory.VALIDATOR_TYPE_NUMBERRANGE).createValidator(p)},_parse:function(t,e){var n;if(n=null!==e?+e:e,isNaN(n))throw new Error("ojInputNumber's "+t+" option is not a number");return n},_parseStep:function(t){var e;if(null===t)return 1;if((e=this._parse("step",t))<=0)throw new Error("Invalid step for ojInputNumber; step must be > 0");return(null===e||e<=0)&&(e=1),e},_refreshStateTheming:function(t,e){-1!=Object.keys(this._OPTION_TO_CSS_MAPPING).indexOf(t)&&this.widget().toggleClass(this._OPTION_TO_CSS_MAPPING[t],!!e)},_refreshRoleSpinbutton:function(t,e){(e=!!e)?this.element.removeAttr("role"):this.element.attr("role","spinbutton")},_refreshAriaMinMaxValue:function(t){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,"aria-valuenow":t}),this._refreshAriaText(t)},_refreshAriaText:function(t){var e=this.element,n=e.val();this._CompareOptionValues("value",""+t,n)||e.attr({"aria-valuetext":n})},_step:function(t,e){this._start(),e?this._spin((t||1)*this.options.step):this._spin((t||1)*-this.options.step),this._stop()},_SetInputType:t.EditableValueUtils._SetInputType,_ValidateReturnBoolean:t.EditableValueUtils._ValidateReturnBoolean}),t.CustomElementBridge.registerMetadata("oj-input-number","editableValue",{properties:{autocomplete:{type:"string",enumValues:["off","on"],extension:{_COPY_TO_INNER_ELEM:!0}},autofocus:{type:"boolean",extension:{_COPY_TO_INNER_ELEM:!0}},converter:{type:"Object"},max:{type:"number"},min:{type:"number"},name:{type:"string",extension:{_COPY_TO_INNER_ELEM:!0}},placeholder:{type:"string"},rawValue:{type:"string",writeback:!0,readOnly:!0},readonly:{type:"boolean"},required:{type:"boolean"},step:{type:"number"},translations:{type:"Object",properties:{numberRange:{type:"Object",properties:{hint:{type:"Object",properties:{exact:{type:"string"},inRange:{type:"string"},max:{type:"string"},min:{type:"string"}}},messageDetail:{type:"Object",properties:{exact:{type:"string"},rangeOverflow:{type:"string"},rangeUnderflow:{type:"string"}}},messageSummary:{type:"Object",properties:{rangeOverflow:{type:"string"},rangeUnderflow:{type:"string"}}}}},required:{type:"Object",properties:{hint:{type:"string"},messageDetail:{type:"string"},messageSummary:{type:"string"}}},tooltipDecrement:{type:"string",value:"Decrement"},tooltipIncrement:{type:"string",value:"Increment"}}},validators:{type:"Array"},value:{type:"number",writeback:!0},virtualKeyboard:{type:"string",enumValues:["auto","number","text"]}},methods:{stepDown:{},stepUp:{},validate:{}},extension:{_ALIASED_PROPS:{readonly:"readOnly"},_INNER_ELEM:"input",_WIDGET_NAME:"ojInputNumber",_GLOBAL_TRANSFER_ATTRS:["accesskey","aria-label","tabindex"]}}),t.CustomElementBridge.register("oj-input-number",{metadata:t.CustomElementBridge.getMetadata("oj-input-number")})});