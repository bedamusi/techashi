// Authentic Techashi Solutions L.T.D Data
// Sourced strictly from official company specifications without fabricated claims.

export const COMPANY_INFO = {
  name: "TECHASHI SOLUTIONS L.T.D",
  shortName: "Techashi",
  domain: "https://techashisolutions.com/",
  tagline: "Technology, Built Around Your Business.",
  eyebrow: "TECHNOLOGY • SOLUTIONS • SUPPORT",
  description:
    "Techashi Solutions is a technology solutions company providing IT products and services to individuals, small businesses, and corporate clients. We combine hardware sales, installation, and professional IT services, so clients can get everything tech-related from one trusted partner.",
  proposition:
    "Clients can get everything tech-related from one trusted partner.",
};

export const TARGET_AUDIENCE = [
  {
    id: "smb",
    title: "Small & Medium Businesses",
    focus: "IT Setup & Support",
    description: "Businesses seeking seamless workplace technology, unified networking, reliable hardware, and dedicated IT maintenance.",
    needs: ["Office IT Setup", "Network Infrastructure", "Workstations & Laptops", "Ongoing Maintenance Contracts"],
  },
  {
    id: "corporate",
    title: "Corporate Clients",
    focus: "Enterprise Infrastructure & Security",
    description: "Organizations requiring high-availability networking, structured cabling, comprehensive CCTV surveillance, and Microsoft 365 cloud productivity.",
    needs: ["Structured Cabling & Switches", "Commercial CCTV & Remote Access", "Microsoft 365 Licensing & Migration", "IT Audits & Planning"],
  },
  {
    id: "startups",
    title: "Startups & Emerging Businesses",
    focus: "Digital Presence & Cloud Tools",
    description: "New and scaling ventures in need of high-impact websites, distinct graphic branding, and modern collaboration tools.",
    needs: ["Business & E-Commerce Websites", "Logos & Brand Identity", "Cloud Email & Collaboration", "Hardware Procurement"],
  },
  {
    id: "individuals",
    title: "Individuals & Students",
    focus: "Personal Computing & Gadgets",
    description: "Users looking for high-performance laptops, quality-tested refurbished PCs with warranty, tech accessories, and repair support.",
    needs: ["Brand-New & Refurbished Laptops", "Desktops & Monitors", "Phones & Accessories", "Upgrades & Troubleshooting"],
  },
];

export const SERVICES = [
  {
    id: "networking",
    number: "01",
    theme: "TECHNOLOGY THAT CONNECTS.",
    title: "Networking Design & Installation",
    subtitle: "Enterprise-grade connectivity engineered for uninterrupted speed and security.",
    category: "Infrastructure",
    items: [
      "Structured cabling",
      "High-performance WiFi networks",
      "Routers & switches configuration",
      "Hardware & software firewalls",
      "Complete office network setup",
    ],
    detailedText: "Robust networking is the nervous system of modern business. We design, deploy, and maintain wired and wireless architectures tailored to your space.",
  },
  {
    id: "cctv",
    number: "02",
    theme: "TECHNOLOGY THAT PROTECTS.",
    title: "CCTV Sales & Installation",
    subtitle: "24/7 high-definition surveillance with seamless remote viewing capabilities.",
    category: "Security",
    items: [
      "High-definition surveillance cameras",
      "DVR & NVR recording systems",
      "Mobile & remote viewing setup",
      "System maintenance & health checks",
    ],
    detailedText: "From single-location monitoring to multi-point commercial surveillance, our CCTV solutions deliver crystal-clear visibility and reliable recording.",
  },
  {
    id: "pcs",
    number: "03",
    theme: "TECHNOLOGY THAT PERFORMS.",
    title: "PCs (New & Refurbished) & Tech Gadgets",
    subtitle: "Quality-tested computing hardware backed by warranty.",
    category: "Hardware",
    items: [
      "Brand-new desktops & laptops",
      "Quality-tested refurbished PCs & laptops",
      "Hardware warranty on verified machines",
      "Phones, peripherals & essential accessories",
    ],
    detailedText: "Get dependable computing power suited to your exact workload. Every refurbished unit undergoes thorough stress-testing before delivery.",
  },
  {
    id: "digital",
    number: "04",
    theme: "TECHNOLOGY THAT MOVES YOUR BUSINESS FORWARD.",
    title: "Digital Solutions & IT Consultancy",
    subtitle: "Web development, Microsoft 365 cloud, graphic design, and strategic advisory.",
    category: "Digital & Cloud",
    items: [
      "Business & e-commerce websites (hosting & maintenance)",
      "Microsoft 365 licensing, migration, Teams & SharePoint",
      "Graphic design: logos, branding, profiles & social assets",
      "IT consultancy: planning, system selection, IT audits",
    ],
    detailedText: "Modernize your operations with cloud productivity suites, digital web platforms, memorable brand identities, and unbiased technology advisory.",
  },
  {
    id: "maintenance",
    number: "05",
    theme: "TECHNOLOGY THAT LASTS.",
    title: "PC Maintenance & Repair",
    subtitle: "Keep your critical workstations running at peak performance.",
    category: "Support",
    items: [
      "Hardware servicing & deep cleaning",
      "Component upgrades (RAM, SSD, GPU)",
      "System troubleshooting & diagnostics",
      "Virus, malware & bloatware removal",
      "Scheduled maintenance contracts",
    ],
    detailedText: "Minimize costly downtime with scheduled preventative maintenance and fast, skilled diagnosis when issues arise.",
  },
];

