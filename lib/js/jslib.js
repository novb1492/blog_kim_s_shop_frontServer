var result;
var xhr=new XMLHttpRequest();
function getNewAccesToken(requestUrl,data){
    console.log('새토큰 필요');
    $.ajax({
        type: 'POST',
        url: requestUrl,
        dataType : "json",
        data: data,
        contentType: "application/json; charset:UTF-8",
        async: false,
        xhrFields: {withCredentials: true},
        success: function(data) {
            console.log(data+' data');
            result=data;
        },
        error : function(request,status,error) {
            alert("통신 실패");
        }
    });
    console.log(result);
    return result;
}
function fisrtRequest(requestUrl,data){
    $.ajax({
        type: 'POST',
        url: requestUrl,
        dataType : "json",
        data: data,
        contentType: "application/json; charset:UTF-8",
        async: false,
        xhrFields: {withCredentials: true},
        success: function(response) {
            var json=response;
            if(response.status=='newJwtToken'){
                json=getNewAccesToken(requestUrl,data);
            }
            result=json;
        },
        error : function(request,status,error) {
            alert("통신 실패");
        }
    });
    console.log(result);
    return result;
}
var result;
function getNewAccesTokenXml(requestUrl,data){
   console.log('getNewAccesTokenXml');
   xhr.open('POST',requestUrl,true);
   xhr.setRequestHeader("Content-Type",'application/json');
   xhr.withCredentials = true;
   xhr.send(data);
   xhr.onload=function(){
        result=JSON.parse(xhr.response);
        console.log(result);
   }
   return result;
}
function fisrtRequestXml(requestUrl,data){
    console.log('fisrtRequestXml');
    xhr.open('POST',requestUrl,true);
    xhr.setRequestHeader("Content-Type",'application/json');
    xhr.withCredentials = true;
    xhr.send(data);
    xhr.onload=function(){
        if(xhr.status==200){
            result=JSON.parse(xhr.response);
            if(result.status=='newJwtToken'){
                result=getNewAccesTokenXml(requestUrl,data);
            }
        }
        console.log(result);
        return result;
    }
}




