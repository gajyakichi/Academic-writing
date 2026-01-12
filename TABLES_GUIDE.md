# LaTeX 表（Table）作成ガイド

論文で使用する表を作成する際のガイドラインとサンプルコードです。

## 基本的な表の構造

```latex
\begin{table}[htbp]
  \centering
  \caption{表のタイトル}
  \label{tab:your_label}
  \begin{tabular}{列の設定}
    % 表の内容
  \end{tabular}
\end{table}
```

## 位置指定オプション [htbp]

- `h` = here（ここ）
- `t` = top（ページ上部）
- `b` = bottom（ページ下部）
- `p` = page（専用ページ）

## 列の設定

### 基本的な列タイプ

- `l` = 左揃え (left)
- `c` = 中央揃え (center)
- `r` = 右揃え (right)

### 例

- `{lcc}` = 左揃え列 1 つ + 中央揃え列 2 つ
- `{lcccr}` = 左、中央、中央、中央、右
- `{|l|c|c|}` = 縦線付き（推奨しない）

## サンプル 1: 基本的な表

```latex
\begin{table}[htbp]
  \centering
  \caption{患者の基本特性}
  \label{tab:baseline}
  \begin{tabular}{lcc}
    \hline
    変数 & グループA & グループB \\
    \hline
    年齢（歳） & 65.2 $\pm$ 8.3 & 64.8 $\pm$ 7.9 \\
    男性（\%） & 60.0 & 58.0 \\
    BMI (kg/m²) & 24.5 $\pm$ 3.2 & 24.1 $\pm$ 3.0 \\
    \hline
  \end{tabular}
\end{table}
```

**ポイント:**

- `\\` で行を終了
- `&` で列を区切る
- `\hline` で横線を引く
- `$\pm$` で ± 記号

## サンプル 2: グループ化された表

```latex
\begin{table}[htbp]
  \centering
  \caption{治療効果の比較}
  \label{tab:outcomes}
  \begin{tabular}{lccc}
    \hline
    & ベースライン & 3ヶ月後 & p値 \\
    \hline
    \multicolumn{4}{l}{\textbf{対照群}} \\
    代謝率 (kcal/日) & 1650 $\pm$ 220 & 1620 $\pm$ 210 & 0.24 \\
    体重 (kg) & 68.5 $\pm$ 12.3 & 68.8 $\pm$ 12.5 & 0.56 \\
    \hline
    \multicolumn{4}{l}{\textbf{治療群}} \\
    代謝率 (kcal/日) & 1680 $\pm$ 230 & 1850 $\pm$ 240 & \textbf{0.001} \\
    体重 (kg) & 69.2 $\pm$ 11.8 & 67.5 $\pm$ 11.2 & \textbf{0.03} \\
    \hline
  \end{tabular}
\end{table}
```

**ポイント:**

- `\multicolumn{列数}{配置}{内容}` で複数列を結合
- `\textbf{}` で太字
- 有意差のある p 値を太字にすると見やすい

## サンプル 3: 多変量解析の結果

```latex
\begin{table}[htbp]
  \centering
  \caption{リスク因子の多変量解析}
  \label{tab:multivariate}
  \begin{tabular}{lccc}
    \hline
    リスク因子 & ハザード比 & 95\% CI & p値 \\
    \hline
    年齢（10歳増加） & 1.45 & 1.22--1.73 & \textbf{$<$0.001} \\
    男性 & 1.32 & 0.98--1.78 & 0.07 \\
    高血圧 & 1.67 & 1.23--2.27 & \textbf{0.001} \\
    糖尿病 & 1.89 & 1.34--2.66 & \textbf{$<$0.001} \\
    喫煙 & 1.52 & 1.15--2.01 & \textbf{0.003} \\
    \hline
  \end{tabular}
\end{table}
```

## 表の参照

本文中で表を参照する場合：

```latex
表\ref{tab:baseline}に示すように、2群間に有意差は認められなかった。
```

英語版：

```latex
As shown in Table \ref{tab:baseline}, no significant difference was observed between the two groups.
```

## 高度なテクニック

### 1. 小数点揃え（siunitx パッケージ使用）

プリアンブルに追加：

```latex
\usepackage{siunitx}
```

表で使用：

```latex
\begin{tabular}{lS[table-format=2.1]S[table-format=2.1]}
  変数 & {値A} & {値B} \\
  \hline
  項目1 & 12.3 & 45.6 \\
  項目2 & 1.2 & 3.4 \\
\end{tabular}
```

### 2. 表の回転（横長の表）

```latex
\usepackage{rotating}  % プリアンブルに追加

\begin{sidewaystable}
  % 表の内容
\end{sidewaystable}
```

### 3. 長い表（ページをまたぐ）

```latex
\usepackage{longtable}  % プリアンブルに追加

\begin{longtable}{lcc}
  \caption{長い表} \\
  \hline
  項目 & 値A & 値B \\
  \hline
  \endfirsthead

  \multicolumn{3}{c}{\textit{（続き）}} \\
  \hline
  項目 & 値A & 値B \\
  \hline
  \endhead

  % データ行
  項目1 & 1.2 & 3.4 \\
  項目2 & 5.6 & 7.8 \\
  % ...
  \hline
\end{longtable}
```

## ベストプラクティス

### ✅ 推奨

1. **シンプルな線**: 縦線は使わず、横線のみ（`\hline`）
2. **適切な間隔**: `\hline` は見出し前後と表の上下のみ
3. **数値の精度**: 有効数字を統一（例：すべて小数点 1 桁）
4. **単位の明記**: 列名に単位を記載（例：年齢（歳））
5. **太字で強調**: 重要な値（有意な p 値など）を太字に

### ❌ 避けるべき

1. **過度な装飾**: 縦線や二重線の多用
2. **不統一な書式**: 列ごとに異なる精度
3. **長すぎる表**: 1 ページを超える場合は longtable を検討
4. **曖昧な列名**: 単位や説明が不足

## 便利なオンラインツール

- **Tables Generator**: https://www.tablesgenerator.com/latex_tables
  - GUI で表を作成して LaTeX コードを生成
- **Excel2LaTeX**: Excel から直接 LaTeX 表に変換

## トラブルシューティング

### 表が期待した位置に配置されない

```latex
% 強制的に配置
\begin{table}[H]  % Hオプション（floatパッケージが必要）
```

または：

```latex
\usepackage{float}  % プリアンブルに追加
```

### 表が大きすぎてページに収まらない

```latex
% サイズを調整
\begin{table}[htbp]
  \centering
  \caption{表のタイトル}
  \resizebox{\textwidth}{!}{  % 幅をページ幅に合わせる
    \begin{tabular}{lcccc}
      % 表の内容
    \end{tabular}
  }
\end{table}
```

または：

```latex
% フォントサイズを小さく
\begin{table}[htbp]
  \centering
  \caption{表のタイトル}
  \small  % または \footnotesize, \scriptsize
  \begin{tabular}{lcccc}
    % 表の内容
  \end{tabular}
\end{table}
```

## まとめ

- 表は `table` 環境で作成
- 実際の表組みは `tabular` 環境で行う
- `\caption` でタイトル、`\label` で参照ラベルを設定
- シンプルで読みやすいデザインを心がける
- 本文から `\ref{}` で参照する
