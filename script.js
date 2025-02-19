document.addEventListener('DOMContentLoaded', () => {
  const articleList = document.querySelector('#article-list');

  // 記事ファイルのURL（`article`ディレクトリから）
  const articleFiles = [
    { title: '縦書きでブログを表示する', file: 'article1.txt' },
    { title: '縦書きのデザインについて', file: 'article2.txt' },
    { title: '縦書きの歴史と文化', file: 'article3.txt' }
  ];

  // 記事一覧を動的に生成
  articleFiles.forEach((article) => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${article.file}`; // 詳細ページのリンク（詳細ページは後ほど作成）
    link.textContent = article.title;
    listItem.appendChild(link);
    articleList.appendChild(listItem);
  });
});
