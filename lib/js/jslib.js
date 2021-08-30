var result;
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
            console.log(data);
            result=data;
        },
        error : function(request,status,error) {
            alert("통신 실패");
        }
    });
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
            var json;
            if(response.status=='newJwtToken'){
                json=getNewAccesToken(requestUrl,data);
            }
            result=json;
        },
        error : function(request,status,error) {
            selectTime=[];
            alert("통신 실패");
        }
    });
    return result;
}
