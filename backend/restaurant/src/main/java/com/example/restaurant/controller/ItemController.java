package com.example.restaurant.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.restaurant.dao.ItemDao;
import com.example.restaurant.entity.Item;
import com.example.restaurant.entity.Menu;

import java.io.StringReader;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping(value = "api/items")
public class ItemController {

    @Autowired
    private ItemDao itemDao;

    @GetMapping
    public List<Item> getItems() {
        return itemDao.findAll();

    }

    @PostMapping
    public String createItem(@RequestBody @NonNull Item item) {
        try {

            itemDao.save(item);
            return "ok";
        } catch (Exception e) {
            e.printStackTrace();
            return "error" + e.getMessage();
        }
    }

    // delete mapping to delete menu item by id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Integer id) {

        if (id == null) {
            return ResponseEntity
                    .badRequest()
                    .body("ID must not be null");
        }

        try {
            if (!itemDao.findById(id).isPresent()) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body("Item not found");
            }
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        // deleteById method of JpaRepository to delete menu item by id (it is inbuilt
        // function)
        Item existingItem = itemDao.findById(id).orElse(null);
        // item.setStatus(false); // setting status to false instead of deleting
        existingItem.setStatus(false);
        itemDao.save(existingItem);

        // response entity is used to return response with status code
        return ResponseEntity.ok("Menu item deleted successfully");
    }

}
