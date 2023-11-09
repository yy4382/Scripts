let url = $request.url;
let lastQuestionMarkPosition = url.lastIndexOf("?");
function getArgs() {
    return Object.fromEntries(
        url
            .substring(lastQuestionMarkPosition + 1)
            .split("&")
            .map((item) => item.split("="))
            .map(([k, v]) => [k, decodeURIComponent(v)])
    );
}
let args = getArgs();
if (!args['r2d']) {
    console.log("no r2d parameter");
    $done({});
}
let dict = {
    "r": "rule",
    "rule": "rule",
    "d": "domain",
    "domain": "domain"
};
let type = dict[args['r2d']];
console.log("r2d type: " + type);

let body = $response.body;
if (!body) {
    console.log("no response body");
    $done({});
}
const lines = body.split('\n');
let result = [];
result.push('# original url: ' + $request.url.substring(0, lastQuestionMarkPosition));
result.push('# type: ' + type);
result.push('# converted domain/rule-set by https://github.com/yy4382/Scripts/blob/main/rule2domain/README.md');
if(type == "domain"){
    result.push('# the original comments is in the RULE-SET');
}
result.push('');
for (let line of lines) {
    if (!line.startsWith('#')) {
        line = line.replace(/\s/g, '');
    }
    if (type == "rule") {
        if (!(line.startsWith('DOMAIN,') || line.startsWith('DOMAIN-SUFFIX,'))) {
            result.push(line);
        }
    } else if (type == "domain") {
        if (line.startsWith('DOMAIN,')) {
            result.push(line.substring(7));
        } else if (line.startsWith('DOMAIN-SUFFIX,')) {
            result.push('.' + line.substring(14));
        }
    }
}
$done({ body: result.join('\n') });