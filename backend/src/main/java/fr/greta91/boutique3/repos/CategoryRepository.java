package fr.greta91.boutique3.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.greta91.boutique3.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
