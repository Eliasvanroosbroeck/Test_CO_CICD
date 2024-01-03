package ui.view;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;

import domain.model.Animal;
import domain.service.AnimalService;
import org.junit.jupiter.api.Test;

class UnitTest {
    @Test
    void testFindAnimalWithName_NotFound() {
        // Arrange
        AnimalService animalService = new AnimalService();

        // Act
        Animal actualAnimal = animalService.findAnimalWithName("NonExistent");

        // Assert
        assertEquals(null, actualAnimal);
    }

    @Test
    void testGetAll() {
        // Arrange
        AnimalService animalService = new AnimalService();

        // Act
        ArrayList<Animal> allAnimals = animalService.getAll();

        // Assert
        assertEquals(2, allAnimals.size());
    }
}
