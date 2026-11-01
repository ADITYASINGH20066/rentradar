package com.rentradar.inquiry;

import com.rentradar.listing.Listing;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.Instant;

@Entity
@Table(name = "inquiries")
public class Inquiry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "listing_id", nullable = false)
    private Listing listing;

    @NotBlank @Size(max = 120)
    private String name;

    @NotBlank @Email @Size(max = 180)
    private String email;

    @NotBlank @Size(max = 2000)
    private String message;

    private Instant createdAt = Instant.now();

    protected Inquiry() {}

    public Inquiry(Listing listing, String name, String email, String message) {
        this.listing = listing;
        this.name = name;
        this.email = email;
        this.message = message;
    }

    public Long getId() { return id; }
    public Long getListingId() { return listing.getId(); }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getMessage() { return message; }
    public Instant getCreatedAt() { return createdAt; }
}
