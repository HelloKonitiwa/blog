fetch('data.json')
  .then(response => response.json())
  .then(articles => {
    const archiveMap = new Map();

    articles.forEach(article => {
      if (!article.date) return;
      const date = new Date(article.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const key = `${year}-${String(month).padStart(2, '0')}`;
      if (!archiveMap.has(key)) archiveMap.set(key, 0);
      archiveMap.set(key, archiveMap.get(key) + 1);
    });

    const container = document.getElementById("archive-list");
    const years = {};

    // グループ化
    const grouped = {};
    for (const [key, count] of archiveMap.entries()) {
      const [year, month] = key.split("-");
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push({ month: parseInt(month), count });
    }

    // 年ごとに昇順に並べて表示
    Object.keys(grouped).sort((a, b) => b - a).forEach(year => {
      const yearDiv = document.createElement("div");
      yearDiv.innerHTML = `<div class="year">${year}年</div>`;
      container.appendChild(yearDiv);

      grouped[year]
        .sort((a, b) => a.month - b.month) // 月を昇順に並べる
        .forEach(entry => {
          const monthDiv = document.createElement("div");
          monthDiv.className = "month";
          monthDiv.textContent = `　　${entry.month}月（${entry.count}件）`;
          monthDiv.addEventListener("click", () => {
            window.location.href = `month.html?year=${year}&month=${String(entry.month).padStart(2, '0')}`;
          });
          yearDiv.appendChild(monthDiv);
        });
    });
     // --- タグ別アーカイブ処理を追加 ---
    const tagMap = new Map();

    articles.forEach(article => {
      if (!Array.isArray(article.tags)) return;
      article.tags.forEach(tag => {
        if (!tagMap.has(tag)) tagMap.set(tag, []);
        tagMap.get(tag).push(article);
      });
    });

    const tagContainer = document.getElementById("tag-list");
    const tagList = Array.from(tagMap.entries()).sort();

    tagList.forEach(([tag, articlesWithTag]) => {
      const tagDiv = document.createElement("div");
      tagDiv.className = "tag";
      tagDiv.textContent = `${tag}（${articlesWithTag.length}件）`;
      tagDiv.addEventListener("click", () => {
        const params = new URLSearchParams();
        params.set("tag", tag);
        window.location.href = `tag.html?${params.toString()}`;
      });
      tagContainer.appendChild(tagDiv);
    });
  })
  .catch(err => {
    console.error("記事データの読み込みに失敗しました:", err);
  });

  
