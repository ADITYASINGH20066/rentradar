package com.rentradar.listing;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.Instant;

@Entity
@Table(name = "listings")
public class Listing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank @Size(max = 140)
    private String title;

    @NotBlank @Size(max = 180)
    private String location;

    @NotBlank @Size(max = 80)
    private String neighborhood;

    @Positive
    private int price;

    @Min(0) @Max(20)
    private int beds;

    @Min(1) @Max(20)
    private int baths;

    @Positive
    private int area;

    @NotBlank @Size(max = 40)
    private String type;

    @Size(max = 500)
    private String image;

    @Column(length = 800)
    private String facilities;

    @NotBlank @Email @Size(max = 180)
    private String ownerEmail;

    @Enumerated(EnumType.STRING)
    private ListingStatus status = ListingStatus.PENDING;

    private Instant createdAt = Instant.now();

    protected Listing() {}

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getLocation() { return location; }
    public String getNeighborhood() { return neighborhood; }
    public int getPrice() { return price; }
    public int getBeds() { return beds; }
    public int getBaths() { return baths; }
    public int getArea() { return area; }
    public String getType() { return type; }
    public String getImage() { return image; }
    public String getFacilities() { return facilities; }
    public String getOwnerEmail() { return ownerEmail; }
    public ListingStatus getStatus() { return status; }
    public Instant getCreatedAt() { return createdAt; }
    public void setStatus(ListingStatus status) { this.status = status; }

    public enum ListingStatus { PENDING, APPROVED, REJECTED }
}
