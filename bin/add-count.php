<?php

$indexFile = __DIR__ . '/../dist/index.html';
$content = file_get_contents($indexFile);

$bdJs = <<<STR
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?6e8a5dad259b0a42afa93a57bcff0f86";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
</script>
STR;

$content = str_replace('</body>', $bdJs . '</body>', $content);
file_put_contents($indexFile, $content);
