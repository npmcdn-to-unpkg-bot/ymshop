module.exports = {
  say:function(){
    
    document.body.style.background="#000"
  },
	share:function(){
		var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);


        var GetQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]);
        return null;
        };

        if (isAndroid) {


           function connectWebViewJavascriptBridge(callback) {
            if (window.WebViewJavascriptBridge) {
                callback(WebViewJavascriptBridge)
            } else {
                document.addEventListener(
                    'WebViewJavascriptBridgeReady'
                    , function() {
                        callback(WebViewJavascriptBridge)
                    },
                    false
                );
            }
        }

        connectWebViewJavascriptBridge(function(bridge) {

             bridge.init(function(message, responseCallback) {

                responseCallback(data);
            });

            bridge.registerHandler("getShareInfo", function(data, responseCallback) {
                var url = window.location.href 
                var repStr = GetQueryString('uid')
                var str = url.replace(repStr,'')    
                var responseData = {
                  'title':'医生站医米商城重大改版啦！',
                  'brief':'想不到好礼等你抢兑~',
                  'shareUrl':str
                };
                responseCallback(responseData);
            });
        })
        }else if (isIOS){
     
            // 检测是已创建script
            
                var url = window.location.href;
                var repStr = GetQueryString('uid')
                var str = url.replace(repStr,'')    
                var responseData = {
                  title:'医生站医米商城重大改版啦！',
                  brief:'想不到好礼等你抢兑~',
                  shareUrl:str
                };

            var hasBuildScript=document.getElementById('IOS_shareInfo')



                 if (hasBuildScript) {

                    document.body.removeChild(hasBuildScript)
                    var script = document.createElement('script');
                        script.id = 'IOS_shareInfo';
                        script.innerHTML='try{window.webkit.messageHandlers.getShareInfoOC.postMessage({title:"'+responseData.title+'",brief:"'+responseData.brief+'",shareUrl:"'+responseData.shareUrl+'"});}catch(e){}'

                        document.body.appendChild(script)
                    }else{

                       var script = document.createElement('script');
                           script.id = 'IOS_shareInfo';
                           script.innerHTML='try{window.webkit.messageHandlers.getShareInfoOC.postMessage({title:"'+responseData.title+'",brief:"'+responseData.brief+'",shareUrl:"'+responseData.shareUrl+'"});}catch(e){}'

                       document.body.appendChild(script)
                    }






        } else {
        	console.log('pc')
        }
	}

}