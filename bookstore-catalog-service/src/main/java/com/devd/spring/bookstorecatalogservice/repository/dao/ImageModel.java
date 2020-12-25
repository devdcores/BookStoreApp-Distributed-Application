package com.devd.spring.bookstorecatalogservice.repository.dao;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author Devaraj Reddy - 21-Dec-2020
 */
@Entity
@Table(name = "IMAGE_TABLE")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImageModel {

    public ImageModel(String name, String type, byte[] picByte) {
        this.name = name;
        this.type = type;
        this.picByte = picByte;
    }

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "IMAGE_ID", updatable = false, nullable = false)
    private String  imageId;

    @Column(name = "NAME")
    private String name;

    @Column(name = "TYPE")
    private String type;

    //image bytes can have large lengths so we specify a value
    //which is more than the default length for picByte column
    @Column(name = "PIC_BYTES", length = 1000)
    private byte[] picByte;

}
