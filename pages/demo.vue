<template>
<main class="row content__page">
    <article class="column large-full entry format-standard">
  <div id="wmd-preview" class="wmd-preview">
    <div class="md-section-divider"></div>
    <div class="md-section-divider"></div>
    <h1 data-anchor-id="hz4z" id="微信网页开发">微信网页开发</h1>
    <p data-anchor-id="p8zh"><code>js</code></p>
    <hr>
    <div class="md-section-divider"></div>
    <h2 data-anchor-id="2q4t" id="概述">概述</h2>
    <p data-anchor-id="l737"><a href="https://mp.weixin.qq.com/" target="_blank">微信公众平台</a>是运营者通过公众号为微信用户提供资讯和服务的平台。
      <br>
      <a href="https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html"
        target="_blank">微信开放平台</a>微信开放给移动应用，网站应用和第三方平台的开发者使用的平台。 <br>
      <a href="https://pay.weixin.qq.com/index.php/core/home/login?return_url=/index.php/core/home"
        target="_blank">微信支付商户平台</a>微信开放支付接口的平台。</p>
    <div class="md-section-divider"></div>
    <h2 data-anchor-id="niyk" id="微信网页授权">微信网页授权</h2>
    <p data-anchor-id="aljh">简单来说就是，如果用户在<strong>微信客户端</strong>中访问第三方网页，公众号可以通过微信网页授权机制，来获取用户基本信息，进而实现业务逻辑。</p>
    <blockquote data-anchor-id="ain5" class="white-blockquote">
      <p><strong>网页授权回调域的说明</strong> <br>
        1、在微信公众号请求用户网页授权之前，开发者需要先到公众平台官网中的“开发 - 接口权限 - 网页服务 - 网页帐号 -
        网页授权获取用户基本信息”的配置选项中，修改授权回调域名。请注意，这里填写的是域名（是一个字符串），而不是URL，因此请勿加 http:// 等协议头；</p>

      <p>2、授权回调域名配置规范为全域名，比如需要网页授权的域名为：www.qq.com，配置以后此域名下面的页面<code>http://www.qq.com/music.html</code> 、
        <code>http://www.qq.com/login.html</code> 都可以进行OAuth2.0鉴权。但<code>http://pay.qq.com</code> 、
        <code>http://music.qq.com</code> 、 <a href="http://qq.com" target="_blank">http://qq.com</a>无法进行OAuth2.0鉴权</p>

      <p>3、测试号申请 <a href="https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&amp;t=sandbox/index"
          target="_blank">https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&amp;t=sandbox/index</a></p>
    </blockquote>
    <div class="md-section-divider"></div>
    <h3 data-anchor-id="h4my" id="授权流程">授权流程</h3>
    <p data-anchor-id="ofnp"><strong>具体而言，网页授权流程分为三步</strong></p>
    <ol data-anchor-id="fdnq">
      <li>引导用户进入授权页面同意授权，获取code</li>
      <li>通过code换取网页授权access_token（与基础支持中的access_token不同）</li>
      <li>通过网页授权access_token和openid获取用户基本信息（支持UnionID机制）</li>
    </ol>
    <div class="md-section-divider"></div>
    <h4 data-anchor-id="q8pb" id="第一步用户同意授权获取code">第一步：用户同意授权，获取code</h4>
    <p data-anchor-id="s32h">(一) 公众平台网页授权 <br>
      在确保微信公众账号拥有授权作用域（scope参数）的权限的前提下（服务号获得高级接口后，默认拥有scope参数中的snsapi_base和snsapi_userinfo），引导关注者打开如下页面：</p>
    <div class="md-section-divider"></div>
    <pre class="prettyprint linenums prettyprinted" data-anchor-id="bl54"
      style=""><ol class="linenums"><li class="L0"><code class="language-javascript"><span class="pln"> </span><span class="typ">Url</span><span class="pun">:</span><span class="pln"> https</span><span class="pun">:</span><span class="com">//open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&amp;redirect_uri=REDIRECT_URI&amp;response_type=code&amp;scope=SCOPE&amp;state=STATE#wechat_redirect</span></code></li><li class="L1"><code class="language-javascript"></code></li><li class="L2"><code class="language-javascript"><span class="pln"> </span><span class="com">// 参数说明</span></code></li><li class="L3"><code class="language-javascript"><span class="pln"> </span><span class="pun">{</span></code></li><li class="L4"><code class="language-javascript"><span class="pln">   appid</span><span class="pun">:</span><span class="pln"> APPID</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 公众号的唯一标识</span></code></li><li class="L5"><code class="language-javascript"><span class="pln">   redirect_uri</span><span class="pun">:</span><span class="pln"> REDIRECT_URI</span><span class="pun">,</span><span class="pln"> </span><span class="com">//需要公众号授权作用域相同，授权后重定向的回调链接地址， 请使用 urlEncode 对链接进行处理</span></code></li><li class="L6"><code class="language-javascript"><span class="pln">   response_type</span><span class="pun">:</span><span class="pln"> </span><span class="str">'code'</span><span class="pun">,</span><span class="pln"> </span><span class="com">//返回类型</span></code></li><li class="L7"><code class="language-javascript"><span class="pln">   scope</span><span class="pun">:</span><span class="pln"> SCOPE</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息 ）</span></code></li><li class="L8"><code class="language-javascript"><span class="pln">   state</span><span class="pun">:</span><span class="pln"> STATE</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节</span></code></li><li class="L9"><code class="language-javascript"><span class="pln">   </span><span class="pun">#</span><span class="pln">wechat_redirect </span><span class="com">//无论直接打开还是做页面302重定向时候，必须带此参数</span></code></li><li class="L0"><code class="language-javascript"><span class="pln"> </span><span class="pun">}</span></code></li><li class="L1"><code class="language-javascript"></code></li><li class="L2"><code class="language-javascript"></code></li><li class="L3"><code class="language-javascript"><span class="com">// 若提示“该链接无法访问”，请检查参数是否填写错误，是否拥有scope参数对应的授权作用域权限。</span></code></li></ol></pre>
    <p data-anchor-id="3a3t">尤其注意：由于授权操作安全等级较高，所以在发起授权请求时，微信会对授权链接做正则强匹配校验，如果链接的参数顺序不对，授权页面将无法正常访问</p>
    <blockquote data-anchor-id="8j7v" class="white-blockquote">
      <p><strong>注意：</strong> <br>
        1. 由于授权操作安全等级较高，所以在发起授权请求时，微信会对授权链接做正则强匹配校验，如果链接的参数顺序不对，授权页面将无法正常访问; <br>
        2. 对于已关注公众号的用户，如果用户从公众号的会话或者自定义菜单进入本公众号的网页授权页，即使是scope为snsapi_userinfo，也是静默授权，用户无感知。</p>

      <p>授权界面举例： <br>
        <img src="https://gitlab.com/zhangjiale/ifile/raw/master/wx-login.jpg" width="80"></p>
    </blockquote>
    <p data-anchor-id="wb0z">(二) <a
        href="https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html"
        target="_blank">开放平台网页扫码授权</a> <br>
      （1）跳转微信授权域授权</p>
    <div class="md-section-divider"></div>
    <pre class="prettyprint linenums prettyprinted" data-anchor-id="my3i"
      style=""><ol class="linenums"><li class="L0"><code class="language-javascript"><span class="pln"> </span><span class="typ">Url</span><span class="pun">:</span><span class="pln"> https</span><span class="pun">:</span><span class="com">//open.weixin.qq.com/connect/qrconnect</span></code></li><li class="L1"><code class="language-javascript"></code></li><li class="L2"><code class="language-javascript"><span class="pln"> parasm</span><span class="pun">:</span><span class="pln"> </span><span class="pun">{</span></code></li><li class="L3"><code class="language-javascript"><span class="pln">   appid</span><span class="pun">:</span><span class="pln"> APPID</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 公众号的唯一标识</span></code></li><li class="L4"><code class="language-javascript"><span class="pln">   redirect_uri</span><span class="pun">:</span><span class="pln"> REDIRECT_URI</span><span class="pun">,</span><span class="pln"> </span><span class="com">//需要公众号授权作用域相同，授权后重定向的回调链接地址， 请使用 urlEncode 对链接进行处理</span></code></li><li class="L5"><code class="language-javascript"><span class="pln">   response_type</span><span class="pun">:</span><span class="pln"> </span><span class="str">'code'</span><span class="pun">,</span><span class="pln"> </span><span class="com">//返回类型</span></code></li><li class="L6"><code class="language-javascript"><span class="pln">   scope</span><span class="pun">:</span><span class="pln"> SCOPE</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 应用授权作用域，拥有多个作用域用逗号（,）分隔，网页应用目前仅填写snsapi_login</span></code></li><li class="L7"><code class="language-javascript"><span class="pln">   state</span><span class="pun">:</span><span class="pln"> STATE</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节</span></code></li><li class="L8"><code class="language-javascript"><span class="pln">   </span><span class="pun">#</span><span class="pln">wechat_redirect </span><span class="com">//无论直接打开还是做页面302重定向时候，必须带此参数</span></code></li><li class="L9"><code class="language-javascript"><span class="pln"> </span><span class="pun">}</span></code></li><li class="L0"><code class="language-javascript"></code></li><li class="L1"><code class="language-javascript"></code></li><li class="L2"><code class="language-javascript"><span class="com">//若提示“该链接无法访问”，请检查参数是否填写错误，如redirect_uri的域名与审核时填写的授权域名不一致或scope不为snsapi_login。</span></code></li></ol></pre>
    <p data-anchor-id="nzqu">（2）授权码内嵌到自己页面授权 <br>
      步骤1：在页面中先引入如下JS文件（支持https）</p>
    <div class="md-section-divider"></div>
    <pre class="prettyprint linenums prettyprinted" data-anchor-id="ailn"
      style=""><ol class="linenums"><li class="L0"><code class="language-javascript"><span class="pln">https</span><span class="pun">:</span><span class="com">//res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js</span></code></li></ol></pre>
    <p data-anchor-id="q0v0">步骤2：在需要使用微信登录的地方实例以下JS对象：</p>
    <div class="md-section-divider"></div>
    <pre class="prettyprint linenums prettyprinted" data-anchor-id="fkgz"
      style=""><ol class="linenums"><li class="L0"><code class="language-javascript"><span class="pln"> </span><span class="kwd">const</span><span class="pln"> obj </span><span class="pun">=</span><span class="pln"> </span><span class="kwd">new</span><span class="pln"> </span><span class="typ">WxLogin</span><span class="pun">({</span></code></li><li class="L1"><code class="language-javascript"><span class="pln"> self_redirect</span><span class="pun">:</span><span class="pln"> </span><span class="kwd">false</span><span class="pun">,</span><span class="pln"> </span><span class="com">// true：手机点击确认登录后可以在 iframe 内跳转到 redirect_uri，false：手机点击确认登录后可以在 top window 跳转到 redirect_uri。默认为 false。</span></code></li><li class="L2"><code class="language-javascript"><span class="pln"> id</span><span class="pun">:</span><span class="str">"login_container"</span><span class="pun">,</span><span class="pln">  </span><span class="com">// 第三方页面显示二维码的容器id</span></code></li><li class="L3"><code class="language-javascript"><span class="pln"> appid</span><span class="pun">:</span><span class="pln"> </span><span class="str">""</span><span class="pun">,</span><span class="pln">  </span><span class="com">// 应用唯一标识，在微信开放平台提交应用审核通过后获得</span></code></li><li class="L4"><code class="language-javascript"><span class="pln"> scope</span><span class="pun">:</span><span class="pln"> </span><span class="str">""</span><span class="pun">,</span><span class="pln">  </span><span class="com">// 应用授权作用域，拥有多个作用域用逗号（,）分隔，网页应用目前仅填写snsapi_login即可</span></code></li><li class="L5"><code class="language-javascript"><span class="pln"> redirect_uri</span><span class="pun">:</span><span class="pln"> </span><span class="str">""</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 重定向地址，需要进行UrlEncode</span></code></li><li class="L6"><code class="language-javascript"><span class="pln"> state</span><span class="pun">:</span><span class="pln"> </span><span class="str">""</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 用于保持请求和回调的状态，授权请求后原样带回给第三方。该参数可用于防止csrf攻击（跨站请求伪造攻击），建议第三方带上该参数，可设置为简单的随机数加session进行校验</span></code></li><li class="L7"><code class="language-javascript"><span class="pln"> style</span><span class="pun">:</span><span class="pln"> </span><span class="str">""</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 提供"black"、"white"可选，默认为黑色文字描述。</span></code></li><li class="L8"><code class="language-javascript"><span class="pln"> href</span><span class="pun">:</span><span class="pln"> </span><span class="str">""</span><span class="pln"> </span><span class="com">// 自定义样式链接，第三方可根据实际需求覆盖默认样式。</span></code></li><li class="L9"><code class="language-javascript"><span class="pln"> </span><span class="pun">});</span></code></li></ol></pre>
    <div class="md-section-divider"></div>
    <h4 data-anchor-id="usb6" id="第二步通过code换取网页授权accesstoken">第二步：通过code换取网页授权access_token</h4>
    <p data-anchor-id="er41">第一步用户授权后会跳转至redirect_uri/?code=CODE&amp;state=STATE</p>
    <blockquote data-anchor-id="z51t" class="white-blockquote">
      <p><strong>注意：</strong> <br>
        code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过期</p>
    </blockquote>
    <div class="md-section-divider"></div>
    <pre class="prettyprint linenums prettyprinted" data-anchor-id="iclg"
      style=""><ol class="linenums"><li class="L0"><code class="language-javascript"><span class="pln">GET</span><span class="pun">:</span><span class="pln"> https</span><span class="pun">:</span><span class="com">//api.weixin.qq.com/sns/oauth2/access_token</span></code></li><li class="L1"><code class="language-javascript"></code></li><li class="L2"><code class="language-javascript"><span class="pln">params</span><span class="pun">:</span><span class="pln"> </span><span class="pun">{</span></code></li><li class="L3"><code class="language-javascript"><span class="pln">  appid</span><span class="pun">:</span><span class="pln"> APPID</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 公众号的唯一标识</span></code></li><li class="L4"><code class="language-javascript"><span class="pln">  secret</span><span class="pun">:</span><span class="pln"> SECRET</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 公众号的appsecret</span></code></li><li class="L5"><code class="language-javascript"><span class="pln">  code</span><span class="pun">:</span><span class="pln"> CODE</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 填写第一步获取的code参数</span></code></li><li class="L6"><code class="language-javascript"><span class="pln">  grant_type</span><span class="pun">:</span><span class="pln"> </span><span class="str">'authorization_code'</span><span class="pln"> </span><span class="com">//填写为authorization_code</span></code></li><li class="L7"><code class="language-javascript"><span class="pun">}</span></code></li><li class="L8"><code class="language-javascript"></code></li><li class="L9"><code class="language-javascript"><span class="com">// 返回的JSON结果</span></code></li><li class="L0"><code class="language-javascript"><span class="pun">{</span></code></li><li class="L1"><code class="language-javascript"><span class="pln">  </span><span class="str">"access_token"</span><span class="pun">:</span><span class="str">"ACCESS_TOKEN"</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 网页授权接口调用凭证,注意：此access_token与基础支持的access_token不同</span></code></li><li class="L2"><code class="language-javascript"><span class="pln">  </span><span class="str">"expires_in"</span><span class="pun">:</span><span class="lit">7200</span><span class="pun">,</span><span class="pln"> </span><span class="com">// access_token接口调用凭证超时时间，单位（秒）</span></code></li><li class="L3"><code class="language-javascript"><span class="pln">  </span><span class="str">"refresh_token"</span><span class="pun">:</span><span class="str">"REFRESH_TOKEN"</span><span class="pun">,</span><span class="pln"> </span><span class="com">//用户刷新access_token</span></code></li><li class="L4"><code class="language-javascript"><span class="pln">  </span><span class="str">"openid"</span><span class="pun">:</span><span class="str">"OPENID"</span><span class="pun">,</span><span class="pln"> </span><span class="com">//用户唯一标识，请注意，在未关注公众号时，用户访问公众号的网页，也会产生一个用户和公众号唯一的OpenID</span></code></li><li class="L5"><code class="language-javascript"><span class="pln">  </span><span class="str">"scope"</span><span class="pun">:</span><span class="str">"SCOPE"</span><span class="pln">  </span><span class="com">//用户授权的作用域，使用逗号（,）分隔</span></code></li><li class="L6"><code class="language-javascript"><span class="pun">}</span></code></li><li class="L7"><code class="language-javascript"></code></li><li class="L8"><code class="language-javascript"></code></li><li class="L9"><code class="language-javascript"><span class="com">// 由于公众号的secret和获取到的access_token安全级别都非常高，必须只保存在服务器，不允许传给客户端。后续刷新access_token、通过access_token获取用户信息等步骤，也必须从服务器发起。</span></code></li></ol></pre>
    <blockquote data-anchor-id="2kd5" class="white-blockquote">
      <p><strong>注意：</strong> <br>
        由于access_token拥有较短的有效期，当access_token超时后，可以使用refresh_token进行刷新，refresh_token有效期为30天，当refresh_token失效之后，需要用户重新授权。
      </p>
    </blockquote>
    <p data-anchor-id="tyqu"><strong>校验授权凭证（access_token）是否有效</strong></p>
    <div class="md-section-divider"></div>
    <pre class="prettyprint linenums prettyprinted" data-anchor-id="cu9b"
      style=""><ol class="linenums"><li class="L0"><code><span class="pln">GET</span><span class="pun">:</span><span class="pln"> https</span><span class="pun">:</span><span class="com">//api.weixin.qq.com/sns/auth</span></code></li><li class="L1"><code><span class="kwd">params</span><span class="pun">:</span><span class="pln"> </span><span class="pun">{</span></code></li><li class="L2"><code><span class="pln">  openid</span><span class="pun">:</span><span class="pln"> OPENID</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 用户的唯一标识</span></code></li><li class="L3"><code><span class="pln">  access_token</span><span class="pun">:</span><span class="pln"> ACCESS_TOKEN </span><span class="com">// 网页授权接口调用凭证,注意：此access_token与基础支持的access_token不同</span></code></li><li class="L4"><code><span class="pun">}</span></code></li><li class="L5"><code></code></li><li class="L6"><code><span class="com">// 返回JOSN结果</span></code></li><li class="L7"><code><span class="pun">{</span><span class="pln"> </span><span class="str">"errcode"</span><span class="pun">:</span><span class="lit">0</span><span class="pun">,</span><span class="str">"errmsg"</span><span class="pun">:</span><span class="str">"ok"</span><span class="pun">}</span></code></li></ol></pre>
    <p data-anchor-id="41ml"><strong>刷新授权凭证（access_token）</strong></p>
    <div class="md-section-divider"></div>
    <pre class="prettyprint linenums prettyprinted" data-anchor-id="sl5s"
      style=""><ol class="linenums"><li class="L0"><code><span class="pln">GET</span><span class="pun">:</span><span class="pln"> https</span><span class="pun">:</span><span class="com">//api.weixin.qq.com/sns/oauth2/refresh_token</span></code></li><li class="L1"><code><span class="kwd">params</span><span class="pun">:</span><span class="pln"> </span><span class="pun">{</span></code></li><li class="L2"><code><span class="pln">  appid</span><span class="pun">:</span><span class="pln"> APPID</span><span class="pun">,</span></code></li><li class="L3"><code><span class="pln">  grant_type</span><span class="pun">:</span><span class="pln"> </span><span class="str">'refresh_token'</span><span class="pun">,</span></code></li><li class="L4"><code><span class="pln">  refresh_token</span><span class="pun">:</span><span class="pln"> REFRESH_TOKEN</span></code></li><li class="L5"><code><span class="pun">}</span></code></li><li class="L6"><code></code></li><li class="L7"><code><span class="com">// 返回的JSON结果</span></code></li><li class="L8"><code><span class="pun">{</span></code></li><li class="L9"><code><span class="pln">  </span><span class="str">"access_token"</span><span class="pun">:</span><span class="str">"ACCESS_TOKEN"</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 网页授权接口调用凭证,注意：此access_token与基础支持的access_token不同</span></code></li><li class="L0"><code><span class="pln">  </span><span class="str">"expires_in"</span><span class="pun">:</span><span class="lit">7200</span><span class="pun">,</span><span class="pln"> </span><span class="com">// access_token接口调用凭证超时时间，单位（秒）</span></code></li><li class="L1"><code><span class="pln">  </span><span class="str">"refresh_token"</span><span class="pun">:</span><span class="str">"REFRESH_TOKEN"</span><span class="pun">,</span><span class="pln"> </span><span class="com">//用户刷新access_token</span></code></li><li class="L2"><code><span class="pln">  </span><span class="str">"openid"</span><span class="pun">:</span><span class="str">"OPENID"</span><span class="pun">,</span><span class="pln"> </span><span class="com">//用户唯一标识，请注意，在未关注公众号时，用户访问公众号的网页，也会产生一个用户和公众号唯一的OpenID</span></code></li><li class="L3"><code><span class="pln">  </span><span class="str">"scope"</span><span class="pun">:</span><span class="str">"SCOPE"</span><span class="pln">  </span><span class="com">//用户授权的作用域，使用逗号（,）分隔</span></code></li><li class="L4"><code><span class="pun">}</span></code></li></ol></pre>
    <div class="md-section-divider"></div>
    <h4 data-anchor-id="koi9" id="第三步拉取用户信息需scope为-snsapiuserinfo">第三步：拉取用户信息(需scope为 snsapi_userinfo)</h4>
    <p data-anchor-id="ipfu">如果网页授权作用域为snsapi_userinfo，则此时开发者可以通过access_token和openid拉取用户信息了。</p>
    <div class="md-section-divider"></div>
    <pre class="prettyprint linenums prettyprinted" data-anchor-id="hp2g"
      style=""><ol class="linenums"><li class="L0"><code><span class="pln">GET</span><span class="pun">:</span><span class="pln"> https</span><span class="pun">:</span><span class="com">//api.weixin.qq.com/sns/userinfo</span></code></li><li class="L1"><code><span class="kwd">params</span><span class="pun">:</span><span class="pln"> </span><span class="pun">{</span></code></li><li class="L2"><code><span class="pln">  access_token</span><span class="pun">:</span><span class="pln"> ACCESS_TOKEN</span><span class="pun">,</span></code></li><li class="L3"><code><span class="pln">  openid</span><span class="pun">:</span><span class="pln"> OPENID</span><span class="pun">,</span></code></li><li class="L4"><code><span class="pln">  lang</span><span class="pun">:</span><span class="pln"> </span><span class="str">'zh_CN'</span></code></li><li class="L5"><code><span class="pun">}</span></code></li><li class="L6"><code></code></li><li class="L7"><code><span class="com">// 返回JSON数据包</span></code></li><li class="L8"><code><span class="pun">{</span><span class="pln">   </span></code></li><li class="L9"><code><span class="pln">  </span><span class="str">"openid"</span><span class="pun">:</span><span class="str">"OPENID"</span><span class="pun">,</span><span class="pln"> </span><span class="com">//用户的唯一标识</span></code></li><li class="L0"><code><span class="pln">  </span><span class="str">"nickname"</span><span class="pun">:</span><span class="pln"> NICKNAME</span><span class="pun">,</span><span class="pln">  </span><span class="com">//用户昵称</span></code></li><li class="L1"><code><span class="pln">  </span><span class="str">"sex"</span><span class="pun">:</span><span class="str">"1"</span><span class="pun">,</span><span class="pln">  </span><span class="com">//用户的性别，值为1时是男性，值为2时是女性，值为0时是未知</span></code></li><li class="L2"><code><span class="pln">  </span><span class="str">"province"</span><span class="pun">:</span><span class="str">"PROVINCE"</span><span class="pln"> </span><span class="com">//用户个人资料填写的省份</span></code></li><li class="L3"><code><span class="pln">  </span><span class="str">"city"</span><span class="pun">:</span><span class="str">"CITY"</span><span class="pun">,</span><span class="pln"> </span><span class="com">//普通用户个人资料填写的城市</span></code></li><li class="L4"><code><span class="pln">  </span><span class="str">"country"</span><span class="pun">:</span><span class="str">"COUNTRY"</span><span class="pun">,</span><span class="pln"> </span><span class="com">//国家，如中国为CN</span></code></li><li class="L5"><code><span class="pln">  </span><span class="str">"headimgurl"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"HEADIMG_URL"</span><span class="pun">,</span><span class="pln"> </span><span class="com">//用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。</span></code></li><li class="L6"><code><span class="pln">  </span><span class="str">"privilege"</span><span class="pun">:[</span><span class="pln"> </span><span class="str">"PRIVILEGE1"</span><span class="pln"> </span><span class="str">"PRIVILEGE2"</span><span class="pun">],</span><span class="pln">  </span><span class="com">// 用户特权信息，json 数组，如微信沃卡用户为（chinaunicom）</span></code></li><li class="L7"><code><span class="pln">  </span><span class="str">"unionid"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"o6_bmasdasdsad6_2sgVt7hMZOPfL"</span><span class="pln">  </span><span class="com">// 只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。(https://open.weixin.qq.com/cgi-bin/index?t=home/index&amp;lang=zh_CN)</span></code></li><li class="L8"><code><span class="pun">}</span></code></li></ol></pre>
    <div class="md-section-divider"></div>
    <h3 data-anchor-id="ir9g" id="需要知道">需要知道</h3>
    <div class="md-section-divider"></div>
    <h4 data-anchor-id="49r5" id="关于网页授权accesstoken和普通accesstoken的区别">
      <strong>关于网页授权access_token和普通access_token的区别</strong></h4>
    <p data-anchor-id="a2sg">
      1、微信网页授权是通过OAuth2.0机制实现的，在用户授权给公众号后，公众号可以获取到一个网页授权特有的接口调用凭证（网页授权access_token），通过网页授权access_token可以进行授权后接口调用，如获取用户基本信息；
    </p>
    <p data-anchor-id="j8dq">2、其他微信接口，需要通过基础支持中的“获取access_token”接口来获取到的普通access_token调用。（下面要讲的jssdk获取的access_token等）</p>
    <div class="md-section-divider"></div>
    <h4 data-anchor-id="f320" id="关于特殊场景下的静默授权"><strong>关于特殊场景下的静默授权</strong></h4>
    <p data-anchor-id="nafm">1、上面已经提到，对于以snsapi_base为scope的网页授权，就静默授权的，用户无感知； <br>
      2、对于已关注公众号的用户，如果用户从公众号的会话或者自定义菜单进入本公众号的网页授权页，即使是scope为snsapi_userinfo，也是静默授权，用户无感知。</p>
    <div class="md-section-divider"></div>
    <h3 data-anchor-id="e1rb" id="关于unionid机制"><strong>关于UnionID机制</strong></h3>
    <p data-anchor-id="hvt5">
      开发者可通过OpenID来获取用户基本信息。特别需要注意的是，如果开发者拥有多个移动应用、网站应用和公众帐号，可通过获取用户基本信息中的unionid来区分用户的唯一性，因为只要是同一个微信开放平台帐号下的移动应用、网站应用和公众帐号，用户的unionid是唯一的。换句话说，同一用户，对同一<a
        href="https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html"
        target="_blank">个微信开放平台</a>下的不同应用，unionid是相同的。</p>
    <blockquote data-anchor-id="cisb" class="white-blockquote">
      <p>对于一个公众号来说，用户通过与公众号的交互（关注公众号，公共号发送消息，公众号内网页授权等），开发人员都可以获取这个用户的openid，通过这个openid可以获取这个用户信息</p>

      <p>对于一个移动app来说，需要微信授权时也会获取该微信用户的openid，通过这个openid可以获取这个用户信息</p>

      <p>
        但是，虽然是同一个微信用户，但是这两个openid是不同的，那么对于同一个公司下的不用平台的产品来说，账号体系是相对分离的（在不强制获取用户敏感信息,包括手机号码，身份证号等情况下）想要实现账号互通是比较麻烦的，所以微信提供了一个可以简单实现同一公司下不同平台的微信账号互通的机制UnionID。
      </p>
    </blockquote>
    <hr>
    <div class="md-section-divider"></div>
    <h2 data-anchor-id="8z7b" id="jssdk功能简介">JSSDk功能简介</h2>
    <div class="md-section-divider"></div>
    <h3 data-anchor-id="ut7f" id="概述-1">概述</h3>
    <p data-anchor-id="iotk">微信JS-SDK是微信公众平台 面向网页开发者提供的基于微信内的网页开发工具包。</p>
    <p data-anchor-id="6yf7">
      通过使用微信JS-SDK，网页开发者可借助微信高效地使用拍照、选图、语音、位置等手机系统的能力，同时可以直接使用微信分享、扫一扫、卡券、支付等微信特有的能力，为微信用户提供更优质的网页体验。</p>
    <div class="md-section-divider"></div>
    <h3 data-anchor-id="8o70" id="jssdk使用步骤">JSSDK使用步骤</h3>
    <div class="md-section-divider"></div>
    <h4 data-anchor-id="kjad" id="步骤一绑定域名">步骤一：绑定域名</h4>
    <p data-anchor-id="pawo">先登录<a href="https://mp.weixin.qq.com"
        target="_blank">微信公众平台</a>进入"公众号设置--&gt;功能设置"里填写“JS接口安全域名”。</p>
    <div class="md-section-divider"></div>
    <h4 data-anchor-id="9gd3" id="步骤二引入js文件">步骤二：引入JS文件</h4>
    <p data-anchor-id="7pk5">在需要调用JS接口的页面引入如下JS文件，（支持https）：<code>http://res.wx.qq.com/open/js/jweixin-1.4.0.js</code>
    </p>
    <p data-anchor-id="xfnx">如需进一步提升服务稳定性，当上述资源不可访问时，可改访问：<code>http://res2.wx.qq.com/open/js/jweixin-1.4.0.js</code>
      （支持https）。</p>
    <p data-anchor-id="skdh">备注：支持使用 AMD/CMD 标准模块加载方法加载</p>
    <div class="md-section-divider"></div>
    <h4 data-anchor-id="m4nt" id="步骤三通过config接口注入权限验证配置">步骤三：通过config接口注入权限验证配置</h4>
    <p data-anchor-id="bzrf">所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用（同一个url仅需调用一次，对于变化url的SPA的web app可在每次url变化时进行调用）。</p>
    <hr>
    <p data-anchor-id="bh5m"><strong>jssdk签名步骤</strong> <br>
      1.获取access_token</p>
    <div class="md-section-divider"></div>
    <pre class="prettyprint linenums prettyprinted" data-anchor-id="2ce1"
      style=""><ol class="linenums"><li class="L0"><code class="language-javascript"><span class="pln"> GET</span><span class="pun">:</span><span class="pln"> https</span><span class="pun">:</span><span class="com">//api.weixin.qq.com/cgi-bin/token</span></code></li><li class="L1"><code class="language-javascript"><span class="pln"> params</span><span class="pun">:</span><span class="pln"> </span><span class="pun">{</span></code></li><li class="L2"><code class="language-javascript"><span class="pln">   appid</span><span class="pun">:</span><span class="pln"> APPID</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 第三方用户唯一凭证</span></code></li><li class="L3"><code class="language-javascript"><span class="pln">   secret</span><span class="pun">:</span><span class="pln"> SECRET</span><span class="pun">,</span><span class="pln"> </span><span class="com">//   第三方用户唯一凭证密钥，即appsecret</span></code></li><li class="L4"><code class="language-javascript"><span class="pln">   grant_type</span><span class="pun">:</span><span class="pln"> TYPE </span><span class="com">// 获取access_token填写client_credential</span></code></li><li class="L5"><code class="language-javascript"><span class="pln"> </span><span class="pun">}</span></code></li><li class="L6"><code class="language-javascript"></code></li><li class="L7"><code class="language-javascript"><span class="com">// 返回的JSON数据</span></code></li><li class="L8"><code class="language-javascript"><span class="pun">{</span></code></li><li class="L9"><code class="language-javascript"><span class="pln">  access_token</span><span class="pun">：</span><span class="pln"> ACCESS_TOKEN </span><span class="com">// 获取到的凭证</span></code></li><li class="L0"><code class="language-javascript"><span class="pln">  expires_in</span><span class="pun">:</span><span class="pln"> </span><span class="lit">7200</span><span class="pln"> </span><span class="com">// 凭证有效时间，单位：秒</span></code></li><li class="L1"><code class="language-javascript"><span class="pun">}</span></code></li><li class="L2"><code class="language-javascript"></code></li><li class="L3"><code class="language-javascript"><span class="com">// 错误时微信会返回错误码等信息，JSON数据包示例如下（该示例为AppID无效错误）:</span></code></li><li class="L4"><code class="language-javascript"><span class="pun">{</span></code></li><li class="L5"><code class="language-javascript"><span class="pln">  errcode</span><span class="pun">:</span><span class="pln"> CODE</span><span class="pun">,</span></code></li><li class="L6"><code class="language-javascript"><span class="pln">  errmsg</span><span class="pun">:</span><span class="pln"> MSG</span></code></li><li class="L7"><code class="language-javascript"><span class="pun">}</span></code></li></ol></pre>
    <p data-anchor-id="3akx">2.获取调用微信JS接口的临时票据</p>
    <div class="md-section-divider"></div>
    <pre class="prettyprint linenums prettyprinted" data-anchor-id="cvkf"
      style=""><ol class="linenums"><li class="L0"><code class="language-javascript"><span class="pln"> GET</span><span class="pun">:</span><span class="pln"> https</span><span class="pun">:</span><span class="com">//api.weixin.qq.com/cgi-bin/ticket/getticket</span></code></li><li class="L1"><code class="language-javascript"><span class="pln"> params</span><span class="pun">:</span><span class="pln"> </span><span class="pun">{</span></code></li><li class="L2"><code class="language-javascript"><span class="pln">   access_token</span><span class="pun">:</span><span class="pln"> ACCESS_TOKEN</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 上面接口获取到的凭证</span></code></li><li class="L3"><code class="language-javascript"><span class="pln">   type</span><span class="pun">:</span><span class="pln"> TYPE </span><span class="com">// 这里值为"jsapi"</span></code></li><li class="L4"><code class="language-javascript"><span class="pln"> </span><span class="pun">}</span></code></li><li class="L5"><code class="language-javascript"></code></li><li class="L6"><code class="language-javascript"><span class="com">// 返回的JSON数据</span></code></li><li class="L7"><code class="language-javascript"><span class="pun">{</span></code></li><li class="L8"><code class="language-javascript"><span class="pln">  </span><span class="str">"errcode"</span><span class="pun">:</span><span class="lit">0</span><span class="pun">,</span></code></li><li class="L9"><code class="language-javascript"><span class="pln">  </span><span class="str">"errmsg"</span><span class="pun">:</span><span class="str">"ok"</span><span class="pun">,</span></code></li><li class="L0"><code class="language-javascript"><span class="pln">  </span><span class="str">"ticket"</span><span class="pun">:</span><span class="pln">TICKET</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 获取的临时票据</span></code></li><li class="L1"><code class="language-javascript"><span class="pln">  </span><span class="str">"expires_in"</span><span class="pun">:</span><span class="lit">7200</span></code></li><li class="L2"><code class="language-javascript"><span class="pun">}</span></code></li></ol></pre>
    <p data-anchor-id="fa2m">3.签名算法 <br>
      参与签名的字段包括noncestr（随机字符串）, 有效的jsapi_ticket, timestamp（时间戳）, url（当前网页的URL，不包含#及其后面部分）</p>
    <div class="md-section-divider"></div>
    <pre class="prettyprint linenums prettyprinted" data-anchor-id="7sdn"
      style=""><ol class="linenums"><li class="L0"><code class="language-javascript"><span class="pln">noncestr</span><span class="pun">=</span><span class="typ">Wm3WZYTPz0wzccnW</span><span class="pln"> </span><span class="com">// 随机字符串</span></code></li><li class="L1"><code class="language-javascript"><span class="pln">jsapi_ticket</span><span class="pun">=</span><span class="pln"> TICKET </span><span class="com">// 上面获取的临时票据</span></code></li><li class="L2"><code class="language-javascript"><span class="pln">timestamp</span><span class="pun">=</span><span class="lit">1414587457</span><span class="pln">  </span><span class="com">// 时间戳</span></code></li><li class="L3"><code class="language-javascript"><span class="pln">url</span><span class="pun">=</span><span class="pln"> URL  </span><span class="com">// 当前网页的URL</span></code></li><li class="L4"><code class="language-javascript"></code></li><li class="L5"><code class="language-javascript"><span class="pun">**</span><span class="com">// 对所有待签名参数按照字段名的ASCII 码从小到大排序（字典序） 后，使用URL键值对的格式（即key1=value1&amp;key2=value2…）拼接成字符串string1:</span></code></li><li class="L6"><code class="language-javascript"></code></li><li class="L7"><code class="language-javascript"><span class="pln">let string1 </span><span class="pun">=</span><span class="pln"> </span><span class="str">"jsapi_ticket=TICKET&amp;noncestr=Wm3WZYTPz0wzccnW&amp;timestamp=1414587457&amp;url=URL"</span></code></li><li class="L8"><code class="language-javascript"></code></li><li class="L9"><code class="language-javascript"><span class="com">// 对string1进行sha1签名，得到signature：</span></code></li><li class="L0"><code class="language-javascript"><span class="kwd">const</span><span class="pln"> signature </span><span class="pun">=</span><span class="pln"> sha1</span><span class="pun">(</span><span class="pln">string</span><span class="pun">)</span><span class="pln"> </span><span class="com">// 0f9de62fce790f9a083d5c99e95740ceb90c27ed</span></code></li><li class="L1"><code class="language-javascript"></code></li><li class="L2"><code class="language-javascript"><span class="com">// 返回前端JSON数据</span></code></li><li class="L3"><code class="language-javascript"><span class="pun">{</span></code></li><li class="L4"><code class="language-javascript"><span class="pln">  appid</span><span class="pun">:</span><span class="pln"> APPID</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 公众号的唯一标识</span></code></li><li class="L5"><code class="language-javascript"><span class="pln">  timestamp</span><span class="pun">:</span><span class="pln"> TIMRSTAMP</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 生成签名的时间戳，与上面匹配</span></code></li><li class="L6"><code class="language-javascript"><span class="pln">  nonceStr</span><span class="pun">:</span><span class="pln"> NONCESTR</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 生成签名的随机串，与上面匹配</span></code></li><li class="L7"><code class="language-javascript"><span class="pln">  signature</span><span class="pun">:</span><span class="pln"> SIGNATURE </span><span class="com">// 签名，与上面匹配</span></code></li><li class="L8"><code class="language-javascript"><span class="pun">}</span></code></li></ol></pre>
    <hr>
    <p data-anchor-id="2bl8">获取签名数据后，在前端完成初始化</p>
    <div class="md-section-divider"></div>
    <pre class="prettyprint linenums prettyprinted" data-anchor-id="5cs6"
      style=""><ol class="linenums"><li class="L0"><code class="language-javascript"><span class="pln">wx</span><span class="pun">.</span><span class="pln">config</span><span class="pun">({</span></code></li><li class="L1"><code class="language-javascript"><span class="pln">  debug</span><span class="pun">:</span><span class="pln"> </span><span class="kwd">true</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。</span></code></li><li class="L2"><code class="language-javascript"><span class="pln">  appId</span><span class="pun">:</span><span class="pln"> </span><span class="str">''</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 必填，公众号的唯一标识</span></code></li><li class="L3"><code class="language-javascript"><span class="pln">  timestamp</span><span class="pun">:</span><span class="pln"> </span><span class="pun">,</span><span class="pln"> </span><span class="com">// 必填，生成签名的时间戳</span></code></li><li class="L4"><code class="language-javascript"><span class="pln">  nonceStr</span><span class="pun">:</span><span class="pln"> </span><span class="str">''</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 必填，生成签名的随机串</span></code></li><li class="L5"><code class="language-javascript"><span class="pln">  signature</span><span class="pun">:</span><span class="pln"> </span><span class="str">''</span><span class="pun">,</span><span class="com">// 必填，签名</span></code></li><li class="L6"><code class="language-javascript"><span class="pln">  jsApiList</span><span class="pun">:</span><span class="pln"> </span><span class="pun">[]</span><span class="pln"> </span><span class="com">// 必填，需要使用的JS接口列表</span></code></li><li class="L7"><code class="language-javascript"><span class="pun">});</span></code></li></ol></pre>
    <div class="md-section-divider"></div>
    <h4 data-anchor-id="0ty2" id="步骤四通过ready接口处理成功验证">步骤四：通过ready接口处理成功验证</h4>
    <div class="md-section-divider"></div>
    <pre class="prettyprint linenums prettyprinted" data-anchor-id="at1m"
      style=""><ol class="linenums"><li class="L0"><code class="language-javascript"><span class="pln">wx</span><span class="pun">.</span><span class="pln">ready</span><span class="pun">(</span><span class="kwd">function</span><span class="pun">(){</span></code></li><li class="L1"><code class="language-javascript"><span class="pln">  </span><span class="com">// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。</span></code></li><li class="L2"><code class="language-javascript"><span class="pun">});</span></code></li></ol></pre>
    <div class="md-section-divider"></div>
    <h4 data-anchor-id="x8o5" id="步骤五通过error接口处理失败验证">步骤五：通过error接口处理失败验证</h4>
    <div class="md-section-divider"></div>
    <pre class="prettyprint linenums prettyprinted" data-anchor-id="m8pv"
      style=""><ol class="linenums"><li class="L0"><code class="language-javascript"><span class="pln">wx</span><span class="pun">.</span><span class="pln">error</span><span class="pun">(</span><span class="kwd">function</span><span class="pun">(</span><span class="pln">res</span><span class="pun">){</span></code></li><li class="L1"><code class="language-javascript"><span class="pln">  </span><span class="com">// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。</span></code></li><li class="L2"><code class="language-javascript"><span class="pun">});</span></code></li></ol></pre>
    <div class="md-section-divider"></div>
    <h4 data-anchor-id="kst6" id="接口调用说明"><strong>接口调用说明</strong></h4>
    <p data-anchor-id="13ev">所有接口通过wx对象(也可使用jWeixin对象)来调用，参数是一个对象，除了每个接口本身需要传的参数之外，还有以下通用参数： <br>
      1. success：接口调用成功时执行的回调函数。 <br>
      2. fail：接口调用失败时执行的回调函数。 <br>
      3. complete：接口调用完成时执行的回调函数，无论成功或失败都会执行。 <br>
      4. cancel：用户点击取消时的回调函数，仅部分有用户取消操作的api才会用到。 <br>
      5. trigger: 监听Menu中的按钮点击时触发的方法，该方法仅支持Menu中的相关接口。</p>
    <div class="md-section-divider"></div>
    <h3 data-anchor-id="3bgj" id="常用接口举例">常用接口举例</h3>
    <div class="md-section-divider"></div>
    <h4 data-anchor-id="juma" id="自定义分享给朋友及分享到qq按钮的分享内容140"><strong>自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）</strong></h4>
    <div class="md-section-divider"></div>
    <pre class="prettyprint linenums prettyprinted" data-anchor-id="8esc"
      style=""><ol class="linenums"><li class="L0"><code><span class="pln">wx</span><span class="pun">.</span><span class="pln">ready</span><span class="pun">(</span><span class="kwd">function</span><span class="pln"> </span><span class="pun">()</span><span class="pln"> </span><span class="pun">{</span><span class="pln">   </span><span class="com">//需在用户可能点击分享按钮前就先调用</span></code></li><li class="L1"><code><span class="pln">  wx</span><span class="pun">.</span><span class="pln">updateAppMessageShareData</span><span class="pun">({</span><span class="pln"> </span></code></li><li class="L2"><code><span class="pln">    title</span><span class="pun">:</span><span class="pln"> </span><span class="str">''</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 分享标题</span></code></li><li class="L3"><code><span class="pln">    desc</span><span class="pun">:</span><span class="pln"> </span><span class="str">''</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 分享描述</span></code></li><li class="L4"><code><span class="pln">    link</span><span class="pun">:</span><span class="pln"> </span><span class="str">''</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致</span></code></li><li class="L5"><code><span class="pln">    imgUrl</span><span class="pun">:</span><span class="pln"> </span><span class="str">''</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 分享图标</span></code></li><li class="L6"><code><span class="pln">    success</span><span class="pun">:</span><span class="pln"> </span><span class="kwd">function</span><span class="pln"> </span><span class="pun">()</span><span class="pln"> </span><span class="pun">{</span></code></li><li class="L7"><code><span class="pln">      </span><span class="com">// 设置成功</span></code></li><li class="L8"><code><span class="pln">    </span><span class="pun">}</span></code></li><li class="L9"><code><span class="pln">  </span><span class="pun">})</span></code></li><li class="L0"><code><span class="pun">});</span></code></li></ol></pre>
    <div class="md-section-divider"></div>
    <h4 data-anchor-id="wj17" id="自定义分享到朋友圈及分享到qq空间按钮的分享内容140"><strong>自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）</strong></h4>
    <div class="md-section-divider"></div>
    <pre class="prettyprint linenums prettyprinted" data-anchor-id="prnw"
      style=""><ol class="linenums"><li class="L0"><code><span class="pln">wx</span><span class="pun">.</span><span class="pln">ready</span><span class="pun">(</span><span class="kwd">function</span><span class="pln"> </span><span class="pun">()</span><span class="pln"> </span><span class="pun">{</span><span class="pln">      </span><span class="com">//需在用户可能点击分享按钮前就先调用</span></code></li><li class="L1"><code><span class="pln">  wx</span><span class="pun">.</span><span class="pln">updateTimelineShareData</span><span class="pun">({</span><span class="pln"> </span></code></li><li class="L2"><code><span class="pln">    title</span><span class="pun">:</span><span class="pln"> </span><span class="str">''</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 分享标题</span></code></li><li class="L3"><code><span class="pln">    link</span><span class="pun">:</span><span class="pln"> </span><span class="str">''</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致</span></code></li><li class="L4"><code><span class="pln">    imgUrl</span><span class="pun">:</span><span class="pln"> </span><span class="str">''</span><span class="pun">,</span><span class="pln"> </span><span class="com">// 分享图标</span></code></li><li class="L5"><code><span class="pln">    success</span><span class="pun">:</span><span class="pln"> </span><span class="kwd">function</span><span class="pln"> </span><span class="pun">()</span><span class="pln"> </span><span class="pun">{</span></code></li><li class="L6"><code><span class="pln">      </span><span class="com">// 设置成功</span></code></li><li class="L7"><code><span class="pln">    </span><span class="pun">}</span></code></li><li class="L8"><code><span class="pln">  </span><span class="pun">})</span></code></li><li class="L9"><code><span class="pun">});</span></code></li></ol></pre>
    <blockquote data-anchor-id="vn34" class="white-blockquote">
      <p>自定义实例对比： <br>
        <img src="https://gitlab.com/zhangjiale/ifile/raw/master/S91010-11145902.jpg" width="200"></p>
    </blockquote>
    <div class="md-section-divider"></div>
    <h4 data-anchor-id="ue6v" id="操作界面"><strong>操作界面</strong></h4>
    <div class="md-section-divider"></div>
    <pre class="prettyprint linenums prettyprinted" data-anchor-id="gz11"
      style=""><ol class="linenums"><li class="L0"><code><span class="lit">1.</span><span class="pln"> </span><span class="pun">关闭当前网页窗口接口</span></code></li><li class="L1"><code><span class="pln">wx</span><span class="pun">.</span><span class="pln">closeWindow</span><span class="pun">();</span></code></li><li class="L2"><code></code></li><li class="L3"><code><span class="lit">2.</span><span class="pln"> </span><span class="pun">批量隐藏功能按钮接口</span></code></li><li class="L4"><code><span class="pln">wx</span><span class="pun">.</span><span class="pln">hideMenuItems</span><span class="pun">({</span></code></li><li class="L5"><code><span class="pln">  menuList</span><span class="pun">:</span><span class="pln"> </span><span class="pun">[]</span><span class="pln"> </span><span class="com">// 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3</span></code></li><li class="L6"><code><span class="pun">});</span></code></li><li class="L7"><code></code></li><li class="L8"><code><span class="lit">3.</span><span class="pln"> </span><span class="pun">批量显示功能按钮接口</span></code></li><li class="L9"><code><span class="pln">wx</span><span class="pun">.</span><span class="pln">showMenuItems</span><span class="pun">({</span></code></li><li class="L0"><code><span class="pln">  menuList</span><span class="pun">:</span><span class="pln"> </span><span class="pun">[]</span><span class="pln"> </span><span class="com">// 要显示的菜单项，所有menu项见附录3</span></code></li><li class="L1"><code><span class="pun">});</span></code></li><li class="L2"><code></code></li><li class="L3"><code><span class="lit">4.</span><span class="pun">隐藏所有非基础按钮接口</span></code></li><li class="L4"><code><span class="pln">wx</span><span class="pun">.</span><span class="pln">hideAllNonBaseMenuItem</span><span class="pun">();</span></code></li><li class="L5"><code><span class="com">// “基本类”按钮详见附录3</span></code></li><li class="L6"><code></code></li><li class="L7"><code><span class="lit">5.</span><span class="pun">显示所有功能按钮接口</span></code></li><li class="L8"><code><span class="pln">wx</span><span class="pun">.</span><span class="pln">showAllNonBaseMenuItem</span><span class="pun">();</span></code></li></ol></pre>
    <blockquote data-anchor-id="dkeo" class="white-blockquote">
      <p><a href="https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#0"
          target="_blank">jssdk微信官方文档</a></p>
    </blockquote>
    <div class="md-section-divider"></div>
    <h2 data-anchor-id="tkbx" id="微信支付">微信支付</h2>
    <p data-anchor-id="4w9z"><a href="https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_3"
        target="_blank">JSAPI支付</a>：用户通过微信扫码、关注公众号等方式进入商家H5页面，并在微信内调用JSSDK完成支付</p>
    <p data-anchor-id="6ly7"><a href="https://pay.weixin.qq.com/wiki/doc/api/H5.php?chapter=15_4"
        target="_blank">H5支付</a>：用户在微信以外的手机浏览器请求微信支付的场景唤起微信支付</p>
    <p data-anchor-id="vp4m"><a href="https://pay.weixin.qq.com/static/product/product_intro.shtml?name=native"
        target="_blank">Native支付</a>：指商户系统按微信支付协议生成支付二维码，用户再用微信“扫一扫”完成支付的模式。该模式适用于PC网站、实体店单品或订单、媒体广告支付等场景</p>
    <div class="md-section-divider"></div>
    <h2 data-anchor-id="sga0" id="附录">附录</h2>
    <ol data-anchor-id="pxhv">
      <li>
        <p>基本类</p>

        <ul>
          <li>举报: "menuItem:exposeArticle"</li>
          <li>调整字体: "menuItem:setFont"</li>
          <li>日间模式: "menuItem:dayMode"</li>
          <li>夜间模式: "menuItem:nightMode"</li>
          <li>刷新: "menuItem:refresh"</li>
          <li>查看公众号（已添加）: "menuItem:profile"</li>
          <li>查看公众号（未添加）: "menuItem:addContact"</li>
        </ul>
      </li>
      <li>传播类 <br>
        <ul>
          <li>发送给朋友: "menuItem:share:appMessage"</li>
          <li>分享到朋友圈: "menuItem:share:timeline"</li>
          <li>分享到QQ: "menuItem:share:qq"</li>
          <li>分享到Weibo: "menuItem:share:weiboApp"</li>
          <li>收藏: "menuItem:favorite"</li>
          <li>分享到FB: "menuItem:share:facebook"</li>
          <li>分享到 QQ 空间/menuItem:share:QZone</li>
        </ul>
      </li>
      <li>保护类 <br>
        <ul>
          <li>编辑标签: "menuItem:editTag"</li>
          <li>删除: "menuItem:delete"</li>
          <li>复制链接: "menuItem:copyUrl"</li>
          <li>原网页: "menuItem:originPage"</li>
          <li>阅读模式: "menuItem:readMode"</li>
          <li>在QQ浏览器中打开: "menuItem:openWithQQBrowser"</li>
          <li>在Safari中打开: "menuItem:openWithSafari"</li>
          <li>邮件: "menuItem:share:email"</li>
          <li>一些特殊公众号: "menuItem:share:brand"</li>
        </ul>
      </li>
    </ol>
  </div>
    </article>
</main>
</template>
<script>
export default {
  layout: 'blog'
}
</script>