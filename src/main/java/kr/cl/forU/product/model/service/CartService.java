package kr.cl.forU.product.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import kr.cl.forU.product.model.vo.CartItem;

@Service
public class CartService {
    private Map<Integer, CartItem> cartItems = new HashMap<>();

    // 장바구니에 제품 추가
    public void addToCart(int productId, String productName, double price, int count) {
        if (cartItems.containsKey(productId)) {
            CartItem item = cartItems.get(productId);
            item.setCount(item.getCount() + count);
        } else {
            CartItem item = new CartItem(productId, productName, price, count);
            cartItems.put(productId, item);
        }
    }

    // 장바구니에서 제품 제거
    public void removeFromCart(int productId) {
        cartItems.remove(productId);
    }

    // 장바구니 내 모든 아이템 반환
    public List<CartItem> getAllCartItems() {
        return new ArrayList<>(cartItems.values());
    }

    // 장바구니 비우기
    public void clearCart() {
        cartItems.clear();
    }
}
