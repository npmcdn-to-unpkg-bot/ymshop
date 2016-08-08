module.exports = {
  say:function(){
    
    document.body.style.background="#000"
  },
	blance:function(ym,yb){
		var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

        if (isAndroid) {

          if (window.WebViewJavascriptBridge) {
              window.WebViewJavascriptBridge.callHandler(
                'setBalance',
                {'balance':parseInt(yb),'point':parseFloat(ym)},
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
                     'setBalance',
                     {'balance':parseInt(yb),'point':parseFloat(ym)},
                    function (responseData) {
                      console.log(responseData)
                       window.alert('success')
                    }
                  )
                },
                false
              )
            }

 
        }else if (isIOS){
     
        } else {
        	console.log('pc')
        }
	}

}