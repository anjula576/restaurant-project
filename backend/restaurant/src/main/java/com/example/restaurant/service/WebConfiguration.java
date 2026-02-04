package com.example.restaurant.service;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

@Configuration

// this class implement WebMvcConfigurer interface
// to configure cors mapping globally (cors means cross origin resource sharing)
public class WebConfiguration implements WebMvcConfigurer {

    // this function get from the WebMvcConfigurer interface
    @SuppressWarnings("null")
    @Override
    public void addCorsMappings(CorsRegistry registry) {

        // from this enable the frontend urls
        // and allow methods which are listed in below
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        // map url path /images/** to the local folder images/
        // so that images can be accessed from browser
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }
}
