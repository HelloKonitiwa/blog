document.addEventListener('DOMContentLoaded', () => {
  const articleDetail = document.querySelector('#article-detail');

  // URLから記事名を取得
  const params = new URLSearchParams(window.location.search);
  const articleFile = params.get('article');

  // 記事を読み込む関数
  const loadArticle = async (fileName) => {
    const articleUrl = `./article/${fileName}`; // 記事ファイルのパス

    try {
      const response = await fetch(articleUrl); // ファイルを読み込む
      if (!response.ok) {
        throw new Error('記事の読み込みに失敗しました');
      }
      const text = await response.text(); // テキストとして記事内容を取得

      // 改行を <br> タグに変換
      const formattedText = text.replace(/\n/g, '<br>');

      // 記事内容を縦書きで表示
      articleDetail.innerHTML = ''; // 既存の内容をクリア
      const articleElement = document.createElement('article');
      const contentElement = document.createElement('p');
      contentElement.classList.add('vertical-text');
      contentElement.innerHTML = formattedText;  // innerHTML を使用して改行を反映
      articleElement.appendChild(contentElement);
      articleDetail.appendChild(articleElement);
    } catch (error) {
      console.error(error);
      articleDetail.textContent = '記事の読み込みに失敗しました。';
    }
  };

  // 記事を読み込む
  if (articleFile) {
    loadArticle(articleFile);
  } else {
    articleDetail.textContent = '記事が指定されていません。';
  }
});
