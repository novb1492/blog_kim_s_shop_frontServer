var xhr=new XMLHttpRequest(requestUrl);
function getNewAccesToken(){
    console.log('새토큰 필요');
    xhr.open('POST',requestUrl,true);
    xhr.withCredentials = true;
    xhr.send();
    xhr.onload=function(){
        console.log('새토큰 발급');
        var result=JSON.parse(xhr.response);
       return result;
    }
}