class FcdoSortableTable {
  constructor(module) {
    this.module = module;
    this.table = module.querySelector("table");
    this.headers = this.table.querySelectorAll("th");
    this.searchInput = module.querySelector(".fcdo-table-search");

    this.init();
  }

  init() {
    this.bindSort();
    this.bindSearch();
  }

  bindSort() {
    this.headers.forEach((th, index) => {
      th.addEventListener("click", () => this.sortTable(index));
      th.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          this.sortTable(index);
        }
      });
    });
  }

  bindSearch() {
    if (!this.searchInput) return;

    this.searchInput.addEventListener("input", () => {
      const filter = this.searchInput.value.toLowerCase();
      const rows = Array.from(this.table.tBodies[0].rows);

      rows.forEach(row => {
        // Only consider visible text inside cells
        const text = Array.from(row.cells)
          .map(cell => cell.textContent.toLowerCase())
          .join(" ");
        row.hidden = !text.includes(filter);
      });
    });
  }

  sortTable(colIndex) {
    const tbody = this.table.tBodies[0];
    const rows = Array.from(tbody.rows).filter(row => !row.hidden); // only sort visible rows
    const currentSort = this.headers[colIndex].getAttribute("aria-sort");
    const asc = currentSort !== "ascending";

    // Determine if numeric column
    const isNumeric = !isNaN(parseFloat(rows.find(r => !r.hidden)?.cells[colIndex]?.innerText));

    rows.sort((a, b) => {
      let valA = a.cells[colIndex].innerText;
      let valB = b.cells[colIndex].innerText;

      if (isNumeric) {
        valA = parseFloat(valA);
        valB = parseFloat(valB);
      }

      return asc ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
    });

    rows.forEach(row => tbody.appendChild(row));

    // Reset all aria-sort and update clicked header
    this.headers.forEach(th => th.setAttribute("aria-sort", "none"));
    this.headers[colIndex].setAttribute("aria-sort", asc ? "ascending" : "descending");
  }
}

// Auto-init all modules
document.querySelectorAll('[data-module="fcdo-sortable-table"]').forEach(module => {
  new FcdoSortableTable(module);
});