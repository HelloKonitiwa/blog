document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("content");

  fetch("data.json")
    .then(response => response.json())
    .then(articles => {
      // IDの降順で並べ替え（新しい順）
      articles.sort((a, b) => b.id - a.id);

      articles.forEach(article => {
        const link = document.createElement("a");
        link.href = `article.html?id=${article.id}`;
        link.className = "card-link";

        const card = document.createElement("div");
        card.className = "card";

        // 画像がある場合のみ追加
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
    .catch(error => {
      console.error("記事の読み込みに失敗しました:", error);
      container.innerHTML = "<p>記事を読み込めませんでした。</p>";
    });
});

  