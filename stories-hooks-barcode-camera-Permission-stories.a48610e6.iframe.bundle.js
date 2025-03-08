/*! For license information please see stories-hooks-barcode-camera-Permission-stories.a48610e6.iframe.bundle.js.LICENSE.txt */
"use strict";(globalThis.webpackChunk_j5bot_use_barcode_scanner_hooks=globalThis.webpackChunk_j5bot_use_barcode_scanner_hooks||[]).push([[554],{"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")},"./src/hooks/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{mv:()=>useBarcodeScanner,w6:()=>useGetDeviceList,Ci:()=>useHasCameraPermission,F_:()=>useScanCanvas,pZ:()=>useVideoCanvas,vf:()=>useWebcam});var react=__webpack_require__("./node_modules/react/index.js");const useGetDeviceList=(hasPermission,onDevices)=>{const[deviceList,setDeviceList]=(0,react.useState)([]);return(0,react.useEffect)((()=>{let active=!0;return hasPermission&&listDevices().then((deviceList=>{active&&(setDeviceList(deviceList),null==onDevices||onDevices(deviceList))})),()=>{active=!1}}),[hasPermission,onDevices]),{deviceList}},listDevices=async()=>{var _navigator$mediaDevic,_navigator$mediaDevic2,_devices$filter;let devices=await(null===(_navigator$mediaDevic=navigator.mediaDevices)||void 0===_navigator$mediaDevic||null===(_navigator$mediaDevic2=_navigator$mediaDevic.enumerateDevices)||void 0===_navigator$mediaDevic2?void 0:_navigator$mediaDevic2.call(_navigator$mediaDevic));return null!==(_devices$filter=null==devices?void 0:devices.filter((device=>"videoinput"===device.kind)))&&void 0!==_devices$filter?_devices$filter:[]},getMediaConstraintsForDeviceChoiceOptions=(deviceList,deviceChoiceOptions)=>{const constraints={audio:!1,video:!0};if(0===deviceList.length)return;if(1===deviceList.length)return constraints;let advancedConstraints=[],{deviceId}=deviceChoiceOptions;const{matcher,facingMode,width,height}=deviceChoiceOptions;if(constraints.video={width,height},deviceId&&advancedConstraints.push({deviceId}),!deviceId&&matcher){const matched=deviceList.filter((deviceInfo=>matcher.test(deviceInfo.label)));1===matched.length&&advancedConstraints.push({deviceId:matched[0].deviceId}),matched.length>1&&facingMode&&(advancedConstraints=advancedConstraints.concat(matched.map((matchingDevice=>({deviceId:matchingDevice.deviceId,facingMode})))))}return deviceId||matcher||!facingMode||advancedConstraints.push({facingMode}),advancedConstraints.length>0&&(constraints.video={width,height,advanced:advancedConstraints}),constraints},getUserMedia=function(constraints){return navigator.mediaDevices.getUserMedia(constraints).then((stream=>stream))},removeStreamTracks=stream=>{stream.getTracks().forEach((track=>{track.enabled=!1,track.stop(),stream.removeTrack(track)}))},useHasCameraPermission=()=>{const[hasPermission,setHasPermission]=(0,react.useState)(!1);return(0,react.useEffect)((()=>{let active=!0;return resolveCameraPermission().then((permission=>{active&&setHasPermission(permission)})),()=>{active=!1}}),[setHasPermission]),{hasPermission}},resolveCameraPermission=async()=>await(async()=>{var _navigator$mediaDevic,_navigator$mediaDevic2;const mediaDeviceInfos=await(null===(_navigator$mediaDevic=navigator.mediaDevices)||void 0===_navigator$mediaDevic||null===(_navigator$mediaDevic2=_navigator$mediaDevic.enumerateDevices)||void 0===_navigator$mediaDevic2?void 0:_navigator$mediaDevic2.call(_navigator$mediaDevic));return!(null==mediaDeviceInfos||!mediaDeviceInfos.find((mediaDeviceInfo=>{var _mediaDeviceInfo$devi;return(null===(_mediaDeviceInfo$devi=mediaDeviceInfo.deviceId)||void 0===_mediaDeviceInfo$devi?void 0:_mediaDeviceInfo$devi.length)>0})))})()?Promise.resolve(!0):(async()=>{try{let stream=await getUserMedia({video:!0,audio:!1},"canGetUserMedia");return removeStreamTracks(stream),!0}catch(e){return!1}})();let barcodeDetector;const barcodeDetectorOptions={formats:["ean_13","upc_a"]},useScanCanvas=onScan=>{const canvasRef=(0,react.useRef)(null),detectedBarcodesRef=(0,react.useRef)(new Map),[canDetect,setCanDetect]=(0,react.useState)(!0);return{onDraw:()=>canvasRef.current&&canDetect?(async options=>barcodeDetector||("BarcodeDetector"in window||await __webpack_require__.e(631).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@undecaf/barcode-detector-polyfill/dist/main.js")).then((BCD=>{const{BarcodeDetectorPolyfill}=BCD;window.BarcodeDetector=BarcodeDetectorPolyfill})),window.BarcodeDetector.getSupportedFormats().then((formats=>0===formats.length?Promise.reject("No barcode detection"):(barcodeDetector=new window.BarcodeDetector(options),Promise.resolve(barcodeDetector))))))(barcodeDetectorOptions).then((barcodeDetector=>canvasRef.current?createImageBitmap(canvasRef.current).then((bitmap=>{const detectedBarcodes=detectedBarcodesRef.current;return null==barcodeDetector?void 0:barcodeDetector.detect(bitmap).then((barcodes=>{barcodes.length>0&&barcodes.filter((code=>!detectedBarcodes.has(code.rawValue))).length>0&&barcodes.forEach((barcode=>{detectedBarcodes.has(barcode.rawValue)||(detectedBarcodes.set(barcode.rawValue,bitmap),null==onScan||onScan(barcode.rawValue))}))})).catch((error=>{console.log("unable to detect",error)}))})):Promise.resolve(void 0))).catch((error=>{console.error("setting can detect to false"),setCanDetect(!1)})):Promise.resolve(void 0),canDetect,canvasRef,detectedBarcodesRef}},playWithRetry=async videoElement=>{try{return await videoElement.play()}catch(error){return console.log(error),new Promise((resolve=>{setTimeout((()=>resolve(playWithRetry(videoElement))),100)}))}},useVideoCanvas=options=>{const{onDraw,onPlay,webcamVideoRef,shouldDraw=!0,canvasRef,hasPermission=!0,shouldPlay,timeoutDelay=17,zoom=1}=options,[context,setContext]=(0,react.useState)(),[hasListener,setHasListener]=(0,react.useState)(!1),bounds=(0,react.useMemo)((()=>{const video=webcamVideoRef.current,canvas=canvasRef.current;if(!video||!canvas)return[0,0,0,0,0,0,0,0];return[video.width/2-canvas.width/(2*zoom),video.height/2-canvas.height/(2*zoom),canvas.width/zoom,canvas.height/zoom,0,0,canvas.width,canvas.height]}),[canvasRef,webcamVideoRef,zoom]),streamToCanvas=(0,react.useMemo)((()=>()=>{const videoElement=webcamVideoRef.current;context&&videoElement?(context.drawImage(videoElement,...bounds),shouldDraw&&(null==onDraw||onDraw()),window.setTimeout(streamToCanvas,timeoutDelay)):setTimeout(streamToCanvas,100)}),[bounds,onDraw,timeoutDelay,webcamVideoRef,shouldDraw,context]);(0,react.useEffect)((()=>{var _canvasRef$current;!context&&canvasRef.current&&setContext(null===(_canvasRef$current=canvasRef.current)||void 0===_canvasRef$current?void 0:_canvasRef$current.getContext("2d"));hasPermission&&context&&webcamVideoRef.current&&(hasListener||(webcamVideoRef.current.addEventListener("play",(event=>{streamToCanvas()})),shouldPlay&&playWithRetry(webcamVideoRef.current).then(onPlay),setHasListener(!0)))}),[canvasRef,webcamVideoRef,hasListener,onPlay,shouldPlay,streamToCanvas,hasPermission,context])},defaultDeviceChoiceOptions={matcher:/back/i,facingMode:"environment"},useWebcam=function(){let options=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{deviceChoiceOptions,onDevices,shouldPlay}=options,webcamVideoRef=(0,react.useRef)(null),{hasPermission}=useHasCameraPermission(),{deviceList}=useGetDeviceList(hasPermission,onDevices),combinedDeviceChoiceOptions=(0,react.useMemo)((()=>{var _webcamVideoRef$curre,_webcamVideoRef$curre2,_webcamVideoRef$curre3,_webcamVideoRef$curre4;return Object.assign({width:null!==(_webcamVideoRef$curre=null===(_webcamVideoRef$curre2=webcamVideoRef.current)||void 0===_webcamVideoRef$curre2?void 0:_webcamVideoRef$curre2.width)&&void 0!==_webcamVideoRef$curre?_webcamVideoRef$curre:640,height:null!==(_webcamVideoRef$curre3=null===(_webcamVideoRef$curre4=webcamVideoRef.current)||void 0===_webcamVideoRef$curre4?void 0:_webcamVideoRef$curre4.height)&&void 0!==_webcamVideoRef$curre3?_webcamVideoRef$curre3:480},null!=deviceChoiceOptions?deviceChoiceOptions:defaultDeviceChoiceOptions)}),[webcamVideoRef,deviceChoiceOptions]),{stream}=((hasPermission,deviceList,deviceChoiceOptions)=>{const[stream,setStream]=(0,react.useState)(),constraints=(0,react.useMemo)((()=>getMediaConstraintsForDeviceChoiceOptions(deviceList,deviceChoiceOptions)),[deviceList,deviceChoiceOptions]);return(0,react.useEffect)((()=>{let active=!0;return hasPermission&&constraints&&getUserMedia(constraints,"useDeviceStream #1").then((stream=>{active?setStream(stream):removeStreamTracks(stream)})).catch((error=>(console.log("requested device not available",error),getUserMedia({video:{advanced:[{facingMode:"environment"}]}},"useDeviceStream #2").then(setStream).catch((error=>(console.log("no environment-facing camera available",error),getUserMedia({video:!0},"useDeviceStream #3").then(setStream))))))),()=>{active=!1}}),[hasPermission,constraints]),{stream}})(hasPermission,deviceList,combinedDeviceChoiceOptions),{isStreaming}=useStreamToVideoElement(webcamVideoRef.current,stream,shouldPlay);return{webcamVideoRef,deviceList,hasPermission,stream,isStreaming}},useStreamToVideoElement=(videoElement,stream,shouldPlay)=>{const[isStreaming,setIsStreaming]=(0,react.useState)(!1);return(0,react.useEffect)((()=>{let active=!0;return!isStreaming&&videoElement&&stream&&(videoElement.srcObject=stream,shouldPlay&&videoElement.play().then((()=>{active&&setIsStreaming(!0)})).catch((()=>{active&&setIsStreaming(!1)}))),()=>{active=!1}}),[stream,videoElement,isStreaming,shouldPlay]),{isStreaming}},useBarcodeScanner=options=>{const{zoom=1,deviceChoiceOptions,onScan,onDevices,shouldPlay=!0}=options,{webcamVideoRef,hasPermission,isStreaming,stream}=useWebcam({deviceChoiceOptions,onDevices}),{onDraw,canDetect,canvasRef,detectedBarcodesRef}=useScanCanvas(onScan);return useVideoCanvas({onDraw,webcamVideoRef,shouldDraw:canDetect,canvasRef,hasPermission,shouldPlay,zoom}),{webcamVideoRef,canvasRef,stream,detectedBarcodes:detectedBarcodesRef.current,hasPermission,isStreaming}}},"./src/stories/hooks/barcode/camera/Permission.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{HasCameraPermission:()=>HasCameraPermission,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _hooks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/hooks/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const CameraPermissionExample=props=>{const{Component,...rest}=props;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component,{...rest})},__WEBPACK_DEFAULT_EXPORT__={component:CameraPermissionExample,title:"Camera/Permission"},HasCameraPermission=(args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(CameraPermissionExample,{...args})).bind({});HasCameraPermission.args={Component:()=>{const{hasPermission}=(0,_hooks__WEBPACK_IMPORTED_MODULE_1__.Ci)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{children:["Has Camera Permission: ",hasPermission.toString()]})}};const __namedExportsOrder=["HasCameraPermission"];HasCameraPermission.parameters={...HasCameraPermission.parameters,docs:{...HasCameraPermission.parameters?.docs,source:{originalSource:"(args: any) => <CameraPermissionExample {...args} />",...HasCameraPermission.parameters?.docs?.source}}}}}]);