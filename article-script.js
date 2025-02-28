document.addEventListener('DOMContentLoaded', () => {
  const articleDetail = document.querySelector('#article-detail');

  // URLから記事ファイル名を取得
  const params = new URLSearchParams(window.location.search);
  const articleFile = params.get('article');

  // 1行あたりの最大文字数
  const maxCharsPerLine = 25;
  // 1ブロックあたりの最大行数
  const maxLinesPerBlock = 35;

  // 記事を読み込む関数
  const loadArticle = async (fileName) => {
    const articleUrl = `./article/${fileName}`; // 記事ファイルのパス

    try {
      const response = await fetch(articleUrl); // 記事を取得
      if (!response.ok) {
        throw new Error('記事の読み込みに失敗しました');
      }
      const text = await response.text(); // 記事内容を取得

      articleDetail.innerHTML = ''; // 既存の内容をクリア
      let currentBlock = document.createElement('div'); // 新しい記事ブロック
      currentBlock.classList.add('article-block');

      let currentLine = ""; // 1行の内容
      let lineCount = 0; // 現在のブロック内の行数
      let charCount = 0; // 現在の行の文字数カウント
      const punctuationMarks = ["、", "。"]; // 句読点リスト

      for (let i = 0; i < text.length; i++) { //ブロックに記事内容を一文字ずつ入れていくループ
        const char = text[i];

        if (char === '\n') {
          // ユーザーが手動で入力した改行 → カウントリセット
          appendLine(currentBlock, currentLine);  //現在の行をブロックに追加する関数
          currentLine = "";
          charCount = 0;
          lineCount++;
        } else {
          // 句読点チェック（句読点が行頭に来ないようにする）
          if (charCount === maxCharsPerLine - 1 && punctuationMarks.includes(char)) {
            // 句読点が行頭になりそうなら、今の行末に追加
            currentLine += char;
            appendLine(currentBlock, currentLine);
            currentLine = ""; // 次の行をリセット
            charCount = 0;
            lineCount++;
          } else {
            // 通常の文字追加
            currentLine += char;
            charCount++;

            // 25文字に達したら改行
            if (charCount >= maxCharsPerLine) {
              appendLine(currentBlock, currentLine);
              currentLine = "";
              charCount = 0;
              lineCount++;
            }
          }
        }

        // 35行たまったら新しいブロックを作成
        if (lineCount >= maxLinesPerBlock) {
          articleDetail.appendChild(currentBlock);
          currentBlock = document.createElement('div');
          currentBlock.classList.add('article-block');
          lineCount = 0;
        }
      }

      // 最後に残った行を追加
      if (currentLine.trim().length > 0) {
        appendLine(currentBlock, currentLine);
      }

      // 最後のブロックを追加
      if (currentBlock.childNodes.length > 0) {
        articleDetail.appendChild(currentBlock);
      }

    } catch (error) {
      console.error(error);
      articleDetail.textContent = '記事の読み込みに失敗しました。';
    }
  };

  // 1行をブロックに追加する関数
  function appendLine(block, text) {
    const lineElement = document.createElement('div');
    lineElement.textContent = text;
    block.appendChild(lineElement);
  }

  // 記事を読み込む
  if (articleFile) {
    loadArticle(articleFile);
  } else {
    articleDetail.textContent = '記事が指定されていません。';
  }
});
