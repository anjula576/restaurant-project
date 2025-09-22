package com.example.restaurant.service;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {

//    this function get from the WebMvcConfigurer interface
    @Override
    public void addCorsMappings(CorsRegistry registry) {

//        from this enable the frontend urls
//        and allow methods which are listed in below
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET","POST","PUT","DELETE");
    }
}
