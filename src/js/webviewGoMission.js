module.exports = {
	 //点击获取医米 进入APP医米任务界面
	 //
	say:function(){
		alert(1)
	},
    goMission:function(){
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

        if (isAndroid) {

          if (window.WebViewJavascriptBridge) {
              window.WebViewJavascriptBridge.callHandler(
                'go2MissionAct',
                function (responseData) {
                 console.log(responseData)
                }
              )
            
            } else {
              document.addEventListener(
                'WebViewJavascriptBridgeReady'
                , function () {
                  window.WebViewJavascriptBridge.callHandler(
                     'go2MissionAct',
                    function (responseData) {
                      console.log(responseData)
                    }
                  )
                },
                false
              )
            }
        }else if (isIOS){


              var script = document.createElement('script');
                  script.id = 'IOS_go2MissionAct';
                  script.innerHTML='try{window.webkit.messageHandlers.go2MissionActOC.postMessage({go2Mission: true});}catch(e){}'

              document.body.appendChild(script)





        } else {
        	console.log('pc')
        }

    }
}