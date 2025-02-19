document.addEventListener('DOMContentLoaded', () => {
  const articleList = document.querySelector('#article-list');
  const articleDetail = document.querySelector('#article-detail');

  // 記事ファイルのURLとタイトルのリスト
  const articleFiles = [
    { title: '縦書きでブログを表示する', file: 'article1.txt' },
    { title: '縦書きのデザインについて', file: 'article2.txt' },
    { title: '縦書きの歴史と文化', file: 'article3.txt' }
  ];

  // 記事一覧を動的に生成
  articleFiles.forEach((article) => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = '#'; // クリックしてもページ遷移しないように
    link.textContent = article.title;
    link.addEventListener('click', () => loadArticle(article.file)); // クリック時に記事を読み込む
    listItem.appendChild(link);
    articleList.appendChild(listItem);
  });

  // 記事を読み込む関数
  const loadArticle = async (fileName) => {
    const articleUrl = `./article/${fileName}`; // 記事ファイルのパス

    // 記事タイトルリストを非表示にする
    articleList.style.display = 'none';  // ここで非表示にする

    try {
      const response = await fetch(articleUrl); // ファイルを読み込む
      if (!response.ok) {
        throw new Error('記事の読み込みに失敗しました');
      }
      const text = await response.text(); // テキストとして記事内容を取得

      // 記事内容を縦書きで表示
      articleDetail.innerHTML = ''; // 既存の内容をクリア
      const articleElement = document.createElement('article');
      const contentElement = document.createElement('p');
      contentElement.classList.add('vertical-text');
      contentElement.textContent = text;
      articleElement.appendChild(contentElement);
      articleDetail.appendChild(articleElement);
    } catch (error) {
      console.error(error);
      articleDetail.textContent = '記事の読み込みに失敗しました。';
    }
  };
});
