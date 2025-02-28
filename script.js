document.addEventListener('DOMContentLoaded', () => {
  const articleList = document.querySelector('#article-list');

  // 記事ファイルのURLとタイトルのリスト
  const articleFiles = [
    { title: '2025.2.22', file: 'article1.txt' },
    { title: '2025.2.23', file: 'article2.txt' },
    { title: '2025.2.24', file: 'article3.txt' }
  ];

  // 記事一覧を動的に生成
  articleFiles.forEach((article) => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = `article.html?article=${article.file}`;  // 記事詳細ページへのリンク（URLパラメータ付き）
    link.textContent = article.title;
    listItem.appendChild(link);
    articleList.appendChild(listItem);
  });
});
