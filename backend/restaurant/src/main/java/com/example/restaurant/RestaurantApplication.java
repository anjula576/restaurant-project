package com.example.restaurant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RestaurantApplication {

	// this is the main function of the appleication
	public static void main(String[] args) {
		SpringApplication.run(RestaurantApplication.class, args);

		System.out.println("applicarion is running");

	}

}
