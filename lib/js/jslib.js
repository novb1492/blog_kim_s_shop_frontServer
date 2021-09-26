var result;
function doLogOut() {
    var result2;
    var requestUrl="http://localhost:8080/api/logout";
    result2=fisrtRequest(requestUrl,null);
    location.href="http:localhost:3030/index.html";
}
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
            showError(request,status,error);
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
            showError(request,status,error);
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
                console.log('새토큰필요');
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
function showError(request,status,error){
    console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
    if(request.status==403){
        alert("로그인후 사용부탁드립니다 ");
        location.href='/index.html';
    }else{
        alert("통신 실패");
    }
}
function getEmail() {
    console.log('getEmail');
    requestUrl='http://localhost:8080/api/email';
    result=fisrtRequest(requestUrl,null);
    return result.email;
}
function nomalPayment(selectItem,totalPrice,email,name,phoneNum,address,postCode,itemCount){
    IMP.init('imp59938102');
    IMP.request_pay({
        pg : 'kcp',
        pay_method : 'card',
        merchant_uid : 'merchant_' + new Date().getTime(),
        name : selectItem, //결제창에서 보여질 이름
        amount : totalPrice, //실제 결제되는 가격
        buyer_email : email,
        buyer_name : name,
        buyer_tel : phoneNum,
        buyer_addr : address,
        buyer_postcode : postCode,
        count :itemCount
    },  function(rsp) {
        if (rsp.success) {
            console.log(rsp.imp_uid);
            doInsert(rsp.imp_uid);
        }else{
            selectTime=[];
             var msg = '결제에 실패하였습니다.';
             msg += '에러내용 : ' + rsp.error_msg;
             alert(msg);
        }
    });
}
function Vbank(trdDt,trdTm,expireDt,itemName,trdAmt,mchtCustId,pktHash,mchtTrdNo){
    SETTLE_PG.pay({
        "env": "https://tbnpg.settlebank.co.kr",
        "mchtId": "nx_mid_il",
        "method": "vbank",
        "trdDt": trdDt,    
        "trdTm": trdTm,
        "expireDt":expireDt,
        "mchtTrdNo":mchtTrdNo,
        "mchtName": "세틀뱅크",
        "mchtEName": "Settlebank",
        "pmtPrdtNm": itemName,
        "trdAmt": trdAmt,
        "mchtCustId":mchtCustId,
        "notiUrl": "http://kim80800.iptime.org:8080/auth/settlebank",
        "nextUrl": "https://localhost:8443/doneSettlebankPage.jsp",
        "cancUrl": "https://localhost:8443/canceSettlePage.html",
        "pktHash": pktHash,
        "ui": {
            "type": "popup",
            "width": "430",
            "height": "660"
        }
        }, function(rsp){
            console.log('통신완료');
            console.log(rsp);
        });      
}
function card(trdDt,trdTm,mchtTrdNo,itemName,trdAmt,mchtCustId,pktHash) {
    SETTLE_PG.pay({
        "env": "https://tbnpg.settlebank.co.kr",
        "mchtId": "nxca_jt_il",
        "method": "card",
        "trdDt": trdDt,    
        "trdTm": trdTm,
        "mchtTrdNo": mchtTrdNo,
        "mchtName": "kimsshop",
        "mchtEName": "kimsshop",
        "pmtPrdtNm": itemName,
        "trdAmt": trdAmt,
        "mchtCustId":mchtCustId,
        "notiUrl": "http://kim80800.iptime.org:8080/auth/settlebank",
        "nextUrl": "https://localhost:8443/doneSettlebankPage.jsp",
        "cancUrl": "https://localhost:8443/canceSettlePage.html",
        "pktHash": pktHash,
        "ui": {
            "type": "popup",
            "width": "430",
            "height": "660"
        }
        }, function(rsp){
            //iframe인경우 온다고 한다
            console.log('통신완료');
            console.log(rsp);
        });      
}
function make2DArray(rows, columns){
	var arr = new Array(rows);
    for(var i = 0; i < rows; i++){
    	arr[i] = new Array(columns);
    }
    return arr;
}