export const ECOSYSTEM_CAPABILITIES = [
  {
    key: "networking",
    label: "NETWORKING",
    short: "Connect",
    tagline: "High-speed infrastructure & unified cabling",
    iconName: "Network",
    summary: "Office networks, high-density WiFi, managed switching, and hardware firewalls engineered for zero downtime.",
    items: [
      "Structured cabling (Cat6/Cat6A & fiber)",
      "Enterprise & office WiFi deployment",
      "Managed routers & smart switching",
      "Firewalls & network perimeter security",
      "Full office network infrastructure setup",
    ],
    badge: "Core Infrastructure",
  },
  {
    key: "security",
    label: "SECURITY",
    short: "Protect",
    tagline: "CCTV surveillance & continuous monitoring",
    iconName: "ShieldCheck",
    summary: "Reliable commercial and residential security systems with crystal-clear optics and anytime remote smartphone viewing.",
    items: [
      "Dome, bullet & PTZ security cameras",
      "Network Video Recorders (NVR) & DVR setups",
      "Secure remote mobile & desktop viewing",
      "Camera alignment & preventative maintenance",
    ],
    badge: "Active Protection",
  },
  {
    key: "hardware",
    label: "HARDWARE",
    short: "Deploy",
    tagline: "New & refurbished PCs, laptops & gadgets",
    iconName: "Laptop",
    summary: "End-to-end hardware procurement for individuals and business fleets, with comprehensive warranty coverage.",
    items: [
      "Brand-new business & personal laptops",
      "Quality-tested refurbished PCs & laptops",
      "Phones, tablets & smart gadgets",
      "Peripherals, monitors & accessories",
      "Hardware warranty on all certified units",
    ],
    badge: "Certified Hardware",
  },
  {
    key: "digital",
    label: "DIGITAL",
    short: "Build",
    tagline: "Web development & graphic design",
    iconName: "Globe",
    summary: "From custom corporate web portals to striking brand identities that capture customer attention.",
    items: [
      "Modern corporate & business websites",
      "E-commerce stores with payment gateways",
      "Fast web hosting & continuous maintenance",
      "Logos, visual brand guidelines & flyers",
      "Company profiles & social media designs",
    ],
    badge: "Online Presence",
  },
  {
    key: "productivity",
    label: "PRODUCTIVITY",
    short: "Empower",
    tagline: "Microsoft 365 cloud suite & training",
    iconName: "Cloud",
    summary: "Modernize workplace collaboration with secure enterprise cloud tools, migration, and hands-on staff training.",
    items: [
      "Microsoft 365 licensing & plan selection",
      "Zero-downtime email & data migration",
      "Microsoft Teams & unified communication",
      "SharePoint intranets & OneDrive cloud storage",
      "User training & best practice onboarding",
    ],
    badge: "Cloud Workplace",
  },
  {
    key: "support",
    label: "SUPPORT",
    short: "Sustain",
    tagline: "IT consultancy, servicing & repair",
    iconName: "Wrench",
    summary: "Proactive technology planning, hardware servicing, troubleshooting, and scheduled maintenance contracts.",
    items: [
      "Strategic IT planning & system selection",
      "Comprehensive IT audits & advisory",
      "Workstation servicing & hardware upgrades",
      "Diagnostic troubleshooting & virus removal",
      "Predictable maintenance service contracts",
    ],
    badge: "Expert Assistance",
  },
];

export const WHY_TECHASHI = [
  {
    id: "01",
    title: "One-Stop Shop for All Tech Needs",
    description: "No need to juggle multiple vendors for hardware, wiring, security cameras, web hosting, and software. Techashi unifies everything under one accountable team.",
    highlight: "Unified Technology",
  },
  {
    id: "02",
    title: "Certified & Experienced Technicians",
    description: "Every installation, cabling run, and server configuration is executed by trained technicians adhering to industry best practices.",
    highlight: "Proven Expertise",
  },
  {
    id: "03",
    title: "Quality New & Refurbished Products with Warranty",
    description: "Whether buying brand-new laptops or budget-friendly refurbished desktops, every machine is thoroughly inspected, benchmarked, and backed by warranty.",
    highlight: "Warranty Backed",
  },
  {
    id: "04",
    title: "Affordable Pricing & Flexible Packages",
    description: "Transparent proposals structured for startups, growing SMBs, schools, and corporate institutions with clear return on investment.",
    highlight: "Fair Pricing",
  },
  {
    id: "05",
    title: "Reliable After-Sales Support",
    description: "Our relationship doesn't end upon delivery. We provide prompt troubleshooting, scheduled servicing, and dedicated warranty support.",
    highlight: "Always Supported",
  },
];

