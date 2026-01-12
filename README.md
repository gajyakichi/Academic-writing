# Metabolism vs SCD 論文プロジェクト

## 概要

このディレクトリは、Bibtex を使用した論文執筆のためのワークスペースです。

## ファイル構成

- `main.tex` - メインの論文ファイル（LaTeX 形式）
- `references.bib` - 参考文献データベース（Bibtex 形式）
- `README.md` - このファイル（プロジェクト説明）

## 使い方

### 1. 参考文献の追加

`references.bib`ファイルに参考文献を追加します。各エントリーには一意のキー（例：`example_article`）を付けてください。

```bibtex
@article{unique_key,
  author  = {著者名},
  title   = {論文タイトル},
  journal = {ジャーナル名},
  year    = {2024}
}
```

### 2. 本文での引用

`main.tex`で参考文献を引用する際は、`\cite{unique_key}`を使用します。

### 3. コンパイル方法

#### 基本的なコンパイル手順（3 回実行が必要）：

```bash
# 1回目: LaTeXコンパイル（引用を認識）
platex main.tex

# 2回目: Bibtexで参考文献を処理
bibtex main

# 3回目: LaTeXコンパイル（参考文献を埋め込み）
platex main.tex

# 4回目: LaTeXコンパイル（参照を確定）
platex main.tex

# PDFに変換（必要に応じて）
dvipdfmx main.dvi
```

#### latexmk を使う場合（推奨）：

```bash
# 自動で必要な回数コンパイルしてくれます
latexmk -pdf main.tex
```

## 参考文献スタイル

`main.tex`の`\bibliographystyle{}`で参考文献のスタイルを変更できます：

- `plain` - 著者名順、番号付き
- `unsrt` - 引用順、番号付き
- `alpha` - 著者名の略号付き
- `abbrv` - plain の省略版
- `ieeetr` - IEEE 形式

## 環境要件

- LaTeX（TeX Live、MacTeX 等）
- Bibtex
- 日本語 LaTeX 環境（upLaTeX、pLaTeX、LuaLaTeX 等）

## Tips

1. **文献管理ツール**: Zotero、Mendeley、JabRef などを使うと、Bibtex ファイルの管理が楽になります
2. **Google Scholar**: 論文の Bibtex エントリーを簡単に取得できます（引用ボタン →BibTeX）
3. **バックアップ**: 定期的に Git でバージョン管理することをお勧めします
