'use client'
import { createContext, useEffect, useState, useRef } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
    const ls = typeof window !== 'undefined' ? window.localStorage : null;
    const [cartProducts, setCartProducts] = useState([]);
    const isInitialLoad = useRef(true);

    // Load from localStorage on first mount
    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')));
        }
    }, []);

    // Sync with localStorage, but skip on first load
    useEffect(() => {
        if (isInitialLoad.current) {
            isInitialLoad.current = false;
            return;
        }

        if (cartProducts.length > 0) {
            ls?.setItem('cart', JSON.stringify(cartProducts));
        } else {
            ls?.removeItem('cart');
        }
    }, [cartProducts]);

    function addProduct(productId) {
        setCartProducts(prev => [...prev, productId]);
    }

    function removeProduct(productId) {
        setCartProducts(prev => {
            const pos = prev.indexOf(productId);
            if (pos !== -1) {
                return prev.filter((value, index) => index !== pos);
            }
            return prev;
        });
    }

    function removeAllProduct(productId) {
        setCartProducts(prev => prev.filter(id => id !== productId));
    }

    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct, removeProduct, removeAllProduct }}>
            {children}
        </CartContext.Provider>
    );
}
