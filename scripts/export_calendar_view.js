#!/usr/bin/env node

/**
 * 研究ノートをインタラクティブなHTMLカレンダービューに変換
 * リストビュー、検索、タグ機能を含む
 */

const fs = require('fs');
const path = require('path');

const NOTES_DIR = 'research_notes';
const HTML_DIR = path.join(NOTES_DIR, 'html');
const OUTPUT_HTML = path.join(HTML_DIR, 'index.html');
const OUTPUT_DATA = path.join(HTML_DIR, 'notes_data.js');

console.log('========================================');
console.log('📅 カレンダービュー生成中...');
console.log('========================================');
console.log('');

// HTMLディレクトリの作成
if (!fs.existsSync(HTML_DIR)) {
    fs.mkdirSync(HTML_DIR, { recursive: true });
}

// すべての .md ファイルを取得（SUMMARY.md と README.md を除く）
const noteFiles = fs.readdirSync(NOTES_DIR)
    .filter(file => 
        file.endsWith('.md') && 
        file !== 'SUMMARY.md' && 
        file !== 'README.md'
    )
    .sort();

console.log(`📝 ${noteFiles.length} 個のノートを処理中...`);

// notes_data.js を生成
const notesData = {};

for (const file of noteFiles) {
    const date = path.basename(file, '.md');
    const filePath = path.join(NOTES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // JSON.stringify で自動的にエスケープされる
    notesData[date] = content;
}

// notes_data.js を書き出し（テンプレートリテラルではなく、JSON.stringify を使用）
const dataJsContent = `const notesData = ${JSON.stringify(notesData, null, 2)};\n`;
fs.writeFileSync(OUTPUT_DATA, dataJsContent, 'utf-8');

console.log(`✅ notes_data.js を生成しました`);

// index.html を生成
const htmlContent = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>研究ノート - カレンダー&リストビュー</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
            background: #f5f7fa;
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        header {
            background: #2c3e50;
            color: white;
            padding: 24px 30px;
        }
        
        header h1 {
            font-size: 1.8em;
            font-weight: 600;
            margin-bottom: 6px;
        }
        
        header p {
            font-size: 0.95em;
            opacity: 0.85;
        }
        
        .view-switcher {
            display: flex;
            gap: 10px;
            padding: 20px 24px;
            background: #fafbfc;
            border-bottom: 1px solid #e8eaed;
        }
        
        .view-switcher button {
            padding: 10px 20px;
            border: 1px solid #dadce0;
            background: white;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.95em;
            transition: all 0.2s;
        }
        
        .view-switcher button.active {
            background: #34495e;
            color: white;
            border-color: #34495e;
        }
        
        .search-bar {
            padding: 0 24px 20px 24px;
            background: #fafbfc;
        }
        
        .search-input {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid #dadce0;
            border-radius: 8px;
            font-size: 1em;
        }
        
        .search-input:focus {
            outline: none;
            border-color: #5f8aa7;
            box-shadow: 0 0 0 2px rgba(95, 138, 167, 0.1);
        }
        
        .main-content {
            display: grid;
            grid-template-columns: 380px 1fr;
            min-height: 650px;
        }
        
        .calendar-section {
            border-right: 1px solid #e8eaed;
            padding: 24px;
            background: #fafbfc;
        }
        
        .list-section {
            padding: 24px;
            overflow-y: auto;
            max-height: 750px;
        }
        
        .note-item {
            background: white;
            border: 1px solid #e8eaed;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 12px;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .note-item:hover {
            border-color: #5f8aa7;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .note-item.selected {
            border-color: #34495e;
            box-shadow: 0 0 0 2px rgba(52, 73, 94, 0.2);
        }
        
        .note-date {
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 8px;
        }
        
        .note-tags {
            margin-bottom: 8px;
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
        }
        
        .tag {
            display: inline-block;
            background: #e8f4f8;
            color: #2c5f7a;
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 0.85em;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .tag:hover {
            background: #2c5f7a;
            color: white;
        }
        
        .note-preview {
            color: #5f6368;
            font-size: 0.9em;
            line-height: 1.5;
            max-height: 60px;
            overflow: hidden;
        }
        
        .calendar-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .calendar-controls button {
            background: #34495e;
            color: white;
            border: none;
            padding: 8px 14px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9em;
            transition: background 0.2s;
        }
        
        .calendar-controls button:hover {
            background: #2c3e50;
        }
        
        .month-year {
            font-size: 1.1em;
            font-weight: 600;
            color: #2c3e50;
        }
        
        .calendar {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 4px;
            margin-top: 16px;
        }
        
        .calendar-day-header {
            text-align: center;
            font-weight: 600;
            padding: 8px;
            color: #5f6368;
            font-size: 0.85em;
        }
        
        .calendar-day {
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9em;
            transition: all 0.2s;
            background: white;
            border: 1px solid #e8eaed;
            color: #5f6368;
        }
        
        .calendar-day:hover {
            background: #f8f9fa;
            border-color: #dadce0;
        }
        
        .calendar-day.has-note {
            background: #5f8aa7;
            color: white;
            font-weight: 600;
            border-color: #5f8aa7;
        }
        
        .calendar-day.has-note:hover {
            background: #4a7188;
            transform: translateY(-2px);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .calendar-day.selected {
            border-color: #34495e;
            box-shadow: 0 0 0 2px #34495e;
        }
        
        .calendar-day.other-month {
            color: #dadce0;
        }
        
        .note-section {
            padding: 24px 32px;
            overflow-y: auto;
            max-height: 750px;
        }
        
        .note-toolbar {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            padding-bottom: 16px;
            border-bottom: 1px solid #e8eaed;
        }
        
        .note-toolbar button {
            background: #f8f9fa;
            border: 1px solid #dadce0;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9em;
            transition: all 0.2s;
            color: #5f6368;
        }
        
        .note-toolbar button:hover {
            background: #e8eaed;
        }
        
        .note-toolbar button.active {
            background: #34495e;
            color: white;
            border-color: #34495e;
        }
        
        .note-placeholder {
            text-align: center;
            color: #9aa0a6;
            padding: 100px 20px;
        }
        
        .note-placeholder h2 {
            font-size: 1.6em;
            margin-bottom: 10px;
            color: #5f6368;
        }
        
        .side-by-side-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 10px;
        }
        
        .editor-panel {
            border-right: 1px solid #e8eaed;
            padding-right: 20px;
        }
        
        .preview-panel {
            padding-left: 20px;
            overflow-y: auto;
            max-height: 600px;
        }
        
        .panel-title {
            font-size: 0.9em;
            font-weight: 600;
            color: #5f6368;
            margin-bottom: 10px;
            padding-bottom: 8px;
            border-bottom: 1px solid #e8eaed;
        }
        
        .note-editor {
            width: 100%;
            min-height: 500px;
            padding: 16px;
            border: 1px solid #dadce0;
            border-radius: 8px;
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 0.95em;
            line-height: 1.6;
            resize: vertical;
        }
        
        .note-editor:focus {
            outline: none;
            border-color: #5f8aa7;
            box-shadow: 0 0 0 2px rgba(95, 138, 167, 0.1);
        }
        
        .note-editor.side-by-side {
            min-height: 550px;
            max-height: 550px;
        }
        
        .note-content {
            line-height: 1.8;
            color: #202124;
        }
        
        .note-content h1 {
            color: #2c3e50;
            border-bottom: 2px solid #5f8aa7;
            padding-bottom: 10px;
            margin-bottom: 20px;
            font-size: 1.8em;
        }
        
        .note-content h2 {
            color: #34495e;
            margin-top: 28px;
            margin-bottom: 14px;
            font-size: 1.4em;
        }
        
        .note-content h3 {
            color: #5f6368;
            margin-top: 20px;
            margin-bottom: 10px;
            font-size: 1.15em;
        }
        
        .note-content ul {
            margin-left: 24px;
            margin-bottom: 16px;
        }
        
        .note-content li {
            margin-bottom: 6px;
        }
        
        .note-content code {
            background: #f8f9fa;
            padding: 3px 6px;
            border-radius: 4px;
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 0.9em;
            color: #c7254e;
        }
        
        .note-content pre {
            background: #f8f9fa;
            padding: 16px;
            border-radius: 6px;
            overflow-x: auto;
            border: 1px solid #e8eaed;
        }
        
        .note-content pre code {
            background: none;
            padding: 0;
            color: inherit;
        }
        
        .stats {
            background: white;
            padding: 12px;
            border-radius: 8px;
            margin-top: 20px;
            text-align: center;
            border: 1px solid #e8eaed;
        }
        
        .stats-item {
            display: inline-block;
            margin: 0 12px;
        }
        
        .stats-number {
            font-size: 1.8em;
            font-weight: 700;
            color: #5f8aa7;
        }
        
        .stats-label {
            font-size: 0.85em;
            color: #5f6368;
            margin-top: 2px;
        }
        
        .no-results {
            text-align: center;
            padding: 40px;
            color: #9aa0a6;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>📚 研究ノート</h1>
            <p>Research Notes Calendar & List View</p>
        </header>
        
        <div class="view-switcher">
            <button id="calendarViewBtn" class="active" onclick="showCalendarView()">📅 カレンダー</button>
            <button id="listViewBtn" onclick="showListView()">📋 リスト</button>
        </div>
        
        <div class="search-bar" id="searchBar" style="display: none;">
            <input type="text" id="searchInput" class="search-input" placeholder="🔍 ノートを検索... (タイトル、内容、日付、タグ)" oninput="filterNotes()">
        </div>
        
        <div class="main-content">
            <div id="calendarSection" class="calendar-section">
                <div class="calendar-controls">
                    <button onclick="previousMonth()">◀ 前月</button>
                    <div class="month-year" id="monthYear"></div>
                    <button onclick="nextMonth()">次月 ▶</button>
                </div>
                
                <div class="calendar" id="calendar"></div>
                
                <div class="stats">
                    <div class="stats-item">
                        <div class="stats-number" id="totalNotes">0</div>
                        <div class="stats-label">総ノート数</div>
                    </div>
                </div>
            </div>
            
            <div id="listSection" class="list-section" style="display: none;">
                <div id="notesList"></div>
                <div id="noResults" class="no-results" style="display: none;">
                    検索結果がありません
                </div>
            </div>
            
            <div class="note-section">
                <div class="note-placeholder" id="placeholder">
                    <h2>📅 日付を選択</h2>
                    <p>カレンダーまたはリストから日付を選択して研究ノートを表示</p>
                </div>
                
                <div id="noteContainer" style="display: none;">
                    <div class="note-toolbar">
                        <button id="viewBtn" class="active" onclick="switchToView()">👁️ 表示</button>
                        <button id="editBtn" onclick="switchToEdit()">✏️ 編集</button>
                        <button id="saveBtn" onclick="saveNote()" style="display: none">💾 保存</button>
                        <button id="downloadBtn" onclick="downloadNote()" style="display: none">⬇️ ダウンロード</button>
                    </div>
                    
                    <div class="note-content" id="noteContent"></div>
                    
                    <div class="side-by-side-container" id="sideBySideContainer" style="display: none">
                        <div class="editor-panel">
                            <div class="panel-title">📝 Markdown編集</div>
                            <textarea class="note-editor side-by-side" id="noteEditorSide"></textarea>
                        </div>
                        <div class="preview-panel">
                            <div class="panel-title">👁️ ライブプレビュー</div>
                            <div class="note-content" id="livePreview"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script src="notes_data.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script>
        let currentDate = new Date();
        let selectedDate = null;
        let isEditMode = false;
        let currentView = 'calendar';
        let allNotes = [];
        
        document.getElementById('totalNotes').textContent = Object.keys(notesData).length;
        
        // ノートリストを準備（タグ抽出付き）
        for (let date in notesData) {
            const content = notesData[date];
            const tags = extractTags(content);
            allNotes.push({
                date: date,
                content: content,
                tags: tags
            });
        }
        allNotes.sort((a, b) => b.date.localeCompare(a.date));
        
        // タグを抽出する関数
        function extractTags(content) {
            const tagRegex = /#[^\\s#]+/g;
            const matches = content.match(tagRegex);
            return matches ? [...new Set(matches)] : [];
        }
        
        function showCalendarView() {
            currentView = 'calendar';
            document.getElementById('calendarViewBtn').classList.add('active');
            document.getElementById('listViewBtn').classList.remove('active');
            document.getElementById('calendarSection').style.display = 'block';
            document.getElementById('listSection').style.display = 'none';
            document.getElementById('searchBar').style.display = 'none';
        }
        
        function showListView() {
            currentView = 'list';
            document.getElementById('calendarViewBtn').classList.remove('active');
            document.getElementById('listViewBtn').classList.add('active');
            document.getElementById('calendarSection').style.display = 'none';
            document.getElementById('listSection').style.display = 'block';
            document.getElementById('searchBar').style.display = 'block';
            renderNotesList(allNotes);
        }
        
        function renderNotesList(notes) {
            const listContainer = document.getElementById('notesList');
            const noResults = document.getElementById('noResults');
            
            if (notes.length === 0) {
                listContainer.innerHTML = '';
                noResults.style.display = 'block';
                return;
            }
            
            noResults.style.display = 'none';
            listContainer.innerHTML = notes.map(note => {
                const preview = note.content.replace(/[#*\`\\n-]/g, ' ').replace(/tags:/gi, '').substring(0, 150);
                const isSelected = selectedDate === note.date ? 'selected' : '';
                const tagsHTML = note.tags.length > 0 
                    ? \`<div class="note-tags">\${note.tags.map(tag => \`<span class="tag" onclick="filterByTag('\${tag}')">\${tag}</span>\`).join('')}</div>\`
                    : '';
                return \`
                    <div class="note-item \${isSelected}" onclick="showNoteFromList('\${note.date}')">
                        <div class="note-date">📅 \${note.date}</div>
                        \${tagsHTML}
                        <div class="note-preview">\${preview}...</div>
                    </div>
                \`;
            }).join('');
        }
        
        function filterNotes() {
            const query = document.getElementById('searchInput').value.toLowerCase();
            if (!query) {
                renderNotesList(allNotes);
                return;
            }
            
            const filtered = allNotes.filter(note => {
                const tagsText = note.tags.join(' ').toLowerCase();
                return note.date.includes(query) || 
                       note.content.toLowerCase().includes(query) ||
                       tagsText.includes(query);
            });
            
            renderNotesList(filtered);
        }
        
        function filterByTag(tag) {
            document.getElementById('searchInput').value = tag;
            filterNotes();
        }
        
        function showNoteFromList(dateStr) {
            showNote(dateStr);
        }
        
        function renderCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            
            const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', 
                              '7月', '8月', '9月', '10月', '11月', '12月'];
            document.getElementById('monthYear').textContent = 
                \`\${year}年 \${monthNames[month]}\`;
            
            const calendar = document.getElementById('calendar');
            calendar.innerHTML = '';
            
            const dayHeaders = ['日', '月', '火', '水', '木', '金', '土'];
            dayHeaders.forEach(day => {
                const header = document.createElement('div');
                header.className = 'calendar-day-header';
                header.textContent = day;
                calendar.appendChild(header);
            });
            
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            
            for (let i = 0; i < firstDay.getDay(); i++) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'calendar-day other-month';
                calendar.appendChild(emptyDay);
            }
            
            for (let day = 1; day <= lastDay.getDate(); day++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.textContent = day;
                
                const dateStr = \`\${year}-\${String(month + 1).padStart(2, '0')}-\${String(day).padStart(2, '0')}\`;
                
                if (notesData[dateStr]) {
                    dayElement.classList.add('has-note');
                    dayElement.onclick = () => showNote(dateStr);
                }
                
                if (selectedDate === dateStr) {
                    dayElement.classList.add('selected');
                }
                
                calendar.appendChild(dayElement);
            }
        }
        
        function showNote(dateStr) {
            selectedDate = dateStr;
            const noteMarkdown = notesData[dateStr];
            
            if (noteMarkdown) {
                document.getElementById('placeholder').style.display = 'none';
                document.getElementById('noteContainer').style.display = 'block';
                
                switchToView();
                notesData[selectedDate] = noteMarkdown;
            }
            
            renderCalendar();
            if (currentView === 'list') {
                renderNotesList(allNotes);
            }
        }
        
        function switchToView() {
            isEditMode = false;
            document.getElementById('viewBtn').classList.add('active');
            document.getElementById('editBtn').classList.remove('active');
            document.getElementById('saveBtn').style.display = 'none';
            document.getElementById('downloadBtn').style.display = 'none';
            
            document.getElementById('noteContent').style.display = 'block';
            document.getElementById('sideBySideContainer').style.display = 'none';
            
            document.getElementById('noteContent').innerHTML = marked.parse(notesData[selectedDate]);
        }
        
        function switchToEdit() {
            isEditMode = true;
            document.getElementById('viewBtn').classList.remove('active');
            document.getElementById('editBtn').classList.add('active');
            document.getElementById('saveBtn').style.display = 'inline-block';
            document.getElementById('downloadBtn').style.display = 'inline-block';
            
            document.getElementById('noteContent').style.display = 'none';
            document.getElementById('sideBySideContainer').style.display = 'grid';
            
            const editor = document.getElementById('noteEditorSide');
            editor.value = notesData[selectedDate];
            
            updateLivePreview();
            editor.oninput = updateLivePreview;
        }
        
        function updateLivePreview() {
            const editor = document.getElementById('noteEditorSide');
            const preview = document.getElementById('livePreview');
            preview.innerHTML = marked.parse(editor.value);
        }
        
        function saveNote() {
            const editedContent = document.getElementById('noteEditorSide').value;
            notesData[selectedDate] = editedContent;
            
            // タグを再抽出
            const noteIndex = allNotes.findIndex(n => n.date === selectedDate);
            if (noteIndex !== -1) {
                allNotes[noteIndex].content = editedContent;
                allNotes[noteIndex].tags = extractTags(editedContent);
            }
            
            alert('✅ 保存しました!\\n\\n編集内容がプレビューに反映されました。\\n「表示」ボタンで確認できます。');
        }
        
        function downloadNote() {
            const editedContent = document.getElementById('noteEditorSide').value;
            
            const blob = new Blob([editedContent], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = \`\${selectedDate}.md\`;
            a.click();
            URL.revokeObjectURL(url);
            
            alert(
                '⬇️ ダウンロードしました!\\n\\n「' +
                selectedDate +
                '.md」がダウンロードされました。\\n元のファイルを上書きしてください。'
            );
        }
        
        function previousMonth() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        }
        
        function nextMonth() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        }
        
        renderCalendar();
        
        const latestDate = Object.keys(notesData).sort().reverse()[0];
        if (latestDate) {
            const latestDateObj = new Date(latestDate);
            currentDate = new Date(latestDateObj.getFullYear(), latestDateObj.getMonth(), 1);
            renderCalendar();
            showNote(latestDate);
        }
    </script>
</body>
</html>
`;

fs.writeFileSync(OUTPUT_HTML, htmlContent, 'utf-8');

console.log('✅ index.html を生成しました');
console.log('');
console.log('✅ カレンダービューを生成しました！');
console.log('');
console.log(`📂 出力先: ${OUTPUT_HTML}`);
console.log('');
console.log('🌐 ブラウザで開く:');
console.log(`   open ${OUTPUT_HTML}`);
console.log('');
console.log('✨ 新機能:');
console.log('   - 📅 カレンダービュー / 📋 リストビュー切り替え');
console.log('   - 🔍 全文検索（タグ、内容、日付）');
console.log('   - 🏷️ タグ表示とタグフィルター');
console.log('   - ✏️ サイドバイサイド編集');
console.log('');
