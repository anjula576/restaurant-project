package com.example.restaurant;

import org.springframework.boot.SpringApplication;

@org.springframework.boot.autoconfigure.SpringBootApplication
public class RestaurantApplication {

	// this is the main function of the appleication
	public static void main(String[] args) {
		SpringApplication.run(RestaurantApplication.class, args);

		System.out.println("applicarion is running");

	}

}

