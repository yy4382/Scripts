let body = $request.body;
let headers = $request.headers;

let args = getArgs();

headers['ocp-apim-subscription-key'] = args['key'];

if(headers['user-agent']=='ifreetimeazure'){
  body = decodeURIComponent(body.substring(5));
}

let oriVoice = 'zh-CN-XiaoxiaoNeural';
if(args['voice'] != 'Xiaoxiao'){
	body = body.replace(oriVoice, oriVoice.replace('Xiaoxiao', args['voice']));
}
$done({
	headers: headers,
	body: body
})

function getArgs() {
  return Object.fromEntries(
    $argument
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}