/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";define(["ojs/ojcore"],function(e){!function(){var o=/^\s+/,l=/\s+$/,r=Math.round,t=Math.min,n=Math.max;function C(e,o){(function(e){return"string"==typeof e&&-1!=e.indexOf(".")&&1===parseFloat(e)})(e)&&(e="100%");var l=function(e){return"string"==typeof e&&-1!=e.indexOf("%")}(e);return e=t(o,n(0,parseFloat(e))),l&&(e=parseInt(e*o,10)/100),Math.abs(e-o)<1e-6?1:e%o/parseFloat(o)}function a(e){return parseInt(e,16)}function b(e){return e<=1&&(e=100*e+"%"),e}e.Color=function(e){var r;r=function(e){var r={r:0,g:0,b:0},E=1,f=null,i=null,O=null,R=!1;"string"==typeof e&&(e=function(e){if("transparent"==(e=e.replace(o,"").replace(l,"").toLowerCase()))return{r:0,g:0,b:0,a:0};var r;if(r=u.rgb.exec(e))return{r:r[1],g:r[2],b:r[3]};if(r=u.rgba.exec(e))return{r:r[1],g:r[2],b:r[3],a:r[4]};if(r=u.hsl.exec(e))return{h:r[1],s:r[2],l:r[3]};if(r=u.hsla.exec(e))return{h:r[1],s:r[2],l:r[3],a:r[4]};if(r=u.hsv.exec(e))return{h:r[1],s:r[2],v:r[3]};if(r=u.hsva.exec(e))return{h:r[1],s:r[2],v:r[3],a:r[4]};if(r=u.hex6.exec(e))return{r:a(r[1]),g:a(r[2]),b:a(r[3])};if(r=u.hex3.exec(e))return{r:a(r[1]+""+r[1]),g:a(r[2]+""+r[2]),b:a(r[3]+""+r[3])};return!1}(e));"object"==typeof e&&(w(e.r)&&w(e.g)&&w(e.b)?(c=e.r,A=e.g,L=e.b,r={r:255*C(c,255),g:255*C(A,255),b:255*C(L,255)},R=!0):w(e.h)&&w(e.s)&&w(e.v)?(f=b(e.s),i=b(e.v),r=function(e,o,l){e=6*C(e,360),o=C(o,100),l=C(l,100);var r=Math.floor(e),t=e-r,n=l*(1-o),a=l*(1-t*o),b=l*(1-(1-t)*o),E=r%6;return{r:255*[l,a,n,n,b,l][E],g:255*[b,l,l,a,n,n][E],b:255*[n,n,b,l,l,a][E]}}(e.h,f,i),R=!0):w(e.h)&&w(e.s)&&w(e.l)&&(f=b(e.s),O=b(e.l),r=function(e,o,l){var r,t,n;function a(e,o,l){return l<0&&(l+=1),l>1&&(l-=1),l<1/6?e+6*(o-e)*l:l<.5?o:l<2/3?e+(o-e)*(2/3-l)*6:e}if(e=C(e,360),o=C(o,100),l=C(l,100),0===o)r=t=n=l;else{var b=l<.5?l*(1+o):l+o-l*o,E=2*l-b;r=a(E,b,e+1/3),t=a(E,b,e),n=a(E,b,e-1/3)}return{r:255*r,g:255*t,b:255*n}}(e.h,f,O),R=!0),void 0!==e.a&&(E=e.a));var c,A,L;if(!R)throw new Error("Invalid Color format");return E=function(e){return e=parseFloat(e),(isNaN(e)||e<0||e>1)&&(e=1),e}(E),{r:t(255,n(r.r,0)),g:t(255,n(r.g,0)),b:t(255,n(r.b,0)),a:E}}(e=e||""),this._r=r.r,this._g=r.g,this._b=r.b,this._a=Math.round(100*r.a)/100},e.Color.prototype.getRed=function(e){return(e=e||!1)?this._r:r(this._r)},e.Color.prototype.getGreen=function(e){return(e=e||!1)?this._g:r(this._g)},e.Color.prototype.getBlue=function(e){return(e=e||!1)?this._b:r(this._b)},e.Color.prototype.getAlpha=function(){return this._a},e.Color.prototype.toString=function(){return"rgb"+((o=(e=this)._a<1)?"a(":"(")+r(e._r)+", "+r(e._g)+", "+r(e._b)+(o?", "+e._a:"")+")";var e,o},e.Color.prototype.isEqual=function(o){var l=!1;return o instanceof e.Color&&(l=this._r===o._r&&this._g===o._g&&this._b===o._b&&this._a===o._a),l},e.Color.ALICEBLUE=null,e.Color.ANTIQUEWHITE=null,e.Color.AQUA=null,e.Color.AQUAMARINE=null,e.Color.AZURE=null,e.Color.BEIGE=null,e.Color.BISQUE=null,e.Color.BLACK=null,e.Color.BLANCHEDALMOND=null,e.Color.BLUE=null,e.Color.BLUEVIOLET=null,e.Color.BROWN=null,e.Color.BURLYWOOD=null,e.Color.CADETBLUE=null,e.Color.CHARTREUSE=null,e.Color.CHOCOLATE=null,e.Color.CORAL=null,e.Color.CORNFLOWERBLUE=null,e.Color.CORNSILK=null,e.Color.CRIMSON=null,e.Color.CYAN=null,e.Color.DARKBLUE=null,e.Color.DARKCYAN=null,e.Color.DARKGOLDENROD=null,e.Color.DARKGRAY=null,e.Color.DARKGREY=null,e.Color.DARKGREEN=null,e.Color.DARKKHAKI=null,e.Color.DARKMAGENTA=null,e.Color.DARKOLIVEGREEN=null,e.Color.DARKORANGE=null,e.Color.DARKORCHID=null,e.Color.DARKRED=null,e.Color.DARKSALMON=null,e.Color.DARKSEAGREEN=null,e.Color.DARKSLATEBLUE=null,e.Color.DARKSLATEGRAY=null,e.Color.DARKSLATEGREY=null,e.Color.DARKTURQUOISE=null,e.Color.DARKVIOLET=null,e.Color.DEEPPINK=null,e.Color.DEEPSKYBLUE=null,e.Color.DIMGRAY=null,e.Color.DIMGREY=null,e.Color.DODGERBLUE=null,e.Color.FIREBRICK=null,e.Color.FLORALWHITE=null,e.Color.FORESTGREEN=null,e.Color.FUCHSIA=null,e.Color.GAINSBORO=null,e.Color.GHOSTWHITE=null,e.Color.GOLD=null,e.Color.GOLDENROD=null,e.Color.GRAY=null,e.Color.GREEN=null,e.Color.GREENYELLOW=null,e.Color.GREY=null,e.Color.HONEYDEW=null,e.Color.HOTPINK=null,e.Color.INDIANRED=null,e.Color.INDIGO=null,e.Color.IVORY=null,e.Color.KHAKI=null,e.Color.LAVENDER=null,e.Color.LAVENDERBLUSH=null,e.Color.LAWNGREEN=null,e.Color.LEMONCHIFFON=null,e.Color.LIGHTBLUE=null,e.Color.LIGHTCORAL=null,e.Color.LIGHTCYAN=null,e.Color.LIGHTGOLDENRODYELLOW=null,e.Color.LIGHTGRAY=null,e.Color.LIGHTGREEN=null,e.Color.LIGHTGREY=null,e.Color.LIGHTPINK=null,e.Color.LIGHTSALMON=null,e.Color.LIGHTSEAGREEN=null,e.Color.LIGHTSKYBLUE=null,e.Color.LIGHTSLATEGRAY=null,e.Color.LIGHTSLATEGREY=null,e.Color.LIGHTSTEELBLUE=null,e.Color.LIGHTYELLOW=null,e.Color.LIME=null,e.Color.LIMEGREEN=null,e.Color.LINEN=null,e.Color.MAGENTA=null,e.Color.MAROON=null,e.Color.MEDIUMAQUAMARINE=null,e.Color.MEDIUMBLUE=null,e.Color.MEDIUMORCHID=null,e.Color.MEDIUMPURPLE=null,e.Color.MEDIUMSEAGREEN=null,e.Color.MEDIUMSLATEBLUE=null,e.Color.MEDIUMSPRINGGREEN=null,e.Color.MEDIUMTURQUOISE=null,e.Color.MEDIUMVIOLETRED=null,e.Color.MIDNIGHTBLUE=null,e.Color.MINTCREAM=null,e.Color.MISTYROSE=null,e.Color.MOCCASIN=null,e.Color.NAVAJOWHITE=null,e.Color.NAVY=null,e.Color.OLDLACE=null,e.Color.OLIVE=null,e.Color.OLIVEDRAB=null,e.Color.ORANGE=null,e.Color.ORANGERED=null,e.Color.ORCHID=null,e.Color.PALEGOLDENROD=null,e.Color.PALEGREEN=null,e.Color.PALETURQUOISE=null,e.Color.PALEVIOLETRED=null,e.Color.PAPAYAWHIP=null,e.Color.PEACHPUFF=null,e.Color.PERU=null,e.Color.PINK=null,e.Color.PLUM=null,e.Color.POWDERBLUE=null,e.Color.PURPLE=null,e.Color.REBECCAPURPLE=null,e.Color.RED=null,e.Color.ROSYBROWN=null,e.Color.ROYALBLUE=null,e.Color.SADDLEBROWN=null,e.Color.SALMON=null,e.Color.SANDYBROWN=null,e.Color.SEAGREEN=null,e.Color.SEASHELL=null,e.Color.SIENNA=null,e.Color.SILVER=null,e.Color.SKYBLUE=null,e.Color.SLATEBLUE=null,e.Color.SLATEGRAY=null,e.Color.SLATEGREY=null,e.Color.SNOW=null,e.Color.SPRINGGREEN=null,e.Color.STEELBLUE=null,e.Color.TAN=null,e.Color.TEAL=null,e.Color.THISTLE=null,e.Color.TOMATO=null,e.Color.TURQUOISE=null,e.Color.VIOLET=null,e.Color.WHEAT=null,e.Color.WHITE=null,e.Color.WHITESMOKE=null,e.Color.YELLOW=null,e.Color.YELLOWGREEN=null,e.Color.TRANSPARENT=null;var E,f,i,u=(f="[\\s|\\(]+("+(E="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)")+")[,|\\s]+("+E+")[,|\\s]+("+E+")\\s*\\)?",i="[\\s|\\(]+("+E+")[,|\\s]+("+E+")[,|\\s]+("+E+")[,|\\s]+("+E+")\\s*\\)?",{CSS_UNIT:new RegExp(E),rgb:new RegExp("rgb"+f),rgba:new RegExp("rgba"+i),hsl:new RegExp("hsl"+f),hsla:new RegExp("hsla"+i),hsv:new RegExp("hsv"+f),hsva:new RegExp("hsva"+i),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/});function w(e){return!!u.CSS_UNIT.exec(e)}Object.defineProperty(e.Color,"ALICEBLUE",{writable:!1,value:new e.Color("f0f8ff")}),Object.defineProperty(e.Color,"ANTIQUEWHITE",{writable:!1,value:new e.Color("faebd7")}),Object.defineProperty(e.Color,"AQUA",{writable:!1,value:new e.Color("0ff")}),Object.defineProperty(e.Color,"AQUAMARINE",{writable:!1,value:new e.Color("7fffd4")}),Object.defineProperty(e.Color,"AZURE",{writable:!1,value:new e.Color("f0ffff")}),Object.defineProperty(e.Color,"BEIGE",{writable:!1,value:new e.Color("f5f5dc")}),Object.defineProperty(e.Color,"BISQUE",{writable:!1,value:new e.Color("ffe4c4")}),Object.defineProperty(e.Color,"BLACK",{writable:!1,value:new e.Color("000")}),Object.defineProperty(e.Color,"BLANCHEDALMOND",{writable:!1,value:new e.Color("ffebcd")}),Object.defineProperty(e.Color,"BLUE",{writable:!1,value:new e.Color("00f")}),Object.defineProperty(e.Color,"BLUEVIOLET",{writable:!1,value:new e.Color("8a2be2")}),Object.defineProperty(e.Color,"BROWN",{writable:!1,value:new e.Color("a52a2a")}),Object.defineProperty(e.Color,"BURLYWOOD",{writable:!1,value:new e.Color("deb887")}),Object.defineProperty(e.Color,"CADETBLUE",{writable:!1,value:new e.Color("5f9ea0")}),Object.defineProperty(e.Color,"CHARTREUSE",{writable:!1,value:new e.Color("7fff00")}),Object.defineProperty(e.Color,"CHOCOLATE",{writable:!1,value:new e.Color("d2691e")}),Object.defineProperty(e.Color,"CORAL",{writable:!1,value:new e.Color("ff7f50")}),Object.defineProperty(e.Color,"CORNFLOWERBLUE",{writable:!1,value:new e.Color("6495ed")}),Object.defineProperty(e.Color,"CORNSILK",{writable:!1,value:new e.Color("fff8dc")}),Object.defineProperty(e.Color,"CRIMSON",{writable:!1,value:new e.Color("dc143c")}),Object.defineProperty(e.Color,"CYAN",{writable:!1,value:new e.Color("0ff")}),Object.defineProperty(e.Color,"DARKBLUE",{writable:!1,value:new e.Color("00008b")}),Object.defineProperty(e.Color,"DARKCYAN",{writable:!1,value:new e.Color("008b8b")}),Object.defineProperty(e.Color,"DARKGOLDENROD",{writable:!1,value:new e.Color("b8860b")}),Object.defineProperty(e.Color,"DARKGRAY",{writable:!1,value:new e.Color("a9a9a9")}),Object.defineProperty(e.Color,"DARKGREY",{writable:!1,value:new e.Color("a9a9a9")}),Object.defineProperty(e.Color,"DARKGREEN",{writable:!1,value:new e.Color("006400")}),Object.defineProperty(e.Color,"DARKKHAKI",{writable:!1,value:new e.Color("bdb76b")}),Object.defineProperty(e.Color,"DARKMAGENTA",{writable:!1,value:new e.Color("8b008b")}),Object.defineProperty(e.Color,"DARKOLIVEGREEN",{writable:!1,value:new e.Color("556b2f")}),Object.defineProperty(e.Color,"DARKORANGE",{writable:!1,value:new e.Color("ff8c00")}),Object.defineProperty(e.Color,"DARKORCHID",{writable:!1,value:new e.Color("9932cc")}),Object.defineProperty(e.Color,"DARKRED",{writable:!1,value:new e.Color("8b0000")}),Object.defineProperty(e.Color,"DARKSALMON",{writable:!1,value:new e.Color("e9967a")}),Object.defineProperty(e.Color,"DARKSEAGREEN",{writable:!1,value:new e.Color("8fbc8f")}),Object.defineProperty(e.Color,"DARKSLATEBLUE",{writable:!1,value:new e.Color("483d8b")}),Object.defineProperty(e.Color,"DARKSLATEGRAY",{writable:!1,value:new e.Color("2f4f4f")}),Object.defineProperty(e.Color,"DARKSLATEGREY",{writable:!1,value:new e.Color("2f4f4f")}),Object.defineProperty(e.Color,"DARKTURQUOISE",{writable:!1,value:new e.Color("00ced1")}),Object.defineProperty(e.Color,"DARKVIOLET",{writable:!1,value:new e.Color("9400d3")}),Object.defineProperty(e.Color,"DEEPPINK",{writable:!1,value:new e.Color("ff1493")}),Object.defineProperty(e.Color,"DEEPSKYBLUE",{writable:!1,value:new e.Color("00bfff")}),Object.defineProperty(e.Color,"DIMGRAY",{writable:!1,value:new e.Color("696969")}),Object.defineProperty(e.Color,"DIMGREY",{writable:!1,value:new e.Color("696969")}),Object.defineProperty(e.Color,"DODGERBLUE",{writable:!1,value:new e.Color("1e90ff")}),Object.defineProperty(e.Color,"FIREBRICK",{writable:!1,value:new e.Color("b22222")}),Object.defineProperty(e.Color,"FLORALWHITE",{writable:!1,value:new e.Color("fffaf0")}),Object.defineProperty(e.Color,"FORESTGREEN",{writable:!1,value:new e.Color("228b22")}),Object.defineProperty(e.Color,"FUCHSIA",{writable:!1,value:new e.Color("f0f")}),Object.defineProperty(e.Color,"GAINSBORO",{writable:!1,value:new e.Color("dcdcdc")}),Object.defineProperty(e.Color,"GHOSTWHITE",{writable:!1,value:new e.Color("f8f8ff")}),Object.defineProperty(e.Color,"GOLD",{writable:!1,value:new e.Color("ffd700")}),Object.defineProperty(e.Color,"GOLDENROD",{writable:!1,value:new e.Color("daa520")}),Object.defineProperty(e.Color,"GRAY",{writable:!1,value:new e.Color("808080")}),Object.defineProperty(e.Color,"GREY",{writable:!1,value:new e.Color("808080")}),Object.defineProperty(e.Color,"GREEN",{writable:!1,value:new e.Color("008000")}),Object.defineProperty(e.Color,"GREENYELLOW",{writable:!1,value:new e.Color("adff2f")}),Object.defineProperty(e.Color,"HONEYDEW",{writable:!1,value:new e.Color("f0fff0")}),Object.defineProperty(e.Color,"HOTPINK",{writable:!1,value:new e.Color("ff69b4")}),Object.defineProperty(e.Color,"INDIANRED",{writable:!1,value:new e.Color("cd5c5c")}),Object.defineProperty(e.Color,"INDIGO",{writable:!1,value:new e.Color("4b0082")}),Object.defineProperty(e.Color,"IVORY",{writable:!1,value:new e.Color("fffff0")}),Object.defineProperty(e.Color,"KHAKI",{writable:!1,value:new e.Color("f0e68c")}),Object.defineProperty(e.Color,"LAVENDER",{writable:!1,value:new e.Color("e6e6fa")}),Object.defineProperty(e.Color,"LAVENDERBLUSH",{writable:!1,value:new e.Color("fff0f5")}),Object.defineProperty(e.Color,"LAWNGREEN",{writable:!1,value:new e.Color("7cfc00")}),Object.defineProperty(e.Color,"LEMONCHIFFON",{writable:!1,value:new e.Color("fffacd")}),Object.defineProperty(e.Color,"LIGHTBLUE",{writable:!1,value:new e.Color("add8e6")}),Object.defineProperty(e.Color,"LIGHTCORAL",{writable:!1,value:new e.Color("f08080")}),Object.defineProperty(e.Color,"LIGHTCYAN",{writable:!1,value:new e.Color("e0ffff")}),Object.defineProperty(e.Color,"LIGHTGOLDENRODYELLOW",{writable:!1,value:new e.Color("fafad2")}),Object.defineProperty(e.Color,"LIGHTGRAY",{writable:!1,value:new e.Color("d3d3d3")}),Object.defineProperty(e.Color,"LIGHTGREY",{writable:!1,value:new e.Color("d3d3d3")}),Object.defineProperty(e.Color,"LIGHTGREEN",{writable:!1,value:new e.Color("90ee90")}),Object.defineProperty(e.Color,"LIGHTPINK",{writable:!1,value:new e.Color("ffb6c1")}),Object.defineProperty(e.Color,"LIGHTSALMON",{writable:!1,value:new e.Color("ffa07a")}),Object.defineProperty(e.Color,"LIGHTSEAGREEN",{writable:!1,value:new e.Color("20b2aa")}),Object.defineProperty(e.Color,"LIGHTSKYBLUE",{writable:!1,value:new e.Color("87cefa")}),Object.defineProperty(e.Color,"LIGHTSLATEGRAY",{writable:!1,value:new e.Color("789")}),Object.defineProperty(e.Color,"LIGHTSLATEGREY",{writable:!1,value:new e.Color("789")}),Object.defineProperty(e.Color,"LIGHTSTEELBLUE",{writable:!1,value:new e.Color("b0c4de")}),Object.defineProperty(e.Color,"LIGHTYELLOW",{writable:!1,value:new e.Color("ffffe0")}),Object.defineProperty(e.Color,"LIME",{writable:!1,value:new e.Color("0f0")}),Object.defineProperty(e.Color,"LIMEGREEN",{writable:!1,value:new e.Color("32cd32")}),Object.defineProperty(e.Color,"LINEN",{writable:!1,value:new e.Color("faf0e6")}),Object.defineProperty(e.Color,"MAGENTA",{writable:!1,value:new e.Color("f0f")}),Object.defineProperty(e.Color,"MAROON",{writable:!1,value:new e.Color("800000")}),Object.defineProperty(e.Color,"MEDIUMAQUAMARINE",{writable:!1,value:new e.Color("66cdaa")}),Object.defineProperty(e.Color,"MEDIUMBLUE",{writable:!1,value:new e.Color("0000cd")}),Object.defineProperty(e.Color,"MEDIUMORCHID",{writable:!1,value:new e.Color("ba55d3")}),Object.defineProperty(e.Color,"MEDIUMPURPLE",{writable:!1,value:new e.Color("9370db")}),Object.defineProperty(e.Color,"MEDIUMSEAGREEN",{writable:!1,value:new e.Color("3cb371")}),Object.defineProperty(e.Color,"MEDIUMSLATEBLUE",{writable:!1,value:new e.Color("7b68ee")}),Object.defineProperty(e.Color,"MEDIUMSPRINGGREEN",{writable:!1,value:new e.Color("00fa9a")}),Object.defineProperty(e.Color,"MEDIUMTURQUOISE",{writable:!1,value:new e.Color("48d1cc")}),Object.defineProperty(e.Color,"MEDIUMVIOLETRED",{writable:!1,value:new e.Color("c71585")}),Object.defineProperty(e.Color,"MIDNIGHTBLUE",{writable:!1,value:new e.Color("191970")}),Object.defineProperty(e.Color,"MINTCREAM",{writable:!1,value:new e.Color("f5fffa")}),Object.defineProperty(e.Color,"MISTYROSE",{writable:!1,value:new e.Color("ffe4e1")}),Object.defineProperty(e.Color,"MOCCASIN",{writable:!1,value:new e.Color("ffe4b5")}),Object.defineProperty(e.Color,"NAVAJOWHITE",{writable:!1,value:new e.Color("ffdead")}),Object.defineProperty(e.Color,"NAVY",{writable:!1,value:new e.Color("000080")}),Object.defineProperty(e.Color,"OLDLACE",{writable:!1,value:new e.Color("fdf5e6")}),Object.defineProperty(e.Color,"OLIVE",{writable:!1,value:new e.Color("808000")}),Object.defineProperty(e.Color,"OLIVEDRAB",{writable:!1,value:new e.Color("6b8e23")}),Object.defineProperty(e.Color,"ORANGE",{writable:!1,value:new e.Color("ffa500")}),Object.defineProperty(e.Color,"ORANGERED",{writable:!1,value:new e.Color("ff4500")}),Object.defineProperty(e.Color,"ORCHID",{writable:!1,value:new e.Color("da70d6")}),Object.defineProperty(e.Color,"PALEGOLDENROD",{writable:!1,value:new e.Color("eee8aa")}),Object.defineProperty(e.Color,"PALEGREEN",{writable:!1,value:new e.Color("98fb98")}),Object.defineProperty(e.Color,"PALETURQUOISE",{writable:!1,value:new e.Color("afeeee")}),Object.defineProperty(e.Color,"PALEVIOLETRED",{writable:!1,value:new e.Color("db7093")}),Object.defineProperty(e.Color,"PAPAYAWHIP",{writable:!1,value:new e.Color("ffefd5")}),Object.defineProperty(e.Color,"PEACHPUFF",{writable:!1,value:new e.Color("ffdab9")}),Object.defineProperty(e.Color,"PERU",{writable:!1,value:new e.Color("cd853f")}),Object.defineProperty(e.Color,"PINK",{writable:!1,value:new e.Color("ffc0cb")}),Object.defineProperty(e.Color,"PLUM",{writable:!1,value:new e.Color("dda0dd")}),Object.defineProperty(e.Color,"POWDERBLUE",{writable:!1,value:new e.Color("b0e0e6")}),Object.defineProperty(e.Color,"PURPLE",{writable:!1,value:new e.Color("800080")}),Object.defineProperty(e.Color,"REBECCAPURPLE",{writable:!1,value:new e.Color("663399")}),Object.defineProperty(e.Color,"RED",{writable:!1,value:new e.Color("f00")}),Object.defineProperty(e.Color,"ROSYBROWN",{writable:!1,value:new e.Color("bc8f8f")}),Object.defineProperty(e.Color,"ROYALBLUE",{writable:!1,value:new e.Color("4169e1")}),Object.defineProperty(e.Color,"SADDLEBROWN",{writable:!1,value:new e.Color("8b4513")}),Object.defineProperty(e.Color,"SALMON",{writable:!1,value:new e.Color("fa8072")}),Object.defineProperty(e.Color,"SANDYBROWN",{writable:!1,value:new e.Color("f4a460")}),Object.defineProperty(e.Color,"SEAGREEN",{writable:!1,value:new e.Color("2e8b57")}),Object.defineProperty(e.Color,"SEASHELL",{writable:!1,value:new e.Color("fff5ee")}),Object.defineProperty(e.Color,"SIENNA",{writable:!1,value:new e.Color("a0522d")}),Object.defineProperty(e.Color,"SILVER",{writable:!1,value:new e.Color("c0c0c0")}),Object.defineProperty(e.Color,"SKYBLUE",{writable:!1,value:new e.Color("87ceeb")}),Object.defineProperty(e.Color,"SLATEBLUE",{writable:!1,value:new e.Color("6a5acd")}),Object.defineProperty(e.Color,"SLATEGRAY",{writable:!1,value:new e.Color("708090")}),Object.defineProperty(e.Color,"SLATEGREY",{writable:!1,value:new e.Color("708090")}),Object.defineProperty(e.Color,"SNOW",{writable:!1,value:new e.Color("fffafa")}),Object.defineProperty(e.Color,"SPRINGGREEN",{writable:!1,value:new e.Color("00ff7f")}),Object.defineProperty(e.Color,"STEELBLUE",{writable:!1,value:new e.Color("4682b4")}),Object.defineProperty(e.Color,"TAN",{writable:!1,value:new e.Color("d2b48c")}),Object.defineProperty(e.Color,"TEAL",{writable:!1,value:new e.Color("008080")}),Object.defineProperty(e.Color,"THISTLE",{writable:!1,value:new e.Color("d8bfd8")}),Object.defineProperty(e.Color,"TOMATO",{writable:!1,value:new e.Color("ff6347")}),Object.defineProperty(e.Color,"TURQUOISE",{writable:!1,value:new e.Color("40e0d0")}),Object.defineProperty(e.Color,"VIOLET",{writable:!1,value:new e.Color("ee82ee")}),Object.defineProperty(e.Color,"WHEAT",{writable:!1,value:new e.Color("f5deb3")}),Object.defineProperty(e.Color,"WHITE",{writable:!1,value:new e.Color("fff")}),Object.defineProperty(e.Color,"WHITESMOKE",{writable:!1,value:new e.Color("f5f5f5")}),Object.defineProperty(e.Color,"YELLOW",{writable:!1,value:new e.Color("ff0")}),Object.defineProperty(e.Color,"YELLOWGREEN",{writable:!1,value:new e.Color("9acd32")}),Object.defineProperty(e.Color,"TRANSPARENT",{writable:!1,value:new e.Color("rgba(0,0,0,0)")})}()});