# Figures ディレクトリ

このディレクトリは論文で使用する画像・図を格納します。

## ファイル一覧

### サンプル図（削除・置き換え可能）

- `figure1_metabolism_comparison.png` - 代謝率の比較図（棒グラフ）
- `figure2_correlation.png` - 年齢と SCD リスクの相関図（散布図）
- `figure3_survival_curve.png` - 生存曲線（Kaplan-Meier 曲線）

## 図の追加方法

1. 画像ファイル（PNG、PDF、JPG 等）をこのディレクトリに配置
2. LaTeX ファイルで以下のように参照：

```latex
\begin{figure}[htbp]
  \centering
  \includegraphics[width=0.8\textwidth]{figures/figure1_metabolism_comparison.png}
  \caption{代謝率の比較。Group Aと Group Bの代謝率を示す。エラーバーは標準偏差を表す。}
  \label{fig:metabolism}
\end{figure}
```

3. 本文中で図を参照する場合：

```latex
図\ref{fig:metabolism}に示すように、...
```

## 推奨事項

### ファイル形式

- **ベクター形式（推奨）**: PDF, EPS
  - 拡大しても画質が劣化しない
  - 論文投稿に最適
- **ラスター形式**: PNG (300 dpi 以上推奨), JPEG
  - 写真や複雑なグラフに適している

### ファイル命名規則

- `figureX_説明.拡張子` の形式を推奨
- 例: `figure1_metabolism_comparison.pdf`

### サイズ

- 幅: 論文のテキスト幅に合わせる（通常 0.5〜1.0\textwidth）
- 解像度: ラスター画像の場合は 300 dpi 以上

## 図のキャプション例

### 日本語版（main_J.tex）

```latex
\caption{代謝率とSCDリスクの関連性。年齢との相関を示す散布図（R² = 0.67, p < 0.001）。}
```

### 英語版（main.tex）

```latex
\caption{Association between metabolic rate and SCD risk. Scatter plot showing correlation with age (R² = 0.67, p < 0.001).}
```

## 参考

- LaTeX graphicx パッケージの詳細: https://www.overleaf.com/learn/latex/Inserting_Images
- 図のレイアウト設定: `[htbp]` = here, top, bottom, page
