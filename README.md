# 開発環境テンプレート

## モジュールのインストール
```bash
npm install
```

## クイックスタート

1.環境の立ち上げ

```bash
gulp
```
2.コーディング

EJS、SASSはファイル保存時にコンパイルされます

3.ビルド

JS、CSSはミニファイされたファイルも出力されます
```bash
gulp build
```

## その他機能・オプション
### Browsersync
* プレビューブラウザの起動

default: false

```bash
gulp -o
```
* ローカルサーバーのポート

default: ランダム
```bash
gulp --port ****
```

### 画像圧縮
app配下の画像が圧縮されます。
```bash
gulp optimize
```

## 構造
```bash
root
├── README.md
├── app
├── gulpfile.js
├── node_modules
├── package-lock.json
└── package.json
```