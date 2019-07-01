package com.devd.spring.bookstoreaccountservice.web;

import com.devd.spring.bookstoreaccountservice.model.DateAudit;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-30
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateRoleRequest extends DateAudit {

    @NotBlank
    private String roleName;
    @NotBlank
    private String roleDescription;

}
