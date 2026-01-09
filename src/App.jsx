import { useState } from "react";
import data from "./../mall_inventory_multifilter_dataset.json";
import "./App.css";

function App() {
    const [search, setSearch] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);

    const categories = data.taxonomy;

    const toggleCategory = (cat) => {
        setSelectedCategories((prev) =>
            prev.includes(cat)
                ? prev.filter((c) => c !== cat)
                : [...prev, cat]
        );
    };

    const filteredInventory = data.inventory.filter((item) => {
        const matchesSearch = item.product.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(item.product.category.name);

        return matchesSearch && matchesCategory;
    });

    return (
        <>
            {/* HEADER */}
            <header className="header">
                <div className="header-left">
                    <h1>Cosmos City Mall</h1>
                    <span>Bengaluru</span>
                </div>

                <input
                    className="search"
                    placeholder="Search products"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </header>

            <div className="layout">
                {/* FILTERS */}
                <aside className="filters">
                    <div className="filters-header">
                        <h3>Filters</h3>
                        <button onClick={() => setSelectedCategories([])}>
                            Clear All
                        </button>
                    </div>

                    <div className="filter-group">
                        <h4>Category</h4>

                        {categories.map((cat) => (
                            <label key={cat.id}>
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(cat.name)}
                                    onChange={() => toggleCategory(cat.name)}
                                />
                                {cat.name}
                                <span>
                  (
                                    {
                                        data.inventory.filter(
                                            (i) => i.product.category.name === cat.name
                                        ).length
                                    }
                                    )
                </span>
                            </label>
                        ))}
                    </div>
                </aside>

                {/* MAIN */}
                <main className="content">
                    <div className="results-bar">
            <span>
              <strong>{filteredInventory.length}</strong> products found
            </span>

                        <select>
                            <option>Cheapest</option>
                            <option>Highest Rated</option>
                        </select>
                    </div>

                    <div className="grid">
                        {filteredInventory.map((item) => (
                            <div className="card" key={item.inventoryId}>
                                <div className="image">
                                    <img
                                        src={item.product.media.thumbnail}
                                        alt={item.product.name}
                                    />
                                </div>

                                <div className="card-body">
                                    <h3>{item.product.name}</h3>

                                    <div className="brand">
                                        {item.product.brand}
                                    </div>

                                    <div className="category">
                                        {item.product.category.name} &gt;{" "}
                                        {item.product.category.subCategory}
                                    </div>

                                    <div className="rating">
                                        ⭐ {item.product.rating.value}
                                        <span>
                      ({item.product.rating.count})
                    </span>
                                    </div>

                                    <div className="store">
                                        {item.store.storeName}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}

export default App;
