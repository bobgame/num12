import{A as De,D as pe,Ea as d,F as b,Ga as Ce,Gb as $,Ha as Y,Hb as Fe,Ib as ye,Ja as N,Ka as W,L as Z,N as K,Oa as k,Pa as F,Qa as X,S as me,U as l,V as B,X as g,Z as c,_ as C,a as R,f as a,ja as O,m as ge,na as P,q as A,ra as S,s as m,u as z,y as G,z as H}from"./chunk-C7WIGN6N.js";var x=null;function q(){return x}function Ot(i){x!=null||(x=i)}var Ee=class{};var ne=new g(""),ie=(()=>{let n=class n{historyGo(e){throw new Error("")}};a(n,"\u0275fac",function(t){return new(t||n)}),a(n,"\u0275prov",l({token:n,factory:()=>C(Pe),providedIn:"platform"}));let i=n;return i})(),Pt=new g(""),Pe=(()=>{let n=class n extends ie{_location;_history;_doc=C(ne);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return q().getBaseHref(this._doc)}onPopState(e){let t=q().getGlobalEventTarget(this._doc,"window");return t.addEventListener("popstate",e,!1),()=>t.removeEventListener("popstate",e)}onHashChange(e){let t=q().getGlobalEventTarget(this._doc,"window");return t.addEventListener("hashchange",e,!1),()=>t.removeEventListener("hashchange",e)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(e){this._location.pathname=e}pushState(e,t,r){this._history.pushState(e,t,r)}replaceState(e,t,r){this._history.replaceState(e,t,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(e=0){this._history.go(e)}getState(){return this._history.state}};a(n,"\u0275fac",function(t){return new(t||n)}),a(n,"\u0275prov",l({token:n,factory:()=>new n,providedIn:"platform"}));let i=n;return i})();function re(i,n){return i?n?i.endsWith("/")?n.startsWith("/")?i+n.slice(1):i+n:n.startsWith("/")?i+n:`${i}/${n}`:i:n}function we(i){let n=i.match(/#|\?|$/),u=n&&n.index||i.length,e=u-(i[u-1]==="/"?1:0);return i.slice(0,e)+i.slice(u)}function D(i){return i&&i[0]!=="?"?"?"+i:i}var U=(()=>{let n=class n{historyGo(e){throw new Error("")}};a(n,"\u0275fac",function(t){return new(t||n)}),a(n,"\u0275prov",l({token:n,factory:()=>C(Ne),providedIn:"root"}));let i=n;return i})(),_e=new g(""),Ne=(()=>{let n=class n extends U{_platformLocation;_baseHref;_removeListenerFns=[];constructor(e,t){var r,s,o;super(),this._platformLocation=e,this._baseHref=(o=(s=t!=null?t:this._platformLocation.getBaseHrefFromDOM())!=null?s:(r=C(ne).location)==null?void 0:r.origin)!=null?o:""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e))}getBaseHref(){return this._baseHref}prepareExternalUrl(e){return re(this._baseHref,e)}path(e=!1){let t=this._platformLocation.pathname+D(this._platformLocation.search),r=this._platformLocation.hash;return r&&e?`${t}${r}`:t}pushState(e,t,r,s){let o=this.prepareExternalUrl(r+D(s));this._platformLocation.pushState(e,t,o)}replaceState(e,t,r,s){let o=this.prepareExternalUrl(r+D(s));this._platformLocation.replaceState(e,t,o)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(e=0){var t,r;(r=(t=this._platformLocation).historyGo)==null||r.call(t,e)}};a(n,"\u0275fac",function(t){return new(t||n)(c(ie),c(_e,8))}),a(n,"\u0275prov",l({token:n,factory:n.\u0275fac,providedIn:"root"}));let i=n;return i})(),Nt=(()=>{let n=class n extends U{_platformLocation;_baseHref="";_removeListenerFns=[];constructor(e,t){super(),this._platformLocation=e,t!=null&&(this._baseHref=t)}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e))}getBaseHref(){return this._baseHref}path(e=!1){var r;let t=(r=this._platformLocation.hash)!=null?r:"#";return t.length>0?t.substring(1):t}prepareExternalUrl(e){let t=re(this._baseHref,e);return t.length>0?"#"+t:t}pushState(e,t,r,s){let o=this.prepareExternalUrl(r+D(s));o.length==0&&(o=this._platformLocation.pathname),this._platformLocation.pushState(e,t,o)}replaceState(e,t,r,s){let o=this.prepareExternalUrl(r+D(s));o.length==0&&(o=this._platformLocation.pathname),this._platformLocation.replaceState(e,t,o)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(e=0){var t,r;(r=(t=this._platformLocation).historyGo)==null||r.call(t,e)}};a(n,"\u0275fac",function(t){return new(t||n)(c(ie),c(_e,8))}),a(n,"\u0275prov",l({token:n,factory:n.\u0275fac}));let i=n;return i})(),ke=(()=>{let n=class n{_subject=new ge;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(e){this._locationStrategy=e;let t=this._locationStrategy.getBaseHref();this._basePath=Ue(we(Ae(t))),this._locationStrategy.onPopState(r=>{this._subject.next({url:this.path(!0),pop:!0,state:r.state,type:r.type})})}ngOnDestroy(){var e;(e=this._urlChangeSubscription)==null||e.unsubscribe(),this._urlChangeListeners=[]}path(e=!1){return this.normalize(this._locationStrategy.path(e))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(e,t=""){return this.path()==this.normalize(e+D(t))}normalize(e){return n.stripTrailingSlash(xe(this._basePath,Ae(e)))}prepareExternalUrl(e){return e&&e[0]!=="/"&&(e="/"+e),this._locationStrategy.prepareExternalUrl(e)}go(e,t="",r=null){this._locationStrategy.pushState(r,"",e,t),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+D(t)),r)}replaceState(e,t="",r=null){this._locationStrategy.replaceState(r,"",e,t),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+D(t)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(e=0){var t,r;(r=(t=this._locationStrategy).historyGo)==null||r.call(t,e)}onUrlChange(e){var t;return this._urlChangeListeners.push(e),(t=this._urlChangeSubscription)!=null||(this._urlChangeSubscription=this.subscribe(r=>{this._notifyUrlChangeListeners(r.url,r.state)})),()=>{var s;let r=this._urlChangeListeners.indexOf(e);this._urlChangeListeners.splice(r,1),this._urlChangeListeners.length===0&&((s=this._urlChangeSubscription)==null||s.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(e="",t){this._urlChangeListeners.forEach(r=>r(e,t))}subscribe(e,t,r){return this._subject.subscribe({next:e,error:t!=null?t:void 0,complete:r!=null?r:void 0})}};a(n,"normalizeQueryParams",D),a(n,"joinWithSlash",re),a(n,"stripTrailingSlash",we),a(n,"\u0275fac",function(t){return new(t||n)(c(U))}),a(n,"\u0275prov",l({token:n,factory:()=>$e(),providedIn:"root"}));let i=n;return i})();function $e(){return new ke(c(U))}function xe(i,n){if(!i||!n.startsWith(i))return n;let u=n.substring(i.length);return u===""||["/",";","?","#"].includes(u[0])?u:n}function Ae(i){return i.replace(/\/index.html$/,"")}function Ue(i){if(new RegExp("^(https?:)?//").test(i)){let[,u]=i.split(/\/\/[^\/]+/);return u}return i}function kt(i,n){n=encodeURIComponent(n);for(let u of i.split(";")){let e=u.indexOf("="),[t,r]=e==-1?[u,""]:[u.slice(0,e),u.slice(e+1)];if(t.trim()===n)return decodeURIComponent(r)}return null}var J=/\s+/,be=[],$t=(()=>{let n=class n{_ngEl;_renderer;initialClasses=be;rawClass;stateMap=new Map;constructor(e,t){this._ngEl=e,this._renderer=t}set klass(e){this.initialClasses=e!=null?e.trim().split(J):be}set ngClass(e){this.rawClass=typeof e=="string"?e.trim().split(J):e}ngDoCheck(){for(let t of this.initialClasses)this._updateState(t,!0);let e=this.rawClass;if(Array.isArray(e)||e instanceof Set)for(let t of e)this._updateState(t,!0);else if(e!=null)for(let t of Object.keys(e))this._updateState(t,!!e[t]);this._applyStateDiff()}_updateState(e,t){let r=this.stateMap.get(e);r!==void 0?(r.enabled!==t&&(r.changed=!0,r.enabled=t),r.touched=!0):this.stateMap.set(e,{enabled:t,changed:!0,touched:!0})}_applyStateDiff(){for(let e of this.stateMap){let t=e[0],r=e[1];r.changed?(this._toggleClass(t,r.enabled),r.changed=!1):r.touched||(r.enabled&&this._toggleClass(t,!1),this.stateMap.delete(t)),r.touched=!1}}_toggleClass(e,t){e=e.trim(),e.length>0&&e.split(J).forEach(r=>{t?this._renderer.addClass(this._ngEl.nativeElement,r):this._renderer.removeClass(this._ngEl.nativeElement,r)})}};a(n,"\u0275fac",function(t){return new(t||n)(d(S),d(N))}),a(n,"\u0275dir",F({type:n,selectors:[["","ngClass",""]],inputs:{klass:[0,"class","klass"],ngClass:"ngClass"}}));let i=n;return i})();var Q=class{$implicit;ngForOf;index;count;constructor(n,u,e,t){this.$implicit=n,this.ngForOf=u,this.index=e,this.count=t}get first(){return this.index===0}get last(){return this.index===this.count-1}get even(){return this.index%2===0}get odd(){return!this.even}},xt=(()=>{let n=class n{_viewContainer;_template;_differs;set ngForOf(e){this._ngForOf=e,this._ngForOfDirty=!0}set ngForTrackBy(e){this._trackByFn=e}get ngForTrackBy(){return this._trackByFn}_ngForOf=null;_ngForOfDirty=!0;_differ=null;_trackByFn;constructor(e,t,r){this._viewContainer=e,this._template=t,this._differs=r}set ngForTemplate(e){e&&(this._template=e)}ngDoCheck(){if(this._ngForOfDirty){this._ngForOfDirty=!1;let e=this._ngForOf;!this._differ&&e&&(this._differ=this._differs.find(e).create(this.ngForTrackBy))}if(this._differ){let e=this._differ.diff(this._ngForOf);e&&this._applyChanges(e)}}_applyChanges(e){let t=this._viewContainer;e.forEachOperation((r,s,o)=>{if(r.previousIndex==null)t.createEmbeddedView(this._template,new Q(r.item,this._ngForOf,-1,-1),o===null?void 0:o);else if(o==null)t.remove(s===null?void 0:s);else if(s!==null){let f=t.get(s);t.move(f,o),Se(f,r)}});for(let r=0,s=t.length;r<s;r++){let f=t.get(r).context;f.index=r,f.count=s,f.ngForOf=this._ngForOf}e.forEachIdentityChange(r=>{let s=t.get(r.currentIndex);Se(s,r)})}static ngTemplateContextGuard(e,t){return!0}};a(n,"\u0275fac",function(t){return new(t||n)(d(W),d(Y),d(Fe))}),a(n,"\u0275dir",F({type:n,selectors:[["","ngFor","","ngForOf",""]],inputs:{ngForOf:"ngForOf",ngForTrackBy:"ngForTrackBy",ngForTemplate:"ngForTemplate"}}));let i=n;return i})();function Se(i,n){i.context.$implicit=n.item}var Ut=(()=>{let n=class n{_viewContainer;_context=new ee;_thenTemplateRef=null;_elseTemplateRef=null;_thenViewRef=null;_elseViewRef=null;constructor(e,t){this._viewContainer=e,this._thenTemplateRef=t}set ngIf(e){this._context.$implicit=this._context.ngIf=e,this._updateView()}set ngIfThen(e){ve("ngIfThen",e),this._thenTemplateRef=e,this._thenViewRef=null,this._updateView()}set ngIfElse(e){ve("ngIfElse",e),this._elseTemplateRef=e,this._elseViewRef=null,this._updateView()}_updateView(){this._context.$implicit?this._thenViewRef||(this._viewContainer.clear(),this._elseViewRef=null,this._thenTemplateRef&&(this._thenViewRef=this._viewContainer.createEmbeddedView(this._thenTemplateRef,this._context))):this._elseViewRef||(this._viewContainer.clear(),this._thenViewRef=null,this._elseTemplateRef&&(this._elseViewRef=this._viewContainer.createEmbeddedView(this._elseTemplateRef,this._context)))}static ngTemplateContextGuard(e,t){return!0}};a(n,"ngIfUseIfTypeGuard"),a(n,"ngTemplateGuard_ngIf"),a(n,"\u0275fac",function(t){return new(t||n)(d(W),d(Y))}),a(n,"\u0275dir",F({type:n,selectors:[["","ngIf",""]],inputs:{ngIf:"ngIf",ngIfThen:"ngIfThen",ngIfElse:"ngIfElse"}}));let i=n;return i})(),ee=class{$implicit=null;ngIf=null};function ve(i,n){if(!!!(!n||n.createEmbeddedView))throw new Error(`${i} must be a TemplateRef, but received '${me(n)}'.`)}var jt=(()=>{let n=class n{_ngEl;_differs;_renderer;_ngStyle=null;_differ=null;constructor(e,t,r){this._ngEl=e,this._differs=t,this._renderer=r}set ngStyle(e){this._ngStyle=e,!this._differ&&e&&(this._differ=this._differs.find(e).create())}ngDoCheck(){if(this._differ){let e=this._differ.diff(this._ngStyle);e&&this._applyChanges(e)}}_setStyle(e,t){let[r,s]=e.split("."),o=r.indexOf("-")===-1?void 0:Ce.DashCase;t!=null?this._renderer.setStyle(this._ngEl.nativeElement,r,s?`${t}${s}`:t,o):this._renderer.removeStyle(this._ngEl.nativeElement,r,o)}_applyChanges(e){e.forEachRemovedItem(t=>this._setStyle(t.key,null)),e.forEachAddedItem(t=>this._setStyle(t.key,t.currentValue)),e.forEachChangedItem(t=>this._setStyle(t.key,t.currentValue))}};a(n,"\u0275fac",function(t){return new(t||n)(d(S),d(ye),d(N))}),a(n,"\u0275dir",F({type:n,selectors:[["","ngStyle",""]],inputs:{ngStyle:"ngStyle"}}));let i=n;return i})();var Vt=(()=>{let n=class n{};a(n,"\u0275fac",function(t){return new(t||n)}),a(n,"\u0275mod",k({type:n})),a(n,"\u0275inj",B({}));let i=n;return i})(),zt="browser",je="server";function Gt(i){return i===je}var Ht=(()=>{let n=class n{};a(n,"\u0275prov",l({token:n,providedIn:"root",factory:()=>new te(C(ne),window)}));let i=n;return i})(),te=class{document;window;offset=()=>[0,0];constructor(n,u){this.document=n,this.window=u}setOffset(n){Array.isArray(n)?this.offset=()=>n:this.offset=n}getScrollPosition(){return[this.window.scrollX,this.window.scrollY]}scrollToPosition(n){this.window.scrollTo(n[0],n[1])}scrollToAnchor(n){let u=Ve(this.document,n);u&&(this.scrollToElement(u),u.focus())}setHistoryScrollRestoration(n){this.window.history.scrollRestoration=n}scrollToElement(n){let u=n.getBoundingClientRect(),e=u.left+this.window.pageXOffset,t=u.top+this.window.pageYOffset,r=this.offset();this.window.scrollTo(e-r[0],t-r[1])}};function Ve(i,n){let u=i.getElementById(n)||i.getElementsByName(n)[0];if(u)return u;if(typeof i.createTreeWalker=="function"&&i.body&&typeof i.body.attachShadow=="function"){let e=i.createTreeWalker(i.body,NodeFilter.SHOW_ELEMENT),t=e.currentNode;for(;t;){let r=t.shadowRoot;if(r){let s=r.getElementById(n)||r.querySelector(`[name="${n}"]`);if(s)return s}t=e.nextNode()}}return null}var Le=class{};var y=class{},Ie=(()=>{let n=class n extends y{getTranslation(e){return A({})}};a(n,"\u0275fac",(()=>{let e;return function(r){return(e||(e=O(n)))(r||n)}})()),a(n,"\u0275prov",l({token:n,factory:n.\u0275fac}));let i=n;return i})(),L=class{},Te=(()=>{let n=class n{handle(e){return e.key}};a(n,"\u0275fac",function(t){return new(t||n)}),a(n,"\u0275prov",l({token:n,factory:n.\u0275fac}));let i=n;return i})();function V(i,n){if(i===n)return!0;if(i===null||n===null)return!1;if(i!==i&&n!==n)return!0;let u=typeof i,e=typeof n,t,r,s;if(u==e&&u=="object")if(Array.isArray(i)){if(!Array.isArray(n))return!1;if((t=i.length)==n.length){for(r=0;r<t;r++)if(!V(i[r],n[r]))return!1;return!0}}else{if(Array.isArray(n))return!1;s=Object.create(null);for(r in i){if(!V(i[r],n[r]))return!1;s[r]=!0}for(r in n)if(!(r in s)&&typeof n[r]<"u")return!1;return!0}return!1}function p(i){return typeof i<"u"&&i!==null}function I(i){return j(i)&&!fe(i)&&i!==null}function j(i){return typeof i=="object"}function fe(i){return Array.isArray(i)}function he(i){return typeof i=="string"}function ze(i){return typeof i=="function"}function se(i,n){let u=Object.assign({},i);return j(i)?(j(i)&&j(n)&&Object.keys(n).forEach(e=>{I(n[e])?e in i?u[e]=se(i[e],n[e]):Object.assign(u,{[e]:n[e]}):Object.assign(u,{[e]:n[e]})}),u):se({},n)}function oe(i,n){let u=n.split(".");n="";do n+=u.shift(),p(i)&&p(i[n])&&(I(i[n])||fe(i[n])||!u.length)?(i=i[n],n=""):u.length?n+=".":i=void 0;while(u.length);return i}function Ge(i,n,u){let e=n.split("."),t=i;for(let r=0;r<e.length;r++){let s=e[r];r===e.length-1?t[s]=u:((!t[s]||!I(t[s]))&&(t[s]={}),t=t[s])}}var E=class{},Me=(()=>{let n=class n extends E{templateMatcher=/{{\s?([^{}\s]*)\s?}}/g;interpolate(e,t){if(he(e))return this.interpolateString(e,t);if(ze(e))return this.interpolateFunction(e,t)}interpolateFunction(e,t){return e(t)}interpolateString(e,t){return t?e.replace(this.templateMatcher,(r,s)=>{let o=oe(t,s);return p(o)?o:r}):e}};a(n,"\u0275fac",(()=>{let e;return function(r){return(e||(e=O(n)))(r||n)}})()),a(n,"\u0275prov",l({token:n,factory:n.\u0275fac}));let i=n;return i})(),w=class{},Re=(()=>{let n=class n extends w{compile(e,t){return e}compileTranslations(e,t){return e}};a(n,"\u0275fac",(()=>{let e;return function(r){return(e||(e=O(n)))(r||n)}})()),a(n,"\u0275prov",l({token:n,factory:n.\u0275fac}));let i=n;return i})(),_=class{defaultLang;currentLang=this.defaultLang;translations={};langs=[];onTranslationChange=new P;onLangChange=new P;onDefaultLangChange=new P},ae=new g("ISOLATE_TRANSLATE_SERVICE"),ue=new g("USE_DEFAULT_LANG"),ce=new g("DEFAULT_LANGUAGE"),le=new g("USE_EXTEND"),v=i=>m(i)?i:A(i),de=(()=>{let n=class n{store;currentLoader;compiler;parser;missingTranslationHandler;useDefaultLang;extend;loadingTranslations;pending=!1;_translationRequests={};lastUseLanguage=null;get onTranslationChange(){return this.store.onTranslationChange}get onLangChange(){return this.store.onLangChange}get onDefaultLangChange(){return this.store.onDefaultLangChange}get defaultLang(){return this.store.defaultLang}set defaultLang(e){this.store.defaultLang=e}get currentLang(){return this.store.currentLang}set currentLang(e){this.store.currentLang=e}get langs(){return this.store.langs}set langs(e){this.store.langs=e}get translations(){return this.store.translations}set translations(e){this.store.translations=e}constructor(e,t,r,s,o,f=!0,h=!1,T=!1,M){this.store=e,this.currentLoader=t,this.compiler=r,this.parser=s,this.missingTranslationHandler=o,this.useDefaultLang=f,this.extend=T,h&&(this.store=new _),M&&this.setDefaultLang(M)}setDefaultLang(e){if(e===this.defaultLang)return;let t=this.retrieveTranslations(e);typeof t<"u"?(this.defaultLang==null&&(this.defaultLang=e),t.pipe(b(1)).subscribe(()=>{this.changeDefaultLang(e)})):this.changeDefaultLang(e)}getDefaultLang(){return this.defaultLang}use(e){if(this.lastUseLanguage=e,e===this.currentLang)return A(this.translations[e]);this.currentLang||(this.currentLang=e);let t=this.retrieveTranslations(e);return m(t)?(t.pipe(b(1)).subscribe(()=>{this.changeLang(e)}),t):(this.changeLang(e),A(this.translations[e]))}changeLang(e){e===this.lastUseLanguage&&(this.currentLang=e,this.onLangChange.emit({lang:e,translations:this.translations[e]}),this.defaultLang==null&&this.changeDefaultLang(e))}retrieveTranslations(e){if(typeof this.translations[e]>"u"||this.extend)return this._translationRequests[e]=this._translationRequests[e]||this.loadAndCompileTranslations(e),this._translationRequests[e]}getTranslation(e){return this.loadAndCompileTranslations(e)}loadAndCompileTranslations(e){this.pending=!0;let t=this.currentLoader.getTranslation(e).pipe(Z(1),b(1));return this.loadingTranslations=t.pipe(z(r=>this.compiler.compileTranslations(r,e)),Z(1),b(1)),this.loadingTranslations.subscribe({next:r=>{this.translations[e]=this.extend&&this.translations[e]?R(R({},r),this.translations[e]):r,this.updateLangs(),this.pending=!1},error:r=>{this.pending=!1}}),t}setTranslation(e,t,r=!1){let s=this.compiler.compileTranslations(t,e);(r||this.extend)&&this.translations[e]?this.translations[e]=se(this.translations[e],s):this.translations[e]=s,this.updateLangs(),this.onTranslationChange.emit({lang:e,translations:this.translations[e]})}getLangs(){return this.langs}addLangs(e){let t=e.filter(r=>!this.langs.includes(r));t.length>0&&(this.langs=[...this.langs,...t])}updateLangs(){this.addLangs(Object.keys(this.translations))}getParsedResultForKey(e,t,r){let s;if(e&&(s=this.runInterpolation(oe(e,t),r)),s===void 0&&this.defaultLang!=null&&this.defaultLang!==this.currentLang&&this.useDefaultLang&&(s=this.runInterpolation(oe(this.translations[this.defaultLang],t),r)),s===void 0){let o={key:t,translateService:this};typeof r<"u"&&(o.interpolateParams=r),s=this.missingTranslationHandler.handle(o)}return s!==void 0?s:t}runInterpolation(e,t){if(fe(e))return e.map(r=>this.runInterpolation(r,t));if(I(e)){let r={};for(let s in e){let o=this.runInterpolation(e[s],t);o!==void 0&&(r[s]=o)}return r}else return this.parser.interpolate(e,t)}getParsedResult(e,t,r){if(t instanceof Array){let s={},o=!1;for(let h of t)s[h]=this.getParsedResultForKey(e,h,r),o=o||m(s[h]);if(!o)return s;let f=t.map(h=>v(s[h]));return De(f).pipe(z(h=>{let T={};return h.forEach((M,Be)=>{T[t[Be]]=M}),T}))}return this.getParsedResultForKey(e,t,r)}get(e,t){if(!p(e)||!e.length)throw new Error('Parameter "key" is required and cannot be empty');return this.pending?this.loadingTranslations.pipe(pe(r=>v(this.getParsedResult(r,e,t)))):v(this.getParsedResult(this.translations[this.currentLang],e,t))}getStreamOnTranslationChange(e,t){if(!p(e)||!e.length)throw new Error('Parameter "key" is required and cannot be empty');return G(H(()=>this.get(e,t)),this.onTranslationChange.pipe(K(r=>{let s=this.getParsedResult(r.translations,e,t);return v(s)})))}stream(e,t){if(!p(e)||!e.length)throw new Error('Parameter "key" required');return G(H(()=>this.get(e,t)),this.onLangChange.pipe(K(r=>{let s=this.getParsedResult(r.translations,e,t);return v(s)})))}instant(e,t){if(!p(e)||e.length===0)throw new Error('Parameter "key" is required and cannot be empty');let r=this.getParsedResult(this.translations[this.currentLang],e,t);return m(r)?Array.isArray(e)?e.reduce((s,o)=>(s[o]=o,s),{}):e:r}set(e,t,r=this.currentLang){Ge(this.translations[r],e,he(t)?this.compiler.compile(t,r):this.compiler.compileTranslations(t,r)),this.updateLangs(),this.onTranslationChange.emit({lang:r,translations:this.translations[r]})}changeDefaultLang(e){this.defaultLang=e,this.onDefaultLangChange.emit({lang:e,translations:this.translations[e]})}reloadLang(e){return this.resetLang(e),this.loadAndCompileTranslations(e)}resetLang(e){delete this._translationRequests[e],delete this.translations[e]}getBrowserLang(){if(typeof window>"u"||!window.navigator)return;let e=this.getBrowserCultureLang();return e?e.split(/[-_]/)[0]:void 0}getBrowserCultureLang(){if(!(typeof window>"u"||typeof window.navigator>"u"))return window.navigator.languages?window.navigator.languages[0]:window.navigator.language||window.navigator.browserLanguage||window.navigator.userLanguage}};a(n,"\u0275fac",function(t){return new(t||n)(c(_),c(y),c(w),c(E),c(L),c(ue),c(ae),c(le),c(ce))}),a(n,"\u0275prov",l({token:n,factory:n.\u0275fac,providedIn:"root"}));let i=n;return i})();var sn=(()=>{let n=class n{translate;_ref;value="";lastKey=null;lastParams=[];onTranslationChange;onLangChange;onDefaultLangChange;constructor(e,t){this.translate=e,this._ref=t}updateValue(e,t,r){let s=o=>{this.value=o!==void 0?o:e,this.lastKey=e,this._ref.markForCheck()};if(r){let o=this.translate.getParsedResult(r,e,t);m(o)?o.subscribe(s):s(o)}this.translate.get(e,t).subscribe(s)}transform(e,...t){if(!e||!e.length)return e;if(V(e,this.lastKey)&&V(t,this.lastParams))return this.value;let r;if(p(t[0])&&t.length)if(he(t[0])&&t[0].length){let s=t[0].replace(/(')?([a-zA-Z0-9_]+)(')?(\s)?:/g,'"$2":').replace(/:(\s)?(')(.*?)(')/g,':"$3"');try{r=JSON.parse(s)}catch(o){throw new SyntaxError(`Wrong parameter in TranslatePipe. Expected a valid Object, received: ${t[0]}`)}}else I(t[0])&&(r=t[0]);return this.lastKey=e,this.lastParams=t,this.updateValue(e,r),this._dispose(),this.onTranslationChange||(this.onTranslationChange=this.translate.onTranslationChange.subscribe(s=>{this.lastKey&&s.lang===this.translate.currentLang&&(this.lastKey=null,this.updateValue(e,r,s.translations))})),this.onLangChange||(this.onLangChange=this.translate.onLangChange.subscribe(s=>{this.lastKey&&(this.lastKey=null,this.updateValue(e,r,s.translations))})),this.onDefaultLangChange||(this.onDefaultLangChange=this.translate.onDefaultLangChange.subscribe(()=>{this.lastKey&&(this.lastKey=null,this.updateValue(e,r))})),this.value}_dispose(){typeof this.onTranslationChange<"u"&&(this.onTranslationChange.unsubscribe(),this.onTranslationChange=void 0),typeof this.onLangChange<"u"&&(this.onLangChange.unsubscribe(),this.onLangChange=void 0),typeof this.onDefaultLangChange<"u"&&(this.onDefaultLangChange.unsubscribe(),this.onDefaultLangChange=void 0)}ngOnDestroy(){this._dispose()}};a(n,"\u0275fac",function(t){return new(t||n)(d(de,16),d($,16))}),a(n,"\u0275pipe",X({name:"translate",type:n,pure:!1})),a(n,"\u0275prov",l({token:n,factory:n.\u0275fac}));let i=n;return i})();var on=(()=>{let n=class n{static forRoot(e={}){return{ngModule:n,providers:[e.loader||{provide:y,useClass:Ie},e.compiler||{provide:w,useClass:Re},e.parser||{provide:E,useClass:Me},e.missingTranslationHandler||{provide:L,useClass:Te},_,{provide:ae,useValue:e.isolate},{provide:ue,useValue:e.useDefaultLang},{provide:le,useValue:e.extend},{provide:ce,useValue:e.defaultLanguage},de]}}static forChild(e={}){return{ngModule:n,providers:[e.loader||{provide:y,useClass:Ie},e.compiler||{provide:w,useClass:Re},e.parser||{provide:E,useClass:Me},e.missingTranslationHandler||{provide:L,useClass:Te},{provide:ae,useValue:e.isolate},{provide:ue,useValue:e.useDefaultLang},{provide:le,useValue:e.extend},{provide:ce,useValue:e.defaultLanguage},de]}}};a(n,"\u0275fac",function(t){return new(t||n)}),a(n,"\u0275mod",k({type:n})),a(n,"\u0275inj",B({}));let i=n;return i})();export{q as a,Ot as b,Ee as c,ne as d,Pt as e,U as f,Ne as g,Nt as h,ke as i,kt as j,$t as k,xt as l,Ut as m,jt as n,Vt as o,zt as p,Gt as q,Ht as r,Le as s,y as t,de as u,sn as v,on as w};
