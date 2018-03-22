/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.4.0
 */

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

!function(t,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var r=n();for(var a in r)("object"==typeof exports?exports:t)[a]=r[a]}}(this,function(){return function(t){function n(a){if(r[a])return r[a].exports;var e=r[a]={i:a,l:!1,exports:{}};return t[a].call(e.exports,e,e.exports,n),e.l=!0,e.exports}var r={};return n.m=t,n.c=r,n.d=function(t,r,a){n.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:a})},n.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(r,"a",r),r},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=4)}([function(t,n,r){"use strict";function a(t){n.ARRAY_TYPE=i=t}function e(t){return t*s}function u(t,n){return Math.abs(t-n)<=o*Math.max(1,Math.abs(t),Math.abs(n))}Object.defineProperty(n,"__esModule",{value:!0}),n.setMatrixArrayType=a,n.toRadian=e,n.equals=u;var o=n.EPSILON=1e-6,i=n.ARRAY_TYPE="undefined"!=typeof Float32Array?Float32Array:Array,s=(n.RANDOM=Math.random,Math.PI/180)},function(t,n,r){"use strict";function a(){var t=new g.ARRAY_TYPE(9);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t}function e(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[4],t[4]=n[5],t[5]=n[6],t[6]=n[8],t[7]=n[9],t[8]=n[10],t}function u(t){var n=new g.ARRAY_TYPE(9);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],n}function o(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t}function i(t,n,r,a,e,u,o,i,s){var c=new g.ARRAY_TYPE(9);return c[0]=t,c[1]=n,c[2]=r,c[3]=a,c[4]=e,c[5]=u,c[6]=o,c[7]=i,c[8]=s,c}function s(t,n,r,a,e,u,o,i,s,c){return t[0]=n,t[1]=r,t[2]=a,t[3]=e,t[4]=u,t[5]=o,t[6]=i,t[7]=s,t[8]=c,t}function c(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t}function f(t,n){if(t===n){var r=n[1],a=n[2],e=n[5];t[1]=n[3],t[2]=n[6],t[3]=r,t[5]=n[7],t[6]=a,t[7]=e}else t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8];return t}function M(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],s=n[6],c=n[7],f=n[8],M=f*o-i*c,h=-f*u+i*s,l=c*u-o*s,v=r*M+a*h+e*l;return v?(v=1/v,t[0]=M*v,t[1]=(-f*a+e*c)*v,t[2]=(i*a-e*o)*v,t[3]=h*v,t[4]=(f*r-e*s)*v,t[5]=(-i*r+e*u)*v,t[6]=l*v,t[7]=(-c*r+a*s)*v,t[8]=(o*r-a*u)*v,t):null}function h(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],s=n[6],c=n[7],f=n[8];return t[0]=o*f-i*c,t[1]=e*c-a*f,t[2]=a*i-e*o,t[3]=i*s-u*f,t[4]=r*f-e*s,t[5]=e*u-r*i,t[6]=u*c-o*s,t[7]=a*s-r*c,t[8]=r*o-a*u,t}function l(t){var n=t[0],r=t[1],a=t[2],e=t[3],u=t[4],o=t[5],i=t[6],s=t[7],c=t[8];return n*(c*u-o*s)+r*(-c*e+o*i)+a*(s*e-u*i)}function v(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],s=n[5],c=n[6],f=n[7],M=n[8],h=r[0],l=r[1],v=r[2],d=r[3],b=r[4],m=r[5],p=r[6],P=r[7],E=r[8];return t[0]=h*a+l*o+v*c,t[1]=h*e+l*i+v*f,t[2]=h*u+l*s+v*M,t[3]=d*a+b*o+m*c,t[4]=d*e+b*i+m*f,t[5]=d*u+b*s+m*M,t[6]=p*a+P*o+E*c,t[7]=p*e+P*i+E*f,t[8]=p*u+P*s+E*M,t}function d(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],s=n[5],c=n[6],f=n[7],M=n[8],h=r[0],l=r[1];return t[0]=a,t[1]=e,t[2]=u,t[3]=o,t[4]=i,t[5]=s,t[6]=h*a+l*o+c,t[7]=h*e+l*i+f,t[8]=h*u+l*s+M,t}function b(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],s=n[5],c=n[6],f=n[7],M=n[8],h=Math.sin(r),l=Math.cos(r);return t[0]=l*a+h*o,t[1]=l*e+h*i,t[2]=l*u+h*s,t[3]=l*o-h*a,t[4]=l*i-h*e,t[5]=l*s-h*u,t[6]=c,t[7]=f,t[8]=M,t}function m(t,n,r){var a=r[0],e=r[1];return t[0]=a*n[0],t[1]=a*n[1],t[2]=a*n[2],t[3]=e*n[3],t[4]=e*n[4],t[5]=e*n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t}function p(t,n){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=n[0],t[7]=n[1],t[8]=1,t}function P(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=a,t[1]=r,t[2]=0,t[3]=-r,t[4]=a,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t}function E(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=0,t[4]=n[1],t[5]=0,t[6]=0,t[7]=0,t[8]=1,t}function O(t,n){return t[0]=n[0],t[1]=n[1],t[2]=0,t[3]=n[2],t[4]=n[3],t[5]=0,t[6]=n[4],t[7]=n[5],t[8]=1,t}function x(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=r+r,i=a+a,s=e+e,c=r*o,f=a*o,M=a*i,h=e*o,l=e*i,v=e*s,d=u*o,b=u*i,m=u*s;return t[0]=1-M-v,t[3]=f-m,t[6]=h+b,t[1]=f+m,t[4]=1-c-v,t[7]=l-d,t[2]=h-b,t[5]=l+d,t[8]=1-c-M,t}function A(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],s=n[6],c=n[7],f=n[8],M=n[9],h=n[10],l=n[11],v=n[12],d=n[13],b=n[14],m=n[15],p=r*i-a*o,P=r*s-e*o,E=r*c-u*o,O=a*s-e*i,x=a*c-u*i,A=e*c-u*s,q=f*d-M*v,y=f*b-h*v,w=f*m-l*v,R=M*b-h*d,L=M*m-l*d,S=h*m-l*b,_=p*S-P*L+E*R+O*w-x*y+A*q;return _?(_=1/_,t[0]=(i*S-s*L+c*R)*_,t[1]=(s*w-o*S-c*y)*_,t[2]=(o*L-i*w+c*q)*_,t[3]=(e*L-a*S-u*R)*_,t[4]=(r*S-e*w+u*y)*_,t[5]=(a*w-r*L-u*q)*_,t[6]=(d*A-b*x+m*O)*_,t[7]=(b*E-v*A-m*P)*_,t[8]=(v*x-d*E+m*p)*_,t):null}function q(t,n,r){return t[0]=2/n,t[1]=0,t[2]=0,t[3]=0,t[4]=-2/r,t[5]=0,t[6]=-1,t[7]=1,t[8]=1,t}function y(t){return"mat3("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+")"}function w(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2)+Math.pow(t[4],2)+Math.pow(t[5],2)+Math.pow(t[6],2)+Math.pow(t[7],2)+Math.pow(t[8],2))}function R(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t[3]=n[3]+r[3],t[4]=n[4]+r[4],t[5]=n[5]+r[5],t[6]=n[6]+r[6],t[7]=n[7]+r[7],t[8]=n[8]+r[8],t}function L(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t[3]=n[3]-r[3],t[4]=n[4]-r[4],t[5]=n[5]-r[5],t[6]=n[6]-r[6],t[7]=n[7]-r[7],t[8]=n[8]-r[8],t}function S(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=n[3]*r,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=n[7]*r,t[8]=n[8]*r,t}function _(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t[2]=n[2]+r[2]*a,t[3]=n[3]+r[3]*a,t[4]=n[4]+r[4]*a,t[5]=n[5]+r[5]*a,t[6]=n[6]+r[6]*a,t[7]=n[7]+r[7]*a,t[8]=n[8]+r[8]*a,t}function I(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]&&t[4]===n[4]&&t[5]===n[5]&&t[6]===n[6]&&t[7]===n[7]&&t[8]===n[8]}function N(t,n){var r=t[0],a=t[1],e=t[2],u=t[3],o=t[4],i=t[5],s=t[6],c=t[7],f=t[8],M=n[0],h=n[1],l=n[2],v=n[3],d=n[4],b=n[5],m=n[6],p=n[7],P=n[8];return Math.abs(r-M)<=g.EPSILON*Math.max(1,Math.abs(r),Math.abs(M))&&Math.abs(a-h)<=g.EPSILON*Math.max(1,Math.abs(a),Math.abs(h))&&Math.abs(e-l)<=g.EPSILON*Math.max(1,Math.abs(e),Math.abs(l))&&Math.abs(u-v)<=g.EPSILON*Math.max(1,Math.abs(u),Math.abs(v))&&Math.abs(o-d)<=g.EPSILON*Math.max(1,Math.abs(o),Math.abs(d))&&Math.abs(i-b)<=g.EPSILON*Math.max(1,Math.abs(i),Math.abs(b))&&Math.abs(s-m)<=g.EPSILON*Math.max(1,Math.abs(s),Math.abs(m))&&Math.abs(c-p)<=g.EPSILON*Math.max(1,Math.abs(c),Math.abs(p))&&Math.abs(f-P)<=g.EPSILON*Math.max(1,Math.abs(f),Math.abs(P))}Object.defineProperty(n,"__esModule",{value:!0}),n.sub=n.mul=void 0,n.create=a,n.fromMat4=e,n.clone=u,n.copy=o,n.fromValues=i,n.set=s,n.identity=c,n.transpose=f,n.invert=M,n.adjoint=h,n.determinant=l,n.multiply=v,n.translate=d,n.rotate=b,n.scale=m,n.fromTranslation=p,n.fromRotation=P,n.fromScaling=E,n.fromMat2d=O,n.fromQuat=x,n.normalFromMat4=A,n.projection=q,n.str=y,n.frob=w,n.add=R,n.subtract=L,n.multiplyScalar=S,n.multiplyScalarAndAdd=_,n.exactEquals=I,n.equals=N;var Y=r(0),g=function(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n.default=t,n}(Y);n.mul=v,n.sub=L},function(t,n,r){"use strict";function a(){var t=new Z.ARRAY_TYPE(3);return t[0]=0,t[1]=0,t[2]=0,t}function e(t){var n=new Z.ARRAY_TYPE(3);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n}function u(t){var n=t[0],r=t[1],a=t[2];return Math.sqrt(n*n+r*r+a*a)}function o(t,n,r){var a=new Z.ARRAY_TYPE(3);return a[0]=t,a[1]=n,a[2]=r,a}function i(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t}function s(t,n,r,a){return t[0]=n,t[1]=r,t[2]=a,t}function c(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t}function f(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t}function M(t,n,r){return t[0]=n[0]*r[0],t[1]=n[1]*r[1],t[2]=n[2]*r[2],t}function h(t,n,r){return t[0]=n[0]/r[0],t[1]=n[1]/r[1],t[2]=n[2]/r[2],t}function l(t,n){return t[0]=Math.ceil(n[0]),t[1]=Math.ceil(n[1]),t[2]=Math.ceil(n[2]),t}function v(t,n){return t[0]=Math.floor(n[0]),t[1]=Math.floor(n[1]),t[2]=Math.floor(n[2]),t}function d(t,n,r){return t[0]=Math.min(n[0],r[0]),t[1]=Math.min(n[1],r[1]),t[2]=Math.min(n[2],r[2]),t}function b(t,n,r){return t[0]=Math.max(n[0],r[0]),t[1]=Math.max(n[1],r[1]),t[2]=Math.max(n[2],r[2]),t}function m(t,n){return t[0]=Math.round(n[0]),t[1]=Math.round(n[1]),t[2]=Math.round(n[2]),t}function p(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t}function P(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t[2]=n[2]+r[2]*a,t}function E(t,n){var r=n[0]-t[0],a=n[1]-t[1],e=n[2]-t[2];return Math.sqrt(r*r+a*a+e*e)}function O(t,n){var r=n[0]-t[0],a=n[1]-t[1],e=n[2]-t[2];return r*r+a*a+e*e}function x(t){var n=t[0],r=t[1],a=t[2];return n*n+r*r+a*a}function A(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t}function q(t,n){return t[0]=1/n[0],t[1]=1/n[1],t[2]=1/n[2],t}function y(t,n){var r=n[0],a=n[1],e=n[2],u=r*r+a*a+e*e;return u>0&&(u=1/Math.sqrt(u),t[0]=n[0]*u,t[1]=n[1]*u,t[2]=n[2]*u),t}function w(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]}function R(t,n,r){var a=n[0],e=n[1],u=n[2],o=r[0],i=r[1],s=r[2];return t[0]=e*s-u*i,t[1]=u*o-a*s,t[2]=a*i-e*o,t}function L(t,n,r,a){var e=n[0],u=n[1],o=n[2];return t[0]=e+a*(r[0]-e),t[1]=u+a*(r[1]-u),t[2]=o+a*(r[2]-o),t}function S(t,n,r,a,e,u){var o=u*u,i=o*(2*u-3)+1,s=o*(u-2)+u,c=o*(u-1),f=o*(3-2*u);return t[0]=n[0]*i+r[0]*s+a[0]*c+e[0]*f,t[1]=n[1]*i+r[1]*s+a[1]*c+e[1]*f,t[2]=n[2]*i+r[2]*s+a[2]*c+e[2]*f,t}function _(t,n,r,a,e,u){var o=1-u,i=o*o,s=u*u,c=i*o,f=3*u*i,M=3*s*o,h=s*u;return t[0]=n[0]*c+r[0]*f+a[0]*M+e[0]*h,t[1]=n[1]*c+r[1]*f+a[1]*M+e[1]*h,t[2]=n[2]*c+r[2]*f+a[2]*M+e[2]*h,t}function I(t,n){n=n||1;var r=2*Z.RANDOM()*Math.PI,a=2*Z.RANDOM()-1,e=Math.sqrt(1-a*a)*n;return t[0]=Math.cos(r)*e,t[1]=Math.sin(r)*e,t[2]=a*n,t}function N(t,n,r){var a=n[0],e=n[1],u=n[2],o=r[3]*a+r[7]*e+r[11]*u+r[15];return o=o||1,t[0]=(r[0]*a+r[4]*e+r[8]*u+r[12])/o,t[1]=(r[1]*a+r[5]*e+r[9]*u+r[13])/o,t[2]=(r[2]*a+r[6]*e+r[10]*u+r[14])/o,t}function Y(t,n,r){var a=n[0],e=n[1],u=n[2];return t[0]=a*r[0]+e*r[3]+u*r[6],t[1]=a*r[1]+e*r[4]+u*r[7],t[2]=a*r[2]+e*r[5]+u*r[8],t}function g(t,n,r){var a=n[0],e=n[1],u=n[2],o=r[0],i=r[1],s=r[2],c=r[3],f=c*a+i*u-s*e,M=c*e+s*a-o*u,h=c*u+o*e-i*a,l=-o*a-i*e-s*u;return t[0]=f*c+l*-o+M*-s-h*-i,t[1]=M*c+l*-i+h*-o-f*-s,t[2]=h*c+l*-s+f*-i-M*-o,t}function T(t,n,r,a){var e=[],u=[];return e[0]=n[0]-r[0],e[1]=n[1]-r[1],e[2]=n[2]-r[2],u[0]=e[0],u[1]=e[1]*Math.cos(a)-e[2]*Math.sin(a),u[2]=e[1]*Math.sin(a)+e[2]*Math.cos(a),t[0]=u[0]+r[0],t[1]=u[1]+r[1],t[2]=u[2]+r[2],t}function j(t,n,r,a){var e=[],u=[];return e[0]=n[0]-r[0],e[1]=n[1]-r[1],e[2]=n[2]-r[2],u[0]=e[2]*Math.sin(a)+e[0]*Math.cos(a),u[1]=e[1],u[2]=e[2]*Math.cos(a)-e[0]*Math.sin(a),t[0]=u[0]+r[0],t[1]=u[1]+r[1],t[2]=u[2]+r[2],t}function D(t,n,r,a){var e=[],u=[];return e[0]=n[0]-r[0],e[1]=n[1]-r[1],e[2]=n[2]-r[2],u[0]=e[0]*Math.cos(a)-e[1]*Math.sin(a),u[1]=e[0]*Math.sin(a)+e[1]*Math.cos(a),u[2]=e[2],t[0]=u[0]+r[0],t[1]=u[1]+r[1],t[2]=u[2]+r[2],t}function V(t,n){var r=o(t[0],t[1],t[2]),a=o(n[0],n[1],n[2]);y(r,r),y(a,a);var e=w(r,a);return e>1?0:e<-1?Math.PI:Math.acos(e)}function z(t){return"vec3("+t[0]+", "+t[1]+", "+t[2]+")"}function F(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]}function Q(t,n){var r=t[0],a=t[1],e=t[2],u=n[0],o=n[1],i=n[2];return Math.abs(r-u)<=Z.EPSILON*Math.max(1,Math.abs(r),Math.abs(u))&&Math.abs(a-o)<=Z.EPSILON*Math.max(1,Math.abs(a),Math.abs(o))&&Math.abs(e-i)<=Z.EPSILON*Math.max(1,Math.abs(e),Math.abs(i))}Object.defineProperty(n,"__esModule",{value:!0}),n.forEach=n.sqrLen=n.len=n.sqrDist=n.dist=n.div=n.mul=n.sub=void 0,n.create=a,n.clone=e,n.length=u,n.fromValues=o,n.copy=i,n.set=s,n.add=c,n.subtract=f,n.multiply=M,n.divide=h,n.ceil=l,n.floor=v,n.min=d,n.max=b,n.round=m,n.scale=p,n.scaleAndAdd=P,n.distance=E,n.squaredDistance=O,n.squaredLength=x,n.negate=A,n.inverse=q,n.normalize=y,n.dot=w,n.cross=R,n.lerp=L,n.hermite=S,n.bezier=_,n.random=I,n.transformMat4=N,n.transformMat3=Y,n.transformQuat=g,n.rotateX=T,n.rotateY=j,n.rotateZ=D,n.angle=V,n.str=z,n.exactEquals=F,n.equals=Q;var X=r(0),Z=function(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n.default=t,n}(X);n.sub=f,n.mul=M,n.div=h,n.dist=E,n.sqrDist=O,n.len=u,n.sqrLen=x,n.forEach=function(){var t=a();return function(n,r,a,e,u,o){var i=void 0,s=void 0;for(r||(r=3),a||(a=0),s=e?Math.min(e*r+a,n.length):n.length,i=a;i<s;i+=r)t[0]=n[i],t[1]=n[i+1],t[2]=n[i+2],u(t,t,o),n[i]=t[0],n[i+1]=t[1],n[i+2]=t[2];return n}}()},function(t,n,r){"use strict";function a(){var t=new T.ARRAY_TYPE(4);return t[0]=0,t[1]=0,t[2]=0,t[3]=0,t}function e(t){var n=new T.ARRAY_TYPE(4);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n}function u(t,n,r,a){var e=new T.ARRAY_TYPE(4);return e[0]=t,e[1]=n,e[2]=r,e[3]=a,e}function o(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t}function i(t,n,r,a,e){return t[0]=n,t[1]=r,t[2]=a,t[3]=e,t}function s(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t[3]=n[3]+r[3],t}function c(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t[3]=n[3]-r[3],t}function f(t,n,r){return t[0]=n[0]*r[0],t[1]=n[1]*r[1],t[2]=n[2]*r[2],t[3]=n[3]*r[3],t}function M(t,n,r){return t[0]=n[0]/r[0],t[1]=n[1]/r[1],t[2]=n[2]/r[2],t[3]=n[3]/r[3],t}function h(t,n){return t[0]=Math.ceil(n[0]),t[1]=Math.ceil(n[1]),t[2]=Math.ceil(n[2]),t[3]=Math.ceil(n[3]),t}function l(t,n){return t[0]=Math.floor(n[0]),t[1]=Math.floor(n[1]),t[2]=Math.floor(n[2]),t[3]=Math.floor(n[3]),t}function v(t,n,r){return t[0]=Math.min(n[0],r[0]),t[1]=Math.min(n[1],r[1]),t[2]=Math.min(n[2],r[2]),t[3]=Math.min(n[3],r[3]),t}function d(t,n,r){return t[0]=Math.max(n[0],r[0]),t[1]=Math.max(n[1],r[1]),t[2]=Math.max(n[2],r[2]),t[3]=Math.max(n[3],r[3]),t}function b(t,n){return t[0]=Math.round(n[0]),t[1]=Math.round(n[1]),t[2]=Math.round(n[2]),t[3]=Math.round(n[3]),t}function m(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=n[3]*r,t}function p(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t[2]=n[2]+r[2]*a,t[3]=n[3]+r[3]*a,t}function P(t,n){var r=n[0]-t[0],a=n[1]-t[1],e=n[2]-t[2],u=n[3]-t[3];return Math.sqrt(r*r+a*a+e*e+u*u)}function E(t,n){var r=n[0]-t[0],a=n[1]-t[1],e=n[2]-t[2],u=n[3]-t[3];return r*r+a*a+e*e+u*u}function O(t){var n=t[0],r=t[1],a=t[2],e=t[3];return Math.sqrt(n*n+r*r+a*a+e*e)}function x(t){var n=t[0],r=t[1],a=t[2],e=t[3];return n*n+r*r+a*a+e*e}function A(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=-n[3],t}function q(t,n){return t[0]=1/n[0],t[1]=1/n[1],t[2]=1/n[2],t[3]=1/n[3],t}function y(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=r*r+a*a+e*e+u*u;return o>0&&(o=1/Math.sqrt(o),t[0]=r*o,t[1]=a*o,t[2]=e*o,t[3]=u*o),t}function w(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]+t[3]*n[3]}function R(t,n,r,a){var e=n[0],u=n[1],o=n[2],i=n[3];return t[0]=e+a*(r[0]-e),t[1]=u+a*(r[1]-u),t[2]=o+a*(r[2]-o),t[3]=i+a*(r[3]-i),t}function L(t,n){return n=n||1,t[0]=T.RANDOM(),t[1]=T.RANDOM(),t[2]=T.RANDOM(),t[3]=T.RANDOM(),y(t,t),m(t,t,n),t}function S(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3];return t[0]=r[0]*a+r[4]*e+r[8]*u+r[12]*o,t[1]=r[1]*a+r[5]*e+r[9]*u+r[13]*o,t[2]=r[2]*a+r[6]*e+r[10]*u+r[14]*o,t[3]=r[3]*a+r[7]*e+r[11]*u+r[15]*o,t}function _(t,n,r){var a=n[0],e=n[1],u=n[2],o=r[0],i=r[1],s=r[2],c=r[3],f=c*a+i*u-s*e,M=c*e+s*a-o*u,h=c*u+o*e-i*a,l=-o*a-i*e-s*u;return t[0]=f*c+l*-o+M*-s-h*-i,t[1]=M*c+l*-i+h*-o-f*-s,t[2]=h*c+l*-s+f*-i-M*-o,t[3]=n[3],t}function I(t){return"vec4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"}function N(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]}function Y(t,n){var r=t[0],a=t[1],e=t[2],u=t[3],o=n[0],i=n[1],s=n[2],c=n[3];return Math.abs(r-o)<=T.EPSILON*Math.max(1,Math.abs(r),Math.abs(o))&&Math.abs(a-i)<=T.EPSILON*Math.max(1,Math.abs(a),Math.abs(i))&&Math.abs(e-s)<=T.EPSILON*Math.max(1,Math.abs(e),Math.abs(s))&&Math.abs(u-c)<=T.EPSILON*Math.max(1,Math.abs(u),Math.abs(c))}Object.defineProperty(n,"__esModule",{value:!0}),n.forEach=n.sqrLen=n.len=n.sqrDist=n.dist=n.div=n.mul=n.sub=void 0,n.create=a,n.clone=e,n.fromValues=u,n.copy=o,n.set=i,n.add=s,n.subtract=c,n.multiply=f,n.divide=M,n.ceil=h,n.floor=l,n.min=v,n.max=d,n.round=b,n.scale=m,n.scaleAndAdd=p,n.distance=P,n.squaredDistance=E,n.length=O,n.squaredLength=x,n.negate=A,n.inverse=q,n.normalize=y,n.dot=w,n.lerp=R,n.random=L,n.transformMat4=S,n.transformQuat=_,n.str=I,n.exactEquals=N,n.equals=Y;var g=r(0),T=function(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n.default=t,n}(g);n.sub=c,n.mul=f,n.div=M,n.dist=P,n.sqrDist=E,n.len=O,n.sqrLen=x,n.forEach=function(){var t=a();return function(n,r,a,e,u,o){var i=void 0,s=void 0;for(r||(r=4),a||(a=0),s=e?Math.min(e*r+a,n.length):n.length,i=a;i<s;i+=r)t[0]=n[i],t[1]=n[i+1],t[2]=n[i+2],t[3]=n[i+3],u(t,t,o),n[i]=t[0],n[i+1]=t[1],n[i+2]=t[2],n[i+3]=t[3];return n}}()},function(t,n,r){"use strict";function a(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n.default=t,n}Object.defineProperty(n,"__esModule",{value:!0}),n.vec4=n.vec3=n.vec2=n.quat=n.mat4=n.mat3=n.mat2d=n.mat2=n.glMatrix=void 0;var e=r(0),u=a(e),o=r(5),i=a(o),s=r(6),c=a(s),f=r(1),M=a(f),h=r(7),l=a(h),v=r(8),d=a(v),b=r(9),m=a(b),p=r(2),P=a(p),E=r(3),O=a(E);n.glMatrix=u,n.mat2=i,n.mat2d=c,n.mat3=M,n.mat4=l,n.quat=d,n.vec2=m,n.vec3=P,n.vec4=O},function(t,n,r){"use strict";function a(){var t=new L.ARRAY_TYPE(4);return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t}function e(t){var n=new L.ARRAY_TYPE(4);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n}function u(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t}function o(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t}function i(t,n,r,a){var e=new L.ARRAY_TYPE(4);return e[0]=t,e[1]=n,e[2]=r,e[3]=a,e}function s(t,n,r,a,e){return t[0]=n,t[1]=r,t[2]=a,t[3]=e,t}function c(t,n){if(t===n){var r=n[1];t[1]=n[2],t[2]=r}else t[0]=n[0],t[1]=n[2],t[2]=n[1],t[3]=n[3];return t}function f(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=r*u-e*a;return o?(o=1/o,t[0]=u*o,t[1]=-a*o,t[2]=-e*o,t[3]=r*o,t):null}function M(t,n){var r=n[0];return t[0]=n[3],t[1]=-n[1],t[2]=-n[2],t[3]=r,t}function h(t){return t[0]*t[3]-t[2]*t[1]}function l(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=r[0],s=r[1],c=r[2],f=r[3];return t[0]=a*i+u*s,t[1]=e*i+o*s,t[2]=a*c+u*f,t[3]=e*c+o*f,t}function v(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=Math.sin(r),s=Math.cos(r);return t[0]=a*s+u*i,t[1]=e*s+o*i,t[2]=a*-i+u*s,t[3]=e*-i+o*s,t}function d(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=r[0],s=r[1];return t[0]=a*i,t[1]=e*i,t[2]=u*s,t[3]=o*s,t}function b(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=a,t[1]=r,t[2]=-r,t[3]=a,t}function m(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=n[1],t}function p(t){return"mat2("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"}function P(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2))}function E(t,n,r,a){return t[2]=a[2]/a[0],r[0]=a[0],r[1]=a[1],r[3]=a[3]-t[2]*r[1],[t,n,r]}function O(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t[3]=n[3]+r[3],t}function x(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t[3]=n[3]-r[3],t}function A(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]}function q(t,n){var r=t[0],a=t[1],e=t[2],u=t[3],o=n[0],i=n[1],s=n[2],c=n[3];return Math.abs(r-o)<=L.EPSILON*Math.max(1,Math.abs(r),Math.abs(o))&&Math.abs(a-i)<=L.EPSILON*Math.max(1,Math.abs(a),Math.abs(i))&&Math.abs(e-s)<=L.EPSILON*Math.max(1,Math.abs(e),Math.abs(s))&&Math.abs(u-c)<=L.EPSILON*Math.max(1,Math.abs(u),Math.abs(c))}function y(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=n[3]*r,t}function w(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t[2]=n[2]+r[2]*a,t[3]=n[3]+r[3]*a,t}Object.defineProperty(n,"__esModule",{value:!0}),n.sub=n.mul=void 0,n.create=a,n.clone=e,n.copy=u,n.identity=o,n.fromValues=i,n.set=s,n.transpose=c,n.invert=f,n.adjoint=M,n.determinant=h,n.multiply=l,n.rotate=v,n.scale=d,n.fromRotation=b,n.fromScaling=m,n.str=p,n.frob=P,n.LDU=E,n.add=O,n.subtract=x,n.exactEquals=A,n.equals=q,n.multiplyScalar=y,n.multiplyScalarAndAdd=w;var R=r(0),L=function(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n.default=t,n}(R);n.mul=l,n.sub=x},function(t,n,r){"use strict";function a(){var t=new R.ARRAY_TYPE(6);return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t}function e(t){var n=new R.ARRAY_TYPE(6);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n}function u(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t}function o(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t}function i(t,n,r,a,e,u){var o=new R.ARRAY_TYPE(6);return o[0]=t,o[1]=n,o[2]=r,o[3]=a,o[4]=e,o[5]=u,o}function s(t,n,r,a,e,u,o){return t[0]=n,t[1]=r,t[2]=a,t[3]=e,t[4]=u,t[5]=o,t}function c(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],s=r*u-a*e;return s?(s=1/s,t[0]=u*s,t[1]=-a*s,t[2]=-e*s,t[3]=r*s,t[4]=(e*i-u*o)*s,t[5]=(a*o-r*i)*s,t):null}function f(t){return t[0]*t[3]-t[1]*t[2]}function M(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],s=n[5],c=r[0],f=r[1],M=r[2],h=r[3],l=r[4],v=r[5];return t[0]=a*c+u*f,t[1]=e*c+o*f,t[2]=a*M+u*h,t[3]=e*M+o*h,t[4]=a*l+u*v+i,t[5]=e*l+o*v+s,t}function h(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],s=n[5],c=Math.sin(r),f=Math.cos(r);return t[0]=a*f+u*c,t[1]=e*f+o*c,t[2]=a*-c+u*f,t[3]=e*-c+o*f,t[4]=i,t[5]=s,t}function l(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],s=n[5],c=r[0],f=r[1];return t[0]=a*c,t[1]=e*c,t[2]=u*f,t[3]=o*f,t[4]=i,t[5]=s,t}function v(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],s=n[5],c=r[0],f=r[1];return t[0]=a,t[1]=e,t[2]=u,t[3]=o,t[4]=a*c+u*f+i,t[5]=e*c+o*f+s,t}function d(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=a,t[1]=r,t[2]=-r,t[3]=a,t[4]=0,t[5]=0,t}function b(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=n[1],t[4]=0,t[5]=0,t}function m(t,n){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=n[0],t[5]=n[1],t}function p(t){return"mat2d("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+")"}function P(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2)+Math.pow(t[4],2)+Math.pow(t[5],2)+1)}function E(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t[3]=n[3]+r[3],t[4]=n[4]+r[4],t[5]=n[5]+r[5],t}function O(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t[3]=n[3]-r[3],t[4]=n[4]-r[4],t[5]=n[5]-r[5],t}function x(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=n[3]*r,t[4]=n[4]*r,t[5]=n[5]*r,t}function A(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t[2]=n[2]+r[2]*a,t[3]=n[3]+r[3]*a,t[4]=n[4]+r[4]*a,t[5]=n[5]+r[5]*a,t}function q(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]&&t[4]===n[4]&&t[5]===n[5]}function y(t,n){var r=t[0],a=t[1],e=t[2],u=t[3],o=t[4],i=t[5],s=n[0],c=n[1],f=n[2],M=n[3],h=n[4],l=n[5];return Math.abs(r-s)<=R.EPSILON*Math.max(1,Math.abs(r),Math.abs(s))&&Math.abs(a-c)<=R.EPSILON*Math.max(1,Math.abs(a),Math.abs(c))&&Math.abs(e-f)<=R.EPSILON*Math.max(1,Math.abs(e),Math.abs(f))&&Math.abs(u-M)<=R.EPSILON*Math.max(1,Math.abs(u),Math.abs(M))&&Math.abs(o-h)<=R.EPSILON*Math.max(1,Math.abs(o),Math.abs(h))&&Math.abs(i-l)<=R.EPSILON*Math.max(1,Math.abs(i),Math.abs(l))}Object.defineProperty(n,"__esModule",{value:!0}),n.sub=n.mul=void 0,n.create=a,n.clone=e,n.copy=u,n.identity=o,n.fromValues=i,n.set=s,n.invert=c,n.determinant=f,n.multiply=M,n.rotate=h,n.scale=l,n.translate=v,n.fromRotation=d,n.fromScaling=b,n.fromTranslation=m,n.str=p,n.frob=P,n.add=E,n.subtract=O,n.multiplyScalar=x,n.multiplyScalarAndAdd=A,n.exactEquals=q,n.equals=y;var w=r(0),R=function(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n.default=t,n}(w);n.mul=M,n.sub=O},function(t,n,r){"use strict";function a(){var t=new C.ARRAY_TYPE(16);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function e(t){var n=new C.ARRAY_TYPE(16);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],n[9]=t[9],n[10]=t[10],n[11]=t[11],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15],n}function u(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],t}function o(t,n,r,a,e,u,o,i,s,c,f,M,h,l,v,d){var b=new C.ARRAY_TYPE(16);return b[0]=t,b[1]=n,b[2]=r,b[3]=a,b[4]=e,b[5]=u,b[6]=o,b[7]=i,b[8]=s,b[9]=c,b[10]=f,b[11]=M,b[12]=h,b[13]=l,b[14]=v,b[15]=d,b}function i(t,n,r,a,e,u,o,i,s,c,f,M,h,l,v,d,b){return t[0]=n,t[1]=r,t[2]=a,t[3]=e,t[4]=u,t[5]=o,t[6]=i,t[7]=s,t[8]=c,t[9]=f,t[10]=M,t[11]=h,t[12]=l,t[13]=v,t[14]=d,t[15]=b,t}function s(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function c(t,n){if(t===n){var r=n[1],a=n[2],e=n[3],u=n[6],o=n[7],i=n[11];t[1]=n[4],t[2]=n[8],t[3]=n[12],t[4]=r,t[6]=n[9],t[7]=n[13],t[8]=a,t[9]=u,t[11]=n[14],t[12]=e,t[13]=o,t[14]=i}else t[0]=n[0],t[1]=n[4],t[2]=n[8],t[3]=n[12],t[4]=n[1],t[5]=n[5],t[6]=n[9],t[7]=n[13],t[8]=n[2],t[9]=n[6],t[10]=n[10],t[11]=n[14],t[12]=n[3],t[13]=n[7],t[14]=n[11],t[15]=n[15];return t}function f(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],s=n[6],c=n[7],f=n[8],M=n[9],h=n[10],l=n[11],v=n[12],d=n[13],b=n[14],m=n[15],p=r*i-a*o,P=r*s-e*o,E=r*c-u*o,O=a*s-e*i,x=a*c-u*i,A=e*c-u*s,q=f*d-M*v,y=f*b-h*v,w=f*m-l*v,R=M*b-h*d,L=M*m-l*d,S=h*m-l*b,_=p*S-P*L+E*R+O*w-x*y+A*q;return _?(_=1/_,t[0]=(i*S-s*L+c*R)*_,t[1]=(e*L-a*S-u*R)*_,t[2]=(d*A-b*x+m*O)*_,t[3]=(h*x-M*A-l*O)*_,t[4]=(s*w-o*S-c*y)*_,t[5]=(r*S-e*w+u*y)*_,t[6]=(b*E-v*A-m*P)*_,t[7]=(f*A-h*E+l*P)*_,t[8]=(o*L-i*w+c*q)*_,t[9]=(a*w-r*L-u*q)*_,t[10]=(v*x-d*E+m*p)*_,t[11]=(M*E-f*x-l*p)*_,t[12]=(i*y-o*R-s*q)*_,t[13]=(r*R-a*y+e*q)*_,t[14]=(d*P-v*O-b*p)*_,t[15]=(f*O-M*P+h*p)*_,t):null}function M(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],s=n[6],c=n[7],f=n[8],M=n[9],h=n[10],l=n[11],v=n[12],d=n[13],b=n[14],m=n[15];return t[0]=i*(h*m-l*b)-M*(s*m-c*b)+d*(s*l-c*h),t[1]=-(a*(h*m-l*b)-M*(e*m-u*b)+d*(e*l-u*h)),t[2]=a*(s*m-c*b)-i*(e*m-u*b)+d*(e*c-u*s),t[3]=-(a*(s*l-c*h)-i*(e*l-u*h)+M*(e*c-u*s)),t[4]=-(o*(h*m-l*b)-f*(s*m-c*b)+v*(s*l-c*h)),t[5]=r*(h*m-l*b)-f*(e*m-u*b)+v*(e*l-u*h),t[6]=-(r*(s*m-c*b)-o*(e*m-u*b)+v*(e*c-u*s)),t[7]=r*(s*l-c*h)-o*(e*l-u*h)+f*(e*c-u*s),t[8]=o*(M*m-l*d)-f*(i*m-c*d)+v*(i*l-c*M),t[9]=-(r*(M*m-l*d)-f*(a*m-u*d)+v*(a*l-u*M)),t[10]=r*(i*m-c*d)-o*(a*m-u*d)+v*(a*c-u*i),t[11]=-(r*(i*l-c*M)-o*(a*l-u*M)+f*(a*c-u*i)),t[12]=-(o*(M*b-h*d)-f*(i*b-s*d)+v*(i*h-s*M)),t[13]=r*(M*b-h*d)-f*(a*b-e*d)+v*(a*h-e*M),t[14]=-(r*(i*b-s*d)-o*(a*b-e*d)+v*(a*s-e*i)),t[15]=r*(i*h-s*M)-o*(a*h-e*M)+f*(a*s-e*i),t}function h(t){var n=t[0],r=t[1],a=t[2],e=t[3],u=t[4],o=t[5],i=t[6],s=t[7],c=t[8],f=t[9],M=t[10],h=t[11],l=t[12],v=t[13],d=t[14],b=t[15];return(n*o-r*u)*(M*b-h*d)-(n*i-a*u)*(f*b-h*v)+(n*s-e*u)*(f*d-M*v)+(r*i-a*o)*(c*b-h*l)-(r*s-e*o)*(c*d-M*l)+(a*s-e*i)*(c*v-f*l)}function l(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],s=n[5],c=n[6],f=n[7],M=n[8],h=n[9],l=n[10],v=n[11],d=n[12],b=n[13],m=n[14],p=n[15],P=r[0],E=r[1],O=r[2],x=r[3];return t[0]=P*a+E*i+O*M+x*d,t[1]=P*e+E*s+O*h+x*b,t[2]=P*u+E*c+O*l+x*m,t[3]=P*o+E*f+O*v+x*p,P=r[4],E=r[5],O=r[6],x=r[7],t[4]=P*a+E*i+O*M+x*d,t[5]=P*e+E*s+O*h+x*b,t[6]=P*u+E*c+O*l+x*m,t[7]=P*o+E*f+O*v+x*p,P=r[8],E=r[9],O=r[10],x=r[11],t[8]=P*a+E*i+O*M+x*d,t[9]=P*e+E*s+O*h+x*b,t[10]=P*u+E*c+O*l+x*m,t[11]=P*o+E*f+O*v+x*p,P=r[12],E=r[13],O=r[14],x=r[15],t[12]=P*a+E*i+O*M+x*d,t[13]=P*e+E*s+O*h+x*b,t[14]=P*u+E*c+O*l+x*m,t[15]=P*o+E*f+O*v+x*p,t}function v(t,n,r){var a=r[0],e=r[1],u=r[2],o=void 0,i=void 0,s=void 0,c=void 0,f=void 0,M=void 0,h=void 0,l=void 0,v=void 0,d=void 0,b=void 0,m=void 0;return n===t?(t[12]=n[0]*a+n[4]*e+n[8]*u+n[12],t[13]=n[1]*a+n[5]*e+n[9]*u+n[13],t[14]=n[2]*a+n[6]*e+n[10]*u+n[14],t[15]=n[3]*a+n[7]*e+n[11]*u+n[15]):(o=n[0],i=n[1],s=n[2],c=n[3],f=n[4],M=n[5],h=n[6],l=n[7],v=n[8],d=n[9],b=n[10],m=n[11],t[0]=o,t[1]=i,t[2]=s,t[3]=c,t[4]=f,t[5]=M,t[6]=h,t[7]=l,t[8]=v,t[9]=d,t[10]=b,t[11]=m,t[12]=o*a+f*e+v*u+n[12],t[13]=i*a+M*e+d*u+n[13],t[14]=s*a+h*e+b*u+n[14],t[15]=c*a+l*e+m*u+n[15]),t}function d(t,n,r){var a=r[0],e=r[1],u=r[2];return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t[3]=n[3]*a,t[4]=n[4]*e,t[5]=n[5]*e,t[6]=n[6]*e,t[7]=n[7]*e,t[8]=n[8]*u,t[9]=n[9]*u,t[10]=n[10]*u,t[11]=n[11]*u,t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],t}function b(t,n,r,a){var e=a[0],u=a[1],o=a[2],i=Math.sqrt(e*e+u*u+o*o),s=void 0,c=void 0,f=void 0,M=void 0,h=void 0,l=void 0,v=void 0,d=void 0,b=void 0,m=void 0,p=void 0,P=void 0,E=void 0,O=void 0,x=void 0,A=void 0,q=void 0,y=void 0,w=void 0,R=void 0,L=void 0,S=void 0,_=void 0,I=void 0;return Math.abs(i)<C.EPSILON?null:(i=1/i,e*=i,u*=i,o*=i,s=Math.sin(r),c=Math.cos(r),f=1-c,M=n[0],h=n[1],l=n[2],v=n[3],d=n[4],b=n[5],m=n[6],p=n[7],P=n[8],E=n[9],O=n[10],x=n[11],A=e*e*f+c,q=u*e*f+o*s,y=o*e*f-u*s,w=e*u*f-o*s,R=u*u*f+c,L=o*u*f+e*s,S=e*o*f+u*s,_=u*o*f-e*s,I=o*o*f+c,t[0]=M*A+d*q+P*y,t[1]=h*A+b*q+E*y,t[2]=l*A+m*q+O*y,t[3]=v*A+p*q+x*y,t[4]=M*w+d*R+P*L,t[5]=h*w+b*R+E*L,t[6]=l*w+m*R+O*L,t[7]=v*w+p*R+x*L,t[8]=M*S+d*_+P*I,t[9]=h*S+b*_+E*I,t[10]=l*S+m*_+O*I,t[11]=v*S+p*_+x*I,n!==t&&(t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t)}function m(t,n,r){var a=Math.sin(r),e=Math.cos(r),u=n[4],o=n[5],i=n[6],s=n[7],c=n[8],f=n[9],M=n[10],h=n[11];return n!==t&&(t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[4]=u*e+c*a,t[5]=o*e+f*a,t[6]=i*e+M*a,t[7]=s*e+h*a,t[8]=c*e-u*a,t[9]=f*e-o*a,t[10]=M*e-i*a,t[11]=h*e-s*a,t}function p(t,n,r){var a=Math.sin(r),e=Math.cos(r),u=n[0],o=n[1],i=n[2],s=n[3],c=n[8],f=n[9],M=n[10],h=n[11];return n!==t&&(t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[0]=u*e-c*a,t[1]=o*e-f*a,t[2]=i*e-M*a,t[3]=s*e-h*a,t[8]=u*a+c*e,t[9]=o*a+f*e,t[10]=i*a+M*e,t[11]=s*a+h*e,t}function P(t,n,r){var a=Math.sin(r),e=Math.cos(r),u=n[0],o=n[1],i=n[2],s=n[3],c=n[4],f=n[5],M=n[6],h=n[7];return n!==t&&(t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[0]=u*e+c*a,t[1]=o*e+f*a,t[2]=i*e+M*a,t[3]=s*e+h*a,t[4]=c*e-u*a,t[5]=f*e-o*a,t[6]=M*e-i*a,t[7]=h*e-s*a,t}function E(t,n){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=n[0],t[13]=n[1],t[14]=n[2],t[15]=1,t}function O(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=n[1],t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=n[2],t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function x(t,n,r){var a=r[0],e=r[1],u=r[2],o=Math.sqrt(a*a+e*e+u*u),i=void 0,s=void 0,c=void 0;return Math.abs(o)<C.EPSILON?null:(o=1/o,a*=o,e*=o,u*=o,i=Math.sin(n),s=Math.cos(n),c=1-s,t[0]=a*a*c+s,t[1]=e*a*c+u*i,t[2]=u*a*c-e*i,t[3]=0,t[4]=a*e*c-u*i,t[5]=e*e*c+s,t[6]=u*e*c+a*i,t[7]=0,t[8]=a*u*c+e*i,t[9]=e*u*c-a*i,t[10]=u*u*c+s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t)}function A(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=a,t[6]=r,t[7]=0,t[8]=0,t[9]=-r,t[10]=a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function q(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=a,t[1]=0,t[2]=-r,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=r,t[9]=0,t[10]=a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function y(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=a,t[1]=r,t[2]=0,t[3]=0,t[4]=-r,t[5]=a,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function w(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=a+a,s=e+e,c=u+u,f=a*i,M=a*s,h=a*c,l=e*s,v=e*c,d=u*c,b=o*i,m=o*s,p=o*c;return t[0]=1-(l+d),t[1]=M+p,t[2]=h-m,t[3]=0,t[4]=M-p,t[5]=1-(f+d),t[6]=v+b,t[7]=0,t[8]=h+m,t[9]=v-b,t[10]=1-(f+l),t[11]=0,t[12]=r[0],t[13]=r[1],t[14]=r[2],t[15]=1,t}function R(t,n){return t[0]=n[12],t[1]=n[13],t[2]=n[14],t}function L(t,n){var r=n[0],a=n[1],e=n[2],u=n[4],o=n[5],i=n[6],s=n[8],c=n[9],f=n[10];return t[0]=Math.sqrt(r*r+a*a+e*e),t[1]=Math.sqrt(u*u+o*o+i*i),t[2]=Math.sqrt(s*s+c*c+f*f),t}function S(t,n){var r=n[0]+n[5]+n[10],a=0;return r>0?(a=2*Math.sqrt(r+1),t[3]=.25*a,t[0]=(n[6]-n[9])/a,t[1]=(n[8]-n[2])/a,t[2]=(n[1]-n[4])/a):n[0]>n[5]&n[0]>n[10]?(a=2*Math.sqrt(1+n[0]-n[5]-n[10]),t[3]=(n[6]-n[9])/a,t[0]=.25*a,t[1]=(n[1]+n[4])/a,t[2]=(n[8]+n[2])/a):n[5]>n[10]?(a=2*Math.sqrt(1+n[5]-n[0]-n[10]),t[3]=(n[8]-n[2])/a,t[0]=(n[1]+n[4])/a,t[1]=.25*a,t[2]=(n[6]+n[9])/a):(a=2*Math.sqrt(1+n[10]-n[0]-n[5]),t[3]=(n[1]-n[4])/a,t[0]=(n[8]+n[2])/a,t[1]=(n[6]+n[9])/a,t[2]=.25*a),t}function _(t,n,r,a){var e=n[0],u=n[1],o=n[2],i=n[3],s=e+e,c=u+u,f=o+o,M=e*s,h=e*c,l=e*f,v=u*c,d=u*f,b=o*f,m=i*s,p=i*c,P=i*f,E=a[0],O=a[1],x=a[2];return t[0]=(1-(v+b))*E,t[1]=(h+P)*E,t[2]=(l-p)*E,t[3]=0,t[4]=(h-P)*O,t[5]=(1-(M+b))*O,t[6]=(d+m)*O,t[7]=0,t[8]=(l+p)*x,t[9]=(d-m)*x,t[10]=(1-(M+v))*x,t[11]=0,t[12]=r[0],t[13]=r[1],t[14]=r[2],t[15]=1,t}function I(t,n,r,a,e){var u=n[0],o=n[1],i=n[2],s=n[3],c=u+u,f=o+o,M=i+i,h=u*c,l=u*f,v=u*M,d=o*f,b=o*M,m=i*M,p=s*c,P=s*f,E=s*M,O=a[0],x=a[1],A=a[2],q=e[0],y=e[1],w=e[2];return t[0]=(1-(d+m))*O,t[1]=(l+E)*O,t[2]=(v-P)*O,t[3]=0,t[4]=(l-E)*x,t[5]=(1-(h+m))*x,t[6]=(b+p)*x,t[7]=0,t[8]=(v+P)*A,t[9]=(b-p)*A,t[10]=(1-(h+d))*A,t[11]=0,t[12]=r[0]+q-(t[0]*q+t[4]*y+t[8]*w),t[13]=r[1]+y-(t[1]*q+t[5]*y+t[9]*w),t[14]=r[2]+w-(t[2]*q+t[6]*y+t[10]*w),t[15]=1,t}function N(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=r+r,i=a+a,s=e+e,c=r*o,f=a*o,M=a*i,h=e*o,l=e*i,v=e*s,d=u*o,b=u*i,m=u*s;return t[0]=1-M-v,t[1]=f+m,t[2]=h-b,t[3]=0,t[4]=f-m,t[5]=1-c-v,t[6]=l+d,t[7]=0,t[8]=h+b,t[9]=l-d,t[10]=1-c-M,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function Y(t,n,r,a,e,u,o){var i=1/(r-n),s=1/(e-a),c=1/(u-o);return t[0]=2*u*i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=2*u*s,t[6]=0,t[7]=0,t[8]=(r+n)*i,t[9]=(e+a)*s,t[10]=(o+u)*c,t[11]=-1,t[12]=0,t[13]=0,t[14]=o*u*2*c,t[15]=0,t}function g(t,n,r,a,e){var u=1/Math.tan(n/2),o=1/(a-e);return t[0]=u/r,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=u,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=(e+a)*o,t[11]=-1,t[12]=0,t[13]=0,t[14]=2*e*a*o,t[15]=0,t}function T(t,n,r,a){var e=Math.tan(n.upDegrees*Math.PI/180),u=Math.tan(n.downDegrees*Math.PI/180),o=Math.tan(n.leftDegrees*Math.PI/180),i=Math.tan(n.rightDegrees*Math.PI/180),s=2/(o+i),c=2/(e+u);return t[0]=s,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=c,t[6]=0,t[7]=0,t[8]=-(o-i)*s*.5,t[9]=(e-u)*c*.5,t[10]=a/(r-a),t[11]=-1,t[12]=0,t[13]=0,t[14]=a*r/(r-a),t[15]=0,t}function j(t,n,r,a,e,u,o){var i=1/(n-r),s=1/(a-e),c=1/(u-o);return t[0]=-2*i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*s,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*c,t[11]=0,t[12]=(n+r)*i,t[13]=(e+a)*s,t[14]=(o+u)*c,t[15]=1,t}function D(t,n,r,a){var e=void 0,u=void 0,o=void 0,i=void 0,s=void 0,c=void 0,f=void 0,M=void 0,h=void 0,l=void 0,v=n[0],d=n[1],b=n[2],m=a[0],p=a[1],P=a[2],E=r[0],O=r[1],x=r[2];return Math.abs(v-E)<C.EPSILON&&Math.abs(d-O)<C.EPSILON&&Math.abs(b-x)<C.EPSILON?mat4.identity(t):(f=v-E,M=d-O,h=b-x,l=1/Math.sqrt(f*f+M*M+h*h),f*=l,M*=l,h*=l,e=p*h-P*M,u=P*f-m*h,o=m*M-p*f,l=Math.sqrt(e*e+u*u+o*o),l?(l=1/l,e*=l,u*=l,o*=l):(e=0,u=0,o=0),i=M*o-h*u,s=h*e-f*o,c=f*u-M*e,l=Math.sqrt(i*i+s*s+c*c),l?(l=1/l,i*=l,s*=l,c*=l):(i=0,s=0,c=0),t[0]=e,t[1]=i,t[2]=f,t[3]=0,t[4]=u,t[5]=s,t[6]=M,t[7]=0,t[8]=o,t[9]=c,t[10]=h,t[11]=0,t[12]=-(e*v+u*d+o*b),t[13]=-(i*v+s*d+c*b),t[14]=-(f*v+M*d+h*b),t[15]=1,t)}function V(t,n,r,a){var e=n[0],u=n[1],o=n[2],i=a[0],s=a[1],c=a[2],f=e-r[0],M=u-r[1],h=o-r[2],l=f*f+M*M+h*h;l>0&&(l=1/Math.sqrt(l),f*=l,M*=l,h*=l);var v=s*h-c*M,d=c*f-i*h,b=i*M-s*f;return t[0]=v,t[1]=d,t[2]=b,t[3]=0,t[4]=M*b-h*d,t[5]=h*v-f*b,t[6]=f*d-M*v,t[7]=0,t[8]=f,t[9]=M,t[10]=h,t[11]=0,t[12]=e,t[13]=u,t[14]=o,t[15]=1,t}function z(t){return"mat4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+", "+t[9]+", "+t[10]+", "+t[11]+", "+t[12]+", "+t[13]+", "+t[14]+", "+t[15]+")"}function F(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2)+Math.pow(t[4],2)+Math.pow(t[5],2)+Math.pow(t[6],2)+Math.pow(t[7],2)+Math.pow(t[8],2)+Math.pow(t[9],2)+Math.pow(t[10],2)+Math.pow(t[11],2)+Math.pow(t[12],2)+Math.pow(t[13],2)+Math.pow(t[14],2)+Math.pow(t[15],2))}function Q(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t[3]=n[3]+r[3],t[4]=n[4]+r[4],t[5]=n[5]+r[5],t[6]=n[6]+r[6],t[7]=n[7]+r[7],t[8]=n[8]+r[8],t[9]=n[9]+r[9],t[10]=n[10]+r[10],t[11]=n[11]+r[11],t[12]=n[12]+r[12],t[13]=n[13]+r[13],t[14]=n[14]+r[14],t[15]=n[15]+r[15],t}function X(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t[3]=n[3]-r[3],t[4]=n[4]-r[4],t[5]=n[5]-r[5],t[6]=n[6]-r[6],t[7]=n[7]-r[7],t[8]=n[8]-r[8],t[9]=n[9]-r[9],t[10]=n[10]-r[10],t[11]=n[11]-r[11],t[12]=n[12]-r[12],t[13]=n[13]-r[13],t[14]=n[14]-r[14],t[15]=n[15]-r[15],t}function Z(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=n[3]*r,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=n[7]*r,t[8]=n[8]*r,t[9]=n[9]*r,t[10]=n[10]*r,t[11]=n[11]*r,t[12]=n[12]*r,t[13]=n[13]*r,t[14]=n[14]*r,t[15]=n[15]*r,t}function k(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t[2]=n[2]+r[2]*a,t[3]=n[3]+r[3]*a,t[4]=n[4]+r[4]*a,t[5]=n[5]+r[5]*a,t[6]=n[6]+r[6]*a,t[7]=n[7]+r[7]*a,t[8]=n[8]+r[8]*a,t[9]=n[9]+r[9]*a,t[10]=n[10]+r[10]*a,t[11]=n[11]+r[11]*a,t[12]=n[12]+r[12]*a,t[13]=n[13]+r[13]*a,t[14]=n[14]+r[14]*a,t[15]=n[15]+r[15]*a,t}function U(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]&&t[4]===n[4]&&t[5]===n[5]&&t[6]===n[6]&&t[7]===n[7]&&t[8]===n[8]&&t[9]===n[9]&&t[10]===n[10]&&t[11]===n[11]&&t[12]===n[12]&&t[13]===n[13]&&t[14]===n[14]&&t[15]===n[15]}function W(t,n){var r=t[0],a=t[1],e=t[2],u=t[3],o=t[4],i=t[5],s=t[6],c=t[7],f=t[8],M=t[9],h=t[10],l=t[11],v=t[12],d=t[13],b=t[14],m=t[15],p=n[0],P=n[1],E=n[2],O=n[3],x=n[4],A=n[5],q=n[6],y=n[7],w=n[8],R=n[9],L=n[10],S=n[11],_=n[12],I=n[13],N=n[14],Y=n[15];return Math.abs(r-p)<=C.EPSILON*Math.max(1,Math.abs(r),Math.abs(p))&&Math.abs(a-P)<=C.EPSILON*Math.max(1,Math.abs(a),Math.abs(P))&&Math.abs(e-E)<=C.EPSILON*Math.max(1,Math.abs(e),Math.abs(E))&&Math.abs(u-O)<=C.EPSILON*Math.max(1,Math.abs(u),Math.abs(O))&&Math.abs(o-x)<=C.EPSILON*Math.max(1,Math.abs(o),Math.abs(x))&&Math.abs(i-A)<=C.EPSILON*Math.max(1,Math.abs(i),Math.abs(A))&&Math.abs(s-q)<=C.EPSILON*Math.max(1,Math.abs(s),Math.abs(q))&&Math.abs(c-y)<=C.EPSILON*Math.max(1,Math.abs(c),Math.abs(y))&&Math.abs(f-w)<=C.EPSILON*Math.max(1,Math.abs(f),Math.abs(w))&&Math.abs(M-R)<=C.EPSILON*Math.max(1,Math.abs(M),Math.abs(R))&&Math.abs(h-L)<=C.EPSILON*Math.max(1,Math.abs(h),Math.abs(L))&&Math.abs(l-S)<=C.EPSILON*Math.max(1,Math.abs(l),Math.abs(S))&&Math.abs(v-_)<=C.EPSILON*Math.max(1,Math.abs(v),Math.abs(_))&&Math.abs(d-I)<=C.EPSILON*Math.max(1,Math.abs(d),Math.abs(I))&&Math.abs(b-N)<=C.EPSILON*Math.max(1,Math.abs(b),Math.abs(N))&&Math.abs(m-Y)<=C.EPSILON*Math.max(1,Math.abs(m),Math.abs(Y))}Object.defineProperty(n,"__esModule",{value:!0}),n.sub=n.mul=void 0,n.create=a,n.clone=e,n.copy=u,n.fromValues=o,n.set=i,n.identity=s,n.transpose=c,n.invert=f,n.adjoint=M,n.determinant=h,n.multiply=l,n.translate=v,n.scale=d,n.rotate=b,n.rotateX=m,n.rotateY=p,n.rotateZ=P,n.fromTranslation=E,n.fromScaling=O,n.fromRotation=x,n.fromXRotation=A,n.fromYRotation=q,n.fromZRotation=y,n.fromRotationTranslation=w,n.getTranslation=R,n.getScaling=L,n.getRotation=S,n.fromRotationTranslationScale=_,n.fromRotationTranslationScaleOrigin=I,n.fromQuat=N,n.frustum=Y,n.perspective=g,n.perspectiveFromFieldOfView=T,n.ortho=j,n.lookAt=D,n.targetTo=V,n.str=z,n.frob=F,n.add=Q,n.subtract=X,n.multiplyScalar=Z,n.multiplyScalarAndAdd=k,n.exactEquals=U,n.equals=W;var B=r(0),C=function(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n.default=t,n}(B);n.mul=l,n.sub=X},function(t,n,r){"use strict";function a(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n.default=t,n}function e(){var t=new E.ARRAY_TYPE(4);return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t}function u(t){return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t}function o(t,n,r){r*=.5;var a=Math.sin(r);return t[0]=a*n[0],t[1]=a*n[1],t[2]=a*n[2],t[3]=Math.cos(r),t}function i(t,n){var r=2*Math.acos(n[3]),a=Math.sin(r/2);return 0!=a?(t[0]=n[0]/a,t[1]=n[1]/a,t[2]=n[2]/a):(t[0]=1,t[1]=0,t[2]=0),r}function s(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=r[0],s=r[1],c=r[2],f=r[3];return t[0]=a*f+o*i+e*c-u*s,t[1]=e*f+o*s+u*i-a*c,t[2]=u*f+o*c+a*s-e*i,t[3]=o*f-a*i-e*s-u*c,t}function c(t,n,r){r*=.5;var a=n[0],e=n[1],u=n[2],o=n[3],i=Math.sin(r),s=Math.cos(r);return t[0]=a*s+o*i,t[1]=e*s+u*i,t[2]=u*s-e*i,t[3]=o*s-a*i,t}function f(t,n,r){r*=.5;var a=n[0],e=n[1],u=n[2],o=n[3],i=Math.sin(r),s=Math.cos(r);return t[0]=a*s-u*i,t[1]=e*s+o*i,t[2]=u*s+a*i,t[3]=o*s-e*i,t}function M(t,n,r){r*=.5;var a=n[0],e=n[1],u=n[2],o=n[3],i=Math.sin(r),s=Math.cos(r);return t[0]=a*s+e*i,t[1]=e*s-a*i,t[2]=u*s+o*i,t[3]=o*s-u*i,t}function h(t,n){var r=n[0],a=n[1],e=n[2];return t[0]=r,t[1]=a,t[2]=e,t[3]=Math.sqrt(Math.abs(1-r*r-a*a-e*e)),t}function l(t,n,r,a){var e=n[0],u=n[1],o=n[2],i=n[3],s=r[0],c=r[1],f=r[2],M=r[3],h=void 0,l=void 0,v=void 0,d=void 0,b=void 0;return l=e*s+u*c+o*f+i*M,l<0&&(l=-l,s=-s,c=-c,f=-f,M=-M),1-l>1e-6?(h=Math.acos(l),v=Math.sin(h),d=Math.sin((1-a)*h)/v,b=Math.sin(a*h)/v):(d=1-a,b=a),t[0]=d*e+b*s,t[1]=d*u+b*c,t[2]=d*o+b*f,t[3]=d*i+b*M,t}function v(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=r*r+a*a+e*e+u*u,i=o?1/o:0;return t[0]=-r*i,t[1]=-a*i,t[2]=-e*i,t[3]=u*i,t}function d(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=n[3],t}function b(t,n){var r=n[0]+n[4]+n[8],a=void 0;if(r>0)a=Math.sqrt(r+1),t[3]=.5*a,a=.5/a,t[0]=(n[5]-n[7])*a,t[1]=(n[6]-n[2])*a,t[2]=(n[1]-n[3])*a;else{var e=0;n[4]>n[0]&&(e=1),n[8]>n[3*e+e]&&(e=2);var u=(e+1)%3,o=(e+2)%3;a=Math.sqrt(n[3*e+e]-n[3*u+u]-n[3*o+o]+1),t[e]=.5*a,a=.5/a,t[3]=(n[3*u+o]-n[3*o+u])*a,t[u]=(n[3*u+e]+n[3*e+u])*a,t[o]=(n[3*o+e]+n[3*e+o])*a}return t}function m(t,n,r,a){var e=.5*Math.PI/180;n*=e,r*=e,a*=e;var u=Math.sin(n),o=Math.cos(n),i=Math.sin(r),s=Math.cos(r),c=Math.sin(a),f=Math.cos(a);return t[0]=u*s*f-o*i*c,t[1]=o*i*f+u*s*c,t[2]=o*s*c-u*i*f,t[3]=o*s*f+u*i*c,t}function p(t){return"quat("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"}Object.defineProperty(n,"__esModule",{value:!0}),n.setAxes=n.sqlerp=n.rotationTo=n.equals=n.exactEquals=n.normalize=n.sqrLen=n.squaredLength=n.len=n.length=n.lerp=n.dot=n.scale=n.mul=n.add=n.set=n.copy=n.fromValues=n.clone=void 0,n.create=e,n.identity=u,n.setAxisAngle=o,n.getAxisAngle=i,n.multiply=s,n.rotateX=c,n.rotateY=f,n.rotateZ=M,n.calculateW=h,n.slerp=l,n.invert=v,n.conjugate=d,n.fromMat3=b,n.fromEuler=m,n.str=p;var P=r(0),E=a(P),O=r(1),x=a(O),A=r(2),q=a(A),y=r(3),w=a(y),R=(n.clone=w.clone,n.fromValues=w.fromValues,n.copy=w.copy,n.set=w.set,n.add=w.add,n.mul=s,n.scale=w.scale,n.dot=w.dot,n.lerp=w.lerp,n.length=w.length),L=(n.len=R,n.squaredLength=w.squaredLength),S=(n.sqrLen=L,n.normalize=w.normalize);n.exactEquals=w.exactEquals,n.equals=w.equals,n.rotationTo=function(){var t=q.create(),n=q.fromValues(1,0,0),r=q.fromValues(0,1,0);return function(a,e,u){var i=q.dot(e,u);return i<-.999999?(q.cross(t,n,e),q.len(t)<1e-6&&q.cross(t,r,e),q.normalize(t,t),o(a,t,Math.PI),a):i>.999999?(a[0]=0,a[1]=0,a[2]=0,a[3]=1,a):(q.cross(t,e,u),a[0]=t[0],a[1]=t[1],a[2]=t[2],a[3]=1+i,S(a,a))}}(),n.sqlerp=function(){var t=e(),n=e();return function(r,a,e,u,o,i){return l(t,a,o,i),l(n,e,u,i),l(r,t,n,2*i*(1-i)),r}}(),n.setAxes=function(){var t=x.create();return function(n,r,a,e){return t[0]=a[0],t[3]=a[1],t[6]=a[2],t[1]=e[0],t[4]=e[1],t[7]=e[2],t[2]=-r[0],t[5]=-r[1],t[8]=-r[2],S(n,b(n,t))}}()},function(t,n,r){"use strict";function a(){var t=new V.ARRAY_TYPE(2);return t[0]=0,t[1]=0,t}function e(t){var n=new V.ARRAY_TYPE(2);return n[0]=t[0],n[1]=t[1],n}function u(t,n){var r=new V.ARRAY_TYPE(2);return r[0]=t,r[1]=n,r}function o(t,n){return t[0]=n[0],t[1]=n[1],t}function i(t,n,r){return t[0]=n,t[1]=r,t}function s(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t}function c(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t}function f(t,n,r){return t[0]=n[0]*r[0],t[1]=n[1]*r[1],t}function M(t,n,r){return t[0]=n[0]/r[0],t[1]=n[1]/r[1],t}function h(t,n){return t[0]=Math.ceil(n[0]),t[1]=Math.ceil(n[1]),t}function l(t,n){return t[0]=Math.floor(n[0]),t[1]=Math.floor(n[1]),t}function v(t,n,r){return t[0]=Math.min(n[0],r[0]),t[1]=Math.min(n[1],r[1]),t}function d(t,n,r){return t[0]=Math.max(n[0],r[0]),t[1]=Math.max(n[1],r[1]),t}function b(t,n){return t[0]=Math.round(n[0]),t[1]=Math.round(n[1]),t}function m(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t}function p(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t}function P(t,n){var r=n[0]-t[0],a=n[1]-t[1];return Math.sqrt(r*r+a*a)}function E(t,n){var r=n[0]-t[0],a=n[1]-t[1];return r*r+a*a}function O(t){var n=t[0],r=t[1];return Math.sqrt(n*n+r*r)}function x(t){var n=t[0],r=t[1];return n*n+r*r}function A(t,n){return t[0]=-n[0],t[1]=-n[1],t}function q(t,n){return t[0]=1/n[0],t[1]=1/n[1],t}function y(t,n){var r=n[0],a=n[1],e=r*r+a*a;return e>0&&(e=1/Math.sqrt(e),t[0]=n[0]*e,t[1]=n[1]*e),t}function w(t,n){return t[0]*n[0]+t[1]*n[1]}function R(t,n,r){var a=n[0]*r[1]-n[1]*r[0];return t[0]=t[1]=0,t[2]=a,t}function L(t,n,r,a){var e=n[0],u=n[1];return t[0]=e+a*(r[0]-e),t[1]=u+a*(r[1]-u),t}function S(t,n){n=n||1;var r=2*V.RANDOM()*Math.PI;return t[0]=Math.cos(r)*n,t[1]=Math.sin(r)*n,t}function _(t,n,r){var a=n[0],e=n[1];return t[0]=r[0]*a+r[2]*e,t[1]=r[1]*a+r[3]*e,t}function I(t,n,r){var a=n[0],e=n[1];return t[0]=r[0]*a+r[2]*e+r[4],t[1]=r[1]*a+r[3]*e+r[5],t}function N(t,n,r){var a=n[0],e=n[1];return t[0]=r[0]*a+r[3]*e+r[6],t[1]=r[1]*a+r[4]*e+r[7],t}function Y(t,n,r){var a=n[0],e=n[1];return t[0]=r[0]*a+r[4]*e+r[12],t[1]=r[1]*a+r[5]*e+r[13],t}function g(t){return"vec2("+t[0]+", "+t[1]+")"}function T(t,n){return t[0]===n[0]&&t[1]===n[1]}function j(t,n){var r=t[0],a=t[1],e=n[0],u=n[1];return Math.abs(r-e)<=V.EPSILON*Math.max(1,Math.abs(r),Math.abs(e))&&Math.abs(a-u)<=V.EPSILON*Math.max(1,Math.abs(a),Math.abs(u))}Object.defineProperty(n,"__esModule",{value:!0}),n.forEach=n.sqrLen=n.sqrDist=n.dist=n.div=n.mul=n.sub=n.len=void 0,n.create=a,n.clone=e,n.fromValues=u,n.copy=o,n.set=i,n.add=s,n.subtract=c,n.multiply=f,n.divide=M,n.ceil=h,n.floor=l,n.min=v,n.max=d,n.round=b,n.scale=m,n.scaleAndAdd=p,n.distance=P,n.squaredDistance=E,n.length=O,n.squaredLength=x,n.negate=A,n.inverse=q,n.normalize=y,n.dot=w,n.cross=R,n.lerp=L,n.random=S,n.transformMat2=_,n.transformMat2d=I,n.transformMat3=N,n.transformMat4=Y,n.str=g,n.exactEquals=T,n.equals=j;var D=r(0),V=function(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n.default=t,n}(D);n.len=O,n.sub=c,n.mul=f,n.div=M,n.dist=P,n.sqrDist=E,n.sqrLen=x,n.forEach=function(){var t=a();return function(n,r,a,e,u,o){var i=void 0,s=void 0;for(r||(r=2),a||(a=0),s=e?Math.min(e*r+a,n.length):n.length,i=a;i<s;i+=r)t[0]=n[i],t[1]=n[i+1],u(t,t,o),n[i]=t[0],n[i+1]=t[1];return n}}()}])});
"use strict";
var RedGL;
(function () {
    var getGL;
    var redGLDetect;
    var glInitialize;
    /*
        webgl 관련 디텍팅
    */
    redGLDetect = (function () {
        var checkList, i, k;
        return function (gl) {
            if (!(this instanceof redGLDetect)) return new redGLDetect(gl)
            checkList = (
                'VENDOR,VERSION,SHADING_LANGUAGE_VERSION,RENDERER,MAX_VERTEX_ATTRIBS,MAX_VARYING_VECTORS,MAX_VERTEX_UNIFORM_VECTORS,' +
                'MAX_VERTEX_TEXTURE_IMAGE_UNITS,MAX_FRAGMENT_UNIFORM_VECTORS,MAX_TEXTURE_SIZE,MAX_CUBE_MAP_TEXTURE_SIZE,' +
                'MAX_COMBINED_TEXTURE_IMAGE_UNITS,MAX_TEXTURE_IMAGE_UNITS,MAX_RENDERBUFFER_SIZE,MAX_VIEWPORT_DIMS,' +
                'RED_BITS,GREEN_BITS,BLUE_BITS,ALPHA_BITS,DEPTH_BITS,STENCIL_BITS'
            ).split(',');
            i = checkList.length
            while (i--) this[k = checkList[i]] = gl.getParameter(gl[k]);
        }
    })();
    /*
        gl 컨텍스트 찾기
    */
    getGL = (function () {
        var checkList; // 체크할 리스트
        var OPTION; // 기본초기화 옵션 리스트
        var t0, t1, i;
        var initOption;
        OPTION = {
            alpha: false,
            depth: true,
            stencil: false,
            antialias: true,
            premultipliedAlpha: false,
            preserveDrawingBuffer: false,
            powerPreference: 'default', // default, high-performance, low-power
            failIfMajorPerformanceCaveat: false
        }
        // checkList = 'webkit-3d,moz-webgl,3d,experimental-webgl,webgl,webgl2'.split(',')
        checkList = 'webkit-3d,moz-webgl,3d,experimental-webgl,webgl'.split(',')
        return function (canvas, option) {
            initOption = JSON.parse(JSON.stringify(OPTION));
            i = checkList.length;
            if (option) for (i in option) initOption[i] = option[i];
            while (i--) if (t0 = canvas.getContext(t1 = checkList[i], initOption)) return t0['version'] = t1, t0;
            return null;
        }
    })();
    glInitialize = function (gl) {
        // 뎁스데스티 설정
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS)
        // 컬링 페이스 설정
        gl.frontFace(gl.CCW)
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK)
        gl.enable(gl.SCISSOR_TEST);
    }
    /**DOC:
		{
			constructorYn : true,
			title :`RedGL`,
            description : `
                RedGL 인스턴스 생성자.
                WebGL 초기화를 담당하며, 단일 월드를 소유한다.

			`,
			params : {
				canvas : [
					{type:'Canvas Element'}
				],
				callback :[
					{type:'function'},
                    `컨텍스트 초기화이후 실행될 콜백`,
                    `리턴인자로 true,false를 반환한다`
                ],
                option : [
                    {type:'Object'},
                    `초기화 옵션을 지정한다.`,
                    `
                    <pre>
                    {
                        alpha: false,
                        depth: true,
                        stencil: false,
                        antialias: true,
                        premultipliedAlpha: false,
                        preserveDrawingBuffer: false,
                        powerPreference: 'default', // default, high-performance, low-power
                        failIfMajorPerformanceCaveat: false
                    }
                    </pre>
                    `
				],
			},
			example : `
				// 기초 초기화
				RedGL(document.getElementById('test'), function(v){
                     // 콜백내용 
                     // 성공,실패에 따라 v값이 true or false.
                     if(v){
                         // 초기화 성공
                     }else{
                         // 초기화실패
                     }
                })
			`,
			return : 'RedGL Instance'
		}
	:DOC*/
    RedGL = function (canvas, callback, option) {
        var _tGL, _self;
        var _fullMode, _renderScale;
        if (!(this instanceof RedGL)) return new RedGL(canvas, callback);
        if (!(canvas instanceof Element) || (canvas['tagName'] != 'CANVAS')) RedGL.throwFunc('RedGL : Canvas Element만 허용');

        _self = this;
        _fullMode = true;
        _renderScale = 1;

        this['canvas'] = canvas;
        /**DOC:
		{
            title :`renderScale`,
            code: `PROPERTY`,
            description : `
                기본값 : 1
                렌더링시 사용할 적용할 렌더링 스케일                
                size 1024*768, renderScale 0.5 일경우 512 * 389로 렌더링된다
			`,
			return : 'void'
		}
	    :DOC*/
        Object.defineProperty(this, 'renderScale', {
            get: function () { return _renderScale },
            set: function (v) {
                _renderScale = v
                this.setSize(this['_width'], this['_height'])
            }
        });
        /**DOC:
		{
            title :`fullMode`,
            code: `PROPERTY`,
            description : `
                기본값 : true
                캔버스크기를 화면 전체사이즈로 설정할지 여부
			`,
			return : 'void'
		}
	    :DOC*/
        Object.defineProperty(this, 'fullMode', {
            get: function () { return _fullMode },
            set: function (v) {
                if (typeof v != 'boolean') RedGL.throwFunc('RedGL : Boolean만 가능.')
                _fullMode = v
                this.setSize(this['_width'], this['_height'])
            }
        });
        this['_width'] = 500;
        this['_height'] = 500;
        this['gl'] = _tGL = getGL(canvas);
        if (_tGL) this['_detect'] = redGLDetect(_tGL, option);
        this['_datas'] = {};
        this['_UUID'] = RedGL['makeUUID']();
        ////
        glInitialize(_tGL);
        requestAnimationFrame(function (v) {
            callback ? callback.call(_self, _tGL ? true : false) : 0;
            window.addEventListener('resize', function () { _self.setSize(_self['_width'], _self['_height']) });
            _self.setSize(_self['_width'], _self['_height']);
        });
        console.log(this)
    };
    /**DOC:
        {
            constructorYn : true,
            title :`RedGL.makeUUID`,
            description : `
                UUID 생성기
            `,
            example : `
                // 기초 초기화
                RedGL.makeUUID()
            `,
            return : 'int'
        }
    :DOC*/
    RedGL['makeUUID'] = (function () {
        var UUID = 0
        return function () { return UUID++ }
    })();
    RedGL['throwFunc'] = function () { throw Array.prototype.slice.call(arguments).join(' ') },
    RedGL['extendsProto'] = function (target, from) {
        for (var k in from.prototype) target.prototype[k] = from.prototype[k]
    };
    RedGL.prototype = {
        /**DOC:
        {
            title :`setSize`,
            code: `FUNCTION`,
            description : `
                RedGL 인스턴스의 Canvas 사이즈 설정
                fullMode 속성이 false일때만 적용.
            `,
            example : `
                RedGL(document.getElementById('test'), function(v){
                     if(v){
                         // 초기화 성공
                         this.setSize(200,200)
                     }else{
                         // 초기화실패
                     }
                })
            `,
            return : 'void'
        }
        :DOC*/
        setSize: (function () {
            var W, H;
            var prevW, prevH
            var ratio;
            var tCanvas;
            prevW = 0, prevH = 0;
            return function (width, height) {
                if (this.fullMode) {
                    W = document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;
                    H = window.innerHeight;
                } else {
                    if (width == undefined) RedGL.throwFunc('RedGL : width가 입력되지 않았습니다.')
                    if (height == undefined) RedGL.throwFunc('RedGL : height가 입력되지 않았습니다.')
                    this['_width'] = W = width;
                    this['_height'] = H = height;
                }

                ratio = window.devicePixelRatio || 1;
                tCanvas = this.canvas;
                console.log(this.renderScale)
                if (prevW != W || prevH != H) {
                    tCanvas.width = W * ratio * this.renderScale;
                    tCanvas.height = H * ratio * this.renderScale;
                    tCanvas.style.width = W;
                    tCanvas.style.height = H;
                    console.log('RedGL canvas setSize : ', this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
                    prevW = W;
                    prevH = H;
                }
            }
        })()
    };
    Object.freeze(RedGL);
})();
"use strict";
var RedBaseContainer;
(function () {
    RedBaseContainer = function () { }
    RedBaseContainer.prototype = {
        addChild: function (v) {
            if (this.children.indexOf(v) == -1) this.children.push(v)
        },
        addChildAt: function (v) {
            // TODO:
        },
        removeChild: function (v) {
            // TODO:
        },
        removeChildAt: function (v) {
            // TODO:
        },
        getChildAt: function (v) {
            // TODO: 
        },
        getChildIndex: function (v) {
            // TODO: 
        },
        getChildByName: function () {

        },
        setChildIndex: function (v) {
            // TODO: 
        },
        numChildren: function (v) {
            // TODO: 
        }
    };
    Object.freeze(RedBaseContainer);
})();

"use strict";
var RedBaseObject3D;
(function () {
    RedBaseObject3D = function () { }
    RedBaseObject3D.prototype = {
        lookAt: (function () {
            var deltaX, deltaY, deltaZ;
            var rotX;
            var HPI;
            var TO_DEGREE;
            TO_DEGREE = 180/Math.PI;
            HPI = 0.5 * Math.PI;
            return function (x, y, z) {
                deltaX = x - this.x;
                deltaY = y - this.y;
                deltaZ = z - this.z;
                rotX = Math.atan2(deltaZ, Math.sqrt(deltaX * deltaX + deltaY * deltaY));
                this.rotationX = (rotX - HPI)*TO_DEGREE;
                this.rotationY = 0;
                this.rotationZ = (-Math.atan2(deltaX, deltaY))*TO_DEGREE;
            }
        })()
    };
    Object.freeze(RedBaseObject3D);
})();

"use strict";
var RedRenderer;
(function () {
    /**DOC:
    {
        constructorYn : true,
        title :`RedRenderer`,
        description : `
            RedRenderer 인스턴스 생성자.
        `,
        return : 'RedRenderer Instance'
    }
	:DOC*/
    RedRenderer = function () {
        if (!(this instanceof RedRenderer)) return new RedRenderer();
        this.world = null;
        this['_tickKey'] = null;
        this['_callback'] = null;
        this['_UUID'] = RedGL['makeUUID']();
        this['renderInfo'] = {}
        Object.seal(this)
    };
    RedRenderer.prototype = {
        /**DOC:
        {
            code:`FUNCTION`,
            title :`start`,
            description : `
                렌더 시작
            `,
            params : {
                gl : [
                    {type : "webgl context"},
                    'webgl context'
                ]
            },
            return : 'void'
        }
        :DOC*/
        start: (function () {
            var tick;
            var self, tRedGL;
            tick = function (time) {
                self.worldRender(tRedGL, time);
                self['_callback'] ? self['_callback'](time) : 0
                self['_tickKey'] = requestAnimationFrame(tick);
            }
            return function (redGL, callback) {
                if (!(redGL instanceof RedGL)) RedGL.throwFunc('RedGL 인스턴스만 허용');
                if (!(redGL.world instanceof RedWorld)) RedGL.throwFunc('RedWorld 인스턴스만 허용');
                self = this;
                self.world = redGL.world;
                tRedGL = redGL
                self['_tickKey'] = requestAnimationFrame(tick);
                self['_callback'] = callback
            }
        })(),
        /**DOC:
        {
            code:`FUNCTION`,
            title :`stop`,
            description : `
                렌더 중지
            `,
            return : 'void'
        }
        :DOC*/
        stop: function () {
            cancelAnimationFrame(this['_tickKey'])
        }
    };
    /**DOC:
    {
        code:`FUNCTION`,
        title :`worldRender`,
        description : `
            등록된 RedView을 기반으로 렌더링을 실행함
        `,
        params : {
            gl : [
                {type : "webgl context"},
                'webgl context'
            ]
        },
        return : 'void'
    }
    :DOC*/
    RedRenderer.prototype.worldRender = (function () {
        var worldRect, viewRect;
        var tCamera;
        var perspectiveMTX;
        var self;
        var valueParser;
        var updateSystemUniform;
        var updatedSystemUniformYn;
        // 숫자면 숫자로 %면 월드대비 수치로 변경해줌
        valueParser = function (rect) {
            rect.forEach(function (v, index) {
                if (typeof rect[index] == 'number') rect[index] = v;
                else {
                    if (index < 2) rect[index] = worldRect[index + 2] * parseFloat(rect[index]) / 100
                    else rect[index] = worldRect[index] * parseFloat(rect[index]) / 100
                };
            })
            return rect;
        }
        updateSystemUniform = function (redGL, updatedSystemUniformYn, time, perspectiveMTX, cameraMTX, viewRect) {
            var tUniformGroup;
            var gl;
            gl = redGL.gl;
            for (var k in redGL['_datas']['RedProgram']) {
                tUniformGroup = redGL['_datas']['RedProgram'][k]['systemUniformLocation']
                if(!updatedSystemUniformYn){
                    if (tUniformGroup['uTime']) gl.uniform1f(tUniformGroup['uTime']['location'], time)
                    if (tUniformGroup['uResolution']) gl.uniform2fv(tUniformGroup['uResolution']['location'], [viewRect[2], viewRect[3]])
                }
                if (tUniformGroup['uCameraMatrix']) gl.uniformMatrix4fv(tUniformGroup['uCameraMatrix']['location'], false, cameraMTX)
                if (tUniformGroup['uPMatrix']) gl.uniformMatrix4fv(tUniformGroup['uPMatrix']['location'], false, perspectiveMTX)
            }
        }
        viewRect = [];
        perspectiveMTX = mat4.create();
        return function (redGL, time) {
            var gl;
            updatedSystemUniformYn = false
            gl = redGL.gl;
            self = this;
            // 캔버스 사이즈 적용
            worldRect = [0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight];
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.scissor(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            // console.log("worldRender", v['key'], t0)
            self['renderInfo'] = {}
            self['world']['_viewList'].forEach(function (tView) {
                self['renderInfo'][tView.key] = { key: tView.key, call: 0 }
                ///////////////////////////////////
                // view의 위치/크기결정
                viewRect[0] = tView['_x'];
                viewRect[1] = tView['_y'];
                viewRect[2] = tView['_width'];
                viewRect[3] = tView['_height'];
                tCamera = tView.camera;
                tCamera['updateMatrix']()
                // 위치/크기의 % 여부를 파싱
                valueParser(viewRect);
                // viewport 설정
                gl.viewport(viewRect[0], worldRect[3] - viewRect[3] - viewRect[1], viewRect[2], viewRect[3]);
                gl.scissor(viewRect[0], worldRect[3] - viewRect[3] - viewRect[1], viewRect[2], viewRect[3]);
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                // view 에 적용할 카메라 퍼스펙티브를 계산
                mat4.identity(perspectiveMTX);
                mat4.perspective(
                    perspectiveMTX,
                    tCamera.fov * Math.PI / 180,
                    viewRect[2] / viewRect[3],
                    tCamera.nearClipping,
                    tCamera.farClipping
                );
                updateSystemUniform(redGL, updatedSystemUniformYn,time, perspectiveMTX, tCamera['matrix'], viewRect)
                updatedSystemUniformYn = true
                // 씬렌더 호출
                self.sceneRender(gl, tView.scene, time, self['renderInfo'][tView.key]);
            })
        }
    })();
    RedRenderer.prototype.sceneRender = (function () {
        // 캐시관련
        var prevInterleaveBuffer_UUID, prevIndexBuffer_UUID;
        var prevProgram_UUID;
        return function (gl, scene, time, renderResultObj) {
            var tChildren, tMesh;
            var k, i, i2;
            //
            var BYTES_PER_ELEMENT;;
            // 
            var tMesh;
            var tGeometry, tMaterial;
            var tInterleaveInfo;
            var tAttrGroup, tUniformGroup, tSystemUniformGroup;
            var tAttributeUpdateInfo
            var tLocationInfo;
            var tInterleaveBufferInfo, tIndexBufferInfo;
            var tMVMatrix;
            var tRenderType;
            // matix 관련
            var a,
                aSx, aSy, aSz, aCx, aCy, aCz, tRx, tRy, tRz,
                a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33,
                b0, b1, b2, b3,
                b00, b01, b02, b10, b11, b12, b20, b21, b22,
                aX, aY, aZ,
                inverse_c, inverse_d, inverse_e, inverse_g, inverse_f, inverse_h, inverse_i, inverse_j, inverse_k, inverse_l, inverse_n, inverse_o, inverse_A, inverse_m, inverse_p, inverse_r, inverse_s, inverse_B, inverse_t, inverse_u, inverse_v, inverse_w, inverse_x, inverse_y, inverse_z, inverse_C, inverse_D, inverse_E, inverse_q;
            // sin,cos 관련
            var SIN, COS, tRadian, CPI, CPI2, C225, C127, C045, C157;
            // systemUnfiom
            //////////////// 변수값 할당 ////////////////
            BYTES_PER_ELEMENT = Float32Array.BYTES_PER_ELEMENT;
            CPI = 3.141592653589793,
                CPI2 = 6.283185307179586,
                C225 = 0.225,
                C127 = 1.27323954,
                C045 = 0.405284735,
                C157 = 1.5707963267948966;
            //////////////// 렌더시작 ////////////////
            tMVMatrix = mat4.create()
            tChildren = scene.children;
            i = tChildren.length
            while (i--) {
                renderResultObj['call']++
                tMesh = tChildren[i]
                tGeometry = tMesh.geometry
                tMaterial = tMesh.material
                prevProgram_UUID == tMaterial['program']['_UUID'] ? 0 : gl.useProgram(tMaterial['program']['webglProgram'])
                prevProgram_UUID = tMaterial['program']['_UUID']
                // 업데이트할 어트리뷰트와 유니폼 정보를 가져옴
                tAttrGroup = tMaterial.attributeLocation
                tUniformGroup = tMaterial.uniformLocation
                tSystemUniformGroup = tMaterial.systemUniformLocation
                // 버퍼를 찾는다.
                tInterleaveBufferInfo = tGeometry['interleaveBuffer'] // 인터리브 버퍼
                tIndexBufferInfo = tGeometry['indexBuffer'] // 엘리먼트 버퍼

                /////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////
                // 어트리뷰트 인터리브 정보를 가져온다. 
                tInterleaveInfo = tInterleaveBufferInfo['interleaveInfo']
                i2 = tInterleaveInfo.length
                while (i2--) {
                    // 어트리뷰트 갱신정보를 얻는다.
                    tAttributeUpdateInfo = tInterleaveInfo[i2];
                    tLocationInfo = tAttrGroup[i2];
                    // 활성화 된적이 없으면 활성화 시킨다. 
                    tAttributeUpdateInfo['enabled'] ? 0 : (gl.enableVertexAttribArray(tLocationInfo['location']), tAttributeUpdateInfo['enabled'] = true);
                    // 어트리뷰트 데이터 업데이트는 필요시 버퍼를 통해 직접한다.
                    // 즉 실제로 버퍼는 한번 업데이트 해놓으면 GPU상에 온전하게 보관된다.
                    prevInterleaveBuffer_UUID == tInterleaveBufferInfo['_UUID'] ? 0 : gl.bindBuffer(gl.ARRAY_BUFFER, tInterleaveBufferInfo['webglBuffer']);
                    if (tInterleaveBufferInfo['updated']) {
                        prevInterleaveBuffer_UUID == tInterleaveBufferInfo['_UUID'] ? 0 : gl.vertexAttribPointer(
                            tLocationInfo['location'],
                            tAttributeUpdateInfo['size'],
                            tInterleaveBufferInfo['glArrayType'],
                            tAttributeUpdateInfo['normalize'],
                            tInterleaveBufferInfo['stride'] * BYTES_PER_ELEMENT, //stride
                            tAttributeUpdateInfo['offset'] * BYTES_PER_ELEMENT //offset
                        )
                    }
                }
                prevInterleaveBuffer_UUID = tInterleaveBufferInfo['_UUID']; // 버퍼 캐싱           
                tInterleaveBufferInfo['updated'] = 0; // 버퍼 업데이트 처리완료
                /////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////
                // 유니폼 업데이트
                // console.log(tUniformGroup)
                i2 = tUniformGroup.length

                while (i2--) {
                    tLocationInfo = tUniformGroup[i2]
                    if (tLocationInfo['location']) {
                        //TODO: 고도화
                        tRenderType = tLocationInfo['renderType']
                        if (tRenderType == 'float') {
                            gl.uniform1f(tLocationInfo['location'], time)
                        }
                    }
                }

                /////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////
                // 어트리뷰트 인터리브 정보를 가져온다. 

                // tMVMatrix
                // tMVMatrix 초기화
                tMVMatrix[0] = 1, tMVMatrix[1] = 0, tMVMatrix[2] = 0, tMVMatrix[3] = 0,
                    tMVMatrix[4] = 0, tMVMatrix[5] = 1, tMVMatrix[6] = 0, tMVMatrix[7] = 0,
                    tMVMatrix[8] = 0, tMVMatrix[9] = 0, tMVMatrix[10] = 1, tMVMatrix[11] = 0,
                    tMVMatrix[12] = 0, tMVMatrix[13] = 0, tMVMatrix[14] = 0, tMVMatrix[15] = 1,
                    a = tMVMatrix,
                    // tMVMatrix translate
                    aX = tMesh['x'], aY = tMesh['y'], aZ = tMesh['z'],
                    a[12] = a[0] * aX + a[4] * aY + a[8] * aZ + a[12],
                    a[13] = a[1] * aX + a[5] * aY + a[9] * aZ + a[13],
                    a[14] = a[2] * aX + a[6] * aY + a[10] * aZ + a[14],
                    a[15] = a[3] * aX + a[7] * aY + a[11] * aZ + a[15],
                    // tMVMatrix rotate
                    tRx = tMesh['rotationX'], tRy = tMesh['rotationY'], tRz = tMesh['rotationZ'],
                    /////////////////////////
                    tRadian = tRx % CPI2,
                    tRadian < -CPI ? tRadian = tRadian + CPI2 : tRadian > CPI ? tRadian = tRadian - CPI2 : 0,
                    tRadian = tRadian < 0 ? C127 * tRadian + C045 * tRadian * tRadian : C127 * tRadian - C045 * tRadian * tRadian,
                    aSx = tRadian < 0 ? C225 * (tRadian * -tRadian - tRadian) + tRadian : C225 * (tRadian * tRadian - tRadian) + tRadian,

                    tRadian = (tRx + C157) % CPI2,
                    tRadian < -CPI ? tRadian = tRadian + CPI2 : tRadian > CPI ? tRadian = tRadian - CPI2 : 0,
                    tRadian = tRadian < 0 ? C127 * tRadian + C045 * tRadian * tRadian : C127 * tRadian - C045 * tRadian * tRadian,
                    aCx = tRadian < 0 ? C225 * (tRadian * -tRadian - tRadian) + tRadian : C225 * (tRadian * tRadian - tRadian) + tRadian,

                    tRadian = tRy % CPI2,
                    tRadian < -CPI ? tRadian = tRadian + CPI2 : tRadian > CPI ? tRadian = tRadian - CPI2 : 0,
                    tRadian = tRadian < 0 ? C127 * tRadian + C045 * tRadian * tRadian : C127 * tRadian - C045 * tRadian * tRadian,
                    aSy = tRadian < 0 ? C225 * (tRadian * -tRadian - tRadian) + tRadian : C225 * (tRadian * tRadian - tRadian) + tRadian,

                    tRadian = (tRy + C157) % CPI2,
                    tRadian < -CPI ? tRadian = tRadian + CPI2 : tRadian > CPI ? tRadian = tRadian - CPI2 : 0,
                    tRadian = tRadian < 0 ? C127 * tRadian + C045 * tRadian * tRadian : C127 * tRadian - C045 * tRadian * tRadian,
                    aCy = tRadian < 0 ? C225 * (tRadian * -tRadian - tRadian) + tRadian : C225 * (tRadian * tRadian - tRadian) + tRadian,

                    tRadian = tRz % CPI2,
                    tRadian < -CPI ? tRadian = tRadian + CPI2 : tRadian > CPI ? tRadian = tRadian - CPI2 : 0,
                    tRadian = tRadian < 0 ? C127 * tRadian + C045 * tRadian * tRadian : C127 * tRadian - C045 * tRadian * tRadian,
                    aSz = tRadian < 0 ? C225 * (tRadian * -tRadian - tRadian) + tRadian : C225 * (tRadian * tRadian - tRadian) + tRadian,

                    tRadian = (tRz + C157) % CPI2,
                    tRadian < -CPI ? tRadian = tRadian + CPI2 : tRadian > CPI ? tRadian = tRadian - CPI2 : 0,
                    tRadian = tRadian < 0 ? C127 * tRadian + C045 * tRadian * tRadian : C127 * tRadian - C045 * tRadian * tRadian,
                    aCz = tRadian < 0 ? C225 * (tRadian * -tRadian - tRadian) + tRadian : C225 * (tRadian * tRadian - tRadian) + tRadian,
                    /////////////////////////
                    a00 = a[0], a01 = a[1], a02 = a[2],
                    a10 = a[4], a11 = a[5], a12 = a[6],
                    a20 = a[8], a21 = a[9], a22 = a[10],
                    b00 = aCy * aCz, b01 = aSx * aSy * aCz - aCx * aSz, b02 = aCx * aSy * aCz + aSx * aSz,
                    b10 = aCy * aSz, b11 = aSx * aSy * aSz + aCx * aCz, b12 = aCx * aSy * aSz - aSx * aCz,
                    b20 = -aSy, b21 = aSx * aCy, b22 = aCx * aCy,
                    a[0] = a00 * b00 + a10 * b01 + a20 * b02, a[1] = a01 * b00 + a11 * b01 + a21 * b02, a[2] = a02 * b00 + a12 * b01 + a22 * b02,
                    a[4] = a00 * b10 + a10 * b11 + a20 * b12, a[5] = a01 * b10 + a11 * b11 + a21 * b12, a[6] = a02 * b10 + a12 * b11 + a22 * b12,
                    a[8] = a00 * b20 + a10 * b21 + a20 * b22, a[9] = a01 * b20 + a11 * b21 + a21 * b22, a[10] = a02 * b20 + a12 * b21 + a22 * b22,
                    // tMVMatrix scale
                    aX = tMesh['scaleX'], aY = tMesh['scaleY'], aZ = tMesh['scaleZ'],
                    a[0] = a[0] * aX, a[1] = a[1] * aX, a[2] = a[2] * aX, a[3] = a[3] * aX,
                    a[4] = a[4] * aY, a[5] = a[5] * aY, a[6] = a[6] * aY, a[7] = a[7] * aY,
                    a[8] = a[8] * aZ, a[9] = a[9] * aZ, a[10] = a[10] * aZ, a[11] = a[11] * aZ,
                    a[12] = a[12], a[13] = a[13], a[14] = a[14], a[15] = a[15]

                /////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////
                gl.uniformMatrix4fv(tSystemUniformGroup['uMVMatrix']['location'], false, tMVMatrix)
                /////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////

                /////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////
                // 드로우
                if (tIndexBufferInfo && prevIndexBuffer_UUID != tIndexBufferInfo['_UUID']) {
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tIndexBufferInfo['webglBuffer'])
                    //enum mode, long count, enum type, long offset
                    gl.drawElements(gl.TRIANGLES, tIndexBufferInfo['pointNum'], tIndexBufferInfo['glArrayType'], 0)
                    prevIndexBuffer_UUID = tIndexBufferInfo['_UUID']
                } else gl.drawArrays(gl.TRIANGLES, 0, tInterleaveBufferInfo['pointNum'])
                /////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////

            }
        }
    })()
    Object.freeze(RedRenderer);
})();

"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedShader`,
        description : `
            - RedShader 인스턴스 생성자
            - <b>유일키</b>만 지원.
            - <b>단 프레그먼트/버텍스의 키는 따로 관리함.</b>
            - 쉐이더정보는 <b>Object.freeze</b> 상태로 반환됨.
        `,
        params : {
            redGL : [
                {type:'Red Instance'},
                'redGL 인스턴스'
            ],
            key : [
                {type:'String'},
                '- 등록될 키명'
            ],
            type : [
                {type:'String'},
                '- 버텍스 쉐이더(RedShader.VERTEX)',
                '- 프레그먼트 쉐이더(RedShader.FRAGMENT)'
            ],
            source : [
                {type:'String'},
                '- 생성할 쉐이더 소스문자열'
            ]
        },
        example : `
            var test;
            test = RedGL(Canvas Element)
            // basic이라는 이름으로 버텍스 쉐이더를 만든다. 
            test.createShaderInfo('basic', RedShader.VERTEX_, 쉐이더소스)
        `,
        return : 'RedShader Instance'
    }
