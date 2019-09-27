package com.devd.spring.bookstoreaccountservice.web;

import com.devd.spring.bookstoreaccountservice.repository.dao.DateAudit;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author: Devaraj Reddy, Date : 2019-06-30
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
