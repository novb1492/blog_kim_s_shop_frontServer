<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <% 
    String mchtId=request.getParameter("mchtId");//상점아이디
    String outStatCd=request.getParameter("outStatCd");          //결과코드
    String outRsltCd=request.getParameter("outRsltCd");          //거절코드
    String outRsltMsg= request.getParameter("outRsltMsg");         //결과메세지
    String method= request.getParameter("method");             //결제수단
    String mchtTrdNo=         request.getParameter("mchtTrdNo");          //상점주문번호
    String mchtCustId=request.getParameter("mchtCustId");         //상점고객아이디
    String trdNo=             request.getParameter("trdNo");              //세틀뱅크 거래번호
    String trdAmt=            request.getParameter("trdAmt");             //거래금액
    String mchtParam=         request.getParameter("mchtParam");          //상점 예약필드
    String authDt=            request.getParameter("authDt");             //승인일시
    String authNo=            request.getParameter("authNo");             //승인번호
    String reqIssueDt=     	request.getParameter("reqIssueDt");       	//채번요청일시
    String intMon=            request.getParameter("intMon");             //할부개월수
    String fnNm=              request.getParameter("fnNm");               //카드사명
    String fnCd=              request.getParameter("fnCd");               //카드사코드
    String pointTrdNo=        request.getParameter("pointTrdNo");         //포인트거래번호
    String pointTrdAmt=       request.getParameter("pointTrdAmt");        //포인트거래금액
    String cardTrdAmt=        request.getParameter("cardTrdAmt");         //신용카드결제금액
    String vtlAcntNo=         request.getParameter("vtlAcntNo");          //가상계좌번호
    String expireDt=          request.getParameter("expireDt");           //입금기한
    String cphoneNo=          request.getParameter("cphoneNo");           //휴대폰번호
    String billKey=           request.getParameter("billKey");            //자동결제키
    %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <title>Document</title>
</head>
<body>
    <%= mchtId %>
    <%= mchtTrdNo%>
<script src="/lib/js/jslib.js"></script>
<script>
let data=JSON.stringify({
	"mchtId":"<%=mchtId%>",//상점아이디
    "outStatCd":"<%=outStatCd%>",          //결과코드
    "outRsltCd":        "<%=outRsltCd%>",          //거절코드
    "outRsltMsg":        "<%=outRsltMsg%>",         //결과메세지
    "method":            "<%=method%>",             //결제수단
    "mchtTrdNo":         "<%=mchtTrdNo%>",          //상점주문번호
    "mchtCustId":"<%=mchtCustId%>",         //상점고객아이디
    "trdNo":             "<%=trdNo%>",              //세틀뱅크 거래번호
    "trdAmt":            "<%=trdAmt%>",             //거래금액
    "mchtParam":         "<%=mchtParam%>",          //상점 예약필드
    "authDt":            "<%=authDt%>",             //승인일시
    "authNo":            "<%=authNo%>",             //승인번호
    "reqIssueDt":     	"<%=reqIssueDt%>",       	//채번요청일시
    "intMon":            "<%=intMon%>",             //할부개월수
    "fnNm":              "<%=fnNm%>",               //카드사명
    "fnCd":              "<%=fnCd%>",               //카드사코드
    "pointTrdNo":        "<%=pointTrdNo%>",         //포인트거래번호
    "pointTrdAmt":       "<%=pointTrdAmt%>",        //포인트거래금액
    "cardTrdAmt":        "<%=cardTrdAmt%>",         //신용카드결제금액
    "vtlAcntNo":         "<%=vtlAcntNo%>",          //가상계좌번호
    "expireDt":          "<%=expireDt%>",           //입금기한
    "cphoneNo":          "<%=cphoneNo%>",           //휴대폰번호
    "billKey":           "<%=billKey%>"          //자동결제키
});
 console.log(data);
var requestUrl='http://localhost:8080/api/confrimSettle';
var result=fisrtRequest(requestUrl,data);
console.log(result.bool+" "+result.messege);
  alert(result.messege);
if(result.bool){
    opener.document.location.href="showReservationPage.html";
}
self.close();
</script>
</body>
</html>