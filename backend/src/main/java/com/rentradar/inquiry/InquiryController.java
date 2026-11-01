package com.rentradar.inquiry;

import com.rentradar.listing.ListingRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/inquiries")
public class InquiryController {
    private final InquiryRepository inquiries;
    private final ListingRepository listings;

    public InquiryController(InquiryRepository inquiries, ListingRepository listings) {
        this.inquiries = inquiries;
        this.listings = listings;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Inquiry create(@Valid @RequestBody InquiryRequest request) {
        var listing = listings.findById(request.listingId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Listing not found"));
        if (listing.getStatus() != com.rentradar.listing.Listing.ListingStatus.APPROVED) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "This listing is not accepting inquiries");
        }
        return inquiries.save(new Inquiry(listing, request.name(), request.email(), request.message()));
    }

    public record InquiryRequest(@NotNull Long listingId, @NotBlank @Size(max = 120) String name,
                                @NotBlank @Email @Size(max = 180) String email,
                                @NotBlank @Size(max = 2000) String message) {}
}
