const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch("data.json")
  .then(res => res.json())
  .then(articles => {
    const article = articles.find(a => a.id == id);
    if (!article) {
      document.getElementById("article-container").innerHTML = "<p>記事が見つかりません。</p>";
      return;
    }

    fetch(`articles/${id}.md`)
      .then(res => res.text())
      .then(md => {
        const container = document.getElementById("article-container");
        const card = document.createElement("div");
        card.className = "card";

        const title = document.createElement("h2");
        title.textContent = article.title;
        card.appendChild(title);

        const content = document.createElement("div");
        content.innerHTML = marked.parse(md);  // MarkdownをHTMLに変換
        card.appendChild(content);
        container.appendChild(card);

        /*タグ情報読み取り*/
        const tagsContainer = document.createElement("div");
         tagsContainer.className = "tags";

          if (article.tags && article.tags.length > 0) {
            article.tags.forEach(tag => {
              const tagEl = document.createElement("a");
              tagEl.href = `tag.html?tag=${encodeURIComponent(tag)}`;
              tagEl.textContent = `#${tag}`;
              tagEl.className = "tag";
              tagsContainer.appendChild(tagEl);
          });
        }
        card.appendChild(tagsContainer);
      });
  });
