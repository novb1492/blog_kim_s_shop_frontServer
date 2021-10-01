var result;
var loginBool=false;
var loginEmail;
var reUrl;
function doLogOut() {
    var result2;
    var requestUrl="http://localhost:8080/api/logout";
    result2=fisrtRequest(requestUrl,null);
    location.href="/index.html";
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
    reUrl=requestUrl;
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
    console.log("code:"+this.url+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
    if(request.status==403&&reUrl!="http://localhost:8080/api/email"){
        alert("로그인후 사용부탁드립니다 ");
        location.href='/index.html';
        return;
    }else if(request.status==403&&reUrl=="http://localhost:8080/api/email"){
        document.getElementById('checkLogin').innerHTML=("<a href='/singupPage.html'>회원가입</a><a href='/loginPage.html'>로그인</a>");  
        loginBool=false;
        return;
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
function checkLogin(){
    var requestUrl="http://localhost:8080/api/email";
    result=fisrtRequest(requestUrl,null);
    document.getElementById('welcomeArea').innerHTML=(result.email+"님 환영합니다");
    document.getElementById('checkLogin').innerHTML=("<a href='/myPage.html'>마이페이지</a><a href='/reservationPagevar3.html'>예약페이지</a><a href='/foodBuyPage.html'>커피와케이크</a>");
    loginBool=true;
    loginEmail=result.email;
}
function getParameterByName(search,paramName){ 
    var params = new URLSearchParams(search);
    return params.get(paramName); 
}
function getLoginBool() {
    return loginBool;
}
function getLoginEmail() {
    return loginEmail;
}
function readEditorConfig(idValue) {
    $('#'+idValue).summernote({
        height: 300,                 // 에디터 높이
        minHeight: null,             // 최소 높이
        maxHeight: null,             // 최대 높이
        focus: true,                  // 에디터 로딩후 포커스를 맞출지 여부
        lang: "ko-KR",					// 한글 설정
        placeholder: '최대 2048자까지 쓸 수 있습니다',	//placeholder 설정
        callbacks: {	//여기 부분이 이미지를 첨부하는 부분
            onImageUpload : function(files) {
                for (var i = files.length - 1; i >= 0; i--) {
                    uploadSummernoteImageFile(files[i],this);
                }
            },
            onPaste: function (e) {
                var clipboardData = e.originalEvent.clipboardData;
                if (clipboardData && clipboardData.items && clipboardData.items.length) {
                    var item = clipboardData.items[0];
                    if (item.kind === 'file' && item.type.indexOf('image/') !== -1) {
                        e.preventDefault();
                    }
                }
            }
        }
    });
}
function uploadSummernoteImageFile(file, editor) {
    requestUrl='http://localhost:8080/api/imageUpload';
	var data = new FormData();
	data.append("file", file);
    var response=fisrtRequestForm(requestUrl,data);
    console.log(response+' 젤위')
    $(editor).summernote('insertImage', response.url);
}
function makeHomeLink() {
    document.getElementById('homeLink').innerHTML=("<a href='/index.html'>Kim's Shop</a>");
}
function confrimLength(comapre,min) {
    console.log(comapre);
    if(comapre<=min){
        return true;
    }
    return false;
}