:DOC*/
var RedShader;
(function () {
    var tShader, tGL;
    var makeWebGLShader, compile, parser, mergeShareSource;
    var keyMap;
    makeWebGLShader = (function () {
        var t0;
        return function (gl, key, type) {
            switch (type) {
                case RedShader.VERTEX:
                    t0 = gl.createShader(gl.VERTEX_SHADER);
                    t0.key = key;
                    t0.type = type;
                    return t0
                case RedShader.FRAGMENT:
                    t0 = gl.createShader(gl.FRAGMENT_SHADER);
                    t0.key = key;
                    t0.type = type;
                    return t0
                default:
                    RedGL.throwFunc('RedShader : 쉐이더 타입을 확인하세요!')
                    break
            }
        }
    })();
    compile = function (gl, type, shader, source) {
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) RedGL.throwFunc(gl.getShaderInfoLog(shader), '쉐이더 컴파일에 실패하였습니다.')
    }
    mergeShareSource = (function () {
        var t0;
        return function (type, sourceList) {
            switch (type) {
                case RedShader.VERTEX:
                    t0 = RedSystemShaderCode.vShareSource.concat();
                    break;
                case RedShader.FRAGMENT:
                    t0 = RedSystemShaderCode.fShareSource.concat();
                    break;
                default:
                    RedGL.throwFunc('RedShader : 쉐이더 타입을 확인하세요!')
            }
            sourceList.forEach(function (v) {
                v = v.replace(';', '');
                if (t0.indexOf(v) == -1) t0.push(v);
                else {
                    console.log(RedSystemShaderCode)
                    RedGL.throwFunc('RedShader : ', '\n1. 중복된 소스이거나', '\n2. RedSystemShaderCode에 정의된 소스\n', v);
                }
            })
            return t0;
        }
    })();
    parser = (function () {
        var parseData, checkList;
        var mergeStr;
        return function (type, source) {
            source = source.replace(/  /g, '').trim();
            // console.log(source)
            parseData = {
                func: {
                    list: [],
                    map: {},
                    source: ''
                }
            }
            checkList = checkList ? checkList : [];
            // 함수제외 전부 검색
            checkList = source.match(/attribute[\s\S]+?\;|uniform[\s\S]+?\;|varying[\s\S]+?\;|precision[\s\S]+?\;|([a-z0-9]+)\s([\S]+)\;\n/g);
            checkList = mergeShareSource(type, checkList);
            checkList.sort();
            checkList.forEach(function (v) {
                var tData;
                var tType, tName, tDataType, tArrayNum;
                v = v.trim()
                source = source.replace(v + ';', '')
                tData = v.split(' ')
                // console.log(v,data)
                if (tData[2]) {
                    // 정의인경우
                    tType = tData[0];
                    tDataType = tData[1];
                    tName = tData[2].replace(';', '').split('[');
                    tArrayNum = tName.length > 1 ? +tName[1].split(']')[0] : 0;
                    tName = tName[0]
                    switch (tType) {
                        case 'attribute':
                            if (tName.charAt(0) != 'a') RedGL.throwFunc('attribute의 첫글자는 a로 시작해야합니다.', tName)
                            break
                        case 'uniform':
                            if (tName.charAt(0) != 'u') RedGL.throwFunc('uniform의 첫글자는 u로 시작해야합니다.', tName)
                            break
                        case 'varying':
                            if (tName.charAt(0) != 'v') RedGL.throwFunc('varying의 첫글자는 v로 시작해야합니다.', tName)
                            break
                    }
                } else {
                    // 변수인경우
                    tType = 'var';
                    tDataType = tData[0];
                    tName = tData[1].replace(';', '').split('[');
                    tArrayNum = tName.length > 1 ? +tName[1].split(']')[0] : 0;
                    tName = tName[0];

                }
                // console.log(tType, tDataType, tName, tArrayNum)
                if (!parseData[tType]) parseData[tType] = {}, parseData[tType]['list'] = [], parseData[tType]['map'] = {}, parseData[tType]['source'] = '';
                parseData[tType]['list'].push({
                    dataType: tDataType,
                    name: tName,
                    arrayNum: tArrayNum,
                    systemUniformYn : RedSystemShaderCode.systemUniform[tName] ? true : false
                });
                parseData[tType]['map'][tName] = v;
                parseData[tType]['source'] += v + ';\n';
            });

            // 함수부를 찾아서 머징
            source = source.trim()
            source += '\n'
            source.match(/[a-z0-9]+\s[\s\S]+?(\}\n)/g).forEach(function (v) {
                // console.log(v.split(' '))
                var data = v.split(' ');
                var tName = data[1].replace(/\([\s\S]+/g, '').trim()
                parseData['func']['list'].push({
                    dataType: data[0],
                    name: tName
                })
                parseData['func']['map'][tName] = v;
                parseData['func']['source'] += v + '\n';
            })

            mergeStr = '';
            if (parseData['precision']) mergeStr += parseData['precision']['source'] + '\n//attribute\n';
            if (parseData['attribute']) mergeStr += parseData['attribute']['source'] + '\n//uniform\n';
            if (parseData['uniform']) mergeStr += parseData['uniform']['source'] + '\n//varying\n';
            if (parseData['varying']) mergeStr += parseData['varying']['source'] + '\n//var\n';
            if (parseData['var']) mergeStr += parseData['var']['source'] + '\n//func\n';
            if (parseData['func']) mergeStr += parseData['func']['source'];
            parseData.lastSource = mergeStr;
            return parseData;
        }
    })()
    RedShader = function (redGL, key, type, source) {
        if (!(this instanceof RedShader)) return new RedShader(redGL, key, type, source)
        if (!(redGL instanceof RedGL)) throw 'RedShader : RedGL 인스턴스만 허용됩니다.'
        if (typeof key != 'string') throw 'RedShader : key - 문자열만 허용됩니다.'
        if (typeof type != 'string') throw 'RedShader : type - 문자열만 허용됩니다.'
        if (typeof source != 'string') throw 'RedShader : source - 문자열만 허용됩니다.'
        tGL = redGL.gl

        tShader = makeWebGLShader(tGL, key, type);
        this['parseData'] = parser(type, source);
        source = this['parseData']['lastSource'];
        compile(tGL, type, tShader, source);
        /**DOC:
        {
            title :`key`,
            description : `고유키`,
            example : `인스턴스.key`,
            return : 'String'
        }
        :DOC*/
        this['key'] = key
        /**DOC:
		{
            title :`type`,
			description : `RedShader.VERTEXor RedShader.FRAGMENT`,
			example : `인스턴스.type`,
			return : 'String'
		}
	    :DOC*/
        this['type'] = type
        /**DOC:
		{
            title :`shader`,
			description : `실제 쉐이더(WebGLShader instance)`,
			example : `인스턴스.shader`,
			return : 'String'
		}
	    :DOC*/
        this['webglShader'] = tShader
        this['_UUID'] = RedGL['makeUUID']();
        console.log(this);
        Object.freeze(this)
        // console.log(this)
    }
    /**DOC:
		{
            title :`FRAGMENT`,
            code: 'CONST',
			description : `
				프레그먼트 쉐이더 상수.
			`,
			example : `
				RedShader.FRAGMENT
			`,
			return : 'String'
		}
	:DOC*/
    RedShader.FRAGMENT = 'fragmentShader'
    /**DOC:
		{
            title :`VERTEX_SHADER`,
            code: 'CONST',
			description : `
				버텍스 쉐이더 상수.
			`,
			example : `
				RedShader.FRAGMENT_SHADER
			`,
			return : 'String'
		}
	:DOC*/
    RedShader.VERTEX = 'vertexShader'
    Object.freeze(RedShader)
})();
"use strict";
var RedCamera;
(function () {
    /**DOC:
    {
        constructorYn : true,
        title :`RedCamera`,
        description : `
            RedCamera 인스턴스 생성자.
        `,
        return : 'RedCamera Instance'
    }
	:DOC*/
    RedCamera = function () {
        if (!(this instanceof RedCamera)) return new RedCamera();
        /**DOC:
        {
            code:`PROPERTY`,
            title :`x`,
            description : `x - 기본값 : 0`,
            return : 'Number'
        }
        :DOC*/
        /**DOC:
        {
            code:`PROPERTY`,
            title :`y`,
            description : `y - 기본값 : 0`,
            return : 'Number'
        }
        :DOC*/
        /**DOC:
        {
            code:`PROPERTY`,
            title :`z`,
            description : `z - 기본값 : 0`,
            return : 'Number'
        }
        :DOC*/
        this.x = this.y = this.z = 0;
        /**DOC:
        {
            code:`PROPERTY`,
            title :`rotationX`,
            description : `rotationX - 기본값 : 0`,
            return : 'Number'
        }
        :DOC*/
        /**DOC:
        {
            code:`PROPERTY`,
            title :`rotationY`,
            description : `rotationY - 기본값 : 0`,
            return : 'Number'
        }
        :DOC*/
        /**DOC:
        {
            code:`PROPERTY`,
            title :`rotationZ`,
            description : `rotationZ - 기본값 : 0`,
            return : 'Number'
        }
        :DOC*/
        this.rotationX = this.rotationY = this.rotationZ = 0;

        /**DOC:
        {
            code:`PROPERTY`,
            title :`fov`,
            description : `fov - 기본값 : Math.PI / 2`,
            return : 'Number'
        }
        :DOC*/
        this.fov = 45;
        /**DOC:
        {
            code:`PROPERTY`,
            title :`nearClipping`,
            description : `nearClipping - 0.01`,
            return : 'Number'
        }
        :DOC*/
        this.nearClipping = 0.1;
        /**DOC:
        {
            code:`PROPERTY`,
            title :`farClipping`,
            description : `farClipping - 기본값 : 10000`,
            return : 'Number'
        }
        :DOC*/
        this.farClipping = 100000;
        /**DOC:
        {
            code:`PROPERTY`,
            title :`orthographic`,
            description : `orthographic - false`,
            return : 'Boolean'
        }
        :DOC*/
        this.orthographic = false;
        /**DOC:
        {
            code:`PROPERTY`,
            title :`matrix`,
            description : `matrix`,
            return : 'mat4'
        }
        :DOC*/
        this.matrix = mat4.create();
        this['_UUID'] = RedGL['makeUUID']();
    };
    RedCamera.prototype = {
        /**DOC:
        {
            code:`FUNCTION`,
            title :`updateMatrix`,
            description : `
                x, y, z, rotationX, rotationY, rotationZ 를 기반으로한 matrix 업데이트
            `,
            return : 'mat4'
        }
        :DOC*/
        updateMatrix: (function () {
            var t0;
            var TO_RAD = Math.PI/180
            return function () {
                t0 = mat4.identity(this.matrix);
                mat4.translate(t0, t0, [this.x, this.y, this.z]);
                mat4.rotateX(t0, t0, this.rotationX*TO_RAD);
                mat4.rotateY(t0, t0, this.rotationY*TO_RAD);
                mat4.rotateZ(t0, t0, this.rotationZ*TO_RAD);
                // console.log(this.matrix);
            }
        })()
    }
    RedGL['extendsProto'](RedCamera, RedBaseObject3D);
    /**DOC:
    {
        code:`PROPERTY`,
        title :`lookAt`,
        description : `
            대상 위치를 바라보는 matrix 생성
        `,
        params : {
            x : [{type : "Number"}],
            y : [{type : "Number"}],
            z : [{type : "Number"}]
        },
        return : 'mat4'
    }
    :DOC*/
    Object.freeze(RedCamera);
})();

