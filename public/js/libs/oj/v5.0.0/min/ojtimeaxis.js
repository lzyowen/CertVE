/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";define(["ojs/ojcore","jquery","ojs/ojcomponentcore","ojs/ojdvt-base","ojs/internal-deps/dvt/DvtTimeAxis","ojs/ojvalidation-datetime"],function(e,t,r,o,a){e.__registerWidget("oj.ojTimeAxis",t.oj.dvtBaseComponent,{widgetEventPrefix:"oj",options:{converter:{default:null,seconds:e.Validation.converterFactory(e.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter({hour:"numeric",minute:"2-digit",second:"2-digit"}),minutes:e.Validation.converterFactory(e.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter({hour:"numeric",minute:"2-digit"}),hours:e.Validation.converterFactory(e.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter({hour:"numeric"}),days:e.Validation.converterFactory(e.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter({month:"numeric",day:"2-digit"}),weeks:e.Validation.converterFactory(e.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter({month:"numeric",day:"2-digit"}),months:e.Validation.converterFactory(e.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter({month:"long"}),quarters:e.Validation.converterFactory(e.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter({month:"long"}),years:e.Validation.converterFactory(e.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter({year:"numeric"})},start:"",end:"",scale:null},_CreateDvtComponent:function(e,t,r){return a.TimeAxis.newInstance(e,t,r)},_GetComponentStyleClasses:function(){var e=this._super();return e.push("oj-timeaxis"),e},_GetChildStyleClasses:function(){var e=this._super();return e["oj-timeaxis-label"]={path:"labelStyle",property:"TEXT"},e},_GetEventTypes:function(){return["optionChange"]},_GetTranslationMap:function(){var e=this.options.translations,t=this._super();return t["DvtUtilBundle.TIMEAXIS"]=e.componentName,t},_GetComponentRendererOptions:function(){return[]},_ProcessOptions:function(){this._super();var e=this,t=function(t){var r=typeof e.options[t];"number"!==r&&"string"!==r&&(e.options[t]=null)};t("start"),t("end")},_LoadResources:function(){null==this.options._resources&&(this.options._resources={});var t=this.options._resources,r=e.Validation.converterFactory(e.ConverterFactory.CONVERTER_TYPE_DATETIME),o=r.createConverter({hour:"numeric",minute:"2-digit",second:"2-digit"}),a=r.createConverter({hour:"numeric",minute:"2-digit"}),n=r.createConverter({hour:"numeric"}),i=r.createConverter({month:"numeric",day:"2-digit"}),s=r.createConverter({month:"long"}),l=r.createConverter({year:"numeric"}),c=r.createConverter({month:"short"}),u={seconds:o,minutes:a,hours:n,days:i,weeks:i,months:s,quarters:s,years:l},d={seconds:o,minutes:a,hours:n,days:i,weeks:i,months:c,quarters:c,years:r.createConverter({year:"2-digit"})};t.converterFactory=r,t.converter=u,t.converterVert=d,t.axisClass="oj-timeaxis-container",t.axisLabelClass="oj-timeaxis-label",t.axisSeparatorClass="oj-timeaxis-separator",t.borderTopVisible=!1,t.borderRightVisible=!1,t.borderBottomVisible=!1,t.borderLeftVisible=!1,t.firstDayOfWeek=e.LocaleData.getFirstDayOfWeek()}}),e.CustomElementBridge.registerMetadata("oj-time-axis","dvtBaseComponent",{properties:{converter:{type:"object",properties:{days:{},default:{},hours:{},minutes:{},months:{},quarters:{},seconds:{},weeks:{},years:{}}},end:{type:"string"},scale:{type:"string",enumValues:["seconds","minutes","hours","days","weeks","months","quarters","years"]},start:{type:"string"},translations:{type:"Object",properties:{componentName:{type:"string",value:"Time Axis"},labelAndValue:{type:"string",value:"{0}: {1}"},labelClearSelection:{type:"string",value:"Clear Selection"},labelCountWithTotal:{type:"string",value:"{0} of {1}"},labelDataVisualization:{type:"string",value:"Data Visualization"},labelInvalidData:{type:"string",value:"Invalid data"},labelNoData:{type:"string",value:"No data to display"},stateCollapsed:{type:"string",value:"Collapsed"},stateDrillable:{type:"string",value:"Drillable"},stateExpanded:{type:"string",value:"Expanded"},stateHidden:{type:"string",value:"Hidden"},stateIsolated:{type:"string",value:"Isolated"},stateMaximized:{type:"string",value:"Maximized"},stateMinimized:{type:"string",value:"Minimized"},stateSelected:{type:"string",value:"Selected"},stateUnselected:{type:"string",value:"Unselected"},stateVisible:{type:"string",value:"Visible"}}}},methods:{},extension:{_WIDGET_NAME:"ojTimeAxis"}}),e.CustomElementBridge.register("oj-time-axis",{metadata:e.CustomElementBridge.getMetadata("oj-time-axis")})});