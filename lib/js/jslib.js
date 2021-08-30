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
function fisrtRequestForm(requestUrl,data){
    console.log('fisrtRequestForm');
    $.ajax({
        data : data,
        type : "POST",
        url : requestUrl,
        contentType : false,
        processData : false,
        async: false,
        xhrFields: {withCredentials: true},
        success : function(response) {
            console.log(response);
            if(response.bool){
                result=response;
            }else if(response.status=='newJwtToken'){
                $.ajax({
                    data : data,
                    type : "POST",
                    url : requestUrl,
                    contentType : false,
                    processData : false,
                    async: false,
                    xhrFields: {withCredentials: true},
                    success : function(response) {
                        console.log(response);
                        if(response.bool){
                            result=response;
                        }else{
                            alert(response.messege);  
                        }
                    }
                });
            }else{
                alert('통신실패');
            }
        }
    });
    return result;
}






