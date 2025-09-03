const params = new URLSearchParams(window.location.search);
const tag = params.get("tag");

if (tag) {
  document.getElementById("tag-title").textContent = `タグ: ${tag}`;
}

fetch("data.json")
  .then(res => res.json())
  .then(articles => {
    // 該当タグの記事のみ抽出
    const filtered = articles
      .filter(article =>
        Array.isArray(article.tags) && article.tags.includes(tag)
      )
      // 日付の降順（新しい順）にソート
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    const container = document.getElementById("tag-article-list");

    if (filtered.length === 0) {
      container.innerHTML = "<p>このタグに該当する記事はありません。</p>";
      return;
    }

    filtered.forEach(article => {
      const link = document.createElement("a");
      link.href = `article.html?id=${article.id}`;
      link.className = "card-link";

      const card = document.createElement("div");
      card.className = "card";

      if (article.image) {
        const img = document.createElement("img");
        img.src = article.image;
        img.alt = article.title;
        img.className = "thumbnail";
        card.appendChild(img);
      }

      const title = document.createElement("h2");
      title.textContent = article.title;
      card.appendChild(title);

      link.appendChild(card);
      container.appendChild(link);
    });
  })
  .catch(err => {
    console.error("データ読み込みに失敗しました:", err);
  });
