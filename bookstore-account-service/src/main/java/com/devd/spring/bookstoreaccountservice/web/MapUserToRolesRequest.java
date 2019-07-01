package com.devd.spring.bookstoreaccountservice.web;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-07-01
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MapUserToRolesRequest {
    private List<String> roleNames;
}
