import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Bath, BedDouble, Check,
  ChevronDown, Heart, House, MapPin, Menu, Search, SlidersHorizontal, Sparkles,
  Square, Wifi, X,
} from "lucide-react";

type Listing = {
  id: number;
  title: string;
  location: string;
  neighborhood: string;
  price: number;
  beds: number;
  baths: number;
  area: number;
  type: string;
  image: string | null;
  featured?: boolean;
  tags?: string[];
  facilities?: string;
  status?: string;
  ownerEmail?: string;
};

const demoListings: Listing[] = [
  { id: 1, title: "Sunlit apartment with a balcony", location: "Bengaluru, Karnataka", neighborhood: "Indiranagar", price: 32000, beds: 1, baths: 1, area: 760, type: "Apartment", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85", featured: true, tags: ["Natural light", "Pet friendly"] },
  { id: 2, title: "A little home near the metro", location: "Pune, Maharashtra", neighborhood: "Koregaon Park", price: 28000, beds: 2, baths: 2, area: 1120, type: "House", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85", tags: ["Parking", "Dishwasher", "Metro nearby"] },
  { id: 3, title: "A quieter side of the city", location: "Mumbai, Maharashtra", neighborhood: "Powai", price: 45000, beds: 1, baths: 1, area: 640, type: "Apartment", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85", tags: ["Rooftop", "Laundry"] },
  { id: 4, title: "Room to breathe, room to grow", location: "Hyderabad, Telangana", neighborhood: "Gachibowli", price: 24000, beds: 2, baths: 1, area: 910, type: "Apartment", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85", tags: ["Metro nearby", "Storage", "Lift"] },
  { id: 5, title: "A fresh start in a lovely space", location: "Delhi, Delhi", neighborhood: "Hauz Khas", price: 38000, beds: 2, baths: 2, area: 1050, type: "Condo", image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=85", featured: true, tags: ["Gym", "Pet friendly"] },
  { id: 6, title: "Your own little garden escape", location: "Bengaluru, Karnataka", neighborhood: "Whitefield", price: 18000, beds: 1, baths: 1, area: 700, type: "House", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85", tags: ["Garden", "Quiet street"] },
  { id: 7, title: "A cheerful room in a shared home", location: "Pune, Maharashtra", neighborhood: "Viman Nagar", price: 11000, beds: 1, baths: 1, area: 280, type: "Room", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85", tags: ["Furnished", "Wi-Fi", "Metro nearby"] },
  { id: 8, title: "High-rise views, easy evenings", location: "Mumbai, Maharashtra", neighborhood: "Andheri West", price: 58000, beds: 2, baths: 2, area: 980, type: "Apartment", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85", featured: true, tags: ["Lift", "Parking", "Gym"] },
  { id: 9, title: "A compact, fully furnished studio", location: "Chennai, Tamil Nadu", neighborhood: "Adyar", price: 16000, beds: 0, baths: 1, area: 420, type: "Apartment", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85", tags: ["Furnished", "Wi-Fi", "Air conditioning"] },
  { id: 10, title: "Room for two and room for plants", location: "Jaipur, Rajasthan", neighborhood: "Malviya Nagar", price: 19000, beds: 2, baths: 2, area: 1050, type: "Apartment", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85", tags: ["Balcony", "Parking", "Garden"] },
  { id: 11, title: "A peaceful place near the lake", location: "Hyderabad, Telangana", neighborhood: "Kondapur", price: 35000, beds: 3, baths: 2, area: 1380, type: "Condo", image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=85", tags: ["Lift", "Parking", "Pet friendly"] },
  { id: 12, title: "A bright home for new beginnings", location: "Ahmedabad, Gujarat", neighborhood: "Prahlad Nagar", price: 22000, beds: 2, baths: 2, area: 1150, type: "Apartment", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85", tags: ["Balcony", "Lift", "Parking"] },
  { id: 13, title: "An easy-to-love family home", location: "Kolkata, West Bengal", neighborhood: "Salt Lake", price: 26000, beds: 3, baths: 2, area: 1420, type: "House", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85", tags: ["Garden", "Parking", "Quiet street"] },
  { id: 14, title: "A simple room close to campus", location: "Delhi, Delhi", neighborhood: "Saket", price: 9000, beds: 1, baths: 1, area: 240, type: "Room", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85", tags: ["Furnished", "Metro nearby", "Wi-Fi"] },
  { id: 15, title: "A spacious corner of the city", location: "Bengaluru, Karnataka", neighborhood: "HSR Layout", price: 42000, beds: 3, baths: 2, area: 1450, type: "Apartment", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85", featured: true, tags: ["Balcony", "Pet friendly", "Parking"] },
  { id: 16, title: "Your own little place in the sun", location: "Chennai, Tamil Nadu", neighborhood: "Velachery", price: 12500, beds: 1, baths: 1, area: 510, type: "House", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85", tags: ["Garden", "Quiet street", "Metro nearby"] },
  { id: 17, title: "A modern flat with all the extras", location: "Pune, Maharashtra", neighborhood: "Baner", price: 52000, beds: 3, baths: 3, area: 1580, type: "Condo", image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=85", tags: ["Gym", "Lift", "Parking", "Balcony"] },
  { id: 18, title: "A cosy first home in the city", location: "Mumbai, Maharashtra", neighborhood: "Goregaon East", price: 30000, beds: 1, baths: 1, area: 570, type: "Apartment", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85", tags: ["Metro nearby", "Lift", "Laundry"] },
];

const photo = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85";
const formatRent = (amount: number) => new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
}).format(amount);

function App() {
  const [listings, setListings] = useState<Listing[]>(demoListings);
  const [isBooting, setIsBooting] = useState(true);
  const [saved, setSaved] = useState<number[]>(() => {
    try {
      const stored = window.localStorage.getItem("rentradar:saved");
      const parsed: unknown = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) ? parsed.filter((id): id is number => typeof id === "number") : [];
    } catch {
      return [];
    }
  });
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("Any beds");
  const [activeFilter, setActiveFilter] = useState("All homes");
  const [modal, setModal] = useState<"inquiry" | "owner" | "dashboard" | null>(null);
  const [selectedListing, setSelectedListing] = useState<Listing>(demoListings[0]);
  const [notice, setNotice] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [savedOnly, setSavedOnly] = useState(false);
  const [facility, setFacility] = useState("");
  const [dashboardEmail, setDashboardEmail] = useState("");
  const [ownerListings, setOwnerListings] = useState<Listing[]>([]);
  const [moderationListings, setModerationListings] = useState<Listing[]>([]);
  const [dashboardTab, setDashboardTab] = useState<"mine" | "review">("mine");

  useEffect(() => {
    const timer = window.setTimeout(() => setIsBooting(false), 1050);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("rentradar:saved", JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    fetch("/api/listings")
      .then((response) => {
        if (!response.ok) throw new Error("Listings service is unavailable");
        return response.json() as Promise<Listing[]>;
      })
      .then((data) => { if (data.length) setListings(data); })
      .catch(() => setNotice("You’re browsing Indian sample homes. Connect the Spring Boot API to load live listings."));
  }, []);

  const visibleListings = useMemo(() => listings.filter((listing) => {
    const query = `${listing.title} ${listing.location} ${listing.neighborhood}`.toLowerCase();
    const matchesText = !search || query.includes(search.toLowerCase());
    const matchesLocation = !location || query.includes(location.toLowerCase());
    const matchesPrice = !maxPrice || listing.price <= Number(maxPrice);
    const matchesBeds = bedrooms === "Any beds" || listing.beds >= Number(bedrooms[0]);
    const matchesFilter = activeFilter === "All homes" || listing.type === activeFilter;
    const matchesFacility = !facility || `${listing.facilities || ""} ${(listing.tags || []).join(" ")}`.toLowerCase().includes(facility.toLowerCase());
    const matchesSaved = !savedOnly || saved.includes(listing.id);
    return matchesText && matchesLocation && matchesPrice && matchesBeds && matchesFilter && matchesFacility && matchesSaved;
  }), [activeFilter, bedrooms, facility, listings, location, maxPrice, saved, savedOnly, search]);

  const toggleSaved = (id: number) => {
    setSaved((current) => current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id]);
  };

  const showInquiry = (listing: Listing) => {
    setSelectedListing(listing);
    setModal("inquiry");
  };

  const submitInquiry = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId: selectedListing.id,
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });
      if (!response.ok) throw new Error("Inquiry could not be sent");
      setNotice("Your note is on its way. The owner will be in touch soon.");
    } catch {
      setNotice("Your note could not be sent. Start the Spring Boot API and try again.");
    }
    setModal(null);
  };

  const submitListing = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const files = Array.from(formData.getAll("images")).filter((entry): entry is File => entry instanceof File && entry.size > 0);
    try {
      const imageUrls = await Promise.all(files.map(async (file) => {
        const uploadData = new FormData();
        uploadData.append("file", file);
        const uploadResponse = await fetch("/api/uploads", { method: "POST", body: uploadData });
        if (!uploadResponse.ok) throw new Error("One or more photos could not be uploaded.");
        const result = await uploadResponse.json() as { url: string };
        return result.url;
      }));
      const response = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.get("title"),
          location: formData.get("location"),
          neighborhood: formData.get("neighborhood"),
          price: Number(formData.get("price")),
          beds: Number(formData.get("beds")),
          baths: Number(formData.get("baths")),
          area: Number(formData.get("area")),
          type: formData.get("type"),
          image: imageUrls[0] || "",
          facilities: formData.get("facilities"),
          ownerEmail: formData.get("ownerEmail"),
        }),
      });
      if (!response.ok) throw new Error("The listing could not be submitted. Check the details and try again.");
      setNotice("Thanks for sharing your place. It’s in the review queue.");
      setModal(null);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "The listing could not be submitted.");
    }
  };

  const loadOwnerListings = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/owner/listings?email=${encodeURIComponent(dashboardEmail)}`);
      if (!response.ok) throw new Error("The owner dashboard could not be loaded.");
      setOwnerListings(await response.json() as Listing[]);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "The owner dashboard could not be loaded.");
    }
  };

  const loadModerationQueue = async () => {
    setDashboardTab("review");
    try {
      const response = await fetch("/api/moderation/listings");
      if (!response.ok) throw new Error("The moderation queue could not be loaded.");
      setModerationListings(await response.json() as Listing[]);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "The moderation queue could not be loaded.");
    }
  };

  const moderateListing = async (id: number, status: "APPROVED" | "REJECTED") => {
    try {
      const response = await fetch(`/api/moderation/listings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error("The listing could not be updated.");
      setModerationListings((current) => current.filter((listing) => listing.id !== id));
      setNotice(`Listing ${status.toLowerCase()}.`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "The listing could not be updated.");
    }
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="RentRadar home">
          <span className="brand-mark"><House size={18} strokeWidth={2.2} /></span>
          <span>rent<span className="brand-light">radar</span></span>
        </a>
        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
          <a className="nav-active" href="#explore" onClick={() => setMenuOpen(false)}>Explore</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>Our story</a>
          <button className="nav-dashboard" onClick={() => { setModal("dashboard"); setMenuOpen(false); }}>Owner dashboard</button>
        </nav>
        <div className="header-actions">
          <button className={savedOnly ? "saved-link saved-active" : "saved-link"} onClick={() => { setSavedOnly(!savedOnly); setActiveFilter("All homes"); document.getElementById("listing-grid")?.scrollIntoView({ behavior: "smooth" }); }}>
            <Heart size={16} /> Saved <span className="saved-count">{saved.length}</span>
          </button>
          <button className="list-home-button" onClick={() => setModal("owner")}>List your place <ArrowUpRight size={15} /></button>
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section className="hero" id="explore">
          <div className="hero-copy">
            <motion.div className="eyebrow" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="eyebrow-line" /> A better way to find home
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }}>
              Find a place<br />that feels like <em>you.</em>
            </motion.h1>
            <motion.p className="hero-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
              Lovely homes across India. Good people. A little less<br className="desktop-break" /> scrolling, a lot more <span>feeling at home.</span>
            </motion.p>
            <motion.div className="search-panel" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}>
              <label className="search-field location-field">
                <MapPin size={18} />
                <span className="field-content"><span className="field-label">Where to?</span>
                  <input aria-label="Neighborhood or city" placeholder="Try Bengaluru, Mumbai, Pune..." value={location} onChange={(event) => setLocation(event.target.value)} />
                </span>
              </label>
              <label className="search-field price-field">
                <span className="field-content"><span className="field-label">Monthly budget</span>
                  <select aria-label="Monthly budget" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)}>
                    <option value="">Any budget</option><option value="15000">Up to ₹15,000</option><option value="25000">Up to ₹25,000</option><option value="35000">Up to ₹35,000</option><option value="50000">Up to ₹50,000</option><option value="75000">Up to ₹75,000</option>
                  </select>
                </span><ChevronDown size={16} />
              </label>
              <label className="search-field bed-field">
                <span className="field-content"><span className="field-label">Bedrooms</span>
                  <select aria-label="Bedrooms" value={bedrooms} onChange={(event) => setBedrooms(event.target.value)}>
                    <option>Any beds</option><option>1+ beds</option><option>2+ beds</option><option>3+ beds</option>
                  </select>
                </span><ChevronDown size={16} />
              </label>
              <button className="search-button" onClick={() => { setSavedOnly(false); document.getElementById("listing-grid")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}><Search size={17} /> Find my place</button>
            </motion.div>
            <div className="hero-footnote"><Sparkles size={14} /> Real homes, personally reviewed <span>·</span> No bait-and-switch</div>
          </div>
          <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }}>
            <img className="hero-image" src={photo} alt="Warm, sunlit living room with natural textures" fetchPriority="high" />
            <div className="photo-caption"><span className="caption-dot" /><span>Indiranagar, Bengaluru</span><span className="caption-divider" /><span>Just feels right</span></div>
            <div className="floating-note"><span className="note-icon"><Check size={16} /></span><span><b>Good homes, good humans</b><small>Every listing is the real deal</small></span></div>
            <div className="image-index"><span>01</span> / 18</div>
          </motion.div>
        </section>

        <section className="listing-section" id="explore-homes">
          <div className="section-heading">
            <div><div className="section-kicker">18 hand-picked sample homes</div><h2>Find your <em>somewhere.</em></h2></div>
            <a className="browse-link" href="#listing-grid">See all homes <ArrowRight size={16} /></a>
          </div>
          <div className="listing-toolbar">
            <div className="filter-tabs">
              {["All homes", "Apartment", "House", "Condo", "Room"].map((filter) => (
                <button key={filter} className={activeFilter === filter ? "filter-tab selected" : "filter-tab"} onClick={() => setActiveFilter(filter)}>{filter}</button>
              ))}
            </div>
            <div className="quick-filters">
              <label className="facility-filter"><SlidersHorizontal size={14} /><select aria-label="Filter by facility" value={facility} onChange={(event) => setFacility(event.target.value)}><option value="">Any facilities</option><option value="pet friendly">Pet friendly</option><option value="parking">Parking</option><option value="metro">Near metro</option><option value="garden">Garden</option><option value="laundry">Laundry</option><option value="furnished">Furnished</option><option value="balcony">Balcony</option><option value="gym">Gym</option></select><ChevronDown size={13} /></label>
              <label className="quick-search"><Search size={15} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search neighborhoods" aria-label="Search listings" /></label>
            </div>
          </div>
          <div className="result-meta"><span><b>{visibleListings.length}</b> {savedOnly ? "saved homes" : "homes worth a look"}</span><button onClick={() => { setSearch(""); setLocation(""); setMaxPrice(""); setBedrooms("Any beds"); setFacility(""); setSavedOnly(false); setActiveFilter("All homes"); }}>Reset filters <ArrowDown size={13} /></button></div>
          <div className="listing-grid" id="listing-grid">
            {visibleListings.map((listing, index) => (
              <motion.article className="listing-card" key={listing.id} layout initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.14 }} transition={{ duration: 0.52, delay: (index % 6) * 0.055, ease: [0.2, 0.7, 0.2, 1] }}>
                <div className="card-image-wrap">
                  <img src={listing.image || photo} alt={listing.title} className="card-image" loading="lazy" onLoad={(event) => event.currentTarget.parentElement?.classList.add("image-loaded")} onError={(event) => {
                    if (event.currentTarget.src !== photo) event.currentTarget.src = photo;
                    else event.currentTarget.parentElement?.classList.add("image-loaded");
                  }} />
                  {listing.featured && <span className="featured-pill"><Sparkles size={12} /> A little special</span>}
                  <button className={saved.includes(listing.id) ? "save-button is-saved" : "save-button"} onClick={() => toggleSaved(listing.id)} aria-label={saved.includes(listing.id) ? "Remove saved listing" : "Save listing"}><Heart size={18} fill={saved.includes(listing.id) ? "currentColor" : "none"} /></button>
                  <div className="image-pagination"><span className="pagination-active" /><span /><span /></div>
                </div>
                <div className="card-content">
                  <div className="card-location">{listing.neighborhood} <span>·</span> {listing.location.split(",")[0]}</div>
                  <div className="card-title-row"><h3>{listing.title}</h3><span className="listing-type">{listing.type}</span></div>
                  <div className="card-details"><span><BedDouble size={15} /> {listing.beds} bed</span><span><Bath size={15} /> {listing.baths} bath</span><span><Square size={14} /> {listing.area} sqft</span></div>
                  <div className="card-bottom"><span className="card-price">{formatRent(listing.price)}<small> / month</small></span><button className="inquire-button" onClick={() => showInquiry(listing)}>Say hello <ArrowUpRight size={14} /></button></div>
                </div>
              </motion.article>
            ))}
            {visibleListings.length === 0 && <div className="empty-state"><Search size={28} /><h3>No homes match those filters yet</h3><p>Try another city or budget. There are {listings.length} Indian sample homes ready to explore.</p><button className="text-button" onClick={() => { setSearch(""); setLocation(""); setMaxPrice(""); setBedrooms("Any beds"); setFacility(""); setSavedOnly(false); setActiveFilter("All homes"); }}>Show me all homes</button></div>}
          </div>
          <button className="load-more" onClick={() => document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" })}>Adjust your search <ArrowDown size={15} /></button>
        </section>

        <section className="owner-banner" id="how-it-works">
          <div className="owner-copy"><span className="owner-kicker">For the people with keys</span><h2>Good places deserve<br />good <em>people.</em></h2><p>Share your space with renters who care about finding a home, not just a roof. We’ll make the introductions feel easy.</p><button className="owner-cta" onClick={() => setModal("owner")}>List your place <ArrowRight size={16} /></button></div>
          <div className="owner-visual"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=85" alt="Beautiful, welcoming home interior" loading="lazy" /><div className="owner-stamp"><span>For the</span><b>good<br />ones</b><span>always.</span></div><div className="owner-caption"><Wifi size={14} /> Your place, in the right hands</div></div>
        </section>
        <section className="closing-note" id="about"><span className="closing-sparkle">✳</span><p>Home isn’t a place you find.<br /><em>It’s a feeling you recognize.</em></p><span className="closing-signature">Here’s to finding yours. — RentRadar</span></section>
      </main>

      <footer className="footer"><a className="brand footer-brand" href="#"><span className="brand-mark"><House size={16} /></span><span>rent<span className="brand-light">radar</span></span></a><span>Made for finding your kind of place.</span><span>© 2025 RentRadar</span></footer>

      <AnimatePresence>
        {modal && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setModal(null); }}>
          <motion.div className="modal-card" initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }} transition={{ duration: 0.2 }}>
            <button className="modal-close" onClick={() => setModal(null)} aria-label="Close dialog"><X size={18} /></button>
            {modal === "inquiry" ? <>
              <div className="modal-eyebrow">A good first hello</div><h2>Ask about this place.</h2><p className="modal-description">Tell the owner a little about yourself and what you’re looking for.</p>
              <div className="modal-listing"><img src={selectedListing.image || photo} alt="" /><span><b>{selectedListing.title}</b><small>{selectedListing.neighborhood} · {formatRent(selectedListing.price)} / mo</small></span></div>
              <form className="modal-form" onSubmit={submitInquiry}><label>Your name<input name="name" required placeholder="Alex Morgan" /></label><label>Email address<input name="email" type="email" required placeholder="alex@example.com" /></label><label>Your note<textarea name="message" required rows={3} placeholder="Hi! I’d love to know a little more about the place…" /></label><button className="modal-submit" type="submit">Send a little hello <ArrowRight size={16} /></button></form>
            </> : modal === "owner" ? <>
              <div className="modal-eyebrow">Let’s find your people</div><h2>Share your place.</h2><p className="modal-description">A few details are all we need to get started. Every home is reviewed before it goes live.</p>
              <form className="modal-form" onSubmit={submitListing}><label>Listing title<input name="title" required maxLength={140} placeholder="A sunny place to call home" /></label><div className="form-row"><label>Neighborhood<input name="neighborhood" required maxLength={80} placeholder="Indiranagar" /></label><label>City / state<input name="location" required maxLength={180} placeholder="Bengaluru, Karnataka" /></label></div><div className="form-row"><label>Monthly rent (₹)<input name="price" type="number" min="1" required placeholder="25000" /></label><label>Bedrooms<select name="beds" defaultValue="1"><option value="0">Studio</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4+</option></select></label></div><div className="form-row"><label>Bathrooms<input name="baths" type="number" min="1" max="20" required defaultValue="1" /></label><label>Area (sq ft)<input name="area" type="number" min="1" required placeholder="850" /></label></div><div className="form-row"><label>Home type<select name="type" defaultValue="Apartment"><option>Apartment</option><option>House</option><option>Condo</option><option>Room</option></select></label><label>Your email<input name="ownerEmail" type="email" required placeholder="you@example.com" /></label></div><label>Facilities, separated by commas<input name="facilities" maxLength={800} placeholder="Pet friendly, lift, parking" /></label><label>Photos (JPEG, PNG, or WebP; up to 8 MB each)<input name="images" type="file" accept="image/jpeg,image/png,image/webp" multiple /></label><button className="modal-submit" type="submit">Send for a little review <ArrowRight size={16} /></button></form>
            </> : <>
              <div className="modal-eyebrow">The owner’s corner</div><h2>Your places, your people.</h2><p className="modal-description">Check on your listings or help review new homes.</p>
              <div className="dashboard-tabs"><button className={dashboardTab === "mine" ? "dashboard-tab active" : "dashboard-tab"} onClick={() => setDashboardTab("mine")}>My listings</button><button className={dashboardTab === "review" ? "dashboard-tab active" : "dashboard-tab"} onClick={loadModerationQueue}>Review queue</button></div>
              {dashboardTab === "mine" ? <><form className="dashboard-email" onSubmit={loadOwnerListings}><input aria-label="Owner email" type="email" required value={dashboardEmail} onChange={(event) => setDashboardEmail(event.target.value)} placeholder="Enter your listing email" /><button type="submit">Find listings</button></form><div className="dashboard-list">{ownerListings.length ? ownerListings.map((listing) => <div className="dashboard-item" key={listing.id}><span><b>{listing.title}</b><small>{listing.neighborhood} · {formatRent(listing.price)} / mo</small></span><i className={`status-${(listing.status || "pending").toLowerCase()}`}>{listing.status || "PENDING"}</i></div>) : <p className="dashboard-empty">Your listings will show up here.</p>}</div></> : <div className="dashboard-list">{moderationListings.length ? moderationListings.map((listing) => <div className="moderation-item" key={listing.id}><span><b>{listing.title}</b><small>{listing.neighborhood} · {listing.ownerEmail || ""}</small></span><div><button aria-label={`Approve ${listing.title}`} onClick={() => moderateListing(listing.id, "APPROVED")}><Check size={15} /></button><button aria-label={`Reject ${listing.title}`} onClick={() => moderateListing(listing.id, "REJECTED")}><X size={15} /></button></div></div>) : <p className="dashboard-empty">The review queue is all clear.</p>}</div>}
            </>}
          </motion.div>
        </motion.div>}
      </AnimatePresence>
      <AnimatePresence>
        {isBooting && <motion.div className="app-loader" role="status" aria-label="Loading RentRadar" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.015, transition: { duration: 0.45, ease: "easeInOut" } }}>
          <div className="loader-glow loader-glow-one" />
          <div className="loader-glow loader-glow-two" />
          <motion.div className="loader-content" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
            <motion.div className="loader-mark" animate={{ y: [0, -5, 0], rotate: [0, -3, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
              <House size={27} strokeWidth={1.7} />
              <span className="loader-orbit" />
            </motion.div>
            <div className="loader-brand">rent<span>radar</span></div>
            <p className="loader-caption">Somewhere good is just around the corner.</p>
            <div className="loader-track"><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, ease: [0.7, 0, 0.3, 1] }} /></div>
            <div className="loader-city"><MapPin size={12} /> FINDING HOMES ACROSS INDIA</div>
          </motion.div>
          <div className="loader-footer"><span>MADE FOR THE FEELING OF HOME</span><span>01 — 18</span></div>
        </motion.div>}
      </AnimatePresence>
      <AnimatePresence>{notice && <motion.div className="toast" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}><Check size={16} />{notice}<button onClick={() => setNotice("")} aria-label="Dismiss"><X size={15} /></button></motion.div>}</AnimatePresence>
      <button className="back-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ArrowLeft size={15} /></button>
    </div>
  );
}

export default App;