"use strict";
var RedView;
(function () {
    var ViewMap;
    ViewMap = {};
    /**DOC:
    {
        constructorYn : true,
        title :`RedView`,
        description : `
            고유 키를 기반으로 <b>RedScene</b>과 <b>RedCamera를</b> 쌍으로 하는 정보를 소유.
            RedWorld가 소유하게 되며 렌더링시 활용하게 된다.
            실제 렌더링시 Perspective 계산에 필요한 그려질 크기와 위치를 결정한다.
        `,
        params : {
            key :[
                {type:'String'},
                '고유키',
                '기존에 존재하는 키일경우 <b>캐쉬된 인스턴스</b>를 반환'
            ],
            scene :[
                {type:'RedScene'},
                'RedScene'
            ],
            camera :[
                {type:'RedCamera'},
                'RedCamera'
            ]
        },
        example : `
            var tWorld, tScene, tCamera;
            tScene = new RedScene(); // 씬생성
            tCamera = new RedCamera(); // 카메라생성
            new RedView('test', tScene, tCamera); // test라는 키값을 가진 RedView 생성
            new RedView('test2', tScene, tCamera); // test2라는 키값을 가진 RedView 생성
        `,
        return : 'RedView Instance'
    }
	:DOC*/
    RedView = function (key, scene, camera) {
        if (ViewMap[key]) {
            if (scene || camera) RedGL['throwFunc'](key, '는 이미 생성된 RedView key입니다.')
            else return ViewMap[key]
        }
        if (!(this instanceof RedView)) return new RedView(key, scene, camera);
        if (!(typeof key == 'string')) RedGL['throwFunc']('key : 문자열만 허용')
        if (!scene && !camera) RedGL['throwFunc']('존재하지 않는 key입니다.')
        if (scene && !(scene instanceof RedScene)) RedGL['throwFunc']('RedScene 인스턴스만 허용')
        if (camera && !(camera instanceof RedCamera)) RedGL['throwFunc']('RedCamera 인스턴스만 허용')

        this['key'] = key;
        this['scene'] = scene;
        this['camera'] = camera;

        this['_width'] = '100%';
        this['_height'] = '100%';
        this['_x'] = 0;
        this['_y'] = 0;
        ViewMap[key] = this;
        Object.seal(this)
    };
    RedView.prototype = {
        /**DOC:
           {
               code : 'FUNCTION',
               title :`setSize`,
               description : `
                    씬의 사이즈를 결정
               `,
               example : `
                    var tWorld, tScene, tCamera;
                    tScene = new RedScene(); // 씬생성
                    tCamera = new RedCamera(); // 카메라생성
                    new RedView('test', tScene, tCamera); // test라는 키값을 가진 RedView 생성
                    RedView('test').setSize(100,100);
                    RedView('test').setSize('50%',100);
               `,
               return : 'void'
           }
       :DOC*/
        setSize: function (w, h) {
            this['_width'] = w != undefined ? w : '100%';
            this['_height'] = h != undefined ? h : '100%';
        },
        /**DOC:
           {
               code : 'FUNCTION',
               title :`setLocation`,
               description : `
                   씬의 위치를 결정
               `,
               example : `
                   // TODO       
               `,
               return : 'void'
           }
       :DOC*/
        setLocation: function (x, y) {
            this['_x'] = x != undefined ? x : 0;
            this['_y'] = y != undefined ? y : 0;
        }
    }
    Object.freeze(RedView);
})();

