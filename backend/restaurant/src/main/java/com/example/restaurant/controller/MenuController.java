package com.example.restaurant.controller;

import com.example.restaurant.dao.MenuDao;
import com.example.restaurant.entity.Menu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping(value = "api/menuitems")
@CrossOrigin(origins = "http://localhost:5173") // allow React frontend
public class MenuController {

    @Autowired
    private MenuDao menuDao;

    // get image upload path from application.properties
    // use @Value annotation() to get value(this is spring way of getting values
    // from properties file)
    @Value("${image.upload.path}")
    private String uploadDir;

    @GetMapping
    public List<Menu> getCustomers() {

        return menuDao.findAll();
    }

    // post mapping to add new menu item
    @PostMapping
    public ResponseEntity<?> addMenuItem(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") BigDecimal price,
            @RequestParam("status") Boolean status,
            @RequestParam("portion") String portion,
            @RequestParam("image") MultipartFile image) throws IOException {

        // set image path to image upload path + image file name
        // File is a path handler,not a file creator
        // from File just pointed to that directory.didn't create directory (like tell
        // the address)
        // if there is no anything in that directory,it will create that directory from
        // mkdirs()
        File dir = new File(uploadDir);
        if (!dir.exists()) {

            // create directory if not exists
            dir.mkdirs();
        }

        // file name with timestamp to avoid duplicate file names
        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();

        // set image path to image upload path + file name
        // This tells Java exactly where to save the file.
        Path filePath = Paths.get(uploadDir, fileName);

        // save the image to the disk
        // getbytes() method of MultipartFile is used to get the byte array of the file
        Files.write(filePath, image.getBytes());

        // here save image path to database
        // String imageUrl = "/images/" + fileName;

        // create new menu item
        Menu menuItem = new Menu();
        menuItem.setName(name);
        menuItem.setDescription(description);
        menuItem.setPrice(price);
        menuItem.setStatus(status);
        menuItem.setPortion(portion); // Default portion value
        // menuItem.setImage(imageUrl);
        menuItem.setImage("/uploads/images/" + fileName);

        menuDao.save(menuItem);

        // return success response
        // response entity is used to return response with status code
        return ResponseEntity.ok("Menu item added successfully");

    }

    // delete mapping to delete menu item by id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMenuItem(@PathVariable Integer id) {

        if (id == null) {
            return ResponseEntity
                    .badRequest()
                    .body("ID must not be null");
        }

        if (!menuDao.existsById(id)) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Menu item not found");
        }
        // deleteById method of JpaRepository to delete menu item by id (it is inbuilt
        // function)
        Menu existingMenuItem = menuDao.findById(id).orElse(null);
        // menuItem.setStatus(false); // setting status to false instead of deleting
        existingMenuItem.setStatus(false);
        menuDao.save(existingMenuItem);

        // response entity is used to return response with status code
        return ResponseEntity.ok("Menu item deleted successfully");
    }

}
