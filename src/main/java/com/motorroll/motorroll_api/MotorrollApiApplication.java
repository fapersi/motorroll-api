package com.motorroll.motorroll_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class MotorrollApiApplication {
	public static void main(String[] args) {
		SpringApplication.run(MotorrollApiApplication.class, args);
	}
}
