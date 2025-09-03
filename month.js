const params = new URLSearchParams(window.location.search);
const year = params.get("year");
const month = params.get("month");

document.getElementById("month-title").textContent = `${year}年 ${parseInt(month)}月の記事一覧`;

fetch('data.json')
  .then(response => response.json())
  .then(articles => {
    const container = document.getElementById("month-article-list");

    const filtered = articles
      .filter(article => {
        if (!article.date) return false;
        const d = new Date(article.date);
        return d.getFullYear() === parseInt(year) && (d.getMonth() + 1) === parseInt(month);
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    if (filtered.length === 0) {
      container.innerHTML = "<p>この月には記事がありません。</p>";
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
    console.error("記事データの読み込みに失敗しました:", err);
  });
