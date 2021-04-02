package fr.greta91.boutique3.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.greta91.boutique3.model.Category;
import fr.greta91.boutique3.repos.CategoryRepository;

@CrossOrigin(maxAge = 3600, origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/categories")
public class CategoryController {
	
	@Autowired
	CategoryRepository categoryRepo;
	
	@GetMapping("/public/categories")
	public List<Category> getCategories() {
		List<Category> list = categoryRepo.findAll();

		return list;
	}
}
