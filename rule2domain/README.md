# 将 Surge 的 Rule-Set 拆成 Domain-Set + Rule-Set

> 由于 Surge 的更新，如果使用5.8.1之后的版本，本模块已经没有意义。

本模块/cf worker可以将含有较多域名规则的 RULE-SET 拆为两部分：DOMAIN-SET 和去除了 DOMAIN和DOMAIN-SUFFIX的 RULE-SET。目前还没有对 DOMAIN-SET 的 eTLD 做判别，实现也比较简单粗暴。

模块目前只 MITM 了 raw.githubusercontent.com，Cloudflare Workers 版可以针对任何网站。

## 使用 Surge 模块

安装 https://raw.githubusercontent.com/yy4382/Scripts/main/rule2domain/rule2domain.sgmodule

在 GitHub raw 的链接后面加上 ?r2d=d 就是 DOMAIN-SET，加上 ?r2d=r 就是剩下的规则的 RULE-SET。

比如原来是：

```
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Google/Google.list,PROXY
```

现在可以改为：
```
DOMAIN-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Google/Google.list?r2d=d, PROXY
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Google/Google.list?r2d=r, PROXY
```

## 使用 Cloudflare Workers

整了一个非常简陋但应该能用的服务。。。

可以直接使用 https://rule2domain.yy4382.workers.dev , 但是我不保证会一直可用；

可以使用 https://raw.githubusercontent.com/yy4382/Scripts/main/rule2domain/r2d_cfworkers.js 在 Cloudflare Workers 上自行搭建。