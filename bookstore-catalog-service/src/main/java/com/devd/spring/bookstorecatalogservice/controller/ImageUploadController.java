package com.devd.spring.bookstorecatalogservice.controller;

import com.devd.spring.bookstorecatalogservice.repository.ImageRepository;
import com.devd.spring.bookstorecatalogservice.repository.dao.ImageModel;
import com.devd.spring.bookstorecommons.exception.RunTimeExceptionPlaceHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

/**
 * @author Devaraj Reddy - 21-Dec-2020
 */
@RestController
@RequestMapping(path = "image")
public class ImageUploadController {
    @Autowired
    ImageRepository imageRepository;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("imageFile") MultipartFile file) throws IOException {
        System.out.println("Original Image Byte Size - " + file.getBytes().length);
        ImageModel img = new ImageModel(file.getOriginalFilename(), file.getContentType(),
                compressBytes(file.getBytes()));
        ImageModel savedImage = imageRepository.save(img);
        Map<String, String> response = new HashMap<>();
        response.put("imageId", savedImage.getImageId());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping(path = "/{imageId}")
    public ResponseEntity<?> getImage(@PathVariable String imageId) {
        try {
            final Optional<ImageModel> retrievedImage = imageRepository.findByImageId(imageId);
            if (!retrievedImage.isPresent()) {
                throw new RunTimeExceptionPlaceHolder("Image doesn't exist!");
            }
            ByteArrayResource resource = new ByteArrayResource(decompressBytes(retrievedImage.get().getPicByte()));
            String encodedString = Base64.getEncoder().encodeToString(resource.getByteArray());

            Map<String, String> response = new HashMap<>();
            response.put("imageBase64", encodedString);
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(encodedString);
        } catch (Exception e) {
            throw new RunTimeExceptionPlaceHolder("Unable to get image");
        }
    }

    // compress the image bytes before storing it in the database
    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);
        return outputStream.toByteArray();
    }

    // uncompress the image bytes before returning it to the angular application
    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }
}
