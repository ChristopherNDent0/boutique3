package fr.greta91.boutique3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import fr.greta91.boutique3.repos.ProductRepository;

@SpringBootApplication
public class Boutique3Application extends SpringBootServletInitializer{
	
	@Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/*").allowedOrigins("");
            }
        };
    }

	public static void main(String[] args) {
		SpringApplication.run(Boutique3Application.class, args);
	}

}
