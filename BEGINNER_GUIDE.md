# LaTeX 初心者向け執筆ガイド

LaTeX に慣れていない方のための、簡単に論文を書く方法を説明します。

## 📝 推奨アプローチ

**本文は Markdown で書いて、図や表は LaTeX テンプレートを使う**

### なぜこの方法？

✅ **Markdown**

- 普通の文章として書ける
- 見出し、箇条書き、太字が簡単
- 読みやすい

✅ **LaTeX（図・表のみ）**

- サンプルをコピー＆ペーストするだけ
- 細かい位置調整が可能
- 学術論文の標準形式

## 🚀 クイックスタート

### ステップ 1: Markdown で本文を書く

`manuscript.md` を編集：

```markdown
# 序論

## 研究背景

ここに普通の文章で研究背景を書きます。

**重要な部分**は太字にできます。

箇条書きも簡単：

- 項目 1
- 項目 2

## 研究目的

研究の目的を書きます。
```

### ステップ 2: Pandoc のインストール（初回のみ）

```bash
# macOS
brew install pandoc

# Ubuntu/Debian
sudo apt-get install pandoc
```

### ステップ 3: LaTeX に変換

```bash
./md_to_latex.sh
```

これで `manuscript_from_md.tex` が生成されます。

### ステップ 4: 図や表を追加

生成された LaTeX ファイルに、サンプルをコピペして図や表を追加します。

## 📖 Markdown 記法チートシート

### 見出し

```markdown
# 大見出し（セクション）

## 中見出し（サブセクション）

### 小見出し
```

### 箇条書き

```markdown
- 項目 1
- 項目 2
  - サブ項目
```

番号付き：

```markdown
1. 第一項目
2. 第二項目
3. 第三項目
```

### 強調

```markdown
**太字**
_イタリック_
**_太字イタリック_**
```

### リンクと引用

```markdown
参考文献[@example_article]
複数の文献[@example_article; @example_book]
```

### 数式

インライン数式（文中）:

```markdown
平均は $\bar{x} = \frac{1}{n}\sum x_i$ である。
```

ブロック数式（独立した行）:

```markdown
$$
E = mc^2
$$
```

### 表（シンプル）

```markdown
| 変数 | 群 A | 群 B |
| ---- | ---- | ---- |
| 年齢 | 65   | 64   |
| BMI  | 24   | 23   |
```

ただし、複雑な表は CSV→LaTeX 変換を推奨。

## 🎯 実際のワークフロー

### パターン A: Markdown 中心（推奨）

```bash
# 1. Markdownで本文を書く
vim manuscript.md  # または code manuscript.md

# 2. LaTeXに変換
./md_to_latex.sh

# 3. 生成されたファイルを確認
cat manuscript_from_md.tex

# 4. 必要に応じて手動調整
# （図や表の挿入位置など）
```

### パターン B: LaTeX 直接編集

`main_J.tex` を直接編集：

```latex
\section{序論}
ここに文章を書きます。

\textbf{太字}にしたい部分は textbf で囲みます。

\begin{itemize}
  \item 箇条書き項目1
  \item 箇条書き項目2
\end{itemize}
```

## 🔧 LaTeX 基本コマンド（最小限）

覚えておくと便利な基本コマンド：

### 1. セクション

```latex
\section{序論}          % 1. 序論
\subsection{研究背景}   % 1.1 研究背景
\subsubsection{詳細}    % 1.1.1 詳細
```

### 2. 強調

```latex
\textbf{太字}
\textit{イタリック}
\underline{下線}
```

### 3. 箇条書き

```latex
% 記号付き
\begin{itemize}
  \item 項目1
  \item 項目2
\end{itemize}

% 番号付き
\begin{enumerate}
  \item 第一項目
  \item 第二項目
\end{enumerate}
```

### 4. 数式

```latex
% 文中
$E = mc^2$

% 独立した式
\begin{equation}
  \bar{x} = \frac{1}{n}\sum_{i=1}^{n}x_i
\end{equation}
```

### 5. 引用

```latex
\cite{example_article}
\cite{example_article, example_book}
```

### 6. 図の挿入（コピペ用）

