package com.devd.spring.bookstoreaccountservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.List;
import java.util.Set;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-05-17
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ROLE")
public class Role extends DateAudit{

    @Id
    @GeneratedValue(generator = "hibernate-uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "ROLE_ID", updatable = false, nullable = false)
    private String id;

    @Column(name = "ROLE_NAME", nullable = false)
    private String roleName;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "roles")
    private Set<User> users;

    @Column(name = "ROLE_DESCRIPTION")
    private String roleDescription;
}
