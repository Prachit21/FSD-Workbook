import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/products")
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Unable to load products.");
                setLoading(false);
            });
    }, []);

    const addToCart = (product) => {
        setMessage("");

        setCart((currentCart) => {
            const existingProduct = currentCart.find(
                (item) => item._id === product._id
            );

            if (existingProduct) {
                return currentCart.map((item) =>
                    item._id === product._id
                        ? {
                              ...item,
                              quantity: item.quantity + 1
                          }
                        : item
                );
            }

            return [
                ...currentCart,
                {
                    ...product,
                    quantity: 1
                }
            ];
        });
    };

    const increaseQuantity = (id) => {
        setCart((currentCart) =>
            currentCart.map((item) =>
                item._id === id
                    ? {
                          ...item,
                          quantity: item.quantity + 1
                      }
                    : item
            )
        );
    };

    const decreaseQuantity = (id) => {
        setCart((currentCart) =>
            currentCart
                .map((item) =>
                    item._id === id
                        ? {
                              ...item,
                              quantity: item.quantity - 1
                          }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeFromCart = (id) => {
        setCart((currentCart) =>
            currentCart.filter((item) => item._id !== id)
        );
    };

    const cartItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const cartTotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const categories = [
        "All",
        ...new Set(products.map((product) => product.category))
    ];

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
            category === "All" ||
            product.category === category;

        return matchesSearch && matchesCategory;
    });

    const checkout = async () => {
        if (cart.length === 0) {
            setMessage("Your cart is empty.");
            return;
        }

        try {
            const orderData = {
                customerName: "Prachit",
                email: "prachit@example.com",
                address: "Vadodara, Gujarat",
                items: cart.map((item) => ({
                    productId: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                totalAmount: cartTotal
            };

            const response = await axios.post(
                "http://localhost:5000/api/orders",
                orderData
            );

            setMessage(
                `Order placed successfully! Order ID: ${response.data._id}`
            );

            setCart([]);
        } catch (error) {
            setMessage("Unable to place the order.");
        }
    };

    return (
        <div className="app">
            <header className="header">
                <h1>MERN E-Commerce</h1>
                <p>Shop Smart. Shop Easy.</p>

                <div className="cart-count">
                    🛒 Cart: {cartItems}
                </div>
            </header>

            <main className="container">
                <h2>Product Catalog</h2>

                <div className="filters">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                    />

                    <select
                        value={category}
                        onChange={(event) =>
                            setCategory(event.target.value)
                        }
                    >
                        {categories.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                {loading && (
                    <p className="message">
                        Loading products...
                    </p>
                )}

                {error && (
                    <p className="message error">
                        {error}
                    </p>
                )}

                {!loading && !error && (
                    <>
                        {filteredProducts.length === 0 ? (
                            <p className="message">
                                No products found.
                            </p>
                        ) : (
                            <div className="product-grid">
                                {filteredProducts.map(
                                    (product) => (
                                        <div
                                            className="product-card"
                                            key={product._id}
                                        >
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                            />

                                            <div className="product-info">
                                                <h3>
                                                    {product.name}
                                                </h3>

                                                <p className="category">
                                                    {product.category}
                                                </p>

                                                <p>
                                                    {product.description}
                                                </p>

                                                <h4>
                                                    ₹{product.price}
                                                </h4>

                                                <button
                                                    onClick={() =>
                                                        addToCart(
                                                            product
                                                        )
                                                    }
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </>
                )}

                <section className="cart-section">
                    <h2>Shopping Cart</h2>

                    {cart.length === 0 ? (
                        <p className="message">
                            Your cart is empty.
                        </p>
                    ) : (
                        <>
                            <div className="cart-items">
                                {cart.map((item) => (
                                    <div
                                        className="cart-item"
                                        key={item._id}
                                    >
                                        <div>
                                            <h3>{item.name}</h3>

                                            <p>
                                                ₹{item.price} ×{" "}
                                                {item.quantity}
                                            </p>
                                        </div>

                                        <div className="quantity-controls">
                                            <button
                                                onClick={() =>
                                                    decreaseQuantity(
                                                        item._id
                                                    )
                                                }
                                            >
                                                −
                                            </button>

                                            <span>
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    increaseQuantity(
                                                        item._id
                                                    )
                                                }
                                            >
                                                +
                                            </button>

                                            <button
                                                className="remove-button"
                                                onClick={() =>
                                                    removeFromCart(
                                                        item._id
                                                    )
                                                }
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="checkout-summary">
                                <h2>Checkout Summary</h2>

                                <p>
                                    Items:{" "}
                                    <strong>
                                        {cartItems}
                                    </strong>
                                </p>

                                <p>
                                    Total:{" "}
                                    <strong>
                                        ₹{cartTotal}
                                    </strong>
                                </p>

                                <button
                                    className="checkout-button"
                                    onClick={checkout}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </>
                    )}

                    {message && (
                        <div className="order-message">
                            {message}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default App;