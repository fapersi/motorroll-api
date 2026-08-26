package com.motorroll.motorroll_api;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/** Verifica que el contexto de Spring levanta con todos los beans conectados. */
@SpringBootTest
@ActiveProfiles("test")
class MotorrollApiApplicationTests {

	@Test
	void contextLoads() {
	}

}
