import React, { useState, useEffect, useRef, createPortal } from "react";
import {
  MapPin,
  Package,
  Calendar,
  FileText,
  Plus,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Clock,
  Building,
  User,
  Phone,
  Mail,
  Award,
  X,
  Truck,
  Container,
  Shield,
  Settings,
  Search,
  Loader,
} from "lucide-react";
import ParametersModal from "./ParametersModal";

const RaiseEnquiry = () => {
  // Form state
  const [formData, setFormData] = useState({
    location: "",
    country: "",
    commodity: "",
    subCommodity: "",
    riceType: "",
    volume: "",
    unit: "Kg",
    inspectionDateType: "single",
    inspectionDate: "",
    inspectionDateFrom: "",
    inspectionDateTo: "",
    description: "",
    urgency: "Medium",
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    expectedBudget: "",
    selectedCertifications: [],
  });

  // Location autocomplete state
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const locationInputRef = useRef(null);
  const locationDropdownRef = useRef(null);
  const locationContainerRef = useRef(null);
  const debounceTimeoutRef = useRef(null);

  // Location positioning state
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  // Google Places API configuration
  const GOOGLE_PLACES_API_KEY = "AIzaSyCSTNdFSlH3YoEk8B6SYXFAt0T-I1Q-lOk"; // Replace with your actual API key

  // Modal and inspection type state
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const [selectedSubCommodity, setSelectedSubCommodity] = useState("");
  const [selectedRiceType, setSelectedRiceType] = useState("");
  const [showParametersModal, setShowParametersModal] = useState(false);
  const [currentInspectionType, setCurrentInspectionType] = useState(null);
  const [inspectionTypes, setInspectionTypes] = useState([]);
  const [additionalServices, setAdditionalServices] = useState([]);
  const [otherCommodity, setOtherCommodity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedQueryId, setSubmittedQueryId] = useState(null);
  const [showCertificationDropdown, setShowCertificationDropdown] =
    useState(false);

  // Update dropdown position when it opens
  useEffect(() => {
    if (showLocationDropdown && locationInputRef.current) {
      const updatePosition = () => {
        const rect = locationInputRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + window.scrollY + 8,
          left: rect.left + window.scrollX,
          width: rect.width,
        });
      };

      updatePosition();
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [showLocationDropdown]);

  // Real-time location search using multiple methods
  const searchLocations = async (query) => {
    if (!query || query.length < 2) {
      return [];
    }

    // Method 1: Try using Google Maps JavaScript API (if loaded)
    if (window.google && window.google.maps && window.google.maps.places) {
      try {
        return new Promise((resolve) => {
          const service = new window.google.maps.places.AutocompleteService();
          service.getPlacePredictions(
            {
              input: query,
              types: ["(cities)"],
              language: "en",
            },
            (predictions, status) => {
              if (
                status === window.google.maps.places.PlacesServiceStatus.OK &&
                predictions
              ) {
                const results = predictions.map((prediction) => ({
                  placeId: prediction.place_id,
                  description: prediction.description,
                  mainText:
                    prediction.structured_formatting?.main_text ||
                    prediction.description,
                  secondaryText:
                    prediction.structured_formatting?.secondary_text || "",
                  types: prediction.types || [],
                }));
                resolve(results);
              } else {
                resolve([]);
              }
            }
          );
        });
      } catch (error) {
        console.error("Google Maps API error:", error);
      }
    }

    // Method 2: Try using OpenStreetMap Nominatim API (free alternative)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json&addressdetails=1&limit=8&countrycodes=&featuretype=city`
      );

      if (response.ok) {
        const data = await response.json();
        return data.map((item) => ({
          placeId: item.place_id,
          description: item.display_name,
          mainText: item.name || item.display_name.split(",")[0],
          secondaryText: item.display_name.split(",").slice(1).join(",").trim(),
          types: ["locality"],
          country: item.address?.country || "",
        }));
      }
    } catch (error) {
      console.error("Nominatim API error:", error);
    }

    // Method 3: Try using MapBox Geocoding API (requires API key but has free tier)
    try {
      const MAPBOX_API_KEY = "your_mapbox_api_key_here"; // Replace with actual key
      if (MAPBOX_API_KEY && MAPBOX_API_KEY !== "your_mapbox_api_key_here") {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            query
          )}.json?access_token=${MAPBOX_API_KEY}&types=place&limit=8`
        );

        if (response.ok) {
          const data = await response.json();
          return data.features.map((feature) => ({
            placeId: feature.id,
            description: feature.place_name,
            mainText: feature.text,
            secondaryText: feature.place_name.replace(feature.text + ", ", ""),
            types: feature.place_type || ["locality"],
            country:
              feature.context?.find((c) => c.id.startsWith("country"))?.text ||
              "",
          }));
        }
      }
    } catch (error) {
      console.error("MapBox API error:", error);
    }

    // Method 4: Fallback to comprehensive static data
    return getStaticLocationSuggestions(query);
  };

  // Comprehensive static location data as fallback
  const getStaticLocationSuggestions = (query) => {
    const staticLocations = [
      {
        description: "New York, NY, United States",
        mainText: "New York",
        secondaryText: "NY, United States",
        country: "United States",
      },
      {
        description: "Los Angeles, CA, United States",
        mainText: "Los Angeles",
        secondaryText: "CA, United States",
        country: "United States",
      },
      {
        description: "Chicago, IL, United States",
        mainText: "Chicago",
        secondaryText: "IL, United States",
        country: "United States",
      },
      {
        description: "Houston, TX, United States",
        mainText: "Houston",
        secondaryText: "TX, United States",
        country: "United States",
      },
      {
        description: "Miami, FL, United States",
        mainText: "Miami",
        secondaryText: "FL, United States",
        country: "United States",
      },
      {
        description: "London, England, United Kingdom",
        mainText: "London",
        secondaryText: "England, United Kingdom",
        country: "United Kingdom",
      },
      {
        description: "Manchester, England, United Kingdom",
        mainText: "Manchester",
        secondaryText: "England, United Kingdom",
        country: "United Kingdom",
      },
      {
        description: "Birmingham, England, United Kingdom",
        mainText: "Birmingham",
        secondaryText: "England, United Kingdom",
        country: "United Kingdom",
      },
      {
        description: "Edinburgh, Scotland, United Kingdom",
        mainText: "Edinburgh",
        secondaryText: "Scotland, United Kingdom",
        country: "United Kingdom",
      },
      {
        description: "Dublin, Ireland",
        mainText: "Dublin",
        secondaryText: "Ireland",
        country: "Ireland",
      },
      {
        description: "Paris, France",
        mainText: "Paris",
        secondaryText: "France",
        country: "France",
      },
      {
        description: "Lyon, France",
        mainText: "Lyon",
        secondaryText: "France",
        country: "France",
      },
      {
        description: "Marseille, France",
        mainText: "Marseille",
        secondaryText: "France",
        country: "France",
      },
      {
        description: "Berlin, Germany",
        mainText: "Berlin",
        secondaryText: "Germany",
        country: "Germany",
      },
      {
        description: "Munich, Germany",
        mainText: "Munich",
        secondaryText: "Germany",
        country: "Germany",
      },
      {
        description: "Hamburg, Germany",
        mainText: "Hamburg",
        secondaryText: "Germany",
        country: "Germany",
      },
      {
        description: "Frankfurt, Germany",
        mainText: "Frankfurt",
        secondaryText: "Germany",
        country: "Germany",
      },
      {
        description: "Rome, Italy",
        mainText: "Rome",
        secondaryText: "Italy",
        country: "Italy",
      },
      {
        description: "Milan, Italy",
        mainText: "Milan",
        secondaryText: "Italy",
        country: "Italy",
      },
      {
        description: "Naples, Italy",
        mainText: "Naples",
        secondaryText: "Italy",
        country: "Italy",
      },
      {
        description: "Madrid, Spain",
        mainText: "Madrid",
        secondaryText: "Spain",
        country: "Spain",
      },
      {
        description: "Barcelona, Spain",
        mainText: "Barcelona",
        secondaryText: "Spain",
        country: "Spain",
      },
      {
        description: "Seville, Spain",
        mainText: "Seville",
        secondaryText: "Spain",
        country: "Spain",
      },
      {
        description: "Amsterdam, Netherlands",
        mainText: "Amsterdam",
        secondaryText: "Netherlands",
        country: "Netherlands",
      },
      {
        description: "Rotterdam, Netherlands",
        mainText: "Rotterdam",
        secondaryText: "Netherlands",
        country: "Netherlands",
      },
      {
        description: "Brussels, Belgium",
        mainText: "Brussels",
        secondaryText: "Belgium",
        country: "Belgium",
      },
      {
        description: "Zurich, Switzerland",
        mainText: "Zurich",
        secondaryText: "Switzerland",
        country: "Switzerland",
      },
      {
        description: "Geneva, Switzerland",
        mainText: "Geneva",
        secondaryText: "Switzerland",
        country: "Switzerland",
      },
      {
        description: "Vienna, Austria",
        mainText: "Vienna",
        secondaryText: "Austria",
        country: "Austria",
      },
      {
        description: "Stockholm, Sweden",
        mainText: "Stockholm",
        secondaryText: "Sweden",
        country: "Sweden",
      },
      {
        description: "Oslo, Norway",
        mainText: "Oslo",
        secondaryText: "Norway",
        country: "Norway",
      },
      {
        description: "Copenhagen, Denmark",
        mainText: "Copenhagen",
        secondaryText: "Denmark",
        country: "Denmark",
      },
      {
        description: "Helsinki, Finland",
        mainText: "Helsinki",
        secondaryText: "Finland",
        country: "Finland",
      },
      {
        description: "Warsaw, Poland",
        mainText: "Warsaw",
        secondaryText: "Poland",
        country: "Poland",
      },
      {
        description: "Prague, Czech Republic",
        mainText: "Prague",
        secondaryText: "Czech Republic",
        country: "Czech Republic",
      },
      {
        description: "Budapest, Hungary",
        mainText: "Budapest",
        secondaryText: "Hungary",
        country: "Hungary",
      },
      {
        description: "Bucharest, Romania",
        mainText: "Bucharest",
        secondaryText: "Romania",
        country: "Romania",
      },
      {
        description: "Sofia, Bulgaria",
        mainText: "Sofia",
        secondaryText: "Bulgaria",
        country: "Bulgaria",
      },
      {
        description: "Athens, Greece",
        mainText: "Athens",
        secondaryText: "Greece",
        country: "Greece",
      },
      {
        description: "Istanbul, Turkey",
        mainText: "Istanbul",
        secondaryText: "Turkey",
        country: "Turkey",
      },
      {
        description: "Ankara, Turkey",
        mainText: "Ankara",
        secondaryText: "Turkey",
        country: "Turkey",
      },
      {
        description: "Moscow, Russia",
        mainText: "Moscow",
        secondaryText: "Russia",
        country: "Russia",
      },
      {
        description: "St. Petersburg, Russia",
        mainText: "St. Petersburg",
        secondaryText: "Russia",
        country: "Russia",
      },
      {
        description: "Kiev, Ukraine",
        mainText: "Kiev",
        secondaryText: "Ukraine",
        country: "Ukraine",
      },
      {
        description: "Mumbai, Maharashtra, India",
        mainText: "Mumbai",
        secondaryText: "Maharashtra, India",
        country: "India",
      },
      {
        description: "Delhi, India",
        mainText: "Delhi",
        secondaryText: "India",
        country: "India",
      },
      {
        description: "Bangalore, Karnataka, India",
        mainText: "Bangalore",
        secondaryText: "Karnataka, India",
        country: "India",
      },
      {
        description: "Chennai, Tamil Nadu, India",
        mainText: "Chennai",
        secondaryText: "Tamil Nadu, India",
        country: "India",
      },
      {
        description: "Kolkata, West Bengal, India",
        mainText: "Kolkata",
        secondaryText: "West Bengal, India",
        country: "India",
      },
      {
        description: "Hyderabad, Telangana, India",
        mainText: "Hyderabad",
        secondaryText: "Telangana, India",
        country: "India",
      },
      {
        description: "Pune, Maharashtra, India",
        mainText: "Pune",
        secondaryText: "Maharashtra, India",
        country: "India",
      },
      {
        description: "Ahmedabad, Gujarat, India",
        mainText: "Ahmedabad",
        secondaryText: "Gujarat, India",
        country: "India",
      },
      {
        description: "Jaipur, Rajasthan, India",
        mainText: "Jaipur",
        secondaryText: "Rajasthan, India",
        country: "India",
      },
      {
        description: "Surat, Gujarat, India",
        mainText: "Surat",
        secondaryText: "Gujarat, India",
        country: "India",
      },
      {
        description: "Beijing, China",
        mainText: "Beijing",
        secondaryText: "China",
        country: "China",
      },
      {
        description: "Shanghai, China",
        mainText: "Shanghai",
        secondaryText: "China",
        country: "China",
      },
      {
        description: "Guangzhou, China",
        mainText: "Guangzhou",
        secondaryText: "China",
        country: "China",
      },
      {
        description: "Shenzhen, China",
        mainText: "Shenzhen",
        secondaryText: "China",
        country: "China",
      },
      {
        description: "Tokyo, Japan",
        mainText: "Tokyo",
        secondaryText: "Japan",
        country: "Japan",
      },
      {
        description: "Osaka, Japan",
        mainText: "Osaka",
        secondaryText: "Japan",
        country: "Japan",
      },
      {
        description: "Kyoto, Japan",
        mainText: "Kyoto",
        secondaryText: "Japan",
        country: "Japan",
      },
      {
        description: "Seoul, South Korea",
        mainText: "Seoul",
        secondaryText: "South Korea",
        country: "South Korea",
      },
      {
        description: "Busan, South Korea",
        mainText: "Busan",
        secondaryText: "South Korea",
        country: "South Korea",
      },
      {
        description: "Bangkok, Thailand",
        mainText: "Bangkok",
        secondaryText: "Thailand",
        country: "Thailand",
      },
      {
        description: "Chiang Mai, Thailand",
        mainText: "Chiang Mai",
        secondaryText: "Thailand",
        country: "Thailand",
      },
      {
        description: "Singapore",
        mainText: "Singapore",
        secondaryText: "Singapore",
        country: "Singapore",
      },
      {
        description: "Kuala Lumpur, Malaysia",
        mainText: "Kuala Lumpur",
        secondaryText: "Malaysia",
        country: "Malaysia",
      },
      {
        description: "Jakarta, Indonesia",
        mainText: "Jakarta",
        secondaryText: "Indonesia",
        country: "Indonesia",
      },
      {
        description: "Manila, Philippines",
        mainText: "Manila",
        secondaryText: "Philippines",
        country: "Philippines",
      },
      {
        description: "Ho Chi Minh City, Vietnam",
        mainText: "Ho Chi Minh City",
        secondaryText: "Vietnam",
        country: "Vietnam",
      },
      {
        description: "Hanoi, Vietnam",
        mainText: "Hanoi",
        secondaryText: "Vietnam",
        country: "Vietnam",
      },
      {
        description: "Sydney, New South Wales, Australia",
        mainText: "Sydney",
        secondaryText: "New South Wales, Australia",
        country: "Australia",
      },
      {
        description: "Melbourne, Victoria, Australia",
        mainText: "Melbourne",
        secondaryText: "Victoria, Australia",
        country: "Australia",
      },
      {
        description: "Brisbane, Queensland, Australia",
        mainText: "Brisbane",
        secondaryText: "Queensland, Australia",
        country: "Australia",
      },
      {
        description: "Perth, Western Australia, Australia",
        mainText: "Perth",
        secondaryText: "Western Australia, Australia",
        country: "Australia",
      },
      {
        description: "Auckland, New Zealand",
        mainText: "Auckland",
        secondaryText: "New Zealand",
        country: "New Zealand",
      },
      {
        description: "Wellington, New Zealand",
        mainText: "Wellington",
        secondaryText: "New Zealand",
        country: "New Zealand",
      },
      {
        description: "Dubai, United Arab Emirates",
        mainText: "Dubai",
        secondaryText: "United Arab Emirates",
        country: "United Arab Emirates",
      },
      {
        description: "Abu Dhabi, United Arab Emirates",
        mainText: "Abu Dhabi",
        secondaryText: "United Arab Emirates",
        country: "United Arab Emirates",
      },
      {
        description: "Doha, Qatar",
        mainText: "Doha",
        secondaryText: "Qatar",
        country: "Qatar",
      },
      {
        description: "Riyadh, Saudi Arabia",
        mainText: "Riyadh",
        secondaryText: "Saudi Arabia",
        country: "Saudi Arabia",
      },
      {
        description: "Jeddah, Saudi Arabia",
        mainText: "Jeddah",
        secondaryText: "Saudi Arabia",
        country: "Saudi Arabia",
      },
      {
        description: "Kuwait City, Kuwait",
        mainText: "Kuwait City",
        secondaryText: "Kuwait",
        country: "Kuwait",
      },
      {
        description: "Tel Aviv, Israel",
        mainText: "Tel Aviv",
        secondaryText: "Israel",
        country: "Israel",
      },
      {
        description: "Jerusalem, Israel",
        mainText: "Jerusalem",
        secondaryText: "Israel",
        country: "Israel",
      },
      {
        description: "Cairo, Egypt",
        mainText: "Cairo",
        secondaryText: "Egypt",
        country: "Egypt",
      },
      {
        description: "Alexandria, Egypt",
        mainText: "Alexandria",
        secondaryText: "Egypt",
        country: "Egypt",
      },
      {
        description: "Casablanca, Morocco",
        mainText: "Casablanca",
        secondaryText: "Morocco",
        country: "Morocco",
      },
      {
        description: "Lagos, Nigeria",
        mainText: "Lagos",
        secondaryText: "Nigeria",
        country: "Nigeria",
      },
      {
        description: "Abuja, Nigeria",
        mainText: "Abuja",
        secondaryText: "Nigeria",
        country: "Nigeria",
      },
      {
        description: "Johannesburg, South Africa",
        mainText: "Johannesburg",
        secondaryText: "South Africa",
        country: "South Africa",
      },
      {
        description: "Cape Town, South Africa",
        mainText: "Cape Town",
        secondaryText: "South Africa",
        country: "South Africa",
      },
      {
        description: "Nairobi, Kenya",
        mainText: "Nairobi",
        secondaryText: "Kenya",
        country: "Kenya",
      },
      {
        description: "São Paulo, Brazil",
        mainText: "São Paulo",
        secondaryText: "Brazil",
        country: "Brazil",
      },
      {
        description: "Rio de Janeiro, Brazil",
        mainText: "Rio de Janeiro",
        secondaryText: "Brazil",
        country: "Brazil",
      },
      {
        description: "Buenos Aires, Argentina",
        mainText: "Buenos Aires",
        secondaryText: "Argentina",
        country: "Argentina",
      },
      {
        description: "Santiago, Chile",
        mainText: "Santiago",
        secondaryText: "Chile",
        country: "Chile",
      },
      {
        description: "Lima, Peru",
        mainText: "Lima",
        secondaryText: "Peru",
        country: "Peru",
      },
      {
        description: "Bogotá, Colombia",
        mainText: "Bogotá",
        secondaryText: "Colombia",
        country: "Colombia",
      },
      {
        description: "Mexico City, Mexico",
        mainText: "Mexico City",
        secondaryText: "Mexico",
        country: "Mexico",
      },
      {
        description: "Guadalajara, Mexico",
        mainText: "Guadalajara",
        secondaryText: "Mexico",
        country: "Mexico",
      },
      {
        description: "Toronto, Ontario, Canada",
        mainText: "Toronto",
        secondaryText: "Ontario, Canada",
        country: "Canada",
      },
      {
        description: "Vancouver, British Columbia, Canada",
        mainText: "Vancouver",
        secondaryText: "British Columbia, Canada",
        country: "Canada",
      },
      {
        description: "Montreal, Quebec, Canada",
        mainText: "Montreal",
        secondaryText: "Quebec, Canada",
        country: "Canada",
      },
      {
        description: "Calgary, Alberta, Canada",
        mainText: "Calgary",
        secondaryText: "Alberta, Canada",
        country: "Canada",
      },
    ];

    const lowerQuery = query.toLowerCase();
    return staticLocations
      .filter(
        (location) =>
          location.description.toLowerCase().includes(lowerQuery) ||
          location.mainText.toLowerCase().includes(lowerQuery) ||
          location.country.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 8);
  };

  // Extract country from description or use included country data
  const extractCountryFromDescription = (location) => {
    if (location.country) {
      return location.country;
    }
    const parts = location.description.split(", ");
    return parts[parts.length - 1];
  };

  // Handle location input change with debouncing
  const handleLocationInputChange = (value) => {
    handleInputChange("location", value);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    if (value.length >= 2) {
      setIsLoadingLocations(true);
      setShowLocationDropdown(true);

      debounceTimeoutRef.current = setTimeout(async () => {
        try {
          const suggestions = await searchLocations(value);
          setLocationSuggestions(suggestions);
          setIsLoadingLocations(false);
        } catch (error) {
          console.error("Error searching locations:", error);
          setIsLoadingLocations(false);
          setLocationSuggestions([]);
        }
      }, 300);
    } else {
      setLocationSuggestions([]);
      setShowLocationDropdown(false);
      setIsLoadingLocations(false);
    }
  };

  // Handle location selection
  const handleLocationSelect = async (location) => {
    handleInputChange("location", location.description);
    setShowLocationDropdown(false);
    setLocationSuggestions([]);

    const country = extractCountryFromDescription(location);
    handleInputChange("country", country);
  };

  // Handle clicks outside location dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showLocationDropdown &&
        locationContainerRef.current &&
        !locationContainerRef.current.contains(event.target) &&
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target)
      ) {
        setShowLocationDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLocationDropdown]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  // Commodity data
  const commodityData = {
    "Food & Beverages": {
      Rice: [
        "Basmati Rice",
        "Jasmine Rice",
        "Brown Rice",
        "White Rice",
        "Wild Rice",
        "Arborio Rice",
        "Black Rice",
        "Red Rice",
        "Sticky Rice",
        "Parboiled Rice",
        "Long Grain Rice",
        "Medium Grain Rice",
        "Short Grain Rice",
        "Organic Rice",
        "Non-GMO Rice",
        "Broken Rice",
        "Rice Bran",
        "Rice Flour",
      ],
      Wheat: ["Wheat Flour", "Whole Wheat", "Durum Wheat"],
      Pulses: ["Lentils", "Chickpeas", "Black Beans"],
      Spices: ["Black Pepper", "Turmeric", "Cardamom"],
      "Tea & Coffee": ["Green Tea", "Black Tea", "Coffee Beans"],
      "Oil & Seeds": ["Sunflower Oil", "Coconut Oil", "Sesame Seeds"],
    },
    "Textiles & Garments": {
      Cotton: ["Organic Cotton", "Conventional Cotton", "Pima Cotton"],
      Silk: ["Mulberry Silk", "Tussar Silk", "Eri Silk"],
      Wool: ["Merino Wool", "Cashmere", "Angora"],
      Synthetic: ["Polyester", "Nylon", "Acrylic"],
    },
    "Electronics & Electrical": {
      Components: [
        "Semiconductors",
        "Resistors",
        "Capacitors",
        "Circuit Boards",
      ],
      Devices: ["Smartphones", "Laptops", "Tablets", "Smart Watches"],
      "Home Appliances": [
        "Refrigerators",
        "Washing Machines",
        "Air Conditioners",
      ],
    },
    Pharmaceuticals: {
      APIs: ["Active Pharmaceutical Ingredients"],
      "Finished Products": ["Tablets", "Capsules", "Syrups", "Injections"],
      "Medical Devices": ["Surgical Instruments", "Diagnostic Equipment"],
    },
    Chemicals: {
      Industrial: ["Sulfuric Acid", "Sodium Hydroxide", "Ammonia"],
      Organic: ["Benzene", "Toluene", "Acetone"],
      Specialty: ["Catalysts", "Polymers", "Adhesives"],
    },
    Automotive: {
      Parts: ["Engine Components", "Brake Systems", "Electrical Parts"],
      Accessories: ["Tires", "Batteries", "Lighting"],
    },
    Other: {},
  };

  const units = [
    "Kg",
    "Tons",
    "Pieces",
    "Cartons",
    "Pallets",
    "Containers",
    "Liters",
    "Cubic Meters",
  ];
  const urgencyLevels = [
    {
      value: "Low",
      color: "bg-emerald-500/20 text-emerald-400",
      description: "Standard timeline",
    },
    {
      value: "Medium",
      color: "bg-orange-500/20 text-orange-400",
      description: "Moderate priority",
    },
    {
      value: "High",
      color: "bg-red-500/20 text-red-400",
      description: "Urgent requirement",
    },
  ];

  // Inspection types for multiple selection
  const inspectionTypeOptions = [
    {
      id: "physical",
      label: "Physical Inspection",
      description: "Visual and physical examination",
    },
    {
      id: "chemical",
      label: "Chemical Testing",
      description: "Laboratory analysis and testing",
    },
  ];

  // Additional services that appear after selecting inspection types
  const additionalServiceOptions = [
    {
      id: "psi",
      label: "PSI",
      description: "Pre-Shipment Inspection",
      icon: Shield,
    },
    {
      id: "loading_track",
      label: "Loading Track",
      description: "Loading supervision and tracking",
      icon: Truck,
    },
    {
      id: "stuffing_container",
      label: "Stuffing Container",
      description: "Container stuffing supervision",
      icon: Container,
    },
  ];

  // Certification options for multi-select
  const certificationOptions = [
    {
      value: "NABL",
      label: "NABL",
      description:
        "National Accreditation Board for Testing and Calibration Laboratories",
    },
    {
      value: "NABCB",
      label: "NABCB",
      description: "National Accreditation Board for Certification Bodies",
    },
    { value: "COC", label: "COC", description: "Certificate of Conformity" },
    {
      value: "FOSFE",
      label: "FOSFE",
      description: "Federation of Seed & Farm Equipment",
    },
    {
      value: "GAFTA",
      label: "GAFTA",
      description: "Grain and Feed Trade Association",
    },
    {
      value: "ISO",
      label: "ISO",
      description: "International Organization for Standardization",
    },
  ];

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle certification selection/deselection
  const handleCertificationToggle = (certificationValue) => {
    const updatedCertifications = formData.selectedCertifications.includes(
      certificationValue
    )
      ? formData.selectedCertifications.filter(
          (cert) => cert !== certificationValue
        )
      : [...formData.selectedCertifications, certificationValue];

    handleInputChange("selectedCertifications", updatedCertifications);
  };

  // Remove certification
  const removeCertification = (certificationValue) => {
    const updatedCertifications = formData.selectedCertifications.filter(
      (cert) => cert !== certificationValue
    );
    handleInputChange("selectedCertifications", updatedCertifications);
  };

  // Handle commodity selection
  const handleCommodityChange = (commodity) => {
    setSelectedCommodity(commodity);
    setSelectedSubCommodity("");
    setSelectedRiceType("");
    handleInputChange("commodity", commodity);
    handleInputChange("subCommodity", "");
    handleInputChange("riceType", "");
  };

  const handleSubCommodityChange = (subCommodity) => {
    setSelectedSubCommodity(subCommodity);
    setSelectedRiceType("");
    handleInputChange("subCommodity", subCommodity);
    handleInputChange("riceType", "");
  };

  const handleRiceTypeChange = (riceType) => {
    setSelectedRiceType(riceType);
    handleInputChange("riceType", riceType);
  };

  // Handle inspection type selection
  const handleInspectionTypeChange = (typeId) => {
    const isCurrentlySelected = inspectionTypes.includes(typeId);

    if (isCurrentlySelected) {
      const updatedTypes = inspectionTypes.filter((id) => id !== typeId);
      setInspectionTypes(updatedTypes);
      if (updatedTypes.length === 0) {
        setAdditionalServices([]);
      }
    } else {
      const updatedTypes = [...inspectionTypes, typeId];
      setInspectionTypes(updatedTypes);

      if (shouldShowParametersModal()) {
        setCurrentInspectionType(typeId);
        setShowParametersModal(true);
      }
    }
  };

  // Handle additional services selection
  const handleAdditionalServiceChange = (serviceId) => {
    const updatedServices = additionalServices.includes(serviceId)
      ? additionalServices.filter((id) => id !== serviceId)
      : [...additionalServices, serviceId];

    setAdditionalServices(updatedServices);
  };

  const shouldShowParametersModal = () => {
    return (
      (selectedCommodity === "Food & Beverages" &&
        selectedSubCommodity === "Rice" &&
        selectedRiceType) ||
      (selectedCommodity && selectedCommodity !== "Food & Beverages") ||
      selectedCommodity === "Other"
    );
  };

  // Function to open parameter modal for specific inspection type
  const openParametersModal = (inspectionType) => {
    setCurrentInspectionType(inspectionType);
    setShowParametersModal(true);
  };

  // Form validation
  const isFormValid = () => {
    const dateValid =
      formData.inspectionDateType === "single"
        ? formData.inspectionDate
        : formData.inspectionDateFrom && formData.inspectionDateTo;

    return (
      formData.location &&
      formData.country &&
      selectedCommodity &&
      formData.volume &&
      dateValid &&
      inspectionTypes.length > 0 &&
      formData.contactPerson &&
      formData.email
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Get customer ID from localStorage
      let customerId = localStorage.getItem("customerId");

      // If not in localStorage, try getting from token
      if (!customerId) {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            customerId = payload.userId || payload.id;
          } catch (error) {
            console.error("Token parse error:", error);
          }
        }
      }

      // Fallback to hardcoded for testing
      if (!customerId) {
        customerId = 10;
      }

      console.log("Using customer ID:", customerId);

      // Build submission data
      const submissionData = {
        customerId: parseInt(customerId),
        inspectionLocation: formData.location,
        country: formData.country,
        urgencyLevel: formData.urgency,
        commodityCategory: selectedCommodity,
        subCommodity: selectedSubCommodity || otherCommodity || null,
        riceType: selectedRiceType || null,
        volume: parseFloat(formData.volume),
        siUnits: formData.unit,
        expectedBudgetUSD: formData.expectedBudget
          ? parseFloat(formData.expectedBudget.replace(/[$,]/g, ""))
          : null,
        singleDayInspectionDate:
          formData.inspectionDateType === "single"
            ? formData.inspectionDate
            : null,
        multiDayInspectionStartDate:
          formData.inspectionDateType === "range"
            ? formData.inspectionDateFrom
            : null,
        multiDayInspectionEndDate:
          formData.inspectionDateType === "range"
            ? formData.inspectionDateTo
            : null,
        physicalInspection: inspectionTypes.includes("physical"),
        chemicalTesting: inspectionTypes.includes("chemical"),
        certificates: formData.selectedCertifications || [],
        additionalServices: additionalServices || [],
        companyName: formData.companyName,
        contactPersonName: formData.contactPerson,
        emailAddress: formData.email,
        phoneNumber: formData.phone,
        specialRequirements: formData.description || null,
        selectedPhyParamId: formData.selectedPhyParamId,
        selectedChemParamId: formData.selectedChemParamId,
      };

      console.log("=== SUBMISSION DATA ===");
      console.log(JSON.stringify(submissionData, null, 2));
      console.log("=====================");

      const response = await fetch(
        "http://localhost:3214/v1/api/raiseenquiry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("✅ Success:", result);
        alert(`Enquiry created successfully! ID: ${result.id}`);
        setIsSubmitted(true);
        setSubmittedQueryId(result.id);
      } else {
        console.error("❌ Error:", result);
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("❌ Submit error:", error);
      alert(`Submission failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    alert("Draft saved successfully!");
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black text-white p-6 transition-all duration-300">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center hover:border-gray-50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 transform hover:scale-[1.02] animate-fade-in">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110 hover:rotate-3">
              <CheckCircle className="h-8 w-8 text-white transition-transform duration-300 hover:scale-110" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 transition-colors duration-300 hover:text-gray-100">
              Enquiry Submitted Successfully!
            </h2>
            <p className="text-gray-400 mb-6 transition-colors duration-300 hover:text-gray-300">
              Your inspection request has been submitted. You will receive a
              confirmation email shortly and inspectors will start bidding on
              your project.
            </p>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6 transition-all duration-300 hover:border-gray-600">
              <p className="text-sm text-gray-400 transition-colors duration-300 hover:text-gray-300">
                <strong className="text-white">Reference ID:</strong>{" "}
                {submittedQueryId || `INQ-${Date.now().toString().slice(-6)}`}
              </p>
            </div>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-lg hover:from-purple-600 hover:to-violet-600 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 font-medium active:scale-95"
            >
              Submit Another Enquiry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-3 md:p-6 transition-all duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 md:p-6 hover:border-gray-50 hover:shadow-xl transition-all duration-300 animate-fade-in">
          {/* Header */}
          <div className="mb-6 animate-fade-in-up">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2 transition-colors duration-300 hover:text-gray-100">
              Raise New Inspection Enquiry
            </h2>
            <p className="text-sm md:text-base text-gray-400 transition-colors duration-300 hover:text-gray-300">
              Fill out the form below to request an inspection. Our network of
              certified inspectors will review your request and provide
              competitive quotes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="relative">
              <h3 className="text-base md:text-lg font-semibold text-white mb-4 flex items-center transition-colors duration-300 hover:text-gray-100">
                <MapPin className="h-4 w-4 md:h-5 md:w-5 mr-2 text-purple-400 transition-transform duration-300 hover:scale-110" />
                Location & Basic Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Location with Autocomplete */}
                <div className="relative" ref={locationContainerRef}>
                  <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-300 hover:text-gray-200">
                    Inspection Location *
                  </label>
                  <div className="relative">
                    <input
                      ref={locationInputRef}
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        handleLocationInputChange(e.target.value)
                      }
                      placeholder="Start typing location..."
                      className="w-full px-4 py-3 pr-10 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-white placeholder-gray-400 hover:border-gray-600"
                      required
                      autoComplete="off"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      {isLoadingLocations ? (
                        <Loader className="h-4 w-4 text-gray-400 animate-spin" />
                      ) : (
                        <Search className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Location Dropdown */}
                  {showLocationDropdown && (
                    <>
                      <div
                        className="fixed inset-0 z-[9998]"
                        onClick={() => setShowLocationDropdown(false)}
                        style={{ backgroundColor: "transparent" }}
                      />
                      <div
                        className="absolute z-[9999] rounded-lg shadow-2xl max-h-64 overflow-hidden"
                        style={{
                          top: "100%",
                          left: "0",
                          right: "0",
                          marginTop: "8px",
                          backgroundColor: "#111827",
                          border: "2px solid #7c3aed",
                          boxShadow:
                            "0 25px 50px -12px rgba(0, 0, 0, 0.95), 0 25px 25px -5px rgba(0, 0, 0, 0.85)",
                        }}
                      >
                        <div
                          className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-purple-600"
                          style={{ backgroundColor: "#111827" }}
                        >
                          {isLoadingLocations ? (
                            <div
                              className="text-white px-4 py-3"
                              style={{
                                backgroundColor: "#111827",
                                borderBottom: "1px solid #4b5563",
                              }}
                            >
                              <div className="flex items-center justify-center">
                                <Loader className="h-4 w-4 text-purple-400 animate-spin mr-2" />
                                <span className="text-gray-200">
                                  Searching locations...
                                </span>
                              </div>
                            </div>
                          ) : locationSuggestions.length > 0 ? (
                            locationSuggestions.map((suggestion, index) => (
                              <div
                                key={index}
                                className="text-white px-4 py-3 cursor-pointer transition-colors duration-200"
                                style={{
                                  backgroundColor: "#111827",
                                  borderBottom:
                                    index !== locationSuggestions.length - 1
                                      ? "1px solid #4b5563"
                                      : "none",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "#374151";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "#111827";
                                }}
                                onClick={() => handleLocationSelect(suggestion)}
                              >
                                <div className="flex items-start space-x-3">
                                  <MapPin className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-white truncate">
                                      {suggestion.mainText ||
                                        suggestion.description}
                                    </div>
                                    {suggestion.secondaryText && (
                                      <div className="text-sm text-gray-300 truncate">
                                        {suggestion.secondaryText}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div
                              className="text-white px-4 py-3 text-center"
                              style={{ backgroundColor: "#111827" }}
                            >
                              <span className="text-gray-300">
                                No locations found
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-300 hover:text-gray-200">
                    Country *
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    placeholder="Country (auto-filled from location)"
                    className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-white placeholder-gray-400 hover:border-gray-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-300 hover:text-gray-200">
                    Urgency Level
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) =>
                      handleInputChange("urgency", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-white hover:border-gray-600"
                  >
                    {urgencyLevels.map((level) => (
                      <option
                        key={level.value}
                        value={level.value}
                        className="bg-gray-800 text-white"
                      >
                        {level.value} - {level.description}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Commodity Information */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center transition-colors duration-300 hover:text-gray-100">
                <Package className="h-5 w-5 mr-2 text-blue-400 transition-transform duration-300 hover:scale-110" />
                Commodity Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-300 hover:text-gray-200">
                    Commodity Category *
                  </label>
                  <select
                    className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-white hover:border-gray-600"
                    value={selectedCommodity}
                    onChange={(e) => handleCommodityChange(e.target.value)}
                    required
                  >
                    <option value="" className="bg-gray-800 text-white">
                      Select Commodity Category
                    </option>
                    {Object.keys(commodityData).map((commodity) => (
                      <option
                        key={commodity}
                        value={commodity}
                        className="bg-gray-800 text-white"
                      >
                        {commodity}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedCommodity && selectedCommodity !== "Other" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-300 hover:text-gray-200">
                      Sub-Commodity *
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-white hover:border-gray-600"
                      value={selectedSubCommodity}
                      onChange={(e) => handleSubCommodityChange(e.target.value)}
                      required
                    >
                      <option value="" className="bg-gray-800 text-white">
                        Select Sub-Commodity
                      </option>
                      {Object.keys(commodityData[selectedCommodity]).map(
                        (subCommodity) => (
                          <option
                            key={subCommodity}
                            value={subCommodity}
                            className="bg-gray-800 text-white"
                          >
                            {subCommodity}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                )}

                {selectedCommodity === "Other" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-300 hover:text-gray-200">
                      Specify Commodity *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter commodity name"
                      value={otherCommodity}
                      onChange={(e) => setOtherCommodity(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-white placeholder-gray-400 hover:border-gray-600"
                      required
                    />
                  </div>
                )}

                {selectedCommodity === "Food & Beverages" &&
                  selectedSubCommodity === "Rice" && (
                    <div className="lg:col-span-3">
                      <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-300 hover:text-gray-200">
                        Rice Type *
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-white hover:border-gray-600"
                        value={selectedRiceType}
                        onChange={(e) => handleRiceTypeChange(e.target.value)}
                        required
                      >
                        <option value="" className="bg-gray-800 text-white">
                          Select Rice Type
                        </option>
                        {commodityData["Food & Beverages"]["Rice"].map(
                          (riceType) => (
                            <option
                              key={riceType}
                              value={riceType}
                              className="bg-gray-800 text-white"
                            >
                              {riceType}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-300 hover:text-gray-200">
                    Volume *
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={formData.volume}
                      onChange={(e) =>
                        handleInputChange("volume", e.target.value)
                      }
                      className="flex-1 px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-white placeholder-gray-400 hover:border-gray-600"
                      required
                    />
                    <select
                      value={formData.unit}
                      onChange={(e) =>
                        handleInputChange("unit", e.target.value)
                      }
                      className="px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-white hover:border-gray-600"
                    >
                      {units.map((unit) => (
                        <option
                          key={unit}
                          value={unit}
                          className="bg-gray-800 text-white"
                        >
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-300 hover:text-gray-200">
                    Expected Budget (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., $1,000 - $2,000"
                    value={formData.expectedBudget}
                    onChange={(e) =>
                      handleInputChange("expectedBudget", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-white placeholder-gray-400 hover:border-gray-600"
                  />
                </div>
              </div>
            </div>

            {/* Inspection Date */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center transition-colors duration-300 hover:text-gray-100">
                <Calendar className="h-5 w-5 mr-2 text-orange-400 transition-transform duration-300 hover:scale-110" />
                Inspection Date *
              </h3>

              <div className="mb-6">
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <input
                      type="radio"
                      value="single"
                      checked={formData.inspectionDateType === "single"}
                      onChange={(e) =>
                        handleInputChange("inspectionDateType", e.target.value)
                      }
                      className="w-4 h-4 text-purple-600 transition-transform duration-300 group-hover:scale-110"
                    />
                    <span className="text-sm font-medium text-gray-300 transition-colors duration-300 group-hover:text-gray-200">
                      Single Day Inspection
                    </span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <input
                      type="radio"
                      value="range"
                      checked={formData.inspectionDateType === "range"}
                      onChange={(e) =>
                        handleInputChange("inspectionDateType", e.target.value)
                      }
                      className="w-4 h-4 text-purple-600 transition-transform duration-300 group-hover:scale-110"
                    />
                    <span className="text-sm font-medium text-gray-300 transition-colors duration-300 group-hover:text-gray-200">
                      Multi-Day Inspection
                    </span>
                  </label>
                </div>
              </div>

              {formData.inspectionDateType === "single" ? (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-300 hover:text-gray-200">
                    Inspection Date
                  </label>
                  <input
                    type="date"
                    value={formData.inspectionDate}
                    onChange={(e) =>
                      handleInputChange("inspectionDate", e.target.value)
                    }
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full md:w-auto px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-white hover:border-gray-600"
                    required
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-300 hover:text-gray-200">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.inspectionDateFrom}
                      onChange={(e) =>
                        handleInputChange("inspectionDateFrom", e.target.value)
                      }
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-white hover:border-gray-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-300 hover:text-gray-200">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={formData.inspectionDateTo}
                      onChange={(e) =>
                        handleInputChange("inspectionDateTo", e.target.value)
                      }
                      min={
                        formData.inspectionDateFrom ||
                        new Date().toISOString().split("T")[0]
                      }
                      className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-white hover:border-gray-600"
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Inspection Type - Multiple Selection */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center transition-colors duration-300 hover:text-gray-100">
                <CheckCircle className="h-5 w-5 mr-2 text-emerald-400 transition-transform duration-300 hover:scale-110" />
                Type of Inspection * (Select one or both)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {inspectionTypeOptions.map((type) => (
                  <div
                    key={type.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 transform hover:scale-[1.02] hover:-translate-y-0.5 ${
                      inspectionTypes.includes(type.id)
                        ? "border-purple-500 bg-purple-500/20"
                        : "border-gray-700 hover:border-gray-600 bg-gray-800"
                    }`}
                    onClick={() => handleInspectionTypeChange(type.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-all duration-300 ${
                          inspectionTypes.includes(type.id)
                            ? "border-purple-500 bg-purple-500"
                            : "border-gray-600"
                        }`}
                      >
                        {inspectionTypes.includes(type.id) && (
                          <CheckCircle className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-white transition-colors duration-300 hover:text-gray-100">
                          {type.label}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1 transition-colors duration-300 hover:text-gray-300">
                          {type.description}
                        </p>

                        {/* Configure Parameters Button */}
                        {inspectionTypes.includes(type.id) &&
                          shouldShowParametersModal() && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                openParametersModal(type.id);
                              }}
                              className="mt-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-md hover:from-blue-600 hover:to-cyan-600 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 text-sm font-medium flex items-center space-x-1"
                            >
                              <Settings className="h-3 w-3" />
                              <span>Configure Parameters</span>
                            </button>
                          )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {inspectionTypes.length > 0 && (
                <div className="p-3 bg-purple-500/20 border border-purple-500/30 rounded-lg mb-4 transition-all duration-300 hover:bg-purple-500/30">
                  <p className="text-sm text-purple-300">
                    Selected:{" "}
                    {inspectionTypes
                      .map(
                        (id) =>
                          inspectionTypeOptions.find((type) => type.id === id)
                            ?.label
                      )
                      .join(", ")}
                  </p>
                </div>
              )}

              {/* Additional Services */}
              {inspectionTypes.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-md font-semibold text-white mb-3 transition-colors duration-300 hover:text-gray-100">
                    Additional Services (Optional)
                  </h4>
                  <p className="text-sm text-gray-400 mb-4 transition-colors duration-300 hover:text-gray-300">
                    Select additional services you may need:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {additionalServiceOptions.map((service) => {
                      const IconComponent = service.icon;
                      return (
                        <div
                          key={service.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 transform hover:scale-[1.02] hover:-translate-y-0.5 ${
                            additionalServices.includes(service.id)
                              ? "border-emerald-500 bg-emerald-500/20"
                              : "border-gray-700 hover:border-gray-600 bg-gray-800"
                          }`}
                          onClick={() =>
                            handleAdditionalServiceChange(service.id)
                          }
                        >
                          <div className="flex items-start space-x-3">
                            <div
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-all duration-300 ${
                                additionalServices.includes(service.id)
                                  ? "border-emerald-500 bg-emerald-500"
                                  : "border-gray-600"
                              }`}
                            >
                              {additionalServices.includes(service.id) && (
                                <CheckCircle className="h-3 w-3 text-white" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <IconComponent className="h-4 w-4 text-gray-400 transition-transform duration-300 hover:scale-110" />
                                <h4 className="font-medium text-white transition-colors duration-300 hover:text-gray-100">
                                  {service.label}
                                </h4>
                              </div>
                              <p className="text-sm text-gray-400 transition-colors duration-300 hover:text-gray-300">
                                {service.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {additionalServices.length > 0 && (
                    <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-lg mt-4 transition-all duration-300 hover:bg-emerald-500/30">
                      <p className="text-sm text-emerald-300">
                        Additional Services Selected:{" "}
                        {additionalServices
                          .map(
                            (id) =>
                              additionalServiceOptions.find(
                                (service) => service.id === id
                              )?.label
                          )
                          .join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Certifications Section */}
            <div>
              <h3 className="text-base md:text-lg font-semibold text-white mb-4 flex items-center transition-colors duration-300 hover:text-gray-100">
                <Award className="h-4 w-4 md:h-5 md:w-5 mr-2 text-yellow-400 transition-transform duration-300 hover:scale-110" />
                Certifications
              </h3>

              <div className="space-y-4">
                <p className="text-gray-400 text-sm transition-colors duration-300 hover:text-gray-300">
                  Select certifications required for this inspection (you can
                  select multiple):
                </p>

                {formData.selectedCertifications.length > 0 && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 transition-colors duration-300 hover:text-gray-200">
                      Selected Certifications:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {formData.selectedCertifications.map((cert) => (
                        <div
                          key={cert}
                          className="flex items-center space-x-2 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30 transition-all duration-300 hover:bg-purple-500/30 hover:scale-105"
                        >
                          <span>{cert}</span>
                          <button
                            type="button"
                            onClick={() => removeCertification(cert)}
                            className="text-purple-400 hover:text-purple-200 transition-colors duration-300"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-300 hover:text-gray-200">
                    Add Certifications
                  </label>
                  <button
                    id="certification-button"
                    type="button"
                    onClick={() =>
                      setShowCertificationDropdown(!showCertificationDropdown)
                    }
                    className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-left flex justify-between items-center text-white hover:border-gray-600"
                  >
                    <span className="text-gray-400">
                      {formData.selectedCertifications.length > 0
                        ? `${formData.selectedCertifications.length} certification(s) selected`
                        : "Select certifications"}
                    </span>
                    <div
                      className={`transition-transform duration-200 ${
                        showCertificationDropdown ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Certification Dropdown */}
                  {showCertificationDropdown && (
                    <>
                      <div
                        className="fixed inset-0 z-[9998]"
                        onClick={() => setShowCertificationDropdown(false)}
                        style={{ backgroundColor: "transparent" }}
                      />
                      <div
                        id="certification-dropdown"
                        className="absolute z-[9999] rounded-lg shadow-2xl max-h-60 overflow-y-auto"
                        style={{
                          top: "100%",
                          left: "0",
                          right: "0",
                          marginTop: "8px",
                          backgroundColor: "#111827",
                          border: "2px solid #7c3aed",
                          boxShadow:
                            "0 25px 50px -12px rgba(0, 0, 0, 0.95), 0 25px 25px -5px rgba(0, 0, 0, 0.85)",
                        }}
                      >
                        {certificationOptions.map((certification, index) => (
                          <div
                            key={certification.value}
                            className="text-white px-4 py-3 cursor-pointer transition-colors duration-200"
                            style={{
                              backgroundColor:
                                formData.selectedCertifications.includes(
                                  certification.value
                                )
                                  ? "#7c3aed"
                                  : "#111827",
                              borderBottom:
                                index !== certificationOptions.length - 1
                                  ? "1px solid #4b5563"
                                  : "none",
                            }}
                            onMouseEnter={(e) => {
                              if (
                                !formData.selectedCertifications.includes(
                                  certification.value
                                )
                              ) {
                                e.currentTarget.style.backgroundColor =
                                  "#374151";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (
                                !formData.selectedCertifications.includes(
                                  certification.value
                                )
                              ) {
                                e.currentTarget.style.backgroundColor =
                                  "#111827";
                              }
                            }}
                            onClick={() =>
                              handleCertificationToggle(certification.value)
                            }
                          >
                            <div className="flex items-start space-x-3">
                              <div
                                className="w-4 h-4 rounded border-2 flex items-center justify-center mt-0.5"
                                style={{
                                  borderColor:
                                    formData.selectedCertifications.includes(
                                      certification.value
                                    )
                                      ? "#ddd6fe"
                                      : "#6b7280",
                                  backgroundColor:
                                    formData.selectedCertifications.includes(
                                      certification.value
                                    )
                                      ? "#ddd6fe"
                                      : "transparent",
                                }}
                              >
                                {formData.selectedCertifications.includes(
                                  certification.value
                                ) && (
                                  <CheckCircle className="h-3 w-3 text-purple-800" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-white">
                                  {certification.label}
                                </div>
                                <div className="text-sm text-gray-300">
                                  {certification.description}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center transition-colors duration-300 hover:text-gray-100">
                <User className="h-5 w-5 mr-2 text-cyan-400 transition-transform duration-300 hover:scale-110" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-300 hover:text-gray-200">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                    placeholder="Enter company name"
                    className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-white placeholder-gray-400 hover:border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-300 hover:text-gray-200">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) =>
                      handleInputChange("contactPerson", e.target.value)
                    }
                    placeholder="Enter contact person name"
                    className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-white placeholder-gray-400 hover:border-gray-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-300 hover:text-gray-200">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter email address"
                    className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-white placeholder-gray-400 hover:border-gray-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-300 hover:text-gray-200">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-white placeholder-gray-400 hover:border-gray-600"
                  />
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.7s" }}
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center transition-colors duration-300 hover:text-gray-100">
                <FileText className="h-5 w-5 mr-2 text-green-400 transition-transform duration-300 hover:scale-110" />
                Additional Details
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-300 hover:text-gray-200">
                  Special Requirements / Description
                </label>
                <textarea
                  rows={5}
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Describe any special requirements, access instructions, or additional details about the inspection..."
                  className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-none text-white placeholder-gray-400 hover:border-gray-600"
                />
              </div>
            </div>

            {/* Selected Values Display */}
            {(selectedCommodity ||
              selectedSubCommodity ||
              selectedRiceType ||
              inspectionTypes.length > 0 ||
              additionalServices.length > 0) && (
              <div
                className="bg-gray-800 rounded-lg p-6 border border-gray-700 animate-fade-in-up"
                style={{ animationDelay: "0.75s" }}
              >
                <h4 className="text-sm font-medium text-gray-300 mb-3">
                  Selection Summary:
                </h4>

                {(selectedCommodity ||
                  selectedSubCommodity ||
                  selectedRiceType) && (
                  <div className="mb-3">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      Commodity:
                    </span>
                    <div className="flex items-center space-x-2 text-sm mt-1">
                      <span className="px-3 py-1 bg-gray-700 rounded-full border border-gray-600">
                        {selectedCommodity}
                      </span>
                      {selectedSubCommodity && (
                        <>
                          <span className="text-gray-400">→</span>
                          <span className="px-3 py-1 bg-gray-700 rounded-full border border-gray-600">
                            {selectedSubCommodity}
                          </span>
                        </>
                      )}
                      {selectedRiceType && (
                        <>
                          <span className="text-gray-400">→</span>
                          <span className="px-3 py-1 bg-gray-700 rounded-full border border-gray-600">
                            {selectedRiceType}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {inspectionTypes.length > 0 && (
                  <div className="mb-3">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      Inspection Types:
                    </span>
                    <div className="flex items-center space-x-2 text-sm mt-1">
                      {inspectionTypes.map((typeId) => (
                        <span
                          key={typeId}
                          className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30"
                        >
                          {
                            inspectionTypeOptions.find(
                              (type) => type.id === typeId
                            )?.label
                          }
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {additionalServices.length > 0 && (
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      Additional Services:
                    </span>
                    <div className="flex items-center space-x-2 text-sm mt-1">
                      {additionalServices.map((serviceId) => (
                        <span
                          key={serviceId}
                          className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30"
                        >
                          {
                            additionalServiceOptions.find(
                              (service) => service.id === serviceId
                            )?.label
                          }
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-700 animate-fade-in-up"
              style={{ animationDelay: "0.8s" }}
            >
              <button
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-lg hover:from-purple-600 hover:to-violet-600 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    <span>Submit Enquiry</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-8 py-3 bg-gray-700 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600 hover:border-gray-500 hover:text-white transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 font-semibold flex items-center justify-center space-x-2"
              >
                <FileText className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                <span>Save as Draft</span>
              </button>
              <div className="text-sm text-gray-500 flex items-center transition-colors duration-300 hover:text-gray-400">
                <AlertCircle className="h-4 w-4 mr-1 transition-transform duration-300 hover:scale-110" />
                <span>Fields marked with * are required</span>
              </div>
            </div>
          </form>

          {/* Parameters Modal */}
          <ParametersModal
            isOpen={showParametersModal}
            onClose={() => setShowParametersModal(false)}
            selectedCommodity={selectedCommodity}
            selectedSubCommodity={selectedSubCommodity}
            selectedRiceType={selectedRiceType}
            inspectionTypes={[currentInspectionType]}
            additionalServices={additionalServices}
            otherCommodity={otherCommodity}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-track-gray-800::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 3px;
        }

        .scrollbar-thumb-gray-600::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 3px;
        }

        .scrollbar-thumb-gray-600::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default RaiseEnquiry;
