# Latexmk 設定ファイル（英語版用）
# LuaLaTeX + BibTeX ワークフロー（PNG/PDFに対応）

# LaTeX processor - LuaLaTeXを使用
$pdf_mode = 4; # 4 = LuaLaTeX

# BibTeX processor
$bibtex = 'bibtex %O %B';

# 中間ファイルの自動削除
$clean_ext = 'bbl blg aux log out toc lof lot fls fdb_latexmk synctex.gz';

# 監視モード用の設定
$preview_continuous_mode = 1;
$pvc_view_file_via_temporary = 0;

# PDF viewerの設定（macOS）
$pdf_previewer = 'open -a Preview %S';
