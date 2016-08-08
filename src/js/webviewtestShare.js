module.exports = {
	 say:function(){
	 	alert(1)
	 },
	 test:function(show){

          var u = navigator.userAgent;
          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
          var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);//ios终端
          //0是隐藏，1是显示
          var isHide =   show===0;

          if (isAndroid) {
            if (window.WebViewJavascriptBridge) {
              window.WebViewJavascriptBridge.callHandler(
                'hideShareBtn',
                {'isHide':isHide},
                function (responseData) {
                 console.log(responseData)

                }
              )
            } else {
              document.addEventListener(
                'WebViewJavascriptBridgeReady'
                , function () {
                  window.WebViewJavascriptBridge.callHandler(
                     'hideShareBtn',
                     {'isHide':isHide},
                    function (responseData) {
                      console.log(responseData)
 
                    }
                  )
                },
                false
              )
            }
          } else if(isIOS) {




                   // 检测是已创建script
                var hasBuildScript=document.getElementById('IOS_shareBtn')

                if (hasBuildScript) {
                    document.body.removeChild(hasBuildScript)
                    var script = document.createElement('script');
                        script.id = 'IOS_shareBtn';
                        script.innerHTML='try{window.webkit.messageHandlers.hideShareBtnOC.postMessage({isHide: '+isHide+'});}catch(e){}'

                    document.body.appendChild(script)
                }else{

                   var script = document.createElement('script');
                       script.id = 'IOS_shareBtn';
                       script.innerHTML='try{window.webkit.messageHandlers.hideShareBtnOC.postMessage({isHide: '+isHide+'});}catch(e){}'

                   document.body.appendChild(script)
                }

           
           


           

          
            

          } else {



          	console.log('pc')
          }

    }
}