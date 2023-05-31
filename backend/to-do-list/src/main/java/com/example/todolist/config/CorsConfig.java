package com.example.todolist.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Configuration
public class CorsConfig {
    @Value("#{'${CORS_ALLOWED_ORIGINS:*}'.split('\\s*,\\s*')}")
    private final Set<String> allowedOrigins = new HashSet<>(Collections.singleton("*"));

    @Value("#{'${CORS_ALLOWED_METHODS:*}'.split('\\s*,\\s*')}")
    private final Set<String> allowedMethods = new HashSet<>(Collections.singleton("*"));

    @Value("#{'${CORS_ALLOWED_HEADERS:*}'.split('\\s*,\\s*')}")
    private final Set<String> allowedHeaders = new HashSet<>(Collections.singleton("*"));

    @Value("${CORS_ALLOW_CREDENTIALS:true}")
    private boolean allowCredentials = true;

    @Value("${CORS_PATH:/**}")
    private String path = "/**";

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(allowCredentials);
        allowedOrigins.forEach(config::addAllowedOriginPattern);
        allowedMethods.forEach(config::addAllowedMethod);
        allowedHeaders.forEach(config::addAllowedHeader);

        source.registerCorsConfiguration(path, config);
        return new CorsFilter(source);
    }
}