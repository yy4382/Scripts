# 将 Surge 的 Rule-Set 拆成 Domain-Set + Rule-Set

有些 RULE-SET 规则（主要是去广告类的）可能有上万条之多，而 Surge 对 RULE-SET 的处理是一条一条进行的，性能相较于 DOMAIN-SET 有较大差距；最近的版本中 RULE-SET 也被限制了不能超过 10MB。

本模块可以将含有较多域名规则的 RULE-SET 拆为两部分：DOMAIN-SET 和去除了 DOMAIN和DOMAIN-SUFFIX的 RULE-SET，降低性能压力。

PS：对于1000条以内的规则，RULE-SET 和 DOMAIN-SET 性能区别不大；现在bm7的规则里超过1000条的他自己已经分了了DOMAIN-SET和RULE-SET了，其实需求也不大了。

## 使用 Surge 模块

安装 https://raw.githubusercontent.com/yy4382/Scripts/main/rule2domain/rule2domain.sgmodule

在 GitHub raw 的链接后面加上 ?r2d=d 就是 DOMAIN-SET，加上 ?r2d=r 就是剩下的规则的 RULE-SET。

比如原来是：

```
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Google/Google.list,PROXY
```

现在可以改为：
```
DOMAIN-SEThttps://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Google/Google.list?r2d=d, PROXY
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Google/Google.list?r2d=r, PROXY
```

## 使用 Cloudflare Workers

整了一个非常简陋但应该能用的服务。。。

可以直接使用 https://rule2domain.yy4382.workers.dev , 但是我不保证会一直可用；

可以使用 https://raw.githubusercontent.com/yy4382/Scripts/main/rule2domain/r2d_cfworkers.js 在 Cloudflare Workers 上自行搭建。