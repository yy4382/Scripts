# 一个Azure TTS 的爱阅（和其他软件）的使用方法

由于爱阅的 Post 请求只支持json形式的body，所以使用 Surge 来使它传递 SSML 格式的信息。同时，还做了一些增强，可以修改所有直连 Azure TTS eastasia 地区的语音信息。

使用本方法首先需要注册 Azure 并启动一个 Speech Service，获得一个密钥。Azure 每月免费500k字符的TTS量，不是超重度使用理论上是够的。

如果使用爱阅，将上一条消息的文件导入，这个听书配置不能直接使用，需要配合Surge模块。

Surge 模块地址:  https://raw.githubusercontent.com/yy4382/Scripts/main/azuretts/azuretts.sgmodule

注意⚠️：需要复制文件内容，作为本地模块添加，并且按照其中的注释进行修改。