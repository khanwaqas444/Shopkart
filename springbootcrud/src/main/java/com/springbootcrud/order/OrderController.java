package com.springbootcrud.order;

import com.springbootcrud.common.ApiResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // CREATE ORDER (Checkout)
    @PostMapping
    public ApiResponse<Order> createOrder(@RequestBody Order order) {
        return ApiResponse.success(
                "Order placed successfully",
                orderService.createOrder(order)
        );
    }

    // GET ORDERS BY USER
    @GetMapping("/user/{userId}")
    public ApiResponse<List<Order>> getUserOrders(@PathVariable Long userId) {
        return ApiResponse.success(
                "Orders fetched",
                orderService.getOrdersByUser(userId)
        );
    }

    // GET ORDER BY ID
    @GetMapping("/{id}")
    public ApiResponse<Order> getOrder(@PathVariable Long id) {
        return ApiResponse.success(
                "Order fetched",
                orderService.getOrderById(id)
        );
    }
}
