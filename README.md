# blog_kim_s_shop_frontServer

blog_kims_shop_back_server를 위해 만든 프론트서버입니다
그냥 작동만하게 만든 프론트서버입니다

사실 프론트를 리액트로만들려고 했으나 
리액트 공부까지하면서 백엔드 공부까지 하긴엔 
빠듯할거같아서 그래도 최대한 프론트 서버느낌나게 하려고
최대한 html/j쿼리/자바스크립트로만 구현하려고 했습니다

톰캣10.0을 사용하였고
자바 인증서를 이용해 https로 구현했습니다
톰캣10버전에서는
<Connector
    protocol="org.apache.coyote.http11.Http11NioProtocol"
    port="8443"
    maxThreads="150"
    SSLEnabled="true">
  <SSLHostConfig>
    <Certificate
      certificateKeystoreFile="C:/Program Files/Java/jdk-11.0.11/bin/ayokeystore.pkcs12"
      certificateKeystorePassword="1234567"
      type="RSA"
      />
    </SSLHostConfig>
좀다르게 keystore를 넣어줘야했습니다
자세한 프로젝트 설명은 
https://github.com/novb1492/blog_kims_shop_back_server#readme
에 적어놓았습니다




