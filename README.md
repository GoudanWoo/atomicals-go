# Atomicals Javascript Library <u>*With Go*</u>

思路来自[neal-zhu / atomicals-miner](https://github.com/neal-zhu/atomicals-miner)，感谢其作者[@0xKISS](https://x.com/0xKISS)的付出。

与[neal-zhu / atomicals-miner](https://github.com/neal-zhu/atomicals-miner)一样，本项目也：
> 1. 这是一个有偿使用的软件，每一次使用本软件进行挖矿，会收取 ~~0.000045 BTC (约合不到 $2)~~ 0.000030 BTC (约合不到 $1.3)，在挖矿时会自动将手续费打到作者的地址. 如果没有挖到，不需要支付这笔手续费
> 2. ~~会持续更新这个代码进行优化，甚至已经有很多优化项在构思实施中~~
> 3. 程序并不开源，为了安全起见，请务必不要在使用的地址放太多资产
> 4. 使用时，请务必先进行测试，确保资产安全以及行为符合预期以后，再继续使用.也推荐大家与官方版本的性能进行对比，看看是否值得使用
> 5. 当前版本比官方版本快大概 30-40x
> 6. ~~以后的其他 token 同样可以使用本软件~~
> 7. 本人不对此软件使用导致的资产损失承担任何责任。我唯一可以保证的是这个软件没有任何后门
> 8. 如果有任何问题，请在推特上联系作者 ~~https://twitter.com/0xKISS~~ [@GoudanWoo](https://twitter.com/GoudanWoo)
> 9. windows 电脑上可能会引起杀毒软件报警（甚至删掉代码文件），需要选择忽略**和信任**。如果介意，请不要使用。如果要使用，可以选用一台虚拟机，保证不要有其他核心资产
> 10. 请不要使用这个软件进行除 mint-dft 以外的操作，因为涉及到大量代码改动，不保证其他命令还是正确的。如果需要使用，请使用官方的代码
> 11. 再次重申，这是一个旨在于帮助用户提供帮助同时收取很低费用的软件。它是安全的，但是请对自己的资产安全负责

不过相比于[neal-zhu / atomicals-miner](https://github.com/neal-zhu/atomicals-miner)，本项目：

1. 在速度上更快（只快了10%左右），且速度也更稳定（可自行对比）
2. 核心二进制程序体积更大（大了40%左右）
3. 收取的费用更低
4. 看起来更容易跑路

欢迎自行对比尝试。

### 使用

1. 在[.env](.env)中修改`GOWORKER_BIN`为自己系统和架构的文件
   - Windows选择`atomicals-go-windows-`开头的；`x64`架构选择`-amd64.exe`结尾的，`arm64`架构选择`-arm64.exe`结尾的
   - Linux选择`atomicals-go-linux-`开头的；`x64`架构选择`-amd64.exe`结尾的，`arm64`架构选择`-arm64.exe`结尾的
   - MacOS选择`atomicals-go-darwin-`开头的；`x64`架构选择`-amd64.exe`结尾的，`m1`/`m2`芯片选择`-arm64.exe`结尾的
2. 在[.env](.env)中修改`COMMISSION`为自己期望的抽成，默认`3000`(0.000030 BTC，约合不到 $1.3))
3. 在[.env](.env)中修改`CONCURRENCY`为自己期望的线程数，默认为系统CPU线程数
4. 执行`npm install`或`yarn install`或`pnpm install`
5. 执行`npm build`或`yarn build`或`pnpm build`
6. 执行`npm cli xxx`或`yarn cli xxx`或`pnpm cli xxx`，如`yarn cli mint-dft quark --satsbyte 110`

### 注意

- 抽成(`COMMISSION`)最低也是`3000`，改为更低并不能真正生效，而且会导致无法正常 mint
- 抽成地址在ts中有写，但是改了也并不能真正生效，而且会导致无法正常 mint
- 关于命令参数`--satsbyte`的准确性，当余额较低或`--satsbyte`较高时（本质上是发生本次交易后的余额不足以回到钱包，会全数作为Gas），可能会为了避免**BTC粉尘问题**导致`Gas`偏高

### 挂机

如需自动重复执行，可以编写命令行脚本，如：

Mac / Linux:

```shell
while true; do yarn cli mint-dft quark --satsbyte 110; done;
```

Windows PowerShell:

```pwsh
while ($true) {
    yarn cli mint-dft quark --satsbyte 110
}
```

Windows CMD:

```cmd
for /l %a in (0,0,1) do yarn cli mint-dft quark --satsbyte 110
```

----

# Atomicals Javascript Library

> atomicals.xyz
> Documentation: https://docs.atomicals.xyz

![Atomicals](banner.png)


### WARNING: STRONGLY RECOMMENDED TO USE YARN INSTEAD OF NPM

Use `yarn` package manager instead of `npm`. Instructions below (They are: `npm install -g yarn`)

In the latest version of the CLI processing library the option switches (the settings starting with `--`) are not processed correctly and it would lead to
too small of a fee being set and result in your transactions not being mined.

Workaround: Use `yarn` instead of `npm`


### Install, Build and Run Tests

## Install

```
# Download the github repo:
git clone https://github.com/atomicals/atomicals-js.git

cd atomicals-js

# Build:
# If you don't have yarn & node installed
# npm install -g node
# npm install -g yarn

yarn install
yarn run build

#See all commands at:

yarn run cli --help

```

### Quick Start - Command Line (CLI)

First install packages and build, then follow the steps here to create your first Atomical and query the status. Use `yarn cli`to get a list of all commands available.

#### 0. Environment File (.env)

The environment file comes with defaults (`.env.example`), but it is highly recommend to install and operate your own ElectrumX server. Web browser communication is possible through the `wss` (secure websockets) interface of ElectrumX.

```
ELECTRUMX_WSS=wss://electrumx.atomicals.xyz:50012

// Optional (defaults to wallet.json)
WALLET_PATH=path-to-wallet.json

// The number of concurrent processes to be used. This should not exceed the number of CPU cores available. If not set, the default behavior is to use all available CPU cores minus one.
CONCURRENCY=4
```

_ELECTRUMX_WSS_: URL of the ElectrumX with Atomicals support. Note that only `wss` endpoints are accessible from web browsers.

#### 1. Wallet Setup

The purpose of the wallet is to create p2tr (pay-to-taproot) spend scripts and to receive change from the transactions made for the various operations. _Do not put more funds than you can afford to lose, as this is still beta!_

To initialize a new `wallet.json` file that will store your address for receiving change use the `wallet-init` command. Alternatively, you may populate the `wallet.json` manually, ensuring that the address at `m/44'/0'/0'/0/0` is equal to the address and the derivePath is set correctly.

Configure the path in the environment `.env` file to point to your wallet file. defaults to `./wallet.json`

Default:

```
WALLET_PATH=.
WALLET_FILE=wallet.json
```

Update to `wallets/` directory:

```
WALLET_PATH=./wallets
WALLET_FILE=wallet.json
```

Create the wallet:

```
yarn cli wallet-init

>>>

Wallet created at wallet.json
phrase: maple maple maple maple maple maple maple maple maple maple maple maple
Legacy address (for change): 1FXL2CJ9nAC...u3e9Evdsa2pKrPhkag
Derive Path: m/44'/0'/0'/0/0
WIF: L5Sa65gNR6QsBjqK.....r6o4YzcqNRnJ1p4a6GPxqQQ
------------------------------------------------------
```

#### 2. Explore the CLI

```
yarn cli --help
```

#### 3. Quick Commands

Get all of the commands available:

```
yarn cli --help
```

Read the documentation at https://docs.atomicals.xyz

## ElectrumX Server RPC Interface

See updated ElectrumX (https://github.com/atomicals/atomicals-electrumx)

## Any questions or ideas?

https://atomicals.xyz

https://x.com/atomicalsxyz (X - Formerly Twitter)

## Donate to Atomicals Development

We greatly appreciate any donation to help support Atomicals Protocol development. We worked out of passion and kindness for the world, we believe this technology must exist and be free for all to use. Bitcoin is our one hope for freedom and digital sovereignty and we intend to do our best to make it a reality.

BTC: bc1pa5hvv3w3wjwfktd63zcng6yeccxg9aa90e34n9jrjw3thgc52reqxw6has

![Donate to Atomicals Development](donate.png)
