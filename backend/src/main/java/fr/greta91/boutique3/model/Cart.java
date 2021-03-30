package fr.greta91.boutique3.model;

import java.util.HashMap;

public class Cart {

	public HashMap<Product, Integer> cart;

	public Cart(HashMap<Product, Integer> cart) {
		this.cart = cart;
	}

	public Cart() {
	}

	public HashMap<Product, Integer> getCart() {
		return cart;
	}

	public void setCart(HashMap<Product, Integer> cart) {
		this.cart = cart;
	}

}