export const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "UNDERSTAND",
    heading: "Listening Before Building",
    description: "We evaluate your space, operational workflow, and technology requirements to understand exactly what you need.",
  },
  {
    step: "02",
    title: "DESIGN",
    heading: "Architecting the Right Solution",
    description: "We map out the ideal combination of hardware, network topology, security placement, or digital tooling tailored to your budget.",
  },
  {
    step: "03",
    title: "IMPLEMENT",
    heading: "Precision Setup & Delivery",
    description: "Our certified technicians execute clean cabling, equipment installation, system configuration, and thorough quality verification.",
  },
  {
    step: "04",
    title: "SUPPORT",
    heading: "Long-Term Reliability",
    description: "We provide comprehensive warranties, preventative servicing, scheduled maintenance, and responsive support whenever you need it.",
  },
];

export const PRODUCT_CATEGORIES = [
  {
    id: "laptops",
    name: "Laptops",
    tagline: "Brand-new portable workstations for work, business, and study.",
    badge: "Brand New & Certified",
    specs: ["Intel Core / AMD Ryzen", "Lightweight Chassis", "Full Manufacturer Warranty", "Windows 11 Ready"],
    action: "View Laptops",
  },
  {
    id: "desktops",
    name: "Desktops & Workstations",
    tagline: "Reliable tower PCs and all-in-one workstations built for everyday productivity.",
    badge: "Enterprise Grade",
    specs: ["Expandable Storage", "Multi-Monitor Support", "High Thermal Efficiency", "Office Ready"],
    action: "View Desktops",
  },
  {
    id: "servers",
    name: "Servers & Storage",
    tagline: "Business server and storage systems for dependable shared services and data access.",
    badge: "Business Infrastructure",
    specs: ["Business-Class Platforms", "Expandable Storage", "Network-Ready", "Deployment Support"],
    action: "View Servers",
  },
  {
    id: "refurbished",
    name: "Refurbished PCs",
    tagline: "Rigorous multi-point tested business-class machines at accessible price points.",
    badge: "Quality Tested + Warranty",
    specs: ["Certified Multi-Point Inspection", "Fast SSD Upgrades", "Included Warranty", "Premium Value"],
    action: "View Refurbished",
  },
  {
    id: "accessories",
    name: "Accessories & Peripherals",
    tagline: "High-grade monitors, wireless mice, mechanical keyboards, chargers, and docks.",
    badge: "Original Peripherals",
    specs: ["Ergonomic Design", "Universal Compatibility", "Heavy-Duty Cables", "Essential Gadgets"],
    action: "View Accessories",
  },
  {
    id: "cctv",
    name: "CCTV Systems",
    tagline: "Complete commercial and home security kits with IP cameras and NVR recording.",
    badge: "24/7 Remote Viewing",
    specs: ["HD / 4K Ultra Clarity", "Night Vision Infrared", "Smart Motion Alerts", "Mobile App Access"],
    action: "View CCTV Systems",
  },
  {
    id: "networking",
    name: "Networking Equipment",
    tagline: "Managed PoE switches, enterprise access points, routers, and server rack mounts.",
    badge: "High-Throughput",
    specs: ["Gigabit & Multi-Gig", "VLAN & QoS Capable", "Long-Range WiFi Coverage", "Rackmount Form Factor"],
    action: "View Networking",
  },
];

export const WORK_PORTFOLIO = [
  {
    category: "Networking Design",
    title: "Corporate Structured Cabling & Managed WiFi",
    scope: "Cat6 cabling, rack organization, multi-floor access points & firewall deployment.",
    tag: "Infrastructure",
  },
  {
    category: "CCTV Installation",
    title: "Commercial Multi-Camera Surveillance Setup",
    scope: "HD security cameras, NVR storage, remote viewing configuration & cable management.",
    tag: "Security",
  },
  {
    category: "Hardware Deployment",
    title: "Office Workstation & Laptop Fleet Rollout",
    scope: "Procurement, OS setup, warranty testing, and peripheral integration for staff.",
    tag: "Hardware",
  },
  {
    category: "Web Development",
    title: "Modern Business Website & Cloud Hosting",
    scope: "Responsive web platform, search optimization, secure hosting, and brand integration.",
    tag: "Digital",
  },
  {
    category: "Microsoft 365",
    title: "Cloud Productivity & Email Migration",
    scope: "Tenant licensing, seamless mailbox transfer, Teams integration & staff training.",
    tag: "Cloud",
  },
  {
    category: "PC Maintenance",
    title: "Scheduled Preventative Servicing Contract",
    scope: "Thermal repasting, SSD speed upgrades, deep cleaning & security updates.",
    tag: "Maintenance",
  },
];
