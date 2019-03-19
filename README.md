# STT serializer and deserializer

This is a STT serialize and deserialize library. It serialze a JSON into string or deserialize a string into JSON. STT is used by Douyu to serialize and deserialize danmaku. STT's rule:

    1. Key and value are separeted by `@=`
    2. Items in an array are separeted by `/`
    3. `/` in keys or values should be escaped as `@S`
    4. `@` in keys or values should be escaped as `@A`

## Getting Started

### Prerequisites

    1. NodeJS version >= 8.5.0
    2. Application using this module MUST run with option `--experimental-modules`

### Installing

Use the package manager [npm](https://www.npmjs.com/) to install 

```bash
npm install stt-serde-mjs
```

### Usage

```javascript
import { deserialize } from 'stt-serde-mjs';

const message = 'type@=chatmsg/rid@=312212/ct@=1/uid@=39273792/nn@=Tomorrow66啊/txt@=举报了/cid@=ac4e300f33b9482e06f2000000000000/ic@=avatar@Sdefault@S13/level@=4/sahf@=0/cst@=1552963180037/bnn@=/bl@=0/brid@=0/hc@=/el@=/lk@=/'
const record = deserialize(message);
```

# STT 序列化反序列化库

这是一个斗鱼STT序列化反序列化库。 STT是斗鱼自创的序列化反序列化算法， 并用于传输斗鱼弹幕， STT序列化规定如下:

    1. 键key和值value直接采用`@=`分割
    2. 数组采用`/`分割
    3. 如果key或者value中含有字符`/`， 则使用`@S`转义
    4. 如果key或者value中含有字符`@`， 则使用`@A`转义

## Getting Started

### Prerequisites

    1. NodeJS version >= 8.5.0
    2. 使用该库的application在运行时必须添加选项 `--experimental-modules`

### Installing

使用[npm](https://www.npmjs.com/)安装

```bash
npm install stt-serde-mjs
```

### Usage

```javascript
import { deserialize } from 'stt-serde-mjs';

const message = 'type@=chatmsg/rid@=312212/ct@=1/uid@=39273792/nn@=Tomorrow66啊/txt@=举报了/cid@=ac4e300f33b9482e06f2000000000000/ic@=avatar@Sdefault@S13/level@=4/sahf@=0/cst@=1552963180037/bnn@=/bl@=0/brid@=0/hc@=/el@=/lk@=/'
const record = deserialize(message);
```

### Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### License
[ISC](https://choosealicense.com/licenses/isc/)