package com.springbootcrud.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()

                        .requestMatchers("/api/cart/**", "/api/orders/**")
                        .hasAnyAuthority("USER")

                        .requestMatchers("/api/seller/**", "/api/products/**")
                        .hasAnyAuthority("SELLER")

                        .anyRequest().authenticated()
                )
                .addFilterBefore(new JwtFilter(new JwtUtil()),
                        org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
