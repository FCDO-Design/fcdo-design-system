class FcdoSortableTable {
    constructor(module) {
      this.module = module;
      this.table = module.querySelector("table");
      this.headers = this.table.querySelectorAll("th");
      this.searchInput = module.querySelector(".fcdo-sortable-table__search");

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
        const rows = this.table.querySelectorAll("tbody tr");

        rows.forEach(row => {
          const text = row.textContent.toLowerCase();
          row.hidden = !text.includes(filter);
        });
      });
    }

    sortTable(colIndex) {
      const tbody = this.table.tBodies[0];
      const rows = Array.from(tbody.rows);

      const isNumeric = !isNaN(rows[0].cells[colIndex].innerText);
      const currentSort = this.headers[colIndex].getAttribute("aria-sort");
      const asc = currentSort !== "ascending";

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

      this.headers.forEach(th => th.setAttribute("aria-sort", "none"));
      this.headers[colIndex].setAttribute("aria-sort", asc ? "ascending" : "descending");
    }
  }

  // Auto-init all modules (FCDO pattern)
  document.querySelectorAll('[data-module="fcdo-sortable-table"]').forEach(module => {
    new FcdoSortableTable(module);
  });