"use strict";
var RedWorld;
(function () {
    /**DOC:
    {
        constructorYn : true,
        title :`RedWorld`,
        description : `
            RedWorld 인스턴스 생성자.
            RedWorld는 RedView를 소유하며 이는 렌더리스트로서 작동한다.. 
        `,
        params : {
            key :[
                {type:'String'},
                '고유키'
            ]
        },
        example : `
            // TODO       
        `,
        return : 'RedWorld Instance'
    }
	:DOC*/
    RedWorld = function () {
        if (!(this instanceof RedWorld)) return new RedWorld();
        this['_viewList'] = [];
        this['_viewMap'] = {};
        this['_UUID'] = RedGL['makeUUID']();
        Object.seal(this)
    };
    RedWorld.prototype = {
        /**DOC:
            {
                code:`FUNCTION`,
                title :`addView`,
                description : `
                    렌더정보 추가.
                    정상처리된다면 내부적으로 <b>RedView</b>이 생성됨.
                `,
                params : {
                    View :[
                        {type:'RedView'},
                        '추가할 RedView Instance'
                    ]
                },
                example : `
                   // TODO       
               `,
                return : 'RedWorld Instance'
            }
        :DOC*/
        addView: function (View) {
            if (!(View instanceof RedView)) RedGL['throwFunc']('RedView 인스턴스만 허용함.')
            this['_viewMap'][View['key']] = View;
            this['_viewList'].push(View);
            return this;
        },
        /**DOC:
            {
                code:`FUNCTION`,
                title :`getView`,
                description : `고유키 기반 렌더정보 검색`,
                params : {
                    key :[
                        {type:'String'},
                        '고유키'
                    ]
                },
                example : `
                   // TODO       
               `,
                return : 'RedView'
            }
        :DOC*/
        getView: function (key) {
            return this['_viewMap'][key]
        },
        /**DOC:
            {
                code:`FUNCTION`,
                title :`delView`,
                description : `렌더정보 삭제`,
                params : {
                    key :[
                        {type:'String'},
                        '고유키'
                    ]
                },
                example : `
                   // TODO       
               `,
                return : 'RedWorld Instance'
            }
        :DOC*/
        delView: function (key) {
            var t0, t1
            if (t0 = this['_viewMap'][key]) {
                t1 = this['_viewList'].indexOf(t0);
                this['_viewList'].splice(t1, 1)
                delete this['_viewMap'][key]
            }
            return this;
        },
        /**DOC:
            {
                code:`FUNCTION`,
                title :`hasView`,
                description : `고유키 기반 렌더정보 존재여부`,
                params : {
                    key :[
                        {type:'String'},
                        '고유키'
                    ]
                },
                example : `
                   // TODO       
               `,
                return : 'Boolean'
            }
        :DOC*/
        hasView: function (key) {
            return this['_viewMap'][key] ? true : false
        },
        /**DOC:
            {
                code:`FUNCTION`,
                title :`getViewList`,
                description : `고유키 기반 렌더정보 검색`,
                params : {
                    key :[
                        {type:'String'},
                        '고유키'
                    ]
                },
                example : `
                   // TODO       
               `,
                return : 'Array'
            }
        :DOC*/
        getViewList: function () {
            return this['_viewList'].concat();
        }
    };
    Object.freeze(RedWorld);
})();

"use strict";
var RedScene;
(function () {
    /**DOC:
    {
        constructorYn : true,
        title :`RedScene`,
        description : `
            RedScene 인스턴스 생성자.
        `,
        return : 'RedScene Instance'
    }
	:DOC*/
    RedScene = function () {
        if (!(this instanceof RedScene)) return new RedScene();
        this['children'] = []
        this['_UUID'] = RedGL['makeUUID']();
        Object.seal(this)
    };
    RedScene.prototype = {};
    RedGL['extendsProto'](RedScene, RedBaseContainer)
    Object.freeze(RedScene);
})();
