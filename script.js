document.addEventListener('DOMContentLoaded', () => {
    const blogContent = document.querySelector('#blog-content');
  
    // 記事ファイルのURL（`article`ディレクトリから）
    const articleUrl = './article/article1.txt';
  
    // 記事を読み込む関数
    const loadArticle = async (url) => {
      try {
        const response = await fetch(url); // Fetch APIでファイルを取得
        if (!response.ok) {
          throw new Error('記事の読み込みに失敗しました');
        }
        const text = await response.text(); // ファイル内容をテキストとして取得
  
        // 記事を縦書きスタイルで表示
        const articleElement = document.createElement('article');
        articleElement.classList.add('post');
        
        const titleElement = document.createElement('h2');
        titleElement.textContent = '新しい記事'; // タイトルは固定の例
        articleElement.appendChild(titleElement);
        
        const contentElement = document.createElement('p');
        contentElement.classList.add('vertical-text');
        contentElement.textContent = text; // 読み込んだテキストを本文に追加
        articleElement.appendChild(contentElement);
  
        blogContent.appendChild(articleElement); // 記事を表示
      } catch (error) {
        console.error(error);
        blogContent.textContent = '記事の読み込みに失敗しました。';
      }
    };
  
    // 記事を読み込む
    loadArticle(articleUrl);
  });
  