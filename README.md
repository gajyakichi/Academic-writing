# Metabolism vs SCD Research Paper

このリポジトリは、代謝と SCD（Sudden Cardiac Death）に関する研究論文を管理するためのものです。

## ファイル構成

### 論文ファイル

- **`main_J.tex`** - 日本語版の論文（主にこちらを編集）
- **`main.tex`** - 英語版の論文（main_J.tex から自動生成）
- **`references.bib`** - 参考文献データベース

### スクリプト

- **`translate.sh`** - 日本語から英語への自動翻訳スクリプト
- **`compile_J.sh`** - 日本語版のコンパイルスクリプト
- **`compile.sh`** - 英語版のコンパイルスクリプト

### 設定ファイル

- **`.latexmkrc`** - latexmk の設定ファイル
- **`.gitignore`** - Git で無視するファイルの設定

## 使い方

### 1. 日本語で論文を執筆

`main_J.tex` を編集して、日本語で論文を書きます：

```bash
# お好きなエディタで編集
code main_J.tex  # VS Code
vim main_J.tex   # Vim
```

### 2. 日本語版をコンパイル

```bash
./compile_J.sh
```

これで `main_J.pdf` が生成されます。

### 3. 英語版に自動翻訳

```bash
./translate.sh
```

これで `main_J.tex` の内容が英語に翻訳されて `main.tex` に出力されます。

### 4. 英語版をコンパイル

```bash
./compile.sh
```

これで `main.pdf` が生成されます。

### ワンストップワークフロー

日本語版を編集後、翻訳とコンパイルを一度に実行：

```bash
./translate.sh && ./compile.sh
```

## 必要な環境

- **BasicTeX** または **TeX Live**（LaTeX 環境）
- **日本語パッケージ**
  ```bash
  sudo tlmgr install collection-langjapanese
  sudo tlmgr install latexmk
  ```
- **Python 3**（翻訳スクリプト用）

## GitHub 連携

このリポジトリは GitHub と連携しています：

```bash
# 変更をコミット
git add .
git commit -m "論文を更新"

# GitHubにプッシュ
git push
```

## 参考文献の追加

`references.bib` に新しい文献を追加してください：

```bibtex
@article{your_article,
  author = {著者名},
  title = {論文タイトル},
  journal = {ジャーナル名},
  year = {2024},
  volume = {1},
  pages = {1--10}
}
```

論文内で引用する場合：

```latex
先行研究によると\cite{your_article}...
```

## 翻訳について

現在の `translate.sh` は基本的な置換ルールベースの翻訳を行います。より高品質な翻訳が必要な場合は、以下のオプションがあります：

1. **DeepL API** を使用した翻訳
2. **Claude/ChatGPT API** を使用した翻訳
3. 手動での翻訳と校正

翻訳スクリプトは将来的に AI 翻訳に拡張可能です。

## トラブルシューティング

### コンパイルエラーが出る場合

```bash
# 中間ファイルをクリーンアップ
latexmkC
```

### 日本語が表示されない場合

BasicTeX で日本語パッケージがインストールされているか確認：

```bash
tlmgr list --only-installed | grep japan
```

## 参考文献スタイル

`main.tex` と `main_J.tex` の `\bibliographystyle{}` で参考文献のスタイルを変更できます：

- `plain` - 著者名順、番号付き
- `unsrt` - 引用順、番号付き
- `alpha` - 著者名の略号付き
- `abbrv` - plain の省略版
- `ieeetr` - IEEE 形式
