package com.rentradar.listing;

import jakarta.validation.Valid;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/api")
public class ListingController {
    private final ListingRepository listings;

    public ListingController(ListingRepository listings) {
        this.listings = listings;
    }

    @GetMapping("/listings")
    public List<Listing> search(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Integer maxPrice,
            @RequestParam(required = false) Integer minBeds,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String facility) {
        Specification<Listing> spec = (root, query, cb) ->
                cb.equal(root.get("status"), Listing.ListingStatus.APPROVED);
        if (location != null && !location.isBlank()) {
            String pattern = "%" + location.trim().toLowerCase(Locale.ROOT) + "%";
            spec = spec.and((root, query, cb) -> cb.or(
                    cb.like(cb.lower(root.get("location")), pattern),
                    cb.like(cb.lower(root.get("neighborhood")), pattern)));
        }
        if (maxPrice != null && maxPrice > 0) {
            spec = spec.and((root, query, cb) -> cb.le(root.get("price"), maxPrice));
        }
        if (minBeds != null && minBeds >= 0) {
            spec = spec.and((root, query, cb) -> cb.ge(root.get("beds"), minBeds));
        }
        if (type != null && !type.isBlank()) {
            spec = spec.and((root, query, cb) -> cb.equal(cb.lower(root.get("type")), type.trim().toLowerCase(Locale.ROOT)));
        }
        if (facility != null && !facility.isBlank()) {
            spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("facilities")), "%" + facility.trim().toLowerCase(Locale.ROOT) + "%"));
        }
        return listings.findAll(spec);
    }

    @PostMapping("/listings")
    @ResponseStatus(HttpStatus.CREATED)
    public Listing create(@Valid @RequestBody Listing listing) {
        listing.setStatus(Listing.ListingStatus.PENDING);
        return listings.save(listing);
    }

    @GetMapping("/owner/listings")
    public List<Listing> ownerListings(@RequestParam @jakarta.validation.constraints.Email String email) {
        return listings.findAll((root, query, cb) -> cb.equal(cb.lower(root.get("ownerEmail")), email.toLowerCase(Locale.ROOT)));
    }

    @GetMapping("/moderation/listings")
    public List<Listing> moderationQueue() {
        return listings.findByStatus(Listing.ListingStatus.PENDING);
    }

    @PatchMapping("/moderation/listings/{id}")
    public Listing moderate(@PathVariable Long id, @Valid @RequestBody ModerationRequest request) {
        Listing listing = listings.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Listing not found"));
        listing.setStatus(request.status());
        return listings.save(listing);
    }

    public record ModerationRequest(@jakarta.validation.constraints.NotNull Listing.ListingStatus status) {}
}