```latex
\begin{figure}[htbp]
  \centering
  \includegraphics[width=0.7\textwidth]{figures/your_figure.pdf}
  \caption{図の説明をここに書く}
  \label{fig:your_label}
\end{figure}

% 本文で参照
図\ref{fig:your_label}に示すように...
```

### 7. 表の挿入（コピペ用）

```latex
\begin{table}[htbp]
  \centering
  \caption{表のタイトル}
  \label{tab:your_label}
  \begin{tabular}{lcc}
    \hline
    項目 & 列A & 列B \\
    \hline
    データ1 & 1.2 & 3.4 \\
    データ2 & 5.6 & 7.8 \\
    \hline
  \end{tabular}
\end{table}

% 本文で参照
表\ref{tab:your_label}に示すように...
```

## 💡 Tips

### 1. テンプレートをコピーして使う

`main_J.tex` にサンプルがたくさん入っているので、コピー＆ペーストして内容だけ書き換えるのが簡単です。

### 2. VS Code の拡張機能

VS Code を使っている場合、以下の拡張機能が便利：

- **LaTeX Workshop**: LaTex のシンタックスハイライト
- **Markdown All in One**: Markdown 編集支援

### 3. プレビューしながら編集

```bash
# 日本語版をコンパイル
./compile_J.sh

# PDFを開いて確認
open main_J.pdf
```

### 4. エラーが出たら

```bash
# 中間ファイルをクリーンアップ
latexmk -C

# 再度コンパイル
./compile_J.sh
```

## 🎓 学習リソース

### すぐ使えるサンプル

このプロジェクトの中にサンプルがたくさんあります：

1. `main_J.tex` - LaTeX 形式の論文サンプル
2. `manuscript.md` - Markdown 形式のサンプル
3. `figures/README.md` - 図の挿入例
4. `TABLES_GUIDE.md` - 表の作成例

### オンラインリソース

- **Overleaf**: https://www.overleaf.com/learn
  - LaTeX のオンライン学習リソース
- **Tables Generator**: https://www.tablesgenerator.com/
  - GUI で表を作成してコード生成

## 🤔 どちらを選ぶべき？

### Markdown を選ぶ場合

✅ こんな人におすすめ：

- LaTeX の経験がない
- 本文がメインで、図表は少ない
- まずは内容に集中したい

### LaTeX 直接編集を選ぶ場合

✅ こんな人におすすめ：

- 図表が多い
- レイアウトを細かく調整したい
- LaTeX を学びたい

### 推奨：ハイブリッド

**実は、両方使うのが最も効率的！**

1. 📝 **本文**: Markdown で執筆 → `./md_to_latex.sh` で変換
2. 🖼️ **図**: サンプルをコピペして挿入
3. 📊 **表**: CSV → `csv_to_latex.py` で変換
4. 🔧 **微調整**: LaTeX で最終調整

## 📋 実践例

### 1. 序論を書く

**Markdown** (`manuscript.md`):

```markdown
# 序論

## 研究背景

心血管疾患は世界的な健康問題である。

主なリスク因子は以下の通り：

- 高血圧
- 糖尿病
- 喫煙

## 研究目的

本研究の目的は、代謝と SCD の関連を明らかにすることである。
```

**変換後の LaTeX**:

```bash
./md_to_latex.sh
```

### 2. 図を追加

生成された `manuscript_from_md.tex` に図を追加：

```latex
\section{結果}

\begin{figure}[htbp]
  \centering
  \includegraphics[width=0.7\textwidth]{figures/figure1_metabolism_comparison.pdf}
  \caption{代謝率の比較}
  \label{fig:metabolism}
\end{figure}

図\ref{fig:metabolism}に示すように...
```

### 3. 表を追加

CSV ファイルから変換：

```bash
python3 csv_to_latex.py tables/sample_baseline.csv \
  -c "患者の基本特性" \
  -l "tab:baseline"
```

出力されたコードをコピー＆ペースト。

## ✨ まとめ

1. **本文は Markdown**で書く（簡単！）
2. **図と表はサンプルをコピペ**（LaTeX）
3. **最終調整**だけ LaTeX で行う

これなら、LaTeX に慣れていなくても大丈夫です！

何か困ったことがあれば、サンプルファイルを見るか、このガイドに戻ってきてください。📚
