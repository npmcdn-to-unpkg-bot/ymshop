module.exports = {
	 say:function(){
	 	alert(1)
	 },
	 title:function(tit){

          var u = navigator.userAgent;
          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
          var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
          //0是隐藏，1是显示


          if (isAndroid) {
            if (window.WebViewJavascriptBridge) {
              window.WebViewJavascriptBridge.callHandler(
                'setTitle',
                {'title':tit},
                function (responseData) {
                 console.log(responseData)
                 window.alert('success')
                }
              )
            } else {
              document.addEventListener(
                'WebViewJavascriptBridgeReady'
                , function () {
                  window.WebViewJavascriptBridge.callHandler(
                     'setTitle',
                     {'title':tit},
                    function (responseData) {
                      console.log(responseData)
                       window.alert('success')
                    }
                  )
                },
                false
              )
            }
          } else if(isIOS) {

            // 检测是已创建script


                 var hasBuildScript=document.getElementById('IOS_setTitle')

                  if (hasBuildScript) {
                      document.body.removeChild(hasBuildScript)
                      var script = document.createElement('script');
                          script.id = 'IOS_setTitle';
                          script.innerHTML='try {window.webkit.messageHandlers.setTitle.postMessage({title: "'+tit+'"});}catch(e){}'

                          document.body.appendChild(script)
                  }else{

                     var script = document.createElement('script');
                         script.id = 'IOS_setTitle';
                         script.innerHTML=' try{window.webkit.messageHandlers.setTitle.postMessage({title: "'+tit+'"});}catch(e){}'

                         document.body.appendChild(script)
                  }


           
          } else {

          	console.log('pc')
          	
          }

    }
